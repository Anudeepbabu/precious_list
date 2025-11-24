# Precious List - Complete Deployment Instructions

## 📋 Quick Summary

You're going to:
1. **Push your code to GitHub** (private repo)
2. **Connect GitHub to Cloudflare Pages**
3. **Deploy your app** with environment variables
4. **Access your app** at a Cloudflare URL

**Estimated time**: 10-15 minutes

---

## ⚠️ Important Security Notes

Your project has sensitive files that should NOT be pushed to GitHub:
- ✅ `.env` - Added to `.gitignore` ✓
- ✅ `precious-list-479016-66451761f825.json` - Added to `.gitignore` ✓

These will be set as environment variables in Cloudflare instead.

---

## 🚀 Step-by-Step Instructions

### STEP 1: Prepare Your Local Repository

```bash
cd "/Users/likhithapriyagutti/Downloads/Precious List"
```

Configure Git with your information:
```bash
git config user.name "Your Name"
git config user.email "your-email@example.com"
```

Initialize Git (if not already done):
```bash
git init
```

Verify `.gitignore` is correct:
```bash
cat .gitignore
```

You should see sensitive files listed there.

---

### STEP 2: Stage and Commit Your Code

```bash
git add .
git commit -m "Initial commit: Precious List backend with Google Sheets integration"
```

Check what's staged:
```bash
git status
```

**✓ Your local repo is ready!**

---

### STEP 3: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Fill in these details**:
   - **Repository name**: `precious-list` (or your preferred name)
   - **Description**: `Precious List backend with Google Sheets integration`
   - **Visibility**: Select `Private` (important for security)
   - **Initialize this repository**: Leave all unchecked
3. **Click**: `Create repository`

---

### STEP 4: Push Code to GitHub

Copy the commands from your GitHub repo (they look like this):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/precious-list.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**When prompted for password**:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)

**To create a Personal Access Token**:
1. Go to: GitHub Settings → Developer settings → Personal access tokens
2. Click: `Generate new token (classic)`
3. Select scope: `repo` (full control of private repositories)
4. Click: `Generate token`
5. Copy the token and use it as your password

**✓ Your code is now on GitHub!**

---

### STEP 5: Connect GitHub to Cloudflare Pages

1. **Go to**: https://dash.cloudflare.com/login
2. **Log in** to your Cloudflare account
3. **Click**: `Pages` (left sidebar)
4. **Click**: `Create a project`
5. **Click**: `Connect to Git`
6. **Select**: `GitHub`
7. **Authorize** Cloudflare to access your GitHub account
8. **Choose** your `precious-list` repository
9. **Click**: `Begin setup`

---

### STEP 6: Configure Build Settings

On the build configuration page:

- **Framework preset**: Select `None`
- **Build command**: `npm install`
- **Build output directory**: `.` (just a dot)
- **Root directory**: `/` (default - leave blank)

**Click**: `Save and Deploy`

Cloudflare will now:
- Clone your repo
- Install dependencies
- Deploy your app

This takes 2-5 minutes. You'll see a progress bar.

**✓ Your app is deployed!** You'll get a URL like: `https://precious-list.pages.dev`

---

### STEP 7: Add Environment Variables

After deployment succeeds:

1. **Go to**: Your Pages project in Cloudflare
2. **Click**: `Settings`
3. **Click**: `Environment variables`
4. **Click**: `Add variable` and add these:

| Variable Name | Value | Environment |
|---|---|---|
| `SPREADSHEET_ID` | `1Kx1Wwy32pEkjqroDPGu2pJNFI-Hxk9kbZ30MgXYKS5g` | Production |
| `BETA_SIGNUP_SPREADSHEET_ID` | `1gWfOEb38MFP8MLGMU868QvqCMgIpuxuIsuv_atsZnOc` | Production |
| `NODE_ENV` | `production` | Production |
| `PORT` | `3000` | Production |

After adding each variable, click `Encrypt`

---

### STEP 8: Add Service Account Key (Google Sheets)

