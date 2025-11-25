# Deployment Guide for GitHub Pages

This guide will help you deploy the Playphrase Video CLI application to GitHub Pages.

## Prerequisites

- Repository pushed to GitHub
- GitHub Actions enabled in your repository

## Step-by-Step Deployment

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/NickScherbakov/playphrase-video-cli`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions** from the dropdown

### 2. Verify Configuration

The repository already has the necessary configuration:

- ✅ `vite.config.ts` has `base: '/playphrase-video-cli/'`
- ✅ `.github/workflows/deploy.yml` is configured correctly
- ✅ Workflow has proper permissions set

### 3. Trigger Deployment

Option A: **Push to main branch** (automatic)
```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```

Option B: **Manual trigger**
1. Go to the **Actions** tab
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select branch: `main`
5. Click **Run workflow**

### 4. Monitor Deployment

1. Go to **Actions** tab
2. Watch the workflow run (should take 1-2 minutes)
3. Verify both jobs complete:
   - ✅ Build
   - ✅ Deploy

### 5. Access Your Site

Once deployed, your site will be available at:
**https://nickscherbakov.github.io/playphrase-video-cli/**

⏱️ Note: First deployment may take 1-2 minutes to propagate.

## Troubleshooting

### Blank Page Issue

If you see a blank page after deployment:

#### Check 1: Verify Workflow Success
- Go to Actions tab → latest workflow run
- Ensure both "build" and "deploy" jobs succeeded
- Check for any error messages

#### Check 2: Verify GitHub Pages Settings
- Settings → Pages → Source = "GitHub Actions" ✅
- Build and deployment section should show green checkmark
- Wait 1-2 minutes and try again

#### Check 3: Browser Developer Console
1. Open the site
2. Press F12 (or Cmd+Option+I on Mac)
3. Check Console tab for errors
4. Look for 404 errors indicating wrong base path

Common errors:
- `Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html"`
  → This means files are 404ing, check base path
- `net::ERR_ABORTED 404`
  → Assets not found, verify deployment completed

#### Check 4: Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private window

#### Check 5: Verify Base Path
In `vite.config.ts`, ensure:
```typescript
export default defineConfig({
  base: '/playphrase-video-cli/',  // Must match repository name
  // ... rest of config
});
```

### Workflow Failures

If the GitHub Actions workflow fails:

**Build Failure:**
- Check the build logs in Actions tab
- Verify all dependencies are in package.json
- Try building locally: `npm run build`

**Deploy Failure:**
- Check workflow has correct permissions
- Verify repository settings allow GitHub Actions

**Permission Denied:**
- Repository Settings → Actions → General
- Workflow permissions: "Read and write permissions"

## Verification Checklist

After deployment, verify:

- [ ] Site loads at https://nickscherbakov.github.io/playphrase-video-cli/
- [ ] No console errors in browser DevTools
- [ ] Search functionality works
- [ ] Videos play correctly
- [ ] Navigation works
- [ ] Search history persists

## Force Redeploy

If you need to force a complete redeployment:

```bash
# Make a trivial change
echo " " >> README.md

# Commit and push
git add README.md
git commit -m "Trigger redeploy"
git push origin main
```

Or use the manual workflow trigger in Actions tab.

## Support

If issues persist:
1. Check GitHub Status: https://www.githubstatus.com/
2. Review workflow logs in Actions tab
3. Open an issue with:
   - Link to failed workflow run
   - Browser console errors
   - Screenshots

---

**Last Updated:** November 25, 2025
