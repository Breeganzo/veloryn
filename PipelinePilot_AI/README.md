# PipelinePilot AI - Analytics Intelligence Engine

**Company:** Veloryn (veloryn.dev)
**Product:** PipelinePilot AI - Agentic lead capture, scoring, conversion

---

## What is PipelinePilot AI?

An agentic AI platform for SMB service businesses that:
- **Captures** leads automatically
- **Scores** them using causal models (not just correlations!)
- **Nurtures** with personalized sequences
- **Converts** with smart targeting
- **Learns** from outcomes

## What This Notebook Does

Powers the Score, Nurture, and Convert agents with:

| Method | Question Answered |
|--------|-------------------|
| **SEM (Structural Equation Modeling)** | What CAUSES conversions? |
| **Key Driver Analysis** | WHERE should I invest effort? |
| **Uplift Modeling** | WHO should I target? |
| **SHAP** | WHY did this customer score this way? |

## Quick Start

### 1. Install Dependencies

```bash
cd Veloryn/PipelinePilot_AI
pip install -r requirements.txt
```

### 2. Run the Jupyter Notebook

```bash
jupyter notebook notebooks/PipelinePilot_Analytics_Engine.ipynb
```

### 3. Run the Dashboard

```bash
streamlit run app/dashboard.py
```

Access at: http://localhost:8501

## Supported Verticals

1. **Cafe / Cloud Kitchen** - Third Wave Coffee, specialty cafes
2. **High-End Salon / Spa** - Bodycraft, Toni&Guy
3. **Digital Marketing Agency** - B2B lead conversion
4. **Fitness Studio / Gym** - Cult.fit, CrossFit

Change vertical by editing `ACTIVE_VERTICAL` in the notebook.

## Project Structure

```
Veloryn/PipelinePilot_AI/
├── notebooks/
│   └── PipelinePilot_Analytics_Engine.ipynb
├── app/
│   └── dashboard.py
├── data/
│   └── analysis_results.json (generated)
├── assets/
│   └── *.png (generated visualizations)
├── requirements.txt
├── README.md
├── DEPLOYMENT.md
└── LinkedIn_Post.md
```

## Key Features

### SEM Readiness Gate
Automatically checks if your data supports full SEM analysis:
- 200+ records? If not → LLM scoring
- 3+ indicators per construct? If not → GBM + SHAP
- Continuous/Likert data? If not → Chi-square + Trees
- Outcome variable exists? If not → LLM intent scoring

### Uplift Modeling - 4 Segments
- **Persuadables**: Target these - they respond to campaigns
- **Sure Things**: Save money - they convert anyway
- **Lost Causes**: Don't waste resources
- **Sleeping Dogs**: Avoid! - campaigns hurt them

### LangGraph-Ready Agent Tools
- `score_lead(lead_data)` - Score any lead
- `get_segment(customer_id)` - Get uplift segment
- `get_key_drivers()` - Ranked causal drivers
- `get_revenue_projection()` - Revenue impact

## Tech Stack

- **SEM**: semopy
- **Factor Analysis**: factor_analyzer
- **ML**: scikit-learn, GradientBoosting
- **Explainability**: SHAP
- **Visualization**: matplotlib, seaborn, plotly
- **Dashboard**: Streamlit

## Contact

Building this at **Veloryn**.

- Website: veloryn.dev
- DM for the full notebook

---

*This is the engine inside PipelinePilot AI.*
