# Veloryn Website

Marketing site and lead capture app for Veloryn, deployed as a Next.js frontend on Vercel with a FastAPI backend on Railway.

Live site: `https://veloryn.dev`

## Stack

- Frontend: Next.js 16 App Router, React 18, TypeScript, Tailwind CSS
- Backend: FastAPI, Pydantic, Uvicorn
- Hosting: Vercel for the frontend, Railway for the backend

## Repository Layout

```text
Veloryn_Website/
├── frontend/              # Next.js app
│   ├── app/               # Routes, metadata, and UI
│   ├── package.json
│   └── next.config.js
├── backend/               # FastAPI service
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
└── docs/
    └── DEPLOYMENT.md
```

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs on `http://127.0.0.1:8000`, with docs at `http://127.0.0.1:8000/api/docs`.

### Useful Checks

```bash
cd frontend
npm run typecheck
npm run build

cd ../backend
python3 -m compileall .
```

## Environment Variables

### Frontend

Set these in Vercel or a local `.env.local` file when needed:

```env
BACKEND_URL=https://your-railway-service.up.railway.app
NEXT_PUBLIC_API_ORIGIN=https://your-railway-service.up.railway.app
```

`BACKEND_URL` is used by the Next.js rewrite layer in production. `NEXT_PUBLIC_API_ORIGIN` is only a fallback if `BACKEND_URL` is not set.

### Backend

Set these in Railway or a local `.env` file:

```env
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,https://veloryn.dev,https://www.veloryn.dev
```

## Public Routes

- `/`
- `/about`
- `/careers`
- `/contact`
- `/demo`
- `/privacy`
- `/terms`

## API Routes

- `GET /api/health`
- `GET /api/company`
- `GET /api/solutions`
- `GET /api/solutions/{solution_id}`
- `GET /api/testimonials`
- `GET /api/stats`
- `POST /api/contact`
- `POST /api/demo`
- `POST /api/newsletter`
- `GET /api/analytics/verticals`
- `POST /api/analytics/score`

## Deployment Notes

- Vercel project root: `frontend`
- Railway service root: `backend`
- Vercel should have `BACKEND_URL` pointing at the Railway public URL
- Railway should have `ALLOWED_ORIGINS` including:
  - `https://veloryn.dev`
  - `https://www.veloryn.dev`
  - Vercel preview domains if previews need API access

Detailed deployment steps are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Production Notes

The site is deployable and publicly working, but there is still one architectural limitation worth knowing:

- Form submissions are currently stored in memory inside the FastAPI process. That is acceptable for a marketing-site demo, but not durable storage. A production-grade upgrade would move contact/demo submissions to a real database or CRM and send notifications from a durable job or email provider.

## Contact

- Email: `ceo@veloryn.dev`
