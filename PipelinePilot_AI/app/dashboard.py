"""
PipelinePilot AI - Interactive Dashboard
Veloryn (veloryn.dev)

Run with: streamlit run dashboard.py
"""

import streamlit as st
import pandas as pd
import numpy as np
import json
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import os

# Page config
st.set_page_config(
    page_title="PipelinePilot AI | Veloryn",
    page_icon="rocket",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1a1a2e;
        margin-bottom: 0;
    }
    .sub-header {
        font-size: 1.1rem;
        color: #666;
        margin-top: 0;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem;
        border-radius: 10px;
        color: white;
    }
    .insight-box {
        background: #f8f9fa;
        padding: 1rem;
        border-left: 4px solid #667eea;
        margin: 1rem 0;
    }
    .stMetric {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
    }
</style>
""", unsafe_allow_html=True)

# Load results if available
@st.cache_data
def load_results():
    results_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'analysis_results.json')
    if os.path.exists(results_path):
        with open(results_path, 'r') as f:
            return json.load(f)
    return None

results = load_results()

# Sidebar
st.sidebar.image("https://via.placeholder.com/200x60?text=Veloryn", width=200)
st.sidebar.title("PipelinePilot AI")
st.sidebar.markdown("---")

# Vertical selector
verticals = ['cafe', 'salon', 'agency', 'fitness']
vertical_names = {
    'cafe': 'Cafe / Cloud Kitchen',
    'salon': 'High-End Salon / Spa',
    'agency': 'Digital Marketing Agency',
    'fitness': 'Fitness Studio / Gym'
}

selected_vertical = st.sidebar.selectbox(
    "Select Vertical",
    verticals,
    format_func=lambda x: vertical_names[x],
    index=0
)

st.sidebar.markdown("---")
st.sidebar.markdown("### Navigation")
page = st.sidebar.radio(
    "Go to",
    ["Overview", "Key Drivers", "Customer Segments", "Revenue Impact", "Q&A"]
)

st.sidebar.markdown("---")
st.sidebar.markdown("""
**Veloryn**
veloryn.dev

