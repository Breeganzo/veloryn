# Veloryn Website

The official website for Veloryn - Intelligence for SMBs.

**Live at:** https://veloryn.dev

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, TypeScript
- **Backend:** FastAPI (Python)
- **Hosting:** Vercel (frontend) + Railway (backend)

---

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- npm or yarn

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs at http://localhost:8000/api/docs

---

## Project Structure

```
Veloryn_Website/
├── frontend/              # Next.js application
│   ├── app/               # App Router pages
│   │   ├── page.tsx       # Home page
│   │   ├── demo/          # Demo request page
│   │   └── contact/       # Contact page
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── public/            # Static assets
├── backend/               # FastAPI application
│   ├── main.py            # API endpoints
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Container config
└── docs/
    └── DEPLOYMENT.md      # Deployment guide
```

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with product info |
| Demo | `/demo` | Demo request form |
| Contact | `/contact` | Contact form |
| Solutions | `/#solutions` | Product solutions |
| Pricing | `/#pricing` | Pricing plans |

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/company` | GET | Company info |
| `/api/solutions` | GET | Product solutions |
| `/api/contact` | POST | Submit contact form |
| `/api/demo` | POST | Request demo |
| `/api/newsletter` | POST | Newsletter signup |

---

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

**Quick deploy:**
1. Push to GitHub
2. Connect to Vercel (frontend) and Railway (backend)
3. Add custom domain veloryn.dev
4. Done!

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
ENVIRONMENT=development
```

---

## Contact

**Email:** ceo@veloryn.dev

---

Built with Veloryn PipelinePilot AI
