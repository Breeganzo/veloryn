# Deploying PipelinePilot AI to veloryn.dev

This guide covers multiple deployment options for your analytics dashboard.

---

## Option 1: Streamlit Cloud (Recommended - Free & Easy)

### Step 1: Push to GitHub

```bash
cd /Users/anto/Startups/Veloryn/PipelinePilot_AI
git init
git add .
git commit -m "Initial commit: PipelinePilot AI Analytics Engine"
git branch -M main
git remote add origin https://github.com/yourusername/pipelinepilot-ai.git
git push -u origin main
```

### Step 2: Deploy on Streamlit Cloud

1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Main file path: `app/dashboard.py`
6. Click "Deploy"

Your app will be live at: `https://yourapp.streamlit.app`

### Step 3: Custom Domain (veloryn.dev)

1. In Streamlit Cloud settings, go to "Custom domain"
2. Add `dashboard.veloryn.dev` or `app.veloryn.dev`
3. Add these DNS records to your domain registrar:

```
Type: CNAME
Name: dashboard (or app)
Value: [your-streamlit-app].streamlit.app
TTL: 3600
```

---

## Option 2: Vercel (For Next.js or API)

### Step 1: Create a FastAPI Backend

Create `app/api.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="PipelinePilot AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "PipelinePilot AI API", "docs": "/docs"}

@app.get("/api/results")
def get_results():
    with open("data/analysis_results.json", "r") as f:
        return json.load(f)

@app.get("/api/score/{customer_id}")
def score_customer(customer_id: int):
    # Implement scoring logic
    return {"customer_id": customer_id, "score": 0.75}
```

### Step 2: Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 3: Configure Custom Domain

1. Go to Vercel project settings
2. Add domain: `api.veloryn.dev`
3. Add DNS records as shown in Vercel

---

## Option 3: Railway / Render (Full Stack)

### Step 1: Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501
CMD ["streamlit", "run", "app/dashboard.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Railway auto-detects Dockerfile
5. Add custom domain in settings

### Step 3: Deploy to Render

1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub repo
4. Build command: `pip install -r requirements.txt`
5. Start command: `streamlit run app/dashboard.py --server.port=$PORT`
6. Add custom domain

---

## Option 4: AWS / GCP / Azure (Enterprise)

### AWS (EC2 + Route53)

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install dependencies
sudo apt update && sudo apt install python3-pip
pip3 install -r requirements.txt

# Run with systemd
sudo nano /etc/systemd/system/pipelinepilot.service
```

```ini
[Unit]
Description=PipelinePilot AI Dashboard
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/PipelinePilot_AI
ExecStart=/usr/bin/streamlit run app/dashboard.py --server.port=80 --server.address=0.0.0.0
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable pipelinepilot
sudo systemctl start pipelinepilot
```

Configure Route53 with A record pointing to EC2 IP.

---

## DNS Configuration for veloryn.dev

Add these records to your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.):

### For Streamlit Cloud:
```
Type: CNAME
Name: app (or dashboard)
Value: yourapp.streamlit.app
TTL: 3600
```

### For Vercel:
```
Type: CNAME
Name: @ (or www)
Value: cname.vercel-dns.com
TTL: 3600
```

### For Your Own Server:
```
Type: A
Name: @
Value: YOUR_SERVER_IP
TTL: 3600
```

---

## SSL Certificate

All platforms above provide free SSL certificates automatically.

For self-hosted:
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d veloryn.dev -d www.veloryn.dev
```

---

## Environment Variables

For production, set these environment variables:

```bash
# Streamlit secrets (create .streamlit/secrets.toml)
[database]
host = "your-db-host"
user = "your-user"
password = "your-password"

[api]
key = "your-api-key"
```

Or use platform-specific environment variable settings.

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] requirements.txt up to date
- [ ] .gitignore includes secrets
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Dashboard accessible at veloryn.dev

---

## Support

Questions? DM me on LinkedIn or open an issue on GitHub.

**Building this at Veloryn. veloryn.dev**
