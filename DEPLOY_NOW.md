# EXACT STEPS TO PUBLISH veloryn.dev (FREE)

## COST: ~$12/year (domain only) - Everything else is FREE!

---

## STEP 1: Create GitHub Repository

```bash
# Go to your project folder
cd /Users/anto/Startups/Veloryn

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Python
venv/
__pycache__/
*.pyc
.env

# Node
node_modules/
.next/

# IDE
.vscode/
.idea/

# OS
.DS_Store
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit: Veloryn website and PipelinePilot AI"

# Create repo on GitHub (go to github.com and create "veloryn")
# Then connect:
git remote add origin https://github.com/YOUR_USERNAME/veloryn.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy Frontend to Vercel (FREE)

1. **Go to https://vercel.com** and sign up with GitHub (FREE)

2. **Click "Add New..." → "Project"**

3. **Import your `veloryn` repository**

4. **Configure the project:**
   - Root Directory: `Veloryn_Website/frontend`
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Click "Deploy"**

6. **Your site is now live at:** `https://veloryn-xxx.vercel.app`

---

## STEP 3: Add Custom Domain (veloryn.dev)

### In Vercel:
1. Go to your project → **Settings** → **Domains**
2. Add `veloryn.dev`
3. Add `www.veloryn.dev`
4. Vercel will show you the DNS records to add

### In Your Domain Registrar (Namecheap, GoDaddy, etc.):

Add these DNS records:

```
TYPE     NAME    VALUE                    TTL
A        @       76.76.21.21              3600
CNAME    www     cname.vercel-dns.com     3600
```

**Wait 5-10 minutes for DNS to propagate.**

---

## STEP 4: Deploy Backend to Railway (FREE)

1. **Go to https://railway.app** and sign up with GitHub (FREE - $5 credit/month)

2. **New Project → Deploy from GitHub repo**

3. **Configure:**
   - Root Directory: `Veloryn_Website/backend`
   - Add variable: `PORT=8000`

4. **Railway auto-detects the Dockerfile and deploys**

5. **Your API is live at:** `https://veloryn-backend.up.railway.app`

---

## STEP 5: Connect Frontend to Backend

Edit `Veloryn_Website/frontend/next.config.js`:

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

Push to GitHub - Vercel will auto-redeploy.

---

## STEP 6: Set Up Email (ceo@veloryn.dev)

### Option A: Zoho Mail (FREE)
1. Go to https://www.zoho.com/mail/zohomail-pricing.html
2. Sign up for FREE plan
3. Verify domain ownership
4. Add MX records to your DNS
5. Create ceo@veloryn.dev mailbox

### Option B: Google Workspace ($6/month)
1. Go to https://workspace.google.com
2. Set up with veloryn.dev
3. Add MX records

---

## QUICK COMMANDS SUMMARY

```bash
# 1. Push to GitHub (triggers auto-deploy)
cd /Users/anto/Startups/Veloryn
git add .
git commit -m "Update"
git push

# 2. Run locally
# Frontend:
cd Veloryn_Website/frontend && npm run dev
# Visit http://localhost:3000

# Backend:
cd Veloryn_Website/backend
source ../../PipelinePilot_AI/venv/bin/activate
uvicorn main:app --reload --port 8000
# API at http://localhost:8000/api/docs

# 3. Run Jupyter notebook
cd PipelinePilot_AI
source venv/bin/activate
jupyter notebook notebooks/PipelinePilot_Analytics_Engine.ipynb
```

---

## COST BREAKDOWN

| Service | Cost |
|---------|------|
| Vercel (hosting) | FREE |
| Railway (backend) | FREE ($5 credit/mo) |
| GitHub | FREE |
| SSL certificate | FREE (auto) |
| Domain (veloryn.dev) | ~$12/year |
| Zoho Mail | FREE |
| **TOTAL** | **~$12/year** |

---

## YOUR FINAL URLs

- **Website:** https://veloryn.dev
- **API Docs:** https://api.veloryn.dev/docs (or Railway URL)
- **Email:** ceo@veloryn.dev

---

## NEXT STEPS AFTER DEPLOYMENT

1. Test contact form sends to ceo@veloryn.dev
2. Add Google Analytics (free)
3. Submit to Google Search Console
4. Share on LinkedIn!

---

**Questions? Email ceo@veloryn.dev**
