#!/bin/bash

# Build the Next.js app
echo "Building the Next.js app..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Create .nojekyll file
echo "Creating .nojekyll file..."
touch out/.nojekyll

# Initialize a temporary git repo in the out directory if it doesn't exist
cd out
if [ ! -d ".git" ]; then
  echo "Initializing git repository in the out directory..."
  git init
  git checkout -b gh-pages
else
  echo "Git repository already exists in the out directory."
  git checkout gh-pages
fi

# Add all files
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Push to GitHub Pages
echo "Pushing to GitHub Pages..."
echo "Enter your GitHub repository URL (e.g., git@github.com:username/repo.git):"
read repo_url

if [ -z "$repo_url" ]; then
  echo "No repository URL provided. Exiting."
  exit 1
fi

# Check if remote exists
if git remote | grep -q "origin"; then
  git remote set-url origin $repo_url
else
  git remote add origin $repo_url
fi

git push -f origin gh-pages

echo "Deployment complete! Your site should be available at https://username.github.io/repo-name/"
echo "Note: Replace 'username' and 'repo-name' with your actual GitHub username and repository name." 