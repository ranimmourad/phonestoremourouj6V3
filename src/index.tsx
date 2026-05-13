import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = { DB: D1Database }
type Variables = { admin: boolean }

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.use('/api/*', cors())

// ─── DB Init ───
let dbInitialized = false
const initDB = async (db: D1Database) => {
  if (!db || dbInitialized) return
  try {
    await db.prepare('SELECT 1 FROM categories LIMIT 1').first()
    dbInitialized = true
  } catch {
    // Tables don't exist, create them
    await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, name_ar TEXT, slug TEXT UNIQUE NOT NULL, icon TEXT, image TEXT, sort_order INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, name_ar TEXT, slug TEXT UNIQUE NOT NULL, description TEXT, price REAL NOT NULL, old_price REAL, category_id INTEGER, image TEXT, images TEXT, in_stock INTEGER DEFAULT 1, featured INTEGER DEFAULT 0, badge TEXT, sort_order INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES categories(id));
      CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, order_number TEXT UNIQUE NOT NULL, customer_name TEXT NOT NULL, customer_phone TEXT NOT NULL, customer_address TEXT NOT NULL, customer_note TEXT, items TEXT NOT NULL, total REAL NOT NULL, status TEXT DEFAULT 'pending', seen INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, message TEXT NOT NULL, data TEXT, seen INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    `)
    // Seed admin
    await db.prepare("INSERT OR IGNORE INTO admins (username, password_hash) VALUES ('admin', 'admin123')").run()
    // Seed categories
    const cats = [
      ['Chargeurs','شواحن','chargeurs','fa-bolt',1],['Câbles USB','كوابل USB','cables-usb','fa-plug',2],
      ['Adaptateurs','محولات','adaptateurs','fa-right-left',3],['Coques & Étuis','أغطية و حافظات','coques-etuis','fa-mobile-screen',4],
      ['Protection Écran','حماية الشاشة','protection-ecran','fa-shield-halved',5],['Écouteurs','سماعات','ecouteurs','fa-headphones',6],
      ['EarPods','إيربودز','earpods','fa-earlybirds',7],['Montres Connectées','ساعات ذكية','montres-connectees','fa-clock',8],
      ['Ring Lights','إضاءة تصوير','ring-lights','fa-lightbulb',9],['Accessoires Gaming','إكسسوارات قيمينغ','gaming','fa-gamepad',10],
      ['Accessoires PC','إكسسوارات كمبيوتر','accessoires-pc','fa-laptop',11]
    ]
    for (const c of cats) {
      await db.prepare('INSERT OR IGNORE INTO categories (name,name_ar,slug,icon,sort_order) VALUES (?,?,?,?,?)').bind(...c).run()
    }
    // Seed products
    const prods: [string,string,string,number,number,number,number,number,string|null,string][] = [
      ['Chargeur Rapide USB-C 25W','chargeur-rapide-usbc-25w','Chargeur rapide compatible Samsung, iPhone 15+ et tous les appareils USB-C.',45,65,1,1,1,'Promo','/static/products/charger-25w.svg'],
      ['Chargeur iPhone 20W Original','chargeur-iphone-20w','Chargeur Apple original 20W avec technologie de charge rapide.',55,75,1,1,1,'Best-seller','/static/products/charger-iphone.svg'],
      ['Chargeur Sans Fil MagSafe 15W','chargeur-magsafe-15w','Chargeur sans fil magnétique compatible MagSafe.',65,89,1,1,0,null,'/static/products/charger-wireless.svg'],
      ['Câble USB-C vers USB-C 2m','cable-usbc-usbc-2m','Câble USB-C haute qualité, charge rapide 60W. Nylon tressé résistant.',25,35,2,1,1,'Nouveau','/static/products/cable-usbc.svg'],
      ['Câble Lightning Original 1m','cable-lightning-1m','Câble Lightning Apple certifié MFi.',30,45,2,1,1,null,'/static/products/cable-lightning.svg'],
      ['Câble USB-C vers Lightning','cable-usbc-lightning','Câble de charge rapide USB-C vers Lightning pour iPhone.',35,50,2,1,0,null,'/static/products/cable-usbc-light.svg'],
      ['Adaptateur USB-C Hub 6-en-1','adaptateur-usbc-hub','Hub USB-C multifonction: HDMI 4K, USB 3.0, lecteur carte SD, charge PD 100W.',85,120,3,1,1,'Top','/static/products/hub-usbc.svg'],
      ['Adaptateur Jack 3.5mm Lightning','adaptateur-jack-lightning','Adaptateur audio Lightning vers jack 3.5mm pour iPhone.',15,25,3,1,0,null,'/static/products/adapter-jack.svg'],
      ['Coque iPhone 15 Pro Max Premium','coque-iphone15-promax','Coque de protection premium en silicone avec intérieur microfibre.',35,55,4,1,1,'Populaire','/static/products/case-iphone15.svg'],
      ['Coque Samsung S24 Ultra Clear','coque-samsung-s24','Coque transparente ultra-fine pour Samsung Galaxy S24 Ultra.',30,45,4,1,1,null,'/static/products/case-samsung.svg'],
      ['Coque Antichoc Militaire','coque-antichoc-militaire','Protection militaire grade MIL-STD-810G. Résiste aux chutes de 3 mètres.',45,65,4,1,0,'Résistant','/static/products/case-military.svg'],
      ['Verre Trempé iPhone 15 Pro','verre-trempe-iphone15','Protection écran en verre trempé 9H. Anti-empreintes.',20,30,5,1,1,null,'/static/products/screen-iphone.svg'],
      ['Film Protection Samsung S24','film-samsung-s24','Film de protection incurvé pour Samsung Galaxy S24.',25,35,5,1,0,null,'/static/products/screen-samsung.svg'],
      ['AirPods Pro 2 Compatible','airpods-pro-2','Écouteurs sans fil avec réduction de bruit active. Son spatial.',89,130,7,1,1,'Best-seller','/static/products/airpods.svg'],
      ['Casque Bluetooth Pro','casque-bluetooth-pro','Casque sans fil avec réduction de bruit active, autonomie 30h.',120,180,6,1,1,'Premium','/static/products/headphone-bt.svg'],
      ['Écouteurs Filaires USB-C','ecouteurs-filaires-usbc','Écouteurs intra-auriculaires USB-C avec micro intégré.',25,35,6,1,0,null,'/static/products/earphone-usbc.svg'],
      ['Smart Watch Sport Pro','smartwatch-sport-pro','Montre connectée avec GPS intégré, écran AMOLED 1.8". Autonomie 7 jours.',150,220,8,1,1,'Nouveau','/static/products/smartwatch.svg'],
      ['Smart Watch Série Classic','smartwatch-classic','Montre connectée élégante, notifications, appels Bluetooth.',95,140,8,1,0,null,'/static/products/smartwatch-classic.svg'],
      ['Ring Light 10" LED Pro','ring-light-10-pro','Anneau lumineux LED 10 pouces avec trépied réglable.',75,110,9,1,1,null,'/static/products/ringlight.svg'],
      ['Manette Gaming Bluetooth','manette-gaming-bt','Manette de jeu Bluetooth compatible Android, iOS et PC.',65,95,10,1,1,'Gamer','/static/products/gamepad.svg'],
      ['Clavier Mécanique RGB Gaming','clavier-mecanique-rgb','Clavier mécanique rétroéclairé RGB avec switches mécaniques.',110,160,10,1,0,null,'/static/products/keyboard.svg'],
      ['Souris Sans Fil Ergonomique','souris-ergonomique','Souris sans fil 2.4GHz avec récepteur USB. 3 niveaux DPI.',35,50,11,1,1,null,'/static/products/mouse.svg'],
      ['Support Laptop Aluminium','support-laptop-alu','Support ordinateur portable en aluminium réglable.',55,80,11,1,0,null,'/static/products/laptop-stand.svg'],
      ['Tapis de Souris XXL Gaming','tapis-souris-xxl','Tapis de souris gaming XXL 80x30cm avec éclairage RGB.',40,60,10,1,1,'RGB','/static/products/mousepad.svg'],
    ]
    for (const p of prods) {
      await db.prepare('INSERT OR IGNORE INTO products (name,slug,description,price,old_price,category_id,in_stock,featured,badge,image) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(...p).run()
    }
    dbInitialized = true
  }
}

// Auto-init DB on every request (checks once, fast after first)
app.use('*', async (c, next) => {
  await initDB(c.env.DB)
  await next()
})

// ─── Auth Middleware ───
const authMiddleware = async (c: any, next: any) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return c.json({ error: 'Non autorisé' }, 401)
  try {
    const [user, pass] = atob(token).split(':')
    const admin = await c.env.DB.prepare('SELECT * FROM admins WHERE username = ? AND password_hash = ?').bind(user, pass).first()
    if (!admin) return c.json({ error: 'Identifiants invalides' }, 401)
    c.set('admin', true)
    await next()
  } catch { return c.json({ error: 'Token invalide' }, 401) }
}

// ─── Public API ───

// Get all categories
app.get('/api/categories', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM categories ORDER BY sort_order').all()
  return c.json(results)
})

// Get all products (with filters)
app.get('/api/products', async (c) => {
  const category = c.req.query('category')
  const featured = c.req.query('featured')
  const search = c.req.query('search')
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')

  let query = 'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1'
  const params: any[] = []

  if (category) { query += ' AND c.slug = ?'; params.push(category) }
  if (featured === '1') { query += ' AND p.featured = 1' }
  if (search) { query += ' AND (p.name LIKE ? OR p.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`) }

  query += ' ORDER BY p.featured DESC, p.sort_order, p.created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json(results)
})

