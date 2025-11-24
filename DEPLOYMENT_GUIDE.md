# Deployment Guide: GitHub → Cloudflare

## Phase 1: Prepare Your Project for GitHub

### Step 1: Initialize Git Repository (if not already done)
```bash
cd "/Users/likhithapriyagutti/Downloads/Precious List"
git init
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

### Step 2: Create .gitignore
Create a `.gitignore` file to exclude sensitive files:
```
node_modules/
.env
.env.local
.env.*.local
*.log
logs/
dist/
build/
.DS_Store
precious-list-479016-66451761f825.json
```

### Step 3: Verify Your .env File
⚠️ **IMPORTANT**: Your `.env` file contains:
- `SPREADSHEET_ID` (can be public)
- `BETA_SIGNUP_SPREADSHEET_ID` (can be public)
- `SERVICE_ACCOUNT_KEY` path (sensitive - refers to JSON file)
- `PORT` and `NODE_ENV`

**For Cloudflare deployment**, you'll need to:
1. Keep sensitive files in `.gitignore`
2. Add environment variables in Cloudflare dashboard instead

### Step 4: Stage and Commit Initial Code
```bash
git add .
git commit -m "Initial commit: Precious List backend with Google Sheets integration"
```

---

## Phase 2: Push to GitHub

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com)
2. Click **New** button (top left)
3. Repository name: `precious-list` (or your preferred name)
4. Description: `Precious List backend with Google Sheets integration`
5. Choose **Private** (recommended for projects with credentials)
6. Click **Create repository**

### Step 2: Connect Local Repository to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/precious-list.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Generate GitHub Personal Access Token (for HTTPS)
If prompted for authentication:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click **Generate new token (classic)**
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token and use it as your password when pushing

---

## Phase 3: Prepare for Cloudflare Deployment

### Step 1: Update package.json for Cloudflare
Cloudflare Workers/Pages has specific requirements. Modify your `package.json`:

```json
{
  "name": "precious-list-backend",
  "version": "1.0.0",
  "description": "Precious List backend with Google Sheets integration",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "NODE_ENV=production node server.js",
    "dev": "NODE_ENV=development node --watch server.js",
    "build": "echo 'No build required'",
    "test": "node google-sheets-test.js",
    "clear-data": "node clear-sheet.js",
    "add-sample-data": "node add-sample-data.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1",
    "google-auth-library": "^9.0.0",
    "googleapis": "^118.0.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### Step 2: Create wrangler.toml for Cloudflare Workers
Create a file named `wrangler.toml` in your project root:

```toml
name = "precious-list"
type = "javascript"
account_id = "YOUR_CLOUDFLARE_ACCOUNT_ID"
workers_dev = true
routes = [
  { pattern = "example.com/*", zone_id = "YOUR_ZONE_ID" }
]
compatibility_date = "2024-11-01"

[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.kv_namespaces]]
binding = "KV_STORAGE"

[build]
command = "npm install"
cwd = "./"

[build.upload]
format = "service-worker"
```

### Step 3: Alternative Option - Cloudflare Pages
If you prefer **Cloudflare Pages** (easier setup), create a `_routes.json` file:

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/favicon.ico", "/assets/*"]
}
```

---

## Phase 4: Deploy to Cloudflare

### Option A: Using Cloudflare Pages (Recommended for beginners)

#### Step 1: Connect GitHub to Cloudflare
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** (left sidebar)
3. Click **Create a project** → **Connect to Git**
4. Select **GitHub** and authorize
5. Choose your `precious-list` repository
6. Click **Begin setup**

#### Step 2: Configure Build Settings
- **Framework preset**: None
- **Build command**: `npm install`
- **Build output directory**: `.` (root)
- **Root directory**: `/` (default)

#### Step 3: Set Environment Variables
1. In the Pages project, go to **Settings** → **Environment variables**
2. Add the following variables:
   ```
   SPREADSHEET_ID = your_spreadsheet_id
   BETA_SIGNUP_SPREADSHEET_ID = your_beta_spreadsheet_id
   NODE_ENV = production
   PORT = 3000
   ```
3. For the service account key, you have options:
   - **Option 1**: Upload JSON file content as a variable (if small enough)
   - **Option 2**: Use Cloudflare KV storage for sensitive data
   - **Option 3**: Store in Cloudflare Secrets

#### Step 4: Add Service Account Key to Cloudflare
Since `precious-list-479016-66451761f825.json` is sensitive:

1. **Using Wrangler CLI** (recommended):
```bash
npm install -g wrangler
wrangler login
wrangler secret put SERVICE_ACCOUNT_KEY < precious-list-479016-66451761f825.json
```

2. Or manually in Cloudflare Dashboard:
   - Go to **Workers** → **Settings** → **Secrets**
   - Add secret: `SERVICE_ACCOUNT_KEY`
   - Paste the JSON content

#### Step 5: Deploy
1. Click **Save and Deploy** in Cloudflare Pages
2. Cloudflare will automatically:
   - Pull from GitHub
   - Install dependencies
   - Deploy your app
3. Your app will be available at: `https://precious-list.pages.dev` (or your custom domain)

---

### Option B: Using Cloudflare Workers (for more control)

#### Step 1: Install Wrangler CLI
```bash
npm install -g wrangler
```

#### Step 2: Login to Cloudflare
```bash
wrangler login
```

#### Step 3: Deploy
```bash
wrangler deploy
```

#### Step 4: Set Secrets
```bash
wrangler secret put SPREADSHEET_ID
wrangler secret put BETA_SIGNUP_SPREADSHEET_ID
wrangler secret put SERVICE_ACCOUNT_KEY
```

---

## Phase 5: Link Custom Domain (Optional)

### Step 1: In Cloudflare Dashboard
1. Go to **Pages** → Your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `api.preciouslist.com`)
4. Follow the DNS setup instructions

### Step 2: Verify DNS
- Cloudflare will provide CNAME records
- Add them to your domain's DNS provider
- Wait for DNS propagation (usually 5-30 minutes)

---

## Phase 6: Verify Deployment

### Test API Endpoints
```bash
# Health check
curl https://precious-list.pages.dev/api/v1/health

# Your API endpoints
curl https://precious-list.pages.dev/api/v1/endpoint
```

### Check Logs
1. Cloudflare Dashboard → **Pages** → Your project → **Deployments**
2. Click the latest deployment
3. View build logs and runtime logs

---

## Troubleshooting

### Issue: Dependencies Not Installing
- Ensure `package.json` is in the root directory
- Check that all dependencies are specified correctly

### Issue: Environment Variables Not Loading
- Go to Cloudflare Dashboard → Settings → Environment variables
- Make sure they're added to the correct environment (Production/Preview)
- Redeploy after adding variables

### Issue: Service Account Key Error
- Verify the JSON file is properly formatted
- Check file permissions: `chmod 644 precious-list-479016-66451761f825.json`
- Ensure it's in `.gitignore` to prevent pushing to GitHub

### Issue: Express Routes Not Working
- Make sure your `server.js` is configured for serverless:
```javascript
// Add this at the end of server.js
export default app;
```

### Issue: CORS Errors
- Check your CORS configuration in `src/config/index.js`
- Allow your Cloudflare domain in CORS settings

---

## Security Checklist

- [ ] `.env` file in `.gitignore`
- [ ] Service account JSON in `.gitignore`
- [ ] Sensitive files not committed to GitHub
- [ ] Environment variables set in Cloudflare dashboard
- [ ] Custom domain SSL/TLS enabled (automatic with Cloudflare)
- [ ] API endpoints protected if needed
- [ ] Rate limiting enabled in Cloudflare

---

## Quick Reference Commands

```bash
# Clone and setup locally
git clone https://github.com/YOUR_USERNAME/precious-list.git
cd precious-list
npm install

# Push updates to GitHub
git add .
git commit -m "Your message"
git push

# Deploy via Wrangler
npm install -g wrangler
wrangler deploy

# Check deployment status
wrangler deployments list
```

---

## Next Steps

1. **Push code to GitHub** (Phase 2)
2. **Connect GitHub to Cloudflare Pages** (Phase 4A)
3. **Set environment variables** in Cloudflare dashboard
4. **Test your API** endpoints
5. **Monitor logs** and performance
6. **Set up custom domain** (optional)

For questions or issues, refer to:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [GitHub Documentation](https://docs.github.com)
