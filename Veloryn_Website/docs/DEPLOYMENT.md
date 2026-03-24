# Deploying Veloryn Website to veloryn.dev (FREE)

This guide shows you how to deploy the Veloryn website for **FREE** using:
- **Vercel** (Frontend - Next.js) - FREE
- **Railway** or **Render** (Backend - Python FastAPI) - FREE tier available
- **Custom Domain** (veloryn.dev)

---

## Quick Start

```bash
# 1. Install frontend dependencies
cd Veloryn_Website/frontend
npm install

# 2. Run frontend locally
npm run dev
# Visit http://localhost:3000

# 3. Run backend locally (in another terminal)
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API at http://localhost:8000/api/docs
```

---

## Option 1: Vercel + Railway (RECOMMENDED - 100% FREE)

### Step 1: Deploy Frontend to Vercel (FREE)

1. **Create GitHub repo**
```bash
cd /Users/anto/Startups/Veloryn/Veloryn_Website
git init
git add .
git commit -m "Initial commit: Veloryn Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/veloryn-website.git
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up (FREE)
   - Click "Import Project"
   - Connect your GitHub repo
   - Select `frontend` as the root directory
   - Framework: Next.js (auto-detected)
   - Click "Deploy"

3. **Your site is now live at:** `https://veloryn-website.vercel.app`

### Step 2: Deploy Backend to Railway (FREE)

1. **Go to [railway.app](https://railway.app)** and sign up (FREE - $5/mo credit)

2. **New Project → Deploy from GitHub**
   - Select your repo
   - Set root directory to `backend`

3. **Add environment variables:**
   - `PORT`: 8000

4. **Create Dockerfile in backend folder** (already created below)

5. **Your API is now live at:** `https://veloryn-backend.up.railway.app`

### Step 3: Connect Frontend to Backend

Edit `frontend/next.config.js`:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://YOUR-RAILWAY-URL.up.railway.app/api/:path*',
    },
  ];
}
```

Redeploy on Vercel (automatic on git push).

### Step 4: Add Custom Domain (veloryn.dev)

**In Vercel:**
1. Go to your project → Settings → Domains
2. Add `veloryn.dev` and `www.veloryn.dev`
3. Vercel will show DNS records to add

**In your domain registrar (Namecheap, GoDaddy, etc.):**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Wait 5-10 minutes for DNS propagation.

**Your site is now live at https://veloryn.dev!**

---

## Option 2: Vercel Only (Frontend + API Routes)

If you want everything on Vercel, use Next.js API routes.

1. Create API routes in `frontend/app/api/`
2. These run as serverless functions
3. Limited to 10 second execution (Hobby plan)

---

## Option 3: Render (FREE Alternative to Railway)

### Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up (FREE)
2. New Web Service → Connect GitHub
3. Settings:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

FREE tier: 750 hours/month, spins down after 15 min inactivity

---

## Domain Configuration for veloryn.dev

### DNS Records (add to your registrar)

**For Vercel frontend:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**For Railway/Render backend (optional subdomain):**
```
Type: CNAME
Name: api
Value: YOUR-BACKEND-URL.up.railway.app
TTL: 3600
```

### SSL Certificate
- Vercel and Railway/Render provide FREE SSL certificates
- Your site will automatically use HTTPS

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.veloryn.dev
```

### Backend (.env)
```env
ENVIRONMENT=production
ALLOWED_ORIGINS=https://veloryn.dev,https://www.veloryn.dev
```

---

## Monitoring & Analytics (FREE)

1. **Vercel Analytics** - Built-in, free for Hobby plan
2. **Google Analytics** - Add to frontend
3. **Uptime monitoring** - [UptimeRobot](https://uptimerobot.com) (FREE)

---

## Costs Summary

| Service | Plan | Cost |
|---------|------|------|
| Vercel (Frontend) | Hobby | FREE |
| Railway (Backend) | Starter | FREE ($5 credit/mo) |
| Domain (veloryn.dev) | - | ~$10-15/year |
| SSL | Auto | FREE |
| **TOTAL** | | **~$10-15/year** |

---

## File Structure After Setup

```
Veloryn_Website/
├── frontend/              # Next.js (Deploy to Vercel)
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── next.config.js
├── backend/               # FastAPI (Deploy to Railway/Render)
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
└── docs/
    └── DEPLOYMENT.md      # This file
```

---

## Troubleshooting

### "API not reachable"
- Check CORS settings in backend
- Verify NEXT_PUBLIC_API_URL is correct
- Check Railway/Render logs

### "Domain not working"
- DNS propagation takes up to 48 hours (usually 5-10 min)
- Use [dnschecker.org](https://dnschecker.org) to verify

### "Builds failing"
- Check Node version in Vercel (use 18.x)
- Check Python version in Railway (use 3.11)

---

## Quick Commands

```bash
# Local development
cd frontend && npm run dev
cd backend && uvicorn main:app --reload

# Deploy to production
git add . && git commit -m "Update" && git push
# Vercel automatically redeploys on push
```

---

## Contact

Questions? Email: **ceo@veloryn.dev**

---

Built with Veloryn | veloryn.dev
