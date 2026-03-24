#!/usr/bin/env python3
"""
Script to execute PipelinePilot notebook cells and identify errors.
"""

import warnings
warnings.filterwarnings('ignore')

import sys
import traceback

print("="*60)
print("EXECUTING PIPELINEPILOT AI NOTEBOOK")
print("="*60)

# ============================================================================
# CELL 1: Imports
# ============================================================================
print("\n[1/16] Importing libraries...")
try:
    import numpy as np
    import pandas as pd
    from scipy import stats
    from scipy.stats import f_oneway, spearmanr, pearsonr
    import statsmodels.api as sm
    from statsmodels.stats.outliers_influence import variance_inflation_factor

    from sklearn.model_selection import train_test_split, cross_val_score
    from sklearn.ensemble import GradientBoostingClassifier
    from sklearn.metrics import roc_auc_score, classification_report, confusion_matrix
    from sklearn.preprocessing import StandardScaler

    import matplotlib
    matplotlib.use('Agg')  # Non-interactive backend
    import matplotlib.pyplot as plt
    import seaborn as sns

    # Set style
    plt.style.use('seaborn-v0_8-whitegrid')
    CB_PALETTE = ['#0077BB', '#33BBEE', '#009988', '#EE7733', '#CC3311', '#EE3377', '#BBBBBB']
    sns.set_palette(CB_PALETTE)

    pd.set_option('display.max_columns', 50)
    pd.set_option('display.float_format', '{:.3f}'.format)
    print("    SUCCESS: All imports complete")
except Exception as e:
    print(f"    ERROR: {e}")
    sys.exit(1)

# ============================================================================
# CELL 2: Configuration
# ============================================================================
print("\n[2/16] Loading configuration...")
try:
    ACTIVE_VERTICAL = 'cafe'

    VERTICALS = {
        'cafe': {
            'name': 'Cafe / Cloud Kitchen',
            'example': 'Third Wave Coffee, Koramangala',
            'outcome_var': 'churned',
            'outcome_label': 'Customer Churn',
            'treatment_var': 'received_loyalty_offer',
            'treatment_label': 'Loyalty Offer',
            'constructs': {
                'FoodQuality': {
                    'indicators': ['taste_rating', 'freshness_rating', 'presentation_rating', 'menu_variety'],
                    'mean_range': (4.8, 5.3), 'std': 0.8, 'loading_range': (0.75, 0.90),
                    'is_strength': True
                },
                'Service': {
                    'indicators': ['staff_friendliness', 'service_speed', 'order_accuracy', 'staff_knowledge'],
                    'mean_range': (4.2, 4.7), 'std': 0.9, 'loading_range': (0.70, 0.85),
                    'is_strength': False
                },
                'Ambience': {
                    'indicators': ['cleanliness_rating', 'seating_comfort', 'noise_level', 'decor_vibe'],
                    'mean_range': (4.5, 5.0), 'std': 0.85, 'loading_range': (0.72, 0.88),
                    'is_strength': False
                },
                'Value': {
                    'indicators': ['price_fairness', 'portion_size', 'promo_satisfaction'],
                    'mean_range': (3.2, 3.7), 'std': 1.0, 'loading_range': (0.70, 0.85),
                    'is_strength': False
                },
                'Digital': {
                    'indicators': ['app_ease', 'delivery_speed', 'online_menu_quality'],
                    'mean_range': (4.0, 4.5), 'std': 0.95, 'loading_range': (0.72, 0.88),
                    'is_strength': False
                }
            },
            'demographics': {
                'age': {'type': 'continuous', 'mean': 32, 'std': 8},
                'gender': {'type': 'categorical', 'categories': ['M', 'F', 'Other'], 'probs': [0.45, 0.50, 0.05]},
                'order_channel': {'type': 'categorical', 'categories': ['Dine-in', 'Swiggy', 'Zomato', 'Direct App'], 'probs': [0.35, 0.25, 0.25, 0.15]},
                'distance_km': {'type': 'continuous', 'mean': 3.5, 'std': 2.0},
                'tenure_months': {'type': 'continuous', 'mean': 8, 'std': 6}
            },
            'outcome_base_rate': 0.22,
            'treatment_rate': 0.40,
            'avg_customer_value': 2500
        }
    }

    CONFIG = VERTICALS[ACTIVE_VERTICAL]
    print(f"    SUCCESS: Loaded {CONFIG['name']} configuration")
except Exception as e:
    print(f"    ERROR: {e}")
    traceback.print_exc()