// Get single product
app.get('/api/products/:slug', async (c) => {
  const slug = c.req.param('slug')
  const product = await c.env.DB.prepare('SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ?').bind(slug).first()
  if (!product) return c.json({ error: 'Produit non trouvé' }, 404)
  return c.json(product)
})

// Create order
app.post('/api/orders', async (c) => {
  const body = await c.req.json()
  const { customer_name, customer_phone, customer_address, customer_note, items, total } = body

  if (!customer_name || !customer_phone || !customer_address || !items || !total) {
    return c.json({ error: 'Champs obligatoires manquants' }, 400)
  }

  const orderNumber = 'PS-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase()

  await c.env.DB.prepare(
    'INSERT INTO orders (order_number, customer_name, customer_phone, customer_address, customer_note, items, total) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(orderNumber, customer_name, customer_phone, customer_address, customer_note || '', JSON.stringify(items), total).run()

  // Create notification
  await c.env.DB.prepare(
    'INSERT INTO notifications (type, message, data) VALUES (?, ?, ?)'
  ).bind('new_order', `Nouvelle commande ${orderNumber} de ${customer_name}`, JSON.stringify({ order_number: orderNumber, total })).run()

  return c.json({ success: true, order_number: orderNumber })
})

// ─── Admin Auth ───
app.post('/api/admin/login', async (c) => {
  const { username, password } = await c.req.json()
  const admin = await c.env.DB.prepare('SELECT * FROM admins WHERE username = ? AND password_hash = ?').bind(username, password).first()
  if (!admin) return c.json({ error: 'Identifiants invalides' }, 401)
  const token = btoa(`${username}:${password}`)
  return c.json({ success: true, token })
})

// ─── Admin Protected Routes ───

// Dashboard stats
app.get('/api/admin/stats', authMiddleware, async (c) => {
  const totalProducts = await c.env.DB.prepare('SELECT COUNT(*) as count FROM products').first()
  const totalOrders = await c.env.DB.prepare('SELECT COUNT(*) as count FROM orders').first()
  const pendingOrders = await c.env.DB.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").first()
  const totalRevenue = await c.env.DB.prepare('SELECT COALESCE(SUM(total), 0) as sum FROM orders').first()
  const recentOrders = await c.env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 10').all()
  const unseenNotifications = await c.env.DB.prepare('SELECT COUNT(*) as count FROM notifications WHERE seen = 0').first()

  return c.json({
    totalProducts: (totalProducts as any)?.count || 0,
    totalOrders: (totalOrders as any)?.count || 0,
    pendingOrders: (pendingOrders as any)?.count || 0,
    totalRevenue: (totalRevenue as any)?.sum || 0,
    recentOrders: recentOrders.results,
    unseenNotifications: (unseenNotifications as any)?.count || 0
  })
})

// Get all orders
app.get('/api/admin/orders', authMiddleware, async (c) => {
  const status = c.req.query('status')
  let query = 'SELECT * FROM orders'
  const params: any[] = []
  if (status) { query += ' WHERE status = ?'; params.push(status) }
  query += ' ORDER BY created_at DESC'
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json(results)
})

// Update order status
app.patch('/api/admin/orders/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const { status } = await c.req.json()
  await c.env.DB.prepare('UPDATE orders SET status = ? WHERE id = ?').bind(status, id).run()
  return c.json({ success: true })
})

