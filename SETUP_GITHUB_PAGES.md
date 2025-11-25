# 🚀 Quick Setup: Enable GitHub Pages

Your application is ready to deploy! Follow these simple steps:

## ⚡ Quick Start (2 minutes)

### Step 1: Enable GitHub Pages
1. Open your repository: https://github.com/NickScherbakov/playphrase-video-cli
2. Go to **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**

### Step 2: Trigger First Deployment
Push these changes to trigger automatic deployment:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### Step 3: Wait & Verify (1-2 minutes)
1. Go to **Actions** tab in your repository
2. Wait for the "Deploy to GitHub Pages" workflow to complete ✅
3. Visit your live site: https://nickscherbakov.github.io/playphrase-video-cli/

## 🎉 That's It!

Your site will now automatically deploy whenever you push to the `main` branch.

## ❓ Troubleshooting

### Blank page after deployment?

**Quick fixes:**
1. Wait 2 more minutes (GitHub Pages needs time to propagate)
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check Actions tab → ensure workflow succeeded
4. Verify Settings → Pages → Source = "GitHub Actions"

**Still not working?**
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting.

## 📝 What Changed?

I've updated your project with:
- ✅ Complete README.md with full documentation
- ✅ Improved index.html with SEO meta tags
- ✅ Deployment guide (DEPLOYMENT.md)
- ✅ This quick setup guide

All configuration files were already correct:
- `vite.config.ts` has proper base path
- `.github/workflows/deploy.yml` is configured
- GitHub Actions workflow is ready

**You just need to enable GitHub Pages in repository settings!**

---

Need help? Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