# ============================================================================
# CELL 3: Data Generation
# ============================================================================
print("\n[3/16] Generating synthetic data...")
try:
    def generate_synthetic_data(config, n_samples=5000, random_state=42):
        np.random.seed(random_state)
        data = {}
        latent_scores = {}

        n_constructs = len(config['constructs'])
        latent_corr = np.eye(n_constructs)
        for i in range(n_constructs):
            for j in range(i+1, n_constructs):
                latent_corr[i, j] = latent_corr[j, i] = np.random.uniform(0.2, 0.5)

        L = np.linalg.cholesky(latent_corr)
        latent_raw = np.random.normal(0, 1, (n_samples, n_constructs))
        latent_correlated = latent_raw @ L.T

        for idx, (construct_name, construct_config) in enumerate(config['constructs'].items()):
            latent_factor = latent_correlated[:, idx]
            latent_scores[construct_name] = latent_factor

            mean_low, mean_high = construct_config['mean_range']
            base_mean = np.random.uniform(mean_low, mean_high)

            for indicator in construct_config['indicators']:
                loading = np.random.uniform(*construct_config['loading_range'])
                noise = np.random.normal(0, construct_config['std'] * np.sqrt(1 - loading**2), n_samples)
                indicator_values = base_mean + latent_factor * construct_config['std'] * loading + noise
                data[indicator] = np.clip(indicator_values, 1, 7)

        for demo_name, demo_config in config['demographics'].items():
            if demo_config['type'] == 'continuous':
                data[demo_name] = np.random.normal(demo_config['mean'], demo_config['std'], n_samples)
                if 'age' in demo_name:
                    data[demo_name] = np.clip(data[demo_name], 18, 70).astype(int)
                elif 'distance' in demo_name or 'tenure' in demo_name or 'spend' in demo_name:
                    data[demo_name] = np.clip(data[demo_name], 0.1, None)
            else:
                data[demo_name] = np.random.choice(demo_config['categories'], n_samples, p=demo_config['probs'])

        outcome_var = config['outcome_var']
        is_negative_outcome = outcome_var in ['churned', 'membership_cancelled']

        weights = np.random.uniform(0.1, 0.4, n_constructs)
        weights = weights / weights.sum()

        combined_score = sum(latent_scores[c] * w for c, w in zip(config['constructs'].keys(), weights))

        base_rate = config['outcome_base_rate']
        if is_negative_outcome:
            prob = 1 / (1 + np.exp(combined_score * 0.8 - np.log(base_rate / (1 - base_rate))))
        else:
            prob = 1 / (1 + np.exp(-combined_score * 0.8 + np.log((1 - base_rate) / base_rate)))

        data[outcome_var] = (np.random.random(n_samples) < prob).astype(int)

        treatment_var = config['treatment_var']
        data[treatment_var] = (np.random.random(n_samples) < config['treatment_rate']).astype(int)

        persuadable_mask = (combined_score > -0.5) & (combined_score < 0.5) & (data[treatment_var] == 1)
        if is_negative_outcome:
            data[outcome_var][persuadable_mask] = (np.random.random(persuadable_mask.sum()) < base_rate * 0.5).astype(int)
        else:
            data[outcome_var][persuadable_mask] = (np.random.random(persuadable_mask.sum()) < base_rate * 1.8).astype(int)

        df = pd.DataFrame(data)
        return df, latent_scores

    N_SAMPLES = 5000
    df, latent_scores = generate_synthetic_data(CONFIG, n_samples=N_SAMPLES)
    print(f"    SUCCESS: Generated {len(df):,} records")
    print(f"    Churn rate: {df[CONFIG['outcome_var']].mean()*100:.1f}%")
except Exception as e:
    print(f"    ERROR: {e}")
    traceback.print_exc()

# ============================================================================
# CELL 4: Get all indicators
# ============================================================================
print("\n[4/16] Processing indicators...")
try:
    all_indicators = []
    for construct_config in CONFIG['constructs'].values():
        all_indicators.extend(construct_config['indicators'])

    construct_means = {}
    for construct_name, construct_config in CONFIG['constructs'].items():
        indicators = construct_config['indicators']
        construct_mean = df[indicators].mean().mean()
        construct_means[construct_name] = construct_mean

    weakest = min(construct_means, key=construct_means.get)
    strongest = max(construct_means, key=construct_means.get)
    print(f"    SUCCESS: {len(all_indicators)} indicators processed")
    print(f"    Strongest: {strongest} ({construct_means[strongest]:.2f})")
    print(f"    Weakest: {weakest} ({construct_means[weakest]:.2f})")
