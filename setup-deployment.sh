#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Precious List - GitHub & Cloudflare Setup${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Phase 1: Setup Git
echo -e "${YELLOW}[Phase 1] Setting up Git...${NC}"
read -p "Enter your Git name: " GIT_NAME
read -p "Enter your Git email: " GIT_EMAIL

git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"
echo -e "${GREEN}✓ Git configured${NC}\n"

# Phase 2: Initialize and Commit
echo -e "${YELLOW}[Phase 2] Initializing Git repository...${NC}"
if [ -d ".git" ]; then
    echo -e "${YELLOW}Git repository already exists${NC}"
else
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi

echo -e "${YELLOW}Staging files...${NC}"
git add .
git commit -m "Initial commit: Precious List backend with Google Sheets integration" || echo "Files already committed"
echo -e "${GREEN}✓ Files staged and committed${NC}\n"

# Phase 3: GitHub Setup
echo -e "${YELLOW}[Phase 3] GitHub Repository Setup${NC}"
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (default: precious-list): " REPO_NAME
REPO_NAME=${REPO_NAME:-precious-list}

echo -e "${YELLOW}Next steps for GitHub:${NC}"
echo -e "1. Go to https://github.com/new"
echo -e "2. Create a repository named: ${GREEN}$REPO_NAME${NC}"
echo -e "3. Choose ${GREEN}Private${NC} (recommended)"
echo -e "4. Do NOT initialize with README, .gitignore, or license"
echo -e "5. Click ${GREEN}Create repository${NC}"
echo ""
read -p "Have you created the GitHub repository? (y/n): " GITHUB_READY

if [ "$GITHUB_READY" = "y" ]; then
    echo -e "${YELLOW}Connecting to GitHub...${NC}"
    git branch -M main
    git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git || git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
    
    echo -e "${YELLOW}Pushing code to GitHub...${NC}"
    git push -u origin main
    echo -e "${GREEN}✓ Code pushed to GitHub${NC}\n"
fi

# Phase 4: Cloudflare Setup
echo -e "${YELLOW}[Phase 4] Cloudflare Deployment${NC}"
read -p "Do you want to deploy to Cloudflare Pages? (y/n): " CLOUDFLARE_READY

if [ "$CLOUDFLARE_READY" = "y" ]; then
    echo ""
    echo -e "${GREEN}Manual Steps for Cloudflare Pages:${NC}"
    echo -e "1. Go to: https://dash.cloudflare.com"
    echo -e "2. Click ${GREEN}Pages${NC} in the left sidebar"
    echo -e "3. Click ${GREEN}Create a project${NC} → {{GREEN}Connect to Git${NC}"
    echo -e "4. Select ${GREEN}GitHub${NC} and authorize"
    echo -e "5. Choose repository: ${GREEN}$REPO_NAME${NC}"
    echo -e "6. Build settings:"
    echo -e "   - Framework: ${GREEN}None${NC}"
    echo -e "   - Build command: ${GREEN}npm install${NC}"
    echo -e "   - Build output directory: ${GREEN}.${NC}"
    echo -e "7. Click {{GREEN}Save and Deploy${NC}"
    echo -e "8. After deployment, go to {{GREEN}Settings${NC} → {{GREEN}Environment variables${NC}}"
    echo -e "9. Add these variables:"
    echo -e "   - SPREADSHEET_ID"
    echo -e "   - BETA_SIGNUP_SPREADSHEET_ID"
    echo -e "   - NODE_ENV = production"
    echo ""
    read -p "Ready to open Cloudflare Dashboard? (y/n): " OPEN_CLOUDFLARE
    if [ "$OPEN_CLOUDFLARE" = "y" ]; then
        open "https://dash.cloudflare.com"
    fi
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Repository: ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Connect your GitHub repo to Cloudflare Pages"
echo -e "2. Add environment variables in Cloudflare dashboard"
echo -e "3. Test your deployment at: https://${REPO_NAME}.pages.dev"
echo ""
echo -e "${YELLOW}For detailed instructions, see: ${GREEN}DEPLOYMENT_GUIDE.md${NC}"