// Get notifications
app.get('/api/admin/notifications', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50').all()
  return c.json(results)
})

// Mark notifications as seen
app.post('/api/admin/notifications/seen', authMiddleware, async (c) => {
  await c.env.DB.prepare('UPDATE notifications SET seen = 1 WHERE seen = 0').run()
  return c.json({ success: true })
})

// Admin CRUD Products
app.get('/api/admin/products', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.created_at DESC').all()
  return c.json(results)
})

app.post('/api/admin/products', authMiddleware, async (c) => {
  const body = await c.req.json()
  const { name, name_ar, slug, description, price, old_price, category_id, image, in_stock, featured, badge } = body
  const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  await c.env.DB.prepare(
    'INSERT INTO products (name, name_ar, slug, description, price, old_price, category_id, image, in_stock, featured, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(name, name_ar || '', finalSlug, description || '', price, old_price || null, category_id, image || '', in_stock ?? 1, featured ?? 0, badge || null).run()
  return c.json({ success: true })
})

app.put('/api/admin/products/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const { name, name_ar, description, price, old_price, category_id, image, in_stock, featured, badge } = body
  await c.env.DB.prepare(
    'UPDATE products SET name=?, name_ar=?, description=?, price=?, old_price=?, category_id=?, image=?, in_stock=?, featured=?, badge=? WHERE id=?'
  ).bind(name, name_ar || '', description || '', price, old_price || null, category_id, image || '', in_stock ?? 1, featured ?? 0, badge || null, id).run()
  return c.json({ success: true })
})

