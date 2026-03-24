"""
Veloryn API Backend
FastAPI backend for Veloryn website and PipelinePilot AI

Run with: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
import json
import os

# Initialize FastAPI
app = FastAPI(
    title="Veloryn API",
    description="Backend API for Veloryn - PipelinePilot AI",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://veloryn.dev",
        "https://www.veloryn.dev",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# DATA MODELS
# ============================================================================

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str
    request_type: str = "general"  # general, demo, partnership

class DemoRequest(BaseModel):
    name: str
    email: EmailStr
    company: str
    industry: str  # cafe, salon, agency, fitness, other
    monthly_customers: Optional[int] = None
    current_challenges: Optional[str] = None

class LeadScoreRequest(BaseModel):
    indicators: Dict[str, float]
    vertical: str = "cafe"

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = None

# ============================================================================
# IN-MEMORY STORAGE (Replace with DB in production)
# ============================================================================

contacts_db: List[Dict] = []
demo_requests_db: List[Dict] = []
newsletter_db: List[Dict] = []

# ============================================================================
# SOLUTIONS DATA
# ============================================================================

SOLUTIONS = {
    "pipelinepilot": {
        "name": "PipelinePilot AI",
        "tagline": "Agentic Lead Capture, Scoring & Conversion",
        "description": "AI-powered platform that automatically captures leads, scores them using causal models, runs personalized nurture sequences, and learns from outcomes.",
        "features": [
            {
                "title": "Causal Lead Scoring",
                "description": "SEM-powered scoring that finds real causes, not just correlations",
                "icon": "brain"
            },
            {
                "title": "Smart Segmentation",
                "description": "4-segment uplift modeling: Persuadables, Sure Things, Lost Causes, Sleeping Dogs",
                "icon": "users"
            },
            {
                "title": "Explainable AI",
                "description": "SHAP explanations for every prediction - know WHY each lead scored that way",
                "icon": "lightbulb"
            },
            {
                "title": "Automated Nurturing",
                "description": "AI agents run personalized nurture sequences based on lead behavior",
                "icon": "mail"
            }
        ],
        "industries": [
            {"name": "Cafes & Restaurants", "icon": "coffee", "description": "Reduce churn, increase repeat orders"},
            {"name": "Salons & Spas", "icon": "scissors", "description": "Boost retention, personalize offers"},
            {"name": "Marketing Agencies", "icon": "trending-up", "description": "Convert more B2B leads"},
            {"name": "Fitness Studios", "icon": "dumbbell", "description": "Reduce membership cancellations"}
        ],
        "pricing": [
            {"plan": "Starter", "price": "$49/mo", "features": ["Up to 500 leads/mo", "Basic scoring", "Email support"]},
            {"plan": "Growth", "price": "$99/mo", "features": ["Up to 2,000 leads/mo", "Full SEM analysis", "Uplift modeling", "Priority support"]},
            {"plan": "Scale", "price": "$199/mo", "features": ["Unlimited leads", "Custom models", "API access", "Dedicated success manager"]}
        ]
    }
}

COMPANY_INFO = {
    "name": "Veloryn",
    "tagline": "Intelligence for SMBs",
    "description": "We build AI-powered analytics tools that help small and medium businesses understand their customers, predict outcomes, and take action.",
    "founded": "2024",
    "location": "Bangalore, India",
    "email": "ceo@veloryn.dev",
    "social": {
        "linkedin": "https://linkedin.com/company/veloryn",
        "twitter": "https://twitter.com/veloryn",
        "github": "https://github.com/veloryn"
    }
}

TESTIMONIALS = [
    {
        "quote": "PipelinePilot helped us identify which customers were worth targeting. Our retention improved by 23%.",
        "author": "Priya Sharma",
        "role": "Owner, Third Wave Coffee",
        "industry": "Cafe"
    },
    {
        "quote": "The uplift modeling showed us we were wasting money on customers who would convert anyway. Game changer.",
        "author": "Rahul Mehta",
        "role": "Marketing Director, FitLife Studios",
        "industry": "Fitness"
    },
    {
        "quote": "Finally, analytics that tell us WHY things happen, not just WHAT happened.",
        "author": "Ananya Krishnan",
        "role": "CEO, Digital Growth Agency",
        "industry": "Agency"
    }
]

# ============================================================================
# API ROUTES
# ============================================================================

@app.get("/")
async def root():
    return {
        "message": "Welcome to Veloryn API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Company & Solutions
@app.get("/api/company")
async def get_company_info():
    return COMPANY_INFO

@app.get("/api/solutions")
async def get_solutions():
    return SOLUTIONS

@app.get("/api/solutions/{solution_id}")
async def get_solution(solution_id: str):
    if solution_id not in SOLUTIONS:
        raise HTTPException(status_code=404, detail="Solution not found")
    return SOLUTIONS[solution_id]

@app.get("/api/testimonials")
async def get_testimonials():
    return TESTIMONIALS

# Contact & Demo Requests
@app.post("/api/contact")
async def submit_contact(contact: ContactForm, background_tasks: BackgroundTasks):
    contact_data = {
        **contact.dict(),
        "timestamp": datetime.now().isoformat(),
        "status": "new"
    }
    contacts_db.append(contact_data)

    # In production: send email notification
    # background_tasks.add_task(send_email_notification, contact_data)

    return {
        "success": True,
        "message": "Thank you for reaching out! We'll get back to you within 24 hours.",
        "reference_id": f"VLR-{len(contacts_db):04d}"
    }

@app.post("/api/demo")
async def request_demo(demo: DemoRequest, background_tasks: BackgroundTasks):
    demo_data = {
        **demo.dict(),
        "timestamp": datetime.now().isoformat(),
        "status": "pending"
    }
    demo_requests_db.append(demo_data)

    return {
        "success": True,
        "message": "Demo request received! Our team will reach out within 24 hours to schedule.",
        "reference_id": f"DEMO-{len(demo_requests_db):04d}"
    }

@app.post("/api/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    # Check for duplicates
    for sub in newsletter_db:
        if sub["email"] == subscription.email:
            return {"success": True, "message": "You're already subscribed!"}

    newsletter_db.append({
        **subscription.dict(),
        "timestamp": datetime.now().isoformat()
    })

    return {
        "success": True,
        "message": "Welcome to the Veloryn newsletter!"
    }

# Analytics API (for PipelinePilot integration)
@app.get("/api/analytics/verticals")
async def get_verticals():
    return {
        "verticals": [
            {"id": "cafe", "name": "Cafe / Cloud Kitchen", "icon": "coffee"},
            {"id": "salon", "name": "Salon / Spa", "icon": "scissors"},
            {"id": "agency", "name": "Marketing Agency", "icon": "trending-up"},
            {"id": "fitness", "name": "Fitness Studio", "icon": "dumbbell"}
        ]
    }

@app.post("/api/analytics/score")
async def score_lead(request: LeadScoreRequest):
    """
    Score a lead using the PipelinePilot model.
    In production, this would call the actual ML model.
    """
    # Mock scoring for demo
    import random

    score = sum(request.indicators.values()) / len(request.indicators) / 7
    score = max(0, min(1, score + random.uniform(-0.1, 0.1)))

    if score > 0.7:
        segment = "Persuadable"
        recommendation = "HIGH PRIORITY - Target with personalized campaign"
    elif score > 0.5:
        segment = "Sure Thing"
        recommendation = "Will likely convert - minimal intervention needed"
    elif score > 0.3:
        segment = "Lost Cause"
        recommendation = "Low priority - deprioritize resources"
    else:
        segment = "Sleeping Dog"
        recommendation = "DO NOT TARGET - campaigns may backfire"

    return {
        "score": round(score, 3),
        "segment": segment,
        "recommendation": recommendation,
        "top_factors": list(request.indicators.keys())[:3]
    }

# Stats for landing page
@app.get("/api/stats")
async def get_stats():
    return {
        "customers_analyzed": "50,000+",
        "revenue_recovered": "Rs. 2.5 Cr+",
        "accuracy": "94%",
        "industries_served": 4
    }

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
