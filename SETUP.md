# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Initialize Convex
```bash
npx convex dev
```

This will:
- Prompt you to sign in/create account
- Create a new Convex project or link to existing one
- Generate the `_generated` API files
- Provide you with a `CONVEX_URL`

## Step 3: Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_CONVEX_URL=<your_convex_url_from_step_2>
RESEND_API_KEY=<your_resend_api_key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting Resend API Key:
1. Sign up at https://resend.com
2. Go to API Keys section
3. Create a new API key
4. Copy it to `.env.local`

**Important**: Update the `from` email in `src/app/api/send-email/route.ts` to use your verified Resend domain.

## Step 4: Run Development Server

In one terminal:
```bash
npm run dev
```

In another terminal (if Convex dev server isn't running):
```bash
npx convex dev
```

## Step 5: Test the Application

1. Navigate to http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Fill out the form and submit
5. Check your email for confirmation
6. View order confirmation page

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your production URL)
4. Deploy!

## Troubleshooting

### Convex API imports showing errors
- Make sure `npx convex dev` has been run at least once
- This generates the `convex/_generated/api.d.ts` file

### Emails not sending
- Verify your Resend API key is correct
- Make sure you've verified your domain in Resend
- Update the `from` email address in `src/app/api/send-email/route.ts`

### Orders not saving
- Check that `NEXT_PUBLIC_CONVEX_URL` is set correctly
- Verify Convex is running (`npx convex dev`)
- Check browser console for errors

