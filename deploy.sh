#!/bin/bash

# Deployment script for GitHub Pages
# This script will commit changes and push to trigger GitHub Actions deployment

echo "🚀 Starting deployment process..."
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Show current branch
BRANCH=$(git branch --show-current)
echo "📍 Current branch: $BRANCH"
echo ""

# Add all changes
echo "📦 Adding changes..."
git add .

# Show what will be committed
echo ""
echo "📝 Files to be committed:"
git status --short

# Commit changes
echo ""
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update documentation and setup GitHub Pages deployment"
fi

git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo "⚠️  Nothing to commit or commit failed"
    echo "Checking if we should push anyway..."
fi

# Push to GitHub
echo ""
echo "🚢 Pushing to GitHub..."
git push origin $BRANCH

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to: https://github.com/NickScherbakov/playphrase-video-cli"
    echo "2. Click on 'Actions' tab"
    echo "3. Wait for 'Deploy to GitHub Pages' workflow to complete (1-2 minutes)"
    echo "4. Go to Settings → Pages"
    echo "5. Ensure Source is set to 'GitHub Actions'"
    echo "6. Visit: https://nickscherbakov.github.io/playphrase-video-cli/"
    echo ""
    echo "🎉 Your site will be live in a few minutes!"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "Please check your git credentials and network connection"
    exit 1
fi