For the sensitive Google Sheets service account key:

**Option A: Using Wrangler CLI** (Recommended)

```bash
npm install -g wrangler
wrangler login
wrangler secret put SERVICE_ACCOUNT_KEY < precious-list-479016-66451761f825.json
```

**Option B: Manual in Dashboard**

1. **Go to**: Cloudflare Dashboard → `Workers` → `Settings`
2. **Click**: `Secrets`
3. **Click**: `Add secret`
4. **Name**: `SERVICE_ACCOUNT_KEY`
5. **Value**: Open `precious-list-479016-66451761f825.json` in a text editor, copy all content, paste it here
6. **Click**: `Add secret`

---

### STEP 9: Redeploy with Environment Variables

1. **Go to**: Your Pages project → `Deployments`
2. **Click** the most recent deployment
3. **Click**: `Redeploy`

Or alternatively, just push a commit to GitHub (even an empty one):
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

This will trigger an automatic redeploy with your environment variables.

---

### STEP 10: Test Your Deployment

Once redeployed, test your API:

```bash
# Test a basic request (adjust endpoint as needed)
curl https://precious-list.pages.dev/api/v1/health

# Or open in browser
open https://precious-list.pages.dev
```

Check the response. If you see errors in Cloudflare logs:
1. Go to Cloudflare Dashboard → Pages → Your project → `Deployments`
2. Click the latest deployment
3. View logs for errors

---

## 🔧 Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution**: Make sure `npm install` runs during build
- Check build command is: `npm install`
- Verify `package.json` exists in root directory

### Problem: Environment variables not loading
**Solution**:
- After adding variables, you must **redeploy**
- Variables must be added to **Production** environment, not Preview
- Use secrets (via Wrangler) for sensitive data like API keys

### Problem: "Module not found: google-auth-library"
**Solution**: Ensure all dependencies in `package.json` are correct
- Run locally: `npm install` and test before pushing

### Problem: CORS errors when calling API
**Solution**: Update CORS config in your code:
- Cloudflare domain: `precious-list.pages.dev`
- Add to allowed origins in your Express config

### Problem: Service Account Key not working
**Solution**: 
- Verify the JSON file is valid (no syntax errors)
- Use `wrangler secret put` for secrets (more secure than variables)
- Check the key has proper Google Sheets permissions

---

## 📚 Files Created for You

- **`DEPLOYMENT_GUIDE.md`** - Detailed reference guide
- **`wrangler.toml`** - Cloudflare configuration
- **`CLOUDFLARE_ENV_VARS.md`** - Environment variable reference
- **`.gitignore`** - Updated with sensitive files
- **`setup-deployment.sh`** - Interactive setup script (optional)

---

## 🎯 Checklist

- [ ] Git configured locally
- [ ] Code committed locally
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub connected to Cloudflare Pages
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Service account key added as secret
- [ ] Redeployed with variables
- [ ] API endpoints tested
- [ ] App accessible at Cloudflare URL

---

## 💡 Next Steps (Optional)

### Connect Custom Domain
If you have a custom domain:
1. Go to Cloudflare Dashboard → Pages → Your project
2. Click `Custom domains`
3. Add your domain
4. Update DNS records per Cloudflare instructions

### Set Up Continuous Deployment
Your GitHub is already connected! Now:
- Every time you push to `main` branch, Cloudflare auto-deploys
- No manual deployment needed
- Just: `git push` 🚀

### Monitor Your App
- Cloudflare Dashboard → Pages → Your project → Analytics
- View requests, errors, performance

---

## 🆘 Need Help?

**Check logs**:
- Cloudflare Dashboard → Pages → Your project → Deployments → Click deployment → View logs

**Common resources**:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [GitHub Docs](https://docs.github.com)

---

## 🔐 Security Reminder

- ✅ Never commit `.env` file
- ✅ Never commit service account JSON
- ✅ Use secrets for sensitive data
- ✅ Keep repository private
- ✅ Rotate service account keys periodically

---

**You're all set! Happy deploying! 🎉**
