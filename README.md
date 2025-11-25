# Precious List - Asset Management & Legacy Planning Platform

A secure, privacy-focused platform for organizing personal assets and ensuring your loved ones know what exists and how to claim it.

## 🌍 Live Demo
- **Production**: Available on Railway
- **Local**: http://localhost:3000

## 🎯 Features

- **Asset Catalog**: Organize all assets (financial, real estate, digital, etc.)
- **People Management**: Track relationships, inheritors, and trusted contacts
- **Document Management**: Share and manage important documents
- **Knowledge Base**: Built-in guidance on asset types, people roles, and geographies
- **Google Sheets Integration**: Data synced with your own Google Sheets
- **Security**: HTTPS, CSP headers, rate limiting, input validation
- **Privacy**: Your data remains under your control

## 🚀 Deployment on Railway

### Prerequisites
- Node.js 18+ (automatically detected by Railway)
- npm 9+
- Google Cloud Service Account with Google Sheets API enabled

### Railway Deployment Steps

#### 1. **Set Up Google Service Account**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new service account
   - Generate JSON key
   - Share your Google Sheets with the service account email

#### 2. **Create Railway Project**
   ```bash
   # Via Railway CLI
   railway login
   railway init
   ```

#### 3. **Configure Environment Variables**
   In your Railway project dashboard, set:
   
   ```
   NODE_ENV=production
   PORT=3000
   SPREADSHEET_ID=your_google_spreadsheet_id
   SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   CORS_ORIGIN=https://your-railway-domain.up.railway.app
   ```

#### 4. **Deploy**
   ```bash
   railway up
   ```
   Or via GitHub integration:
   - Connect GitHub repo to Railway
   - Auto-deploy on push to main branch

#### 5. **Verify Deployment**
   ```bash
   curl https://your-app.up.railway.app/api/v1/health
   ```
   Expected response: `{"status":"Server is running","timestamp":"..."}`

## 📋 Environment Variables

### Required Variables
```
NODE_ENV=production
SPREADSHEET_ID=your_google_spreadsheet_id
SERVICE_ACCOUNT_KEY=full_google_service_account_json
```

### Optional Variables
```
PORT=3000 (Railway sets this automatically)
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
```

See `.env.example` for complete configuration template.

## 🏗️ Architecture

### Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express 4.18
- **Security**: Helmet.js, Express Rate Limit
- **Data**: Google Sheets API
- **Auth**: Service Account (Google Cloud)

### Frontend Stack
- **HTML5**: Semantic, responsive design
- **CSS3**: Custom properties, flexbox, grid
- **JavaScript**: Vanilla ES6+, no build step required
- **Security**: CSP, XSS protection, input sanitization

## 📁 Project Structure

```
├── server.js                    # Express app & server setup
├── src/
│   ├── client/                  # Frontend (static files)
│   │   ├── index.html          # Landing page
│   │   ├── dashboard.html       # Main app interface
│   │   ├── styles.css          # Global styles
│   │   ├── dashboard.css       # App-specific styles
│   │   ├── script.js           # Landing page logic
│   │   └── dashboard.js        # App logic
│   ├── config/
│   │   └── index.js            # Environment config
│   ├── controllers/
│   │   └── DataController.js   # API request handlers
│   ├── services/
│   │   ├── GoogleSheetsService.js
│   │   └── DataService.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── routes/
│   │   └── api.routes.js       # API endpoints
│   └── utils/
│       └── validators.js        # Input validation
├── package.json
├── Procfile                     # Deployment config
├── railway.json                # Railway.app config
└── README.md
```

## 🔌 API Endpoints

### Health & Status
- `GET /api/v1/health` - Server status

### Data
- `GET /api/v1/data` - All data (assets, people, documents, knowledge base)
- `GET /api/v1/assets` - List assets
- `POST /api/v1/assets` - Save assets
- `GET /api/v1/people` - List people
- `POST /api/v1/people` - Save people
- `GET /api/v1/documents` - List documents
- `POST /api/v1/documents` - Save documents
- `GET /api/v1/knowledge-base` - Knowledge base items
- `POST /api/v1/knowledge-base` - Save knowledge items

### Beta
- `POST /api/v1/beta-signup` - Beta program signup

## 🔒 Security Features

- **HTTPS**: Enforced on Railway via `x-forwarded-proto` check
- **CSP Headers**: Strict Content Security Policy
- **HSTS**: HTTP Strict Transport Security (1 year)
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs sanitized and validated
- **CORS**: Configurable origin restriction
- **Frame Guard**: Prevents clickjacking

## 🧪 Local Development

### Setup
```bash
# Install dependencies
npm install

# Create .env from template
cp .env.example .env
# Edit .env with your Google Sheets config
```

### Run
```bash
# Development with auto-reload
npm run dev

# Production mode
npm start
```

### Test
```bash
# Health check
curl http://localhost:3000/api/v1/health

# Get all data
curl http://localhost:3000/api/v1/data
```

## 📊 Data Structure

### Assets
```javascript
{
  id: 1,
  name: "Chase Business Checking",
  category: "Financial Assets",
  type: "Bank Account",
  country: "USA",
  inheritor: "Jane Smith",
  description: "...",
  accessDetails: "..."
}
```

### People
```javascript
{
  id: 1,
  name: "Jane Smith",
  relationship: "Spouse",
  email: "jane@example.com",
  phone: "+1 (555) 123-4567",
  country: "USA",
  notes: "Primary beneficiary"
}
```

### Documents
```javascript
{
  id: 1,
  name: "Master Asset Inventory",
  sharedWith: "Jane Smith",
  accessLevel: "View Only",
  lastModified: "2025-11-20",
  url: "#"
}
```

## 🛠️ Troubleshooting

### Railway Deployment Issues

**Build fails**: Check Node version in `package.json` matches Railway's runtime
```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

**App won't start**: Check logs
```bash
railway logs
```

**Environment variables not found**: Verify in Railway dashboard under variables

**HTTPS redirect loop**: Railway automatically handles HTTPS - remove local SSL files

### Google Sheets API Issues

**"Unauthorized" error**:
- Verify SERVICE_ACCOUNT_KEY in Railway variables
- Share Google Sheet with service account email
- Check SPREADSHEET_ID is correct

**No data loading**:
- Check API response: `GET /api/v1/data`
- Verify sheet has proper column headers
- Check service account has edit permissions

## 📈 Monitoring

### Health Checks
- **Endpoint**: `/api/v1/health`
- **Frequency**: Railway checks every 30 seconds
- **Timeout**: 30 seconds

### Logs
```bash
# View live logs
railway logs -f

# View past logs
railway logs --hours 24
```

## 🔄 CI/CD with GitHub

Railway automatically:
1. Detects new commits to main branch
2. Builds from Procfile + railway.json
3. Deploys to production
4. Health checks deployment

**No additional setup needed** - just push to GitHub!

## 📝 License

ISC - See LICENSE file

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📞 Support

For issues, feature requests, or questions:
- Check existing issues on GitHub
- Create new issue with detailed description
- Include error logs and reproduction steps

## 🎉 Acknowledgments

- Google Sheets API for data storage
- Railway.app for hosting & deployment
- Automattic for privacy policy & terms templates

---

**Made with ❤️ for families and peace of mind**
