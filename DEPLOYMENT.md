# Deployment Guide

## Pre-Deployment Checklist

- [ ] Convex project initialized and deployed
- [ ] Resend API key obtained and verified domain set up
- [ ] All environment variables configured
- [ ] Test checkout flow end-to-end locally
- [ ] Product images added to `/public/assets/` directory

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Audiophile e-commerce"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_CONVEX_URL=<your_convex_url>
RESEND_API_KEY=<your_resend_api_key>
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

### Step 5: Update Resend Email Sender

1. In `src/app/api/send-email/route.ts`, update the `from` field to use your verified domain
2. Redeploy or push the change

## Post-Deployment

### Testing Checklist

1. ✅ Homepage loads correctly
2. ✅ Products can be added to cart
3. ✅ Cart persists across page reloads
4. ✅ Checkout form validates correctly
5. ✅ Order saves to Convex
6. ✅ Confirmation email is sent
7. ✅ Order confirmation page displays correctly
8. ✅ All links and navigation work

### Monitoring

- Check Vercel deployment logs for errors
- Monitor Convex dashboard for order submissions
- Check Resend dashboard for email delivery rates
- Set up error tracking (optional): Sentry, LogRocket, etc.

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation errors
- Check Vercel build logs

### Orders Not Saving
- Verify `NEXT_PUBLIC_CONVEX_URL` is set in Vercel
- Check Convex dashboard for errors
- Verify Convex functions are deployed

### Emails Not Sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for delivery logs
- Ensure domain is verified in Resend
- Verify `from` email uses verified domain

### Environment Variables Not Working
- Redeploy after adding env vars
- Check variable names match exactly (case-sensitive)
- Verify `NEXT_PUBLIC_` prefix for client-side vars

## Alternative: Netlify Deployment

1. Connect GitHub repo to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard
4. Deploy