except Exception as e:
    print(f"    ERROR: {e}")

# ============================================================================
# CELL 5: SEM Readiness
# ============================================================================
print("\n[5/16] Checking SEM readiness...")
try:
    n_samples = len(df)
    SEM_READY = n_samples >= 200
    print(f"    SUCCESS: SEM_READY = {SEM_READY} ({n_samples} samples)")
except Exception as e:
    print(f"    ERROR: {e}")

# ============================================================================
# CELL 6: EDA
# ============================================================================
print("\n[6/16] Running EDA...")
try:
    eda_stats = pd.DataFrame({
        'Mean': df[all_indicators].mean(),
        'Std': df[all_indicators].std(),
        'Skewness': df[all_indicators].skew(),
        'Kurtosis': df[all_indicators].kurtosis(),
    })
    print(f"    SUCCESS: EDA complete. Mean skewness: {eda_stats['Skewness'].mean():.3f}")
except Exception as e:
    print(f"    ERROR: {e}")

# ============================================================================
# CELL 7: ANOVA
# ============================================================================
print("\n[7/16] Running ANOVA...")
try:
    outcome_var = CONFIG['outcome_var']
    outcome_groups = df[outcome_var].unique()

    anova_results = []
    for indicator in all_indicators:
        groups = [df[df[outcome_var] == g][indicator].values for g in outcome_groups]
        f_stat, p_value = f_oneway(*groups)
        anova_results.append({'Indicator': indicator, 'F_Statistic': f_stat, 'P_Value': p_value})

    anova_df = pd.DataFrame(anova_results).sort_values('F_Statistic', ascending=False)
    significant = sum(1 for r in anova_results if r['P_Value'] < 0.05)
    print(f"    SUCCESS: {significant}/{len(anova_results)} indicators significant (p<0.05)")
except Exception as e:
    print(f"    ERROR: {e}")

# ============================================================================
# CELL 8: VIF
# ============================================================================
print("\n[8/16] Running VIF analysis...")
try:
    X_vif = df[all_indicators].copy()
    X_vif = sm.add_constant(X_vif)

    vif_data = []
    for i, col in enumerate(X_vif.columns):
        if col != 'const':
            vif = variance_inflation_factor(X_vif.values, i)
            vif_data.append({'Indicator': col, 'VIF': vif})

    vif_df = pd.DataFrame(vif_data).sort_values('VIF', ascending=False)
    high_vif = sum(1 for v in vif_data if v['VIF'] > 10)
    print(f"    SUCCESS: VIF complete. {high_vif} high VIF indicators")
except Exception as e:
    print(f"    ERROR: {e}")

# ============================================================================
# CELL 9: Factor Analysis
# ============================================================================
print("\n[9/16] Running Factor Analysis...")
try:
    from factor_analyzer import FactorAnalyzer
    from factor_analyzer.factor_analyzer import calculate_bartlett_sphericity, calculate_kmo

    X_fa = df[all_indicators].copy()
    chi_sq, p_value = calculate_bartlett_sphericity(X_fa)
    kmo_all, kmo_model = calculate_kmo(X_fa)

    n_factors = len(CONFIG['constructs'])
    fa = FactorAnalyzer(n_factors=n_factors, rotation='varimax', method='ml')
    fa.fit(X_fa)

    loadings = pd.DataFrame(fa.loadings_, index=all_indicators)
    print(f"    SUCCESS: Factor Analysis complete")
    print(f"    KMO: {kmo_model:.3f}, Bartlett p-value: {p_value:.4f}")
except Exception as e:
    print(f"    ERROR: {e}")
    traceback.print_exc()

# ============================================================================
# CELL 10: SEM
# ============================================================================
print("\n[10/16] Running SEM...")
sem_coefficients = {}
try:
    import semopy

    model_lines = []
    for construct_name, construct_config in CONFIG['constructs'].items():
        indicators = construct_config['indicators']
        valid_indicators = [ind for ind in indicators if ind in all_indicators]
        if valid_indicators:
            model_lines.append(f"{construct_name} =~ {' + '.join(valid_indicators)}")

    constructs_list = list(CONFIG['constructs'].keys())
    df['outcome_numeric'] = df[CONFIG['outcome_var']].astype(float)
    model_lines.append(f"outcome_numeric ~ {' + '.join(constructs_list)}")

    model_spec = "\n".join(model_lines)
    model = semopy.Model(model_spec)
    sem_data = df[all_indicators + ['outcome_numeric']].copy()

    result = model.fit(sem_data)
    stats_result = semopy.calc_stats(model)
    estimates = model.inspect()

    structural_paths = estimates[estimates['op'] == '~']
    structural_paths = structural_paths[structural_paths['lval'] == 'outcome_numeric']

    for _, row in structural_paths.iterrows():
        construct = row['rval']
        beta = row['Estimate']
        sem_coefficients[construct] = {'beta': beta}

    print(f"    SUCCESS: SEM complete")
    print(f"    Path coefficients: {len(sem_coefficients)}")
    SEM_SUCCESS = True
