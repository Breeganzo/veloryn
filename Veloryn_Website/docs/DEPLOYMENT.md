# Veloryn Deployment Guide

This repository is deployed as:

- Frontend: Vercel
- Backend: Railway
- Domain: `veloryn.dev`

## Deploy Architecture

```text
Browser
  -> Vercel (Next.js frontend)
  -> /api/* rewrite
  -> Railway (FastAPI backend)
```

The frontend does not call Railway directly from the browser for the main form flows. Vercel rewrites `/api/*` requests to the backend origin configured in `BACKEND_URL`.

## Vercel Setup

1. Import the GitHub repository into Vercel.
2. Set the project root directory to `frontend`.
3. Add the production environment variable:

```env
BACKEND_URL=https://YOUR-RAILWAY-PUBLIC-URL.up.railway.app
```

4. Trigger a production deploy.

## Railway Setup

1. Create a Railway service from the `backend` directory.
2. Railway can run the included `Dockerfile` directly.
3. Set these variables:

```env
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,https://veloryn.dev,https://www.veloryn.dev
```

4. If Vercel preview deployments should reach the backend, include the preview domains in `ALLOWED_ORIGINS` too.

## Domain Setup

1. Add `veloryn.dev` and `www.veloryn.dev` in the Vercel project domain settings.
2. In the DNS zone at the registrar, add the records Vercel expects.
3. For the current production setup, both apex and `www` resolve to `76.76.21.21`.

Important:

- In Name.com or similar registrars, do not enter the full domain in the host field.
- Use `@` or blank for the root record.
- Use `www` for the `www` record.

## Local Runbook

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Smoke Checks

After every deploy, verify:

```bash
curl -I https://veloryn.dev
curl -I https://veloryn.dev/contact
curl -I https://veloryn.dev/demo
curl https://veloryn.dev/api/health
```

Form checks:

```bash
curl -X POST https://veloryn.dev/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","company":"Veloryn","message":"Contact verification"}'

curl -X POST https://veloryn.dev/api/demo \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","company":"Veloryn","industry":"agency","monthly_customers":100,"current_challenges":"Verification"}'
```

## Current Non-Code Gap

The website is publicly working, but contact and demo submissions are still stored in memory in the API process. For durable production handling, add a database or external CRM/email workflow.
