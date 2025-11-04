# Audiophile E-commerce Website

A pixel-perfect e-commerce website built with Next.js, React, Convex, and Resend for the Stage 3 task.

## Features

- 🛒 Shopping cart with local storage persistence
- 💳 Complete checkout flow with form validation
- 📦 Order storage in Convex backend
- 📧 Transactional order confirmation emails
- ✅ Order confirmation page with full summary
- ♿ Accessible forms and navigation
- 📱 Responsive design (mobile, tablet, desktop)

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (database & serverless functions)
- **Email**: Resend API
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

1. Sign up at [convex.dev](https://convex.dev)
2. Run `npx convex dev` in the project root
3. Follow the prompts to create a new Convex project or link to an existing one
4. Copy the `CONVEX_URL` from the output and add it to `.env.local`

### 3. Set Up Resend (for email)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key in your Resend dashboard
3. Add the API key to `.env.local` as `RESEND_API_KEY`
4. Update the `from` email in `src/app/api/send-email/route.ts` to use your verified domain

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
audiophile-next/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/                # API routes (email sending)
│   │   ├── checkout/           # Checkout page
│   │   ├── order-confirmation/ # Order confirmation page
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── context/                # React context providers
│   │   └── CartContext.tsx
│   ├── lib/                    # Utilities and helpers
│   │   ├── convex-provider.tsx
│   │   └── products.ts
│   └── types/                  # TypeScript types
│       └── index.ts
├── convex/                     # Convex backend
│   ├── schema.ts              # Database schema
│   └── orders.ts              # Order mutations
└── public/                     # Static assets
```

## Key Features Implementation

### Checkout Flow

1. User fills out checkout form with validation
2. Form validates all fields (email, phone, address, etc.)
3. On submit:
   - Order is saved to Convex database
   - Confirmation email is sent via Resend
   - User is redirected to order confirmation page

### Email Template

The email template includes:
- Personalized greeting
- Order ID and summary
- Itemized list of products
- Shipping details
- Totals breakdown
- Responsive HTML design
- CTA link to view order

### Order Storage

Orders are stored in Convex with:
- Customer details (name, email, phone)
- Shipping address
- Order items with quantities
- Totals (subtotal, shipping, tax, grand total)
- Order status and timestamp
- Unique order ID

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_CONVEX_URL`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## Testing the Checkout Flow

1. Add items to cart from homepage
2. Navigate to `/checkout`
3. Fill out the form with valid data
4. Submit the order
5. Check your email for confirmation
6. View order confirmation page

## Notes

- Product images should be placed in `/public/assets/` directory following the structure in `src/lib/products.ts`
- The email sender domain needs to be verified in Resend before emails will send
- Cart data persists in localStorage
- All form validation follows accessibility best practices

## License

MIT
