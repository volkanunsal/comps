# Deployment Guide

## GitHub Pages Deployment

This project is configured to deploy to GitHub Pages using Turborepo.

### Prerequisites

1. A GitHub repository with the project code
2. Node.js >= 18
3. pnpm 9.0.0

### Manual Deployment

#### Option 1: Using the Turbo task (Recommended)

```bash
pnpm deploy:gh-pages
```

This runs the deployment script through Turborepo, which will:

- Check if a git remote is configured
- Build the project with the correct base path
- Deploy to GitHub Pages

#### Option 2: Run the script directly

```bash
./scripts/deploy.sh
```

#### Option 3: Using individual commands

```bash
# Build with GitHub Pages environment variable
GITHUB_PAGES=true pnpm build

# Deploy from the search app
cd apps/search && pnpm deploy
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
- **Deployment script**: `scripts/deploy.sh`

To change the repository name used in the base path, update line 8 in `apps/search/vite.config.ts`:

```typescript
base: process.env.GITHUB_PAGES ? "/YOUR-REPO-NAME/" : "/",
```

### Turbo Tasks

The deployment process uses the following Turbo tasks:

- `pnpm build` - Builds all packages and apps (includes UI package build)
- `pnpm deploy` - Deploys the built app to GitHub Pages using Turbo (depends on build)
- `pnpm deploy:gh-pages` - Runs the deployment script through Turbo (recommended)

### Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── scripts/
│   └── deploy.sh               # Manual deployment script
├── apps/
│   └── search/
│       ├── dist/               # Build output (deployed to GitHub Pages)
│       └── vite.config.ts      # Vite config with base path
├── turbo.json                  # Turbo task configuration
└── DEPLOY.md                   # This file
```

### Troubleshooting

**Issue**: Assets not loading (404 errors)

- **Solution**: Ensure the `base` path in `vite.config.ts` matches your repository name

**Issue**: "No git remote found" error

- **Solution**: Add a GitHub remote: `git remote add origin https://github.com/USERNAME/REPO.git`

**Issue**: GitHub Actions workflow fails

- **Solution**: Ensure GitHub Pages is enabled in repository settings with "GitHub Actions" as the source

**Issue**: Page shows 404

- **Solution**: Check that you're accessing the correct URL: `https://USERNAME.github.io/REPO/`

**Issue**: Script permission denied

- **Solution**: Make the script executable: `chmod +x scripts/deploy.sh`

### Hot Module Replacement (HMR)

The development environment is configured to support HMR for the UI package:

- Changes to `packages/ui/src/components/` will automatically refresh the page
- No need to rebuild the UI package during development
- Vite watches the source files directly in development mode
