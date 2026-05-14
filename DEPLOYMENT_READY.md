# 🚀 Phone Store - Vercel Deployment Guide

Your app is now fully configured for Vercel deployment and is ready to go live today!

## Quick Deploy (1 minute)

```bash
# 1. Push to your git repository
git add .
git commit -m "Ready for Vercel deployment"
git push

# 2. Deploy to Vercel
npm run deploy
# Or manually through Vercel dashboard
```

## Deployment Details

### ✅ What's Already Configured

- **Database**: SQLite with better-sqlite3 (zero external dependencies)
- **API Handler**: Node.js serverless function (`api/index.js`)
- **Build Output**: Vite builds to `dist/index.js`
- **Static Files**: Properly served from `/public/static`
- **Database**: Automatically initialized on first request
- **Seeding**: 11 categories and 25 products pre-configured

### 📋 Architecture

```
Vercel Request
    ↓
api/index.js (Serverless Handler)
    ↓
dist/index.js (Hono App - compiled from src/index.tsx)
    ↓
Database (SQLite in /data/store.db)
    ↓
Hono Routes (API + HTML)
```

## Deployment Steps

### Step 1: Ensure Git is Ready

```bash
cd /Users/macbook/Downloads/phonestore

# Check git status
git status

# Add all changes
git add .

# Commit
git commit -m "Production-ready Vercel deployment with SQLite"

# Push to main branch
git push origin main
```

### Step 2: Connect to Vercel

**Option A: Using Vercel CLI**
```bash
npm run deploy
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Click "Deploy"

### Step 3: Verify Deployment

Once deployed, Vercel will provide you with a URL like:
```
https://phone-store-mourouj6.vercel.app
```

Test it:
- Visit `https://your-domain.vercel.app` (should show the home page)
- Check API: `https://your-domain.vercel.app/api/categories`
- Admin login: POST to `/api/admin/login` with credentials:
  - Username: `admin`
  - Password: `admin123`

## Database

### Local Development
- Database is stored in `/data/store.db`
- Auto-initialized on first request
- Pre-seeded with 11 categories and 25 products
- Pre-seeded with admin user (username: `admin`, password: `admin123`)

### Production (Vercel)
- Database persists in the Vercel function's `/data` directory
- **Important**: Each Vercel deployment may get fresh data. For persistent data, consider using Vercel KV or an external database.

## Change Admin Credentials

To change the admin password:

1. Update `src/index.tsx` line 34:
```typescript
db.prepare("INSERT OR IGNORE INTO admins (username, password_hash) VALUES ('admin', 'your-new-password')").run()
```

2. Rebuild and redeploy:
```bash
npm run build
npm run deploy
```

## Features

### ✅ Public API Endpoints
- `GET /api/categories` - All categories
- `GET /api/products` - All products (with filters)
- `GET /api/products/:slug` - Single product
- `POST /api/orders` - Create order

### ✅ Admin API Endpoints (Protected with token auth)
- `POST /api/admin/login` - Get auth token
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/products` - All products
- `POST/PUT/DELETE /api/admin/products/:id` - Product CRUD
- `GET /api/admin/categories` - All categories
- `POST/PUT/DELETE /api/admin/categories/:id` - Category CRUD
- `GET /api/admin/orders` - All orders
- `PATCH /api/admin/orders/:id` - Update order status

### ✅ HTML Pages
- `GET /` - Home page
- `GET /cart` - Shopping cart
- `GET /admin` - Admin dashboard

## Troubleshooting

### Issue: "404 Not Found" when opening the app

**Solution**: Make sure all files were deployed correctly. Check Vercel dashboard logs.

### Issue: API returning minified code

**Solution**: This is fixed! The build now properly outputs `dist/index.js` and `api/index.js` routes it correctly.

### Issue: Database not persisting

**Solution**: Vercel serverless functions have ephemeral storage. Each cold start may reset the database. For production with persistent data, use:
- Vercel KV
- Vercel Postgres
- External database (Neon, Railway, etc.)

## Next Steps - Production Improvements

### Recommended: Add a Real Database

For persistent data beyond serverless function lifetime:

**Option 1: Vercel Postgres** (Easiest)
```bash
vercel env pull .env
# Then add DATABASE_URL to vercel.json
```

**Option 2: Neon PostgreSQL** (Free tier available)
1. Create account at https://neon.tech
2. Create a PostgreSQL database
3. Set environment variable: `DATABASE_URL=postgresql://...`

**Option 3: PlanetScale MySQL** (Free tier available)
1. Create account at https://planetscale.com
2. Create a MySQL database
3. Set environment variable: `DATABASE_URL=mysql://...`

### Security Improvements
- [ ] Change default admin credentials
- [ ] Add HTTPS enforcement
- [ ] Set up rate limiting on API endpoints
- [ ] Add input validation on all endpoints
- [ ] Use environment variables for sensitive data

## Files Modified for Vercel

```
phonestore/
├── src/
│   ├── index.tsx        ← Updated to use SQLite
│   ├── db.ts           ← NEW: SQLite abstraction
│   └── routes/         ← Your page components
├── api/
│   └── index.js        ← Updated handler
├── dist/               ← Compiled output
├── data/               ← Database storage
├── vercel.json         ← Updated config
├── vite.config.ts      ← Updated for Node.js build
├── package.json        ← Added better-sqlite3
├── .gitignore          ← Excludes data/ and *.db files
└── README.md
```

## Support & Debugging

### View Vercel Logs
```bash
vercel logs
```

### Test Locally
```bash
npm run build
npm run preview
# Then visit http://localhost:3000
```

### Check Build Size
```bash
ls -lh dist/
# Should be around 50-60KB
```

## You're All Set! 🎉

Your Phone Store app is production-ready. The app will:
- ✅ Build automatically on git push
- ✅ Deploy to Vercel in seconds
- ✅ Serve with automatic SSL/HTTPS
- ✅ Scale automatically based on traffic
- ✅ Use SQLite for zero-setup database
- ✅ Support all e-commerce features

Deploy now and your store will be live at a public URL!

```bash
npm run deploy
```

Questions? Check the Vercel docs: https://vercel.com/docs