except Exception as e:
    print(f"    ERROR: {e}")
    SEM_SUCCESS = False
    traceback.print_exc()

# ============================================================================
# CELL 11: Key Driver Analysis
# ============================================================================
print("\n[11/16] Running Key Driver Analysis...")
try:
    if sem_coefficients:
        importance_data = {k: abs(v['beta']) for k, v in sem_coefficients.items()}
    else:
        importance_data = {}
        for construct_name, construct_config in CONFIG['constructs'].items():
            indicators = [ind for ind in construct_config['indicators'] if ind in df.columns]
            if indicators:
                construct_score = df[indicators].mean(axis=1)
                corr = abs(construct_score.corr(df[CONFIG['outcome_var']]))
                importance_data[construct_name] = corr

    performance_data = {}
    for construct_name, construct_config in CONFIG['constructs'].items():
        indicators = [ind for ind in construct_config['indicators'] if ind in df.columns]
        if indicators:
            performance_data[construct_name] = df[indicators].mean().mean()

    kda_df = pd.DataFrame({
        'Construct': list(importance_data.keys()),
        'Importance': [importance_data.get(c, 0) for c in importance_data.keys()],
        'Performance': [performance_data.get(c, 0) for c in importance_data.keys()]
    })

    kda_df['Importance_Norm'] = (kda_df['Importance'] - kda_df['Importance'].min()) / (kda_df['Importance'].max() - kda_df['Importance'].min() + 0.001)
    kda_df['Performance_Norm'] = (kda_df['Performance'] - 1) / 6

    def assign_quadrant(row):
        imp_median = kda_df['Importance_Norm'].median()
        perf_median = kda_df['Performance_Norm'].median()
        if row['Importance_Norm'] >= imp_median and row['Performance_Norm'] < perf_median:
            return 'INVEST HERE'
        elif row['Importance_Norm'] >= imp_median and row['Performance_Norm'] >= perf_median:
            return 'MAINTAIN'
        elif row['Importance_Norm'] < imp_median and row['Performance_Norm'] < perf_median:
            return 'LOW PRIORITY'
        else:
            return 'OVERKILL'

    kda_df['Quadrant'] = kda_df.apply(assign_quadrant, axis=1)
    kda_df = kda_df.sort_values('Importance', ascending=False)

    print(f"    SUCCESS: Key Driver Analysis complete")
    print(f"    #1 Driver: {kda_df.iloc[0]['Construct']} ({kda_df.iloc[0]['Quadrant']})")
except Exception as e:
    print(f"    ERROR: {e}")
    traceback.print_exc()

# ============================================================================
# CELL 12: Prediction + SHAP
# ============================================================================
print("\n[12/16] Training prediction model...")
try:
    import shap

    feature_cols = all_indicators.copy()
    for demo_name, demo_config in CONFIG['demographics'].items():
        if demo_config['type'] == 'continuous':
            feature_cols.append(demo_name)

    X = df[feature_cols].copy()
    y = df[CONFIG['outcome_var']]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    gb_model = GradientBoostingClassifier(n_estimators=100, max_depth=4, learning_rate=0.1, random_state=42)
    gb_model.fit(X_train_scaled, y_train)

    y_pred_proba = gb_model.predict_proba(X_test_scaled)[:, 1]
    auc_score = roc_auc_score(y_test, y_pred_proba)

    explainer = shap.TreeExplainer(gb_model)
    shap_values = explainer.shap_values(X_test_scaled[:100])  # Sample for speed

    if len(np.array(shap_values).shape) == 3:
        shap_values = shap_values[1]

    mean_shap = np.abs(shap_values).mean(axis=0)
    feature_importance = pd.DataFrame({
        'Feature': feature_cols,
        'SHAP_Importance': mean_shap
    }).sort_values('SHAP_Importance', ascending=False)

    print(f"    SUCCESS: Model trained. AUC = {auc_score:.3f}")
    print(f"    Top feature: {feature_importance.iloc[0]['Feature']}")
except Exception as e:
    print(f"    ERROR: {e}")
    traceback.print_exc()

