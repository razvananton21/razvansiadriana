# Deployment Options for Your Next.js Project

This document outlines several easy ways to deploy your Next.js project.

## 1. GitHub Pages (Easiest with GitHub)

### Automatic Deployment with GitHub Actions
1. Push your code to GitHub
2. GitHub Actions will automatically build and deploy your site to GitHub Pages
3. Your site will be available at `https://[username].github.io/[repository-name]/`

### Manual Deployment
1. Run the deployment script: `./deploy-local.sh`
2. Follow the prompts
3. Your site will be available at `https://[username].github.io/[repository-name]/`

## 2. Vercel (Recommended for Next.js)

1. Create an account on [Vercel](https://vercel.com/)
2. Install Vercel CLI: `npm i -g vercel` (requires Node.js 18+)
3. Run `vercel` in your project directory
4. Follow the prompts
5. Your site will be deployed to a Vercel URL

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

## 3. Netlify

1. Create an account on [Netlify](https://netlify.com/)
2. Connect your GitHub repository or drag and drop your `out` directory after running `npm run build`
3. Your site will be deployed to a Netlify URL

Alternatively, use the Netlify CLI (requires Node.js 18+):
```
npm install -g netlify-cli
netlify deploy
```

## 4. Firebase Hosting

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Install Firebase CLI: `npm install -g firebase-tools` (requires Node.js 14+)
3. Login to Firebase: `firebase login`
4. Update `.firebaserc` with your Firebase project ID
5. Build your project: `npm run build`
6. Deploy to Firebase: `firebase deploy`

## 5. Surge.sh (Super Simple)

1. Install Surge: `npm install -g surge`
2. Build your project: `npm run build`
3. Deploy to Surge: `cd out && surge`
4. Your site will be deployed to a Surge URL

## 6. Amazon S3 + CloudFront

For production deployments with custom domains and CDN:

1. Create an S3 bucket
2. Configure it for static website hosting
3. Set up CloudFront for CDN
4. Build your project: `npm run build`
5. Upload the `out` directory to S3

## Notes

- All these methods require you to build your project first with `npm run build`
- The `out` directory contains your static site
- For custom domains, configure DNS settings with your domain provider 