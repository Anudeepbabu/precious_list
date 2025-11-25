# 🚀 Quick Deploy Guide - Precious List on Railway

## 30-Minute Deployment Walkthrough

### Prerequisites (5 minutes)
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Verify Node/npm versions
node --version  # Should be 18+
npm --version   # Should be 9+

# 3. Have your Google Service Account JSON ready
# And your Google Spreadsheet ID
```

### Configure Google Service Account (10 minutes)

1. **Get Service Account Key:**
   - Go to: https://console.cloud.google.com/
   - Create/select project
   - APIs & Services → Service Accounts
   - Click service account email
   - Keys tab → Add Key → JSON
   - Copy the entire JSON file contents

2. **Share Google Sheet:**
   - Go to your Google Sheets document
   - Click Share
   - Add service account email (from JSON key)
   - Give Editor access
   - Note your Spreadsheet ID (in URL)

### Deploy to Railway (15 minutes)

#### Option A: Railway CLI (Manual Deploy)

```bash
# 1. Login to Railway
railway login

# 2. Link project (if not already linked)
railway link

# 3. Add environment variables
railway variables set NODE_ENV=production
railway variables set SPREADSHEET_ID=your_spreadsheet_id
railway variables set SERVICE_ACCOUNT_KEY='paste_entire_json_here'
railway variables set CORS_ORIGIN=https://your-app.up.railway.app

# 4. Deploy
railway up

# 5. View deployment
railway status
```

#### Option B: GitHub Auto-Deploy (Recommended)

```bash
# 1. Push code to GitHub main branch
git push origin main

# 2. In Railway Dashboard:
#    - Click "New Project"
#    - Connect GitHub
#    - Select repository
#    - Add environment variables

# 3. Railway auto-deploys on every push
```

### Verify Deployment (5 minutes)

```bash
# Get your app URL from Railway dashboard
# Or from CLI:
railway open

# Test health endpoint
curl https://your-app.up.railway.app/api/v1/health

# Expected response:
# {"success":true,"status":"Server is running",...}

# Test data endpoint
curl https://your-app.up.railway.app/api/v1/data
```

---

## Troubleshooting Quick Fixes

### App Won't Start
```bash
# Check logs
railway logs -f

# Check Node version
node --version  # Must be 18+

# Verify environment variables
railway variables list
```

### No Data Loading
```bash
# Check SPREADSHEET_ID
echo $SPREADSHEET_ID

# Verify Google Sheet is shared with service account
# Check SERVICE_ACCOUNT_KEY is complete JSON

# Test API directly
curl https://your-app.up.railway.app/api/v1/data
```

### HTTPS Issues
```bash
# Railway handles HTTPS automatically
# Don't set SSL_CERT_PATH or SSL_KEY_PATH
# Just make sure NODE_ENV=production
```

---

## Environment Variables Summary

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | production | production |
| `SPREADSHEET_ID` | Your sheet ID | 1BxiMVs... |
| `SERVICE_ACCOUNT_KEY` | Full JSON key | {"type":"service... |
| `CORS_ORIGIN` | Your Railway URL | https://app.up.railway.app |

**Get your Railway URL from:** Railway Dashboard → Deploy → Domain

---

## Testing Checklist

```bash
# ✓ Health check
curl https://your-app.up.railway.app/api/v1/health

# ✓ Data loading
curl https://your-app.up.railway.app/api/v1/data

# ✓ Visit in browser
https://your-app.up.railway.app

# ✓ Check assets load
https://your-app.up.railway.app/dashboard.html

# ✓ Check HTTPS works
# (URL bar should show lock icon)
```

---

## File Reference

| File | Purpose |
|------|---------|
| `railway.json` | Railway deployment config |
| `Procfile` | Process startup command |
| `README.md` | Full documentation |
| `.env.example` | Environment template |
| `server.js` | Express app with security |
| `src/client/` | Frontend (HTML/CSS/JS) |

---

## Common Commands

```bash
# View logs in real-time
railway logs -f

# List all deployments
railway deployments

# Rollback to previous deployment
railway rollback

# View environment variables
railway variables list

# Open app in browser
railway open

# Get app URL
railway domains
```

---

## Support

**Something not working?**

1. Check logs: `railway logs -f`
2. Verify environment variables: `railway variables list`
3. Check Google Sheet is shared
4. Verify SPREADSHEET_ID is correct
5. Look at browser console for errors

**Still stuck?**
- Railway Docs: https://docs.railway.app
- Email support through Railway dashboard

---

**Estimated Total Time: 30 minutes ⏱️**

Ready? Let's deploy! 🚀