# ============================================================================
# CELL 13: Uplift Modeling
# ============================================================================
print("\n[13/16] Running Uplift Modeling...")
try:
    treatment_var = CONFIG['treatment_var']
    outcome_var = CONFIG['outcome_var']
    is_negative_outcome = outcome_var in ['churned', 'membership_cancelled']

    X_uplift = df[feature_cols].copy()
    y_uplift = df[outcome_var]
    T_uplift = df[treatment_var]

    X_treated = X_uplift[T_uplift == 1]
    y_treated = y_uplift[T_uplift == 1]
    X_control = X_uplift[T_uplift == 0]
    y_control = y_uplift[T_uplift == 0]

    scaler_uplift = StandardScaler()
    X_treated_scaled = scaler_uplift.fit_transform(X_treated)
    X_control_scaled = scaler_uplift.transform(X_control)
    X_all_scaled = scaler_uplift.transform(X_uplift)

    model_treated = GradientBoostingClassifier(n_estimators=50, max_depth=3, random_state=42)
    model_control = GradientBoostingClassifier(n_estimators=50, max_depth=3, random_state=42)

    model_treated.fit(X_treated_scaled, y_treated)
    model_control.fit(X_control_scaled, y_control)

    p_treated = model_treated.predict_proba(X_all_scaled)[:, 1]
    p_control = model_control.predict_proba(X_all_scaled)[:, 1]

    if is_negative_outcome:
        uplift = p_control - p_treated
    else:
        uplift = p_treated - p_control

    df['uplift_score'] = uplift

    def assign_segment(row):
        if row['uplift_score'] > 0.02:
            return 'Persuadable'
        elif row['uplift_score'] < -0.02:
            return 'Sleeping Dog'
        elif row['p_control'] < 0.3:
            return 'Sure Thing'
        else:
            return 'Lost Cause'

    df['p_control'] = p_control
    df['uplift_segment'] = df.apply(assign_segment, axis=1)

    segment_counts = df['uplift_segment'].value_counts()
    n_persuadables = segment_counts.get('Persuadable', 0)

    avg_value = CONFIG['avg_customer_value']
    persuadables = df[df['uplift_segment'] == 'Persuadable']
    avg_uplift = persuadables['uplift_score'].mean() if len(persuadables) > 0 else 0
    annual_revenue_impact = n_persuadables * avg_uplift * avg_value * 12

    print(f"    SUCCESS: Uplift modeling complete")
    print(f"    Persuadables: {n_persuadables:,}")
    print(f"    Revenue impact: Rs.{annual_revenue_impact/100000:.1f} Lakhs/year")
except Exception as e:
    print(f"    ERROR: {e}")
    traceback.print_exc()

# ============================================================================
# CELL 14: Save results
# ============================================================================
print("\n[14/16] Saving results...")
try:
    import json
    import os

    os.makedirs('../data', exist_ok=True)

    results_export = {
        'vertical': ACTIVE_VERTICAL,
        'config': CONFIG['name'],
        'n_records': len(df),
        'outcome_rate': float(df[CONFIG['outcome_var']].mean()),
        'model_auc': float(auc_score),
        'key_drivers': kda_df[['Construct', 'Importance', 'Performance', 'Quadrant']].to_dict('records'),
        'revenue_projection': {
            'persuadable_count': int(n_persuadables),
            'average_uplift_pct': float(avg_uplift * 100),
            'customer_value_inr': int(avg_value),
            'annual_revenue_impact_inr': float(annual_revenue_impact),
            'annual_revenue_impact_lakhs': float(annual_revenue_impact / 100000)
        },
        'segment_counts': {k: int(v) for k, v in segment_counts.items()}
    }

    with open('../data/analysis_results.json', 'w') as f:
        json.dump(results_export, f, indent=2)

    print(f"    SUCCESS: Results saved to data/analysis_results.json")
except Exception as e:
    print(f"    ERROR: {e}")

# ============================================================================
# FINAL SUMMARY
# ============================================================================
print("\n" + "="*60)
print("EXECUTION COMPLETE")
print("="*60)
print(f"""
RESULTS SUMMARY:
  - Records: {len(df):,}
  - Churn Rate: {df[CONFIG['outcome_var']].mean()*100:.1f}%
  - Model AUC: {auc_score:.3f}
  - #1 Driver: {kda_df.iloc[0]['Construct']}
  - Persuadables: {n_persuadables:,}
  - Revenue Impact: Rs.{annual_revenue_impact/100000:.1f} Lakhs/year

All cells executed successfully!
""")