Building the future of SMB analytics.
""")

# Main content
st.markdown('<p class="main-header">PipelinePilot AI</p>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Analytics Intelligence Engine by Veloryn</p>', unsafe_allow_html=True)
st.markdown("---")

# Demo data (when results not available)
if results is None:
    results = {
        'vertical': 'cafe',
        'config': 'Cafe / Cloud Kitchen',
        'n_records': 5000,
        'outcome_rate': 0.22,
        'model_auc': 0.78,
        'key_drivers': [
            {'Construct': 'Value', 'Importance': 0.35, 'Performance': 3.45, 'Quadrant': 'INVEST HERE'},
            {'Construct': 'FoodQuality', 'Importance': 0.28, 'Performance': 5.10, 'Quadrant': 'MAINTAIN'},
            {'Construct': 'Service', 'Importance': 0.20, 'Performance': 4.45, 'Quadrant': 'MAINTAIN'},
            {'Construct': 'Digital', 'Importance': 0.10, 'Performance': 4.25, 'Quadrant': 'LOW PRIORITY'},
            {'Construct': 'Ambience', 'Importance': 0.07, 'Performance': 4.75, 'Quadrant': 'OVERKILL'}
        ],
        'revenue_projection': {
            'persuadable_count': 1250,
            'average_uplift_pct': 8.5,
            'customer_value_inr': 2500,
            'annual_revenue_impact_inr': 3187500,
            'annual_revenue_impact_lakhs': 31.88
        },
        'segment_counts': {
            'Persuadable': 1250,
            'Sure Thing': 1500,
            'Lost Cause': 1800,
            'Sleeping Dog': 450
        }
    }

# Page: Overview
if page == "Overview":
    st.header(f"Dashboard: {results['config']}")

    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Customers", f"{results['n_records']:,}")
    with col2:
        st.metric("Outcome Rate", f"{results['outcome_rate']*100:.1f}%")
    with col3:
        st.metric("Model AUC", f"{results['model_auc']:.3f}")
    with col4:
        st.metric("Revenue Impact", f"Rs.{results['revenue_projection']['annual_revenue_impact_lakhs']:.1f}L/yr")

    st.markdown("---")

    # Two column layout
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Key Drivers")
        kd_df = pd.DataFrame(results['key_drivers'])

        colors = {
            'INVEST HERE': '#CC3311',
            'MAINTAIN': '#009988',
            'LOW PRIORITY': '#BBBBBB',
            'OVERKILL': '#33BBEE'
        }

        fig = px.bar(
            kd_df.sort_values('Importance', ascending=True),
            x='Importance',
            y='Construct',
            orientation='h',
            color='Quadrant',
            color_discrete_map=colors,
            title='Drivers Ranked by Importance'
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.subheader("Customer Segments")
        seg_df = pd.DataFrame({
            'Segment': list(results['segment_counts'].keys()),
            'Count': list(results['segment_counts'].values())
        })

        colors_seg = ['#009988', '#0077BB', '#BBBBBB', '#CC3311']

        fig = px.pie(
            seg_df,
            values='Count',
            names='Segment',
            title='Uplift Segments',
            color_discrete_sequence=colors_seg
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

    # Insight box
    st.markdown("""
    <div class="insight-box">
    <h4>CEO Insight</h4>
    <p><strong>Priority Investment:</strong> Focus on improving <strong>Value</strong> perception -
    it has high impact but you're currently weak (3.45/7.0).</p>
    <p><strong>Target:</strong> 1,250 Persuadable customers for maximum ROI.</p>
    <p><strong>Avoid:</strong> 450 Sleeping Dogs - they respond negatively to campaigns!</p>
    </div>
    """, unsafe_allow_html=True)

# Page: Key Drivers
elif page == "Key Drivers":
    st.header("Key Driver Analysis")

    st.markdown("""
    The **Importance-Performance Matrix** shows where to invest your effort:
    - **INVEST HERE**: High impact, low performance (fix these!)
    - **MAINTAIN**: High impact, high performance (don't break what works)
    - **LOW PRIORITY**: Low impact, low performance
    - **OVERKILL**: Low impact, high performance (reduce investment)
    """)

    kd_df = pd.DataFrame(results['key_drivers'])

    # Scatter plot
    fig = px.scatter(
        kd_df,
        x='Performance',
        y='Importance',
        text='Construct',
        color='Quadrant',
        size=[100]*len(kd_df),
        color_discrete_map={
            'INVEST HERE': '#CC3311',
            'MAINTAIN': '#009988',
            'LOW PRIORITY': '#BBBBBB',
            'OVERKILL': '#33BBEE'
        },
        title='Importance vs Performance Matrix'
    )
    fig.update_traces(textposition='top center')
    fig.add_hline(y=kd_df['Importance'].median(), line_dash="dash", line_color="gray")
    fig.add_vline(x=kd_df['Performance'].median(), line_dash="dash", line_color="gray")
    fig.update_layout(height=500)
    st.plotly_chart(fig, use_container_width=True)

    # Table
    st.subheader("Driver Details")
    st.dataframe(kd_df, use_container_width=True)

# Page: Customer Segments
elif page == "Customer Segments":
    st.header("Customer Segmentation (Uplift Modeling)")

    st.markdown("""
    Uplift modeling identifies **4 customer segments** based on how they respond to treatment:
    """)

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("""
        **Persuadables** (Target these!)
        - Respond positively to campaigns
        - Highest ROI from targeting

        **Sure Things**
        - Will convert/stay anyway
        - Save your campaign budget
        """)

    with col2:
        st.markdown("""
        **Lost Causes**
        - Won't convert regardless
        - Don't waste resources

        **Sleeping Dogs** (Avoid!)
        - Respond NEGATIVELY to campaigns
        - Targeting them backfires
        """)

    # Segment metrics
    st.markdown("---")
    seg_data = results['segment_counts']

    cols = st.columns(4)
    for i, (seg, count) in enumerate(seg_data.items()):
        with cols[i]:
            st.metric(seg, f"{count:,}", f"{count/sum(seg_data.values())*100:.1f}%")

    # Pie chart
    fig = px.pie(
        values=list(seg_data.values()),
        names=list(seg_data.keys()),
        title='Segment Distribution',
        color_discrete_sequence=['#009988', '#0077BB', '#BBBBBB', '#CC3311']
    )
    st.plotly_chart(fig, use_container_width=True)

# Page: Revenue Impact
elif page == "Revenue Impact":
    st.header("Revenue Impact Analysis")

    rev = results['revenue_projection']

    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Persuadable Customers", f"{rev['persuadable_count']:,}")
    with col2:
        st.metric("Average Uplift", f"{rev['average_uplift_pct']:.1f}%")
    with col3:
        st.metric("Customer Value", f"Rs.{rev['customer_value_inr']:,}")

    st.markdown("---")

    # Big revenue number
    st.markdown(f"""
    <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; color: white;">
        <h2>Potential Annual Revenue Impact</h2>
        <h1 style="font-size: 4rem; margin: 0;">Rs.{rev['annual_revenue_impact_lakhs']:.1f} Lakhs</h1>
        <p>From targeting Persuadable customers</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("---")

    # Calculation breakdown
    st.subheader("How We Calculate This")
    st.markdown(f"""
    ```
    Persuadable Customers: {rev['persuadable_count']:,}
    x Average Uplift: {rev['average_uplift_pct']:.1f}%
    x Customer Value: Rs.{rev['customer_value_inr']:,}/month
    x 12 months
    = Rs.{rev['annual_revenue_impact_inr']:,.0f}/year
    ```

    This is money you're **leaving on the table** without smart targeting.
    """)

# Page: Q&A
elif page == "Q&A":
    st.header("Ask PipelinePilot AI")

    st.markdown("Ask questions about your business in plain English.")

    question = st.text_input("Your question:", placeholder="Why do customers churn?")

    if question:
        q = question.lower()

        # Simple pattern matching for demo
        if any(w in q for w in ['why', 'churn', 'leave']):
            st.markdown("""
            ### Why Customers Churn

            Based on our SEM causal analysis:

            1. **#1 CAUSAL DRIVER: Value**
               - Customers don't feel they're getting value for money
               - Current score: 3.45/7.0 (weakness)

            2. **Top Predictive Features:**
               - price_fairness
               - portion_size
               - promo_satisfaction

            **Recommendation:** Improve perceived value through better promotions,
            portion sizes, or loyalty programs.
            """)

        elif any(w in q for w in ['invest', 'improve', 'focus']):
            st.markdown("""
            ### Where to Invest

            **PRIORITY INVESTMENTS (High Impact, Low Performance):**
            - Value: Impact=0.35, Score=3.45

            **MAINTAIN (High Impact, High Performance):**
            - FoodQuality: Keep doing what you're doing!
            - Service: Working well

            **LOW PRIORITY:**
            - Digital, Ambience
            """)

        elif any(w in q for w in ['target', 'who', 'customer']):
            st.markdown(f"""
            ### Who to Target

            **TARGET (Persuadables):** {results['segment_counts'].get('Persuadable', 1250):,} customers
            - These respond positively to your campaigns
            - Expected uplift: 8.5%

            **AVOID (Sleeping Dogs):** {results['segment_counts'].get('Sleeping Dog', 450):,} customers
            - These respond NEGATIVELY to campaigns
            - Targeting them will backfire!

            **SAVE MONEY (Sure Things):** {results['segment_counts'].get('Sure Thing', 1500):,} customers
            - They'll stay anyway
            """)

        else:
            st.markdown("""
            ### PipelinePilot AI Summary

            Try asking:
            - "Why do customers churn?"
            - "Where should I invest?"
            - "Who should I target?"
            - "What's the revenue impact?"
            """)

    st.markdown("---")
    st.markdown("""
    **Powered by Veloryn PipelinePilot AI**

    veloryn.dev
    """)

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <p>Built with Veloryn PipelinePilot AI | veloryn.dev</p>
    <p>Agentic lead capture, scoring, conversion for SMBs</p>
</div>
""", unsafe_allow_html=True)
