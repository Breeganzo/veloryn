
SMBs lose 20-30% revenue to lead leakage and churn.

I built something to fix that.

PipelinePilot AI is an analytics engine that answers 4 questions:

1. WHO will convert? (Prediction)
   - Our GBM model achieves 59% AUC

2. WHY do they convert? (Explanation)  
   - SHAP reveals top drivers: taste_rating, staff_friendliness, menu_variety

3. WHAT should you improve? (Prescription)
   - SEM found 5 causal drivers
   - #1 priority: FoodQuality

4. WHO should you target? (Segmentation)
   - Persuadables: 3,669 customers
   - Sleeping Dogs to avoid: 604

The revenue impact?

Rs.115 Lakhs/year from smarter targeting.

Tech stack:
- SEM (semopy) for causal inference
- GradientBoosting + SHAP for prediction
- T-Learner for uplift modeling
- LangGraph-ready agent tools

This powers the Score, Nurture, and Convert agents
in PipelinePilot AI.

Building this at Veloryn.

DM me if you want to see the full notebook.

#Startups #AI #Analytics #CausalInference #MachineLearning #SaaS

---
veloryn.dev
