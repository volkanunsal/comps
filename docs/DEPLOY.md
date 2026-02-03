# Deployment Guide

## GitHub Pages Deployment

This project is configured to deploy to GitHub Pages using Turborepo.

### Prerequisites

1. A GitHub repository with the project code
2. Node.js >= 18
3. pnpm 9.0.0

### Manual Deployment

#### Option 1: Using the deploy script (Recommended)

```bash
./deploy.sh
```

This script will:

- Check if a git remote is configured
- Build the project with the correct base path
- Deploy to GitHub Pages

#### Option 2: Using Turbo directly

```bash
# Build with GitHub Pages environment variable
GITHUB_PAGES=true pnpm build

# Deploy from the search app
pnpm deploy
```

### Automated Deployment with GitHub Actions

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

#### Setup Steps:

1. **Push your code to GitHub:**

   ```bash
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Build and deployment", select "GitHub Actions" as the source
   - Save the settings

3. **Trigger deployment:**
   - Push to the main branch, or
   - Go to Actions tab and manually trigger the "Deploy to GitHub Pages" workflow

4. **Access your site:**
   - Your site will be available at: `https://USERNAME.github.io/REPO/`
   - It may take a few minutes for the first deployment

### Configuration

The deployment configuration uses:

- **Base path**: `/comps/` (or your repository name)
- **Environment variable**: `GITHUB_PAGES=true` enables the correct base path
- **Output directory**: `apps/search/dist`

To change the repository name used in the base path, update line 8 in `apps/search/vite.config.ts`:

```typescript
base: process.env.GITHUB_PAGES ? "/YOUR-REPO-NAME/" : "/",
```

### Turbo Tasks

The deployment process uses the following Turbo tasks:

- `pnpm build` - Builds all packages and apps (includes UI package build)
- `pnpm deploy` - Deploys the built app to GitHub Pages (depends on build)

### Troubleshooting

**Issue**: Assets not loading (404 errors)

- **Solution**: Ensure the `base` path in `vite.config.ts` matches your repository name

**Issue**: "No git remote found" error

- **Solution**: Add a GitHub remote: `git remote add origin https://github.com/USERNAME/REPO.git`

**Issue**: GitHub Actions workflow fails

- **Solution**: Ensure GitHub Pages is enabled in repository settings with "GitHub Actions" as the source

**Issue**: Page shows 404

- **Solution**: Check that you're accessing the correct URL: `https://USERNAME.github.io/REPO/`