app.delete('/api/admin/products/:id', authMiddleware, async (c) => {
  await c.env.DB.prepare('DELETE FROM products WHERE id = ?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

// Admin CRUD Categories
app.get('/api/admin/categories', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM categories ORDER BY sort_order').all()
  return c.json(results)
})

app.post('/api/admin/categories', authMiddleware, async (c) => {
  const { name, name_ar, slug, icon, sort_order } = await c.req.json()
  const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  await c.env.DB.prepare('INSERT INTO categories (name, name_ar, slug, icon, sort_order) VALUES (?, ?, ?, ?, ?)').bind(name, name_ar || '', finalSlug, icon || '', sort_order || 0).run()
  return c.json({ success: true })
})

app.put('/api/admin/categories/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  const { name, name_ar, icon, sort_order } = await c.req.json()
  await c.env.DB.prepare('UPDATE categories SET name=?, name_ar=?, icon=?, sort_order=? WHERE id=?').bind(name, name_ar || '', icon || '', sort_order || 0, id).run()
  return c.json({ success: true })
})

app.delete('/api/admin/categories/:id', authMiddleware, async (c) => {
  await c.env.DB.prepare('DELETE FROM categories WHERE id = ?').bind(c.req.param('id')).run()
  return c.json({ success: true })
})

// ─── HTML Pages ───

// Admin Dashboard
app.get('/admin', async (c) => {
  const html = await import('./routes/admin').then(m => m.adminPage())
  return c.html(html)
})

// Main website
app.get('/', async (c) => {
  const html = await import('./routes/home').then(m => m.homePage())
  return c.html(html)
})

// Cart page
app.get('/cart', async (c) => {
  const html = await import('./routes/cart').then(m => m.cartPage())
  return c.html(html)
})

// Catch-all for SPA-like navigation
app.get('*', async (c) => {
  const path = c.req.path
  if (path.startsWith('/static/') || path.startsWith('/api/')) return c.notFound()
  const html = await import('./routes/home').then(m => m.homePage())
  return c.html(html)
})

export default app
