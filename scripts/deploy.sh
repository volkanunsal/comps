#!/bin/bash

# GitHub Pages Deployment Script
# This script builds and deploys the project to GitHub Pages

set -e

echo "🚀 Starting deployment to GitHub Pages..."

# Check if git remote exists
if ! git remote get-url origin &> /dev/null; then
  echo "❌ Error: No git remote 'origin' found."
  echo "Please add a GitHub repository remote first:"
  echo "  git remote add origin https://github.com/USERNAME/REPO.git"
  exit 1
fi

# Get the repository name from git remote
REPO_URL=$(git remote get-url origin)
REPO_NAME=$(basename -s .git "$REPO_URL")

echo "📦 Repository: $REPO_NAME"
echo "🏗️  Building project with GITHUB_PAGES environment variable..."

# Build with GitHub Pages environment variable
GITHUB_PAGES=true pnpm build

echo "✅ Build completed!"
echo "📤 Deploying to GitHub Pages..."

# Deploy
cd apps/search && pnpm deploy

echo "✨ Deployment complete!"
echo "🌐 Your site will be available at: https://USERNAME.github.io/$REPO_NAME/"
echo ""
echo "Note: Replace USERNAME with your GitHub username in the URL above."
echo "It may take a few minutes for GitHub Pages to update."
