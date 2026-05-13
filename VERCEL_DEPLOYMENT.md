# Vercel Deployment Guide

## Quick Start

Your Phone Store project has been configured for Vercel deployment. Follow these steps to get it live.

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub account (already connected)
- Database (PostgreSQL recommended)

### Step 1: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Find and select `phonestoremourouj6V3`
5. Click "Import"

### Step 2: Configure Environment Variables

In the Vercel project settings, add these environment variables:

#### For PostgreSQL (Recommended):
```
DATABASE_URL=postgresql://user:password@host:5432/phone_store
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

#### For MySQL:
```
DATABASE_URL=mysql://user:password@host:3306/phone_store
NODE_ENV=production
```

**Database Setup Options:**
- **Vercel Postgres**: Built-in option, easily configured via Vercel UI
- **Neon**: Free PostgreSQL hosting
- **Railway**: PostgreSQL hosting
- **PlanetScale**: MySQL hosting

### Step 3: Create Database

Once your database is ready, run migrations. You can:

1. **Use the Vercel CLI locally:**
   ```bash
   vercel env pull .env.local
   npm run build
   npm run seed-db  # (after adding this script to package.json)
   ```

2. **Or manually execute SQL from [migrations/0001_initial.sql](../migrations/0001_initial.sql) and [seed.sql](../seed.sql)**

### Step 4: Deploy

The project will automatically deploy when you push to main branch, or manually:

```bash
npm run deploy
```

## Project Structure for Vercel

```
phonestore/
├── dist/              # Built output (Vercel serves this)
├── src/
│   ├── index.tsx      # Main Hono app
│   ├── routes/        # HTML routes
│   └── renderer.tsx   # JSX renderer
├── migrations/        # Database migrations
├── vercel.json        # Vercel configuration
├── vite.config.ts     # Vite config (Node.js adapter)
└── package.json       # Node.js dependencies
```

## Configuration Details

### vercel.json
- **buildCommand**: `npm run build` - Builds the Vite app to Node.js bundle
- **outputDirectory**: `dist` - Vercel serves from here
- **memory**: 1024 MB for the serverless function
- **maxDuration**: 30 seconds per request

### vite.config.ts Changes
- Changed from `@hono/vite-build/cloudflare-pages` → `@hono/vite-build/node`
- Now builds for Node.js instead of Cloudflare Worker

## Database Schema

The app creates these tables automatically on first run:
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Customer orders
- `admins` - Admin users
- `notifications` - Order notifications

Initial seed includes:
- Admin user (username: `admin`)
- 11 product categories
- 24 sample products

## Admin Dashboard

Access at: `https://your-app.vercel.app/admin`

Default credentials:
- Username: `admin`
- Password: `admin123` (change in production!)

## Monitoring

- Check logs in Vercel Dashboard → Project → Deployments
- Monitor database performance via your database provider's dashboard
- Set up error tracking with Sentry or similar

## Troubleshooting

### Database Connection Error
- Verify `DATABASE_URL` is correctly set in Vercel environment
- Check database firewall allows Vercel's IP ranges
- Ensure database user has correct permissions

### Build Failure
- Check build logs in Vercel Dashboard
- Run `npm run build` locally to test
- Verify all dependencies are installed: `npm install`

### App Crashes on Deploy
- Check function memory allocation (1024 MB is default)
- Look for timeout issues (30s limit)
- Review database query performance

## Next Steps

1. ✅ Project pushed to GitHub
2. ⏭️ Connect to Vercel
3. ⏭️ Set up database
4. ⏭️ Deploy and go live!

## Support

For issues:
- Check Hono docs: https://hono.dev
- Vercel docs: https://vercel.com/docs
- Database provider support
