# Production Deployment Checklist - Precious List

## Pre-Deployment Requirements ✅

### Code Quality
- [x] All syntax errors fixed
- [x] Console logging for debugging (kept for monitoring)
- [x] Error handling implemented throughout
- [x] Security headers configured (Helmet.js)
- [x] Input validation and sanitization active
- [x] No hardcoded secrets or credentials

### Dependencies
- [x] package.json specifies Node 18+ and npm 9+
- [x] All production dependencies installed
- [x] No dev dependencies in production
- [x] Package versions locked in package-lock.json

### Configuration Files
- [x] railway.json created for Railway.app
- [x] Procfile configured for deployment
- [x] .env.example complete with all variables
- [x] README.md with deployment instructions

### Frontend Assets
- [x] index.html (landing page) production-ready
- [x] dashboard.html (app interface) optimized
- [x] All CSS files minified considerations
- [x] All JavaScript optimized
- [x] No broken links or 404s

### Security
- [x] Helmet.js security headers enabled
- [x] CORS configured for production
- [x] Rate limiting enabled (100 req/15min)
- [x] CSP directive includes unsafe-inline (needed for dashboard)
- [x] HTTPS redirect configured for Railway
- [x] Input validation on all endpoints

### Google Sheets Integration
- [x] Service account email verified
- [x] Google Sheet shared with service account
- [x] SPREADSHEET_ID correct
- [x] Service account has necessary permissions
- [x] Error handling for API failures

### API Endpoints
- [x] `/api/v1/health` - Server status check
- [x] `/api/v1/data` - Combined data endpoint
- [x] `/api/v1/assets` - Asset management
- [x] `/api/v1/people` - People/beneficiary management
- [x] `/api/v1/documents` - Document sharing
- [x] `/api/v1/knowledge-base` - Knowledge items
- [x] `/api/v1/beta-signup` - Beta signup (if configured)

### Error Handling
- [x] Global error handler middleware
- [x] 404 page for undefined routes
- [x] Error logging to console/files
- [x] User-friendly error messages
- [x] No stack traces exposed to client

### Database/Data
- [x] Google Sheets properly structured
- [x] Data validation on read/write
- [x] Backup strategy documented
- [x] Data integrity checks

### Environment Variables (Railway Dashboard)
Required:
- [ ] `NODE_ENV` = production
- [ ] `SPREADSHEET_ID` = your_spreadsheet_id
- [ ] `SERVICE_ACCOUNT_KEY` = full_json_key
- [ ] `CORS_ORIGIN` = your_railway_domain

Optional:
- [ ] `LOG_LEVEL` = info (default)
- [ ] `PORT` = 3000 (Railway sets automatically)

### Monitoring & Logging
- [x] Health endpoint for monitoring
- [x] Error logging configured
- [x] Console output for Railway logs
- [x] No sensitive data in logs

## Deployment Steps

### 1. Final Code Review
```bash
# Check for any uncommitted changes
git status

# Verify server starts locally
npm start

# Test key endpoints
curl http://localhost:3000/api/v1/health
curl http://localhost:3000/api/v1/data
```

### 2. Push to GitHub
```bash
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

### 3. Configure Railway Project
In Railway Dashboard:
1. Go to Variables tab
2. Add all required environment variables
3. Ensure NODE_ENV=production is set
4. Verify SPREADSHEET_ID and SERVICE_ACCOUNT_KEY

### 4. Deploy
```bash
# Option A: Via Railway CLI
railway up

# Option B: Via GitHub integration
# Push to main branch and Railway auto-deploys
git push origin main
```

### 5. Verify Deployment
```bash
# Health check
curl https://your-app.up.railway.app/api/v1/health

# Check data endpoint
curl https://your-app.up.railway.app/api/v1/data

# View logs
railway logs -f
```

## Post-Deployment Verification

### Functionality Tests
- [ ] Landing page loads (index.html)
- [ ] Dashboard loads (dashboard.html)
- [ ] Assets tab displays data
- [ ] People tab displays data
- [ ] Documents tab displays data
- [ ] Shared items tab displays data
- [ ] Knowledge base tab displays data
- [ ] Forms can be submitted
- [ ] Search functionality works
- [ ] Filters work correctly

### Security Tests
- [ ] HTTPS is enforced
- [ ] CSP headers are set
- [ ] No console errors about CSP
- [ ] Inline handlers work (onclick attributes)
- [ ] No mixed content warnings
- [ ] Rate limiting is working

### Performance Tests
- [ ] Page loads within 3 seconds
- [ ] API responses are fast (<500ms)
- [ ] No 404 errors in console
- [ ] All assets load correctly

### Browser Compatibility
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile browsers

## Monitoring Checklist

### Daily
- [ ] Check Railway logs for errors
- [ ] Verify health endpoint is responding
- [ ] Monitor error rates

### Weekly
- [ ] Review performance metrics
- [ ] Check storage usage
- [ ] Backup Google Sheets data

### Monthly
- [ ] Security audit
- [ ] Dependency updates
- [ ] Performance optimization review

## Rollback Plan

If critical issues occur:

```bash
# View deployment history
railway deployments

# Rollback to previous version
railway rollback

# Or redeploy from Git
git revert HEAD~1
git push origin main
```

## Documentation

- [x] README.md created with full deployment guide
- [x] API documentation in code comments
- [x] Error messages are user-friendly
- [x] Troubleshooting guide in README

## Success Criteria

✅ App is live and accessible
✅ All endpoints respond correctly
✅ Data loads from Google Sheets
✅ HTTPS/security working
✅ No errors in logs
✅ Response times acceptable
✅ Forms can submit data
✅ Mobile responsive

---

**Deployment Date**: [Date]
**Deployed By**: [Your Name]
**Status**: Production Ready ✅
