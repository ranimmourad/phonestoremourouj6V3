# Phone Store Mourouj 6

## Project Overview
- **Name**: Phone Store Mourouj 6
- **Goal**: Premium modern corporate website for a Tunisian tech accessories and phone/computer repair store
- **Stack**: Hono + TypeScript + TailwindCSS (CDN) + Vercel + Cloudflare Pages support
- **Language**: French primary, Arabic support

## Features

### Completed
- **Homepage**: Animated hero section, floating cards, parallax scrolling, glassmorphism UI
- **Product Catalog**: 24 products across 11 categories with filtering, search, quick view
- **Shopping Cart**: Full cart system with localStorage persistence, quantity management
- **Checkout**: Order form with customer info, address, notes + order confirmation
- **Admin Dashboard**: Secure login, product/category CRUD, order management, live notifications
- **Reviews Section**: Real customer testimonials with Swiper carousel
- **Services Section**: Phone repair, PC repair, accessories sales, technical support
- **FAQ Section**: Expandable accordion with common questions
- **Contact Section**: Google Maps embed, social media links, phone numbers, email
- **WhatsApp Integration**: Floating WhatsApp button, per-product WhatsApp ordering
- **Animations**: Scroll animations, counter animations, marquee, hover effects
- **Responsive Design**: Fully mobile-responsive across all breakpoints
- **SEO Optimized**: Meta tags, semantic HTML, proper heading structure

### E-Commerce System
- Product browsing with category filtering
- Search bar with live results
- Product quick view modal
- Add to cart with visual feedback
- Cart page with quantity controls
- Checkout with delivery info form
- Order saved to database
- Admin notification on new orders

### Admin Dashboard (`/admin`)
- **Login**: username: `admin`, password: `admin123`
- Dashboard with stats (products, orders, revenue, pending)
- Product management (add/edit/delete)
- Category management (add/edit/delete)
- Order management with status updates (pending/confirmed/shipped/delivered/cancelled)
- Real-time notifications
- 15-second auto-polling for new orders

## URLs
- **Homepage**: `/`
- **Cart**: `/cart`
- **Admin**: `/admin`
- **API Products**: `/api/products`
- **API Categories**: `/api/categories`

## Deployment

### Vercel Deployment (Current)
The project is configured for deployment on Vercel. 

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Configure Database**:
   - Copy `.env.example` to `.env.production`
   - Set up a PostgreSQL or MySQL database
   - Configure `DATABASE_URL` in Vercel environment variables

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Cloudflare Pages Alternative
The project can also be deployed to Cloudflare Pages:
   ```bash
   npm run deploy-cloudflare
   ```
- **API Orders**: `POST /api/orders`

## Store Information
- **Address**: Phone Store, El Mourouj 2074
- **Phone**: 54 663 209
- **Technical Service**: 51 884 577
- **Email**: phonestoremourouj6@gmail.com
- **Facebook**: https://www.facebook.com/phonestoremourouj/
- **Instagram**: https://www.instagram.com/phone_store_mourouj6
- **TikTok**: https://www.tiktok.com/@phone_store_mourouj_6

## Data Architecture
- **Database**: Cloudflare D1 (SQLite)
- **Tables**: categories, products, orders, admins, notifications
- **Cart Storage**: Browser localStorage
- **Auto-init**: Database schema and seed data auto-created on first request

## Deployment

### Cloudflare Pages
```bash
npm run build
npx wrangler pages deploy dist --project-name phone-store-mourouj6
```

### Vercel (Alternative)
The project is compatible with Vercel deployment. Export the Hono app as a Vercel Edge Function.

### Local Development
```bash
npm run build
npm run dev:sandbox  # or: npx wrangler pages dev dist --d1=DB --local --ip 0.0.0.0 --port 3000
```

## Tech Stack
- **Backend**: Hono (TypeScript)
- **Frontend**: TailwindCSS (CDN), Vanilla JS, Swiper.js, Font Awesome
- **Database**: Cloudflare D1 (SQLite)
- **Build**: Vite + @hono/vite-build
- **Hosting**: Cloudflare Pages / Vercel compatible

## Project Structure
```
webapp/
├── src/
│   ├── index.tsx          # Main Hono app with API routes + DB init
│   └── routes/
│       ├── home.ts        # Homepage HTML
│       ├── cart.ts        # Cart page HTML
│       └── admin.ts       # Admin dashboard HTML
├── public/static/
│   ├── styles.css         # Main stylesheet (animations, glassmorphism)
│   ├── app.js             # Frontend JS (cart, search, animations)
│   └── products/          # Product SVG placeholder images
├── migrations/
│   └── 0001_initial.sql   # Database schema
├── seed.sql               # Sample data
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare Pages config
├── vite.config.ts         # Vite build config
└── package.json
```

**Last Updated**: 2026-05-13
