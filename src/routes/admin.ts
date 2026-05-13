export const adminPage = () => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin — Phone Store Mourouj 6</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='20' width='100' height='100' fill='%230052B5'/><text x='50' y='68' text-anchor='middle' font-size='50' fill='white'>PS</text></svg>">
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config={theme:{extend:{colors:{brand:'#0052B5','brand-light':'#1a6fd4',accent:'#FFD54A',surface:'#0a0f1a','surface-light':'#111827','surface-card':'#1a2236'}}}}</script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f1f5f9}
.admin-sidebar{background:#0a0f1a;width:260px;min-height:100vh;position:fixed;left:0;top:0;z-index:50;transition:transform .3s}
.sidebar-link{display:flex;align-items:center;gap:12px;padding:10px 20px;color:rgba(255,255,255,.5);font-size:14px;transition:all .2s;border-radius:8px;margin:2px 12px}
.sidebar-link:hover,.sidebar-link.active{color:#fff;background:rgba(255,255,255,.08)}
.sidebar-link.active{color:#FFD54A;background:rgba(0,82,181,.3)}
.stat-card{background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;transition:all .3s}
.stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,0,0,.08)}
.table-container{background:#fff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden}
.table-container table{width:100%;border-collapse:collapse}
.table-container th{background:#f8fafc;padding:12px 16px;text-align:left;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.5px}
.table-container td{padding:12px 16px;border-top:1px solid #f1f5f9;font-size:14px}
.badge{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}
.badge-pending{background:#FEF3C7;color:#92400E}.badge-confirmed{background:#D1FAE5;color:#065F46}
.badge-shipped{background:#DBEAFE;color:#1E40AF}.badge-delivered{background:#D1FAE5;color:#065F46}
.badge-cancelled{background:#FEE2E2;color:#991B1B}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100;display:none;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.modal-overlay.show{display:flex}
.modal{background:#fff;border-radius:20px;padding:32px;max-width:600px;width:95%;max-height:90vh;overflow-y:auto}
.form-input{width:100%;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;font-size:14px;transition:all .2s}
.form-input:focus{outline:none;border-color:#0052B5;box-shadow:0 0 0 3px rgba(0,82,181,.15)}
.notif-dot{width:8px;height:8px;background:#ef4444;border-radius:50%;position:absolute;top:0;right:0;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@media(max-width:1024px){.admin-sidebar{transform:translateX(-100%)}.admin-sidebar.open{transform:translateX(0)}.admin-main{margin-left:0!important}}
</style>
</head>
<body>

<!-- Login Screen -->
<div id="loginScreen" class="min-h-screen flex items-center justify-center bg-surface p-4">
  <div class="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
    <div class="text-center mb-8">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand/10 flex items-center justify-center">
        <i class="fas fa-shield-halved text-2xl text-brand"></i>
      </div>
      <h1 class="text-xl font-bold">Administration</h1>
      <p class="text-gray-400 text-sm mt-1">Phone Store Mourouj 6</p>
    </div>
    <form onsubmit="adminLogin(event)">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Utilisateur</label>
          <input type="text" id="loginUser" required class="form-input" placeholder="admin" value="admin">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Mot de passe</label>
          <input type="password" id="loginPass" required class="form-input" placeholder="Mot de passe">
        </div>
        <button type="submit" class="w-full bg-brand text-white py-3 rounded-xl font-semibold hover:bg-brand-light transition-colors">
          <i class="fas fa-sign-in-alt mr-2"></i>Connexion
        </button>
      </div>
      <p id="loginError" class="text-red-500 text-sm text-center mt-3 hidden">Identifiants invalides</p>
    </form>
  </div>
</div>

<!-- Admin Dashboard -->
<div id="adminDashboard" class="hidden">
  <!-- Sidebar -->
  <aside class="admin-sidebar" id="sidebar">
    <div class="p-5 border-b border-white/10">
      <div class="flex items-center gap-2">
        <svg width="28" height="34" viewBox="0 0 100 120"><rect x="15" y="5" width="70" height="110" rx="15" fill="none" stroke="#FFD54A" stroke-width="6"/></svg>
        <div><span class="text-white font-bold text-sm">Phone Store</span><span class="block text-accent text-[9px] tracking-widest">ADMIN PANEL</span></div>
      </div>
    </div>
    <nav class="py-4">
      <button onclick="showSection('dashboard')" class="sidebar-link active" data-section="dashboard"><i class="fas fa-chart-pie w-5"></i>Dashboard</button>
      <button onclick="showSection('orders')" class="sidebar-link" data-section="orders"><i class="fas fa-shopping-bag w-5"></i>Commandes<span id="ordersBadge" class="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full hidden">0</span></button>
      <button onclick="showSection('products')" class="sidebar-link" data-section="products"><i class="fas fa-box w-5"></i>Produits</button>
      <button onclick="showSection('categories')" class="sidebar-link" data-section="categories"><i class="fas fa-tags w-5"></i>Catégories</button>
      <button onclick="showSection('notifications')" class="sidebar-link relative" data-section="notifications"><i class="fas fa-bell w-5"></i>Notifications<span id="notifDot" class="notif-dot hidden"></span></button>
    </nav>
    <div class="absolute bottom-4 left-0 right-0 px-4">
      <a href="/" class="sidebar-link text-xs"><i class="fas fa-external-link w-5"></i>Voir le site</a>
      <button onclick="adminLogout()" class="sidebar-link text-xs text-red-400 hover:!text-red-300"><i class="fas fa-sign-out-alt w-5"></i>Déconnexion</button>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="admin-main" style="margin-left:260px;min-height:100vh">
    <!-- Top Bar -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div class="flex items-center gap-4">
        <button onclick="document.getElementById('sidebar').classList.toggle('open')" class="lg:hidden text-gray-500"><i class="fas fa-bars text-xl"></i></button>
        <h2 id="sectionTitle" class="text-lg font-bold">Dashboard</h2>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="refreshData()" class="p-2 text-gray-400 hover:text-brand transition-colors" title="Rafraîchir"><i class="fas fa-sync-alt"></i></button>
        <div class="relative">
          <button onclick="showSection('notifications')" class="p-2 text-gray-400 hover:text-brand transition-colors relative">
            <i class="fas fa-bell"></i>
            <span id="notifCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center hidden">0</span>
          </button>
        </div>
        <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center"><span class="text-white text-xs font-bold">A</span></div>
      </div>
    </header>

    <div class="p-4 md:p-6">
      <!-- Dashboard Section -->
      <div id="sec-dashboard">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><i class="fas fa-box text-blue-600"></i></div>
              <span class="text-xs text-green-500 font-medium"><i class="fas fa-arrow-up"></i> Actif</span>
            </div>
            <div id="statProducts" class="text-2xl font-bold">0</div>
            <div class="text-xs text-gray-400 mt-1">Produits</div>
          </div>
          <div class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center"><i class="fas fa-shopping-bag text-green-600"></i></div>
            </div>
            <div id="statOrders" class="text-2xl font-bold">0</div>
            <div class="text-xs text-gray-400 mt-1">Commandes</div>
          </div>
          <div class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center"><i class="fas fa-clock text-orange-600"></i></div>
            </div>
            <div id="statPending" class="text-2xl font-bold">0</div>
            <div class="text-xs text-gray-400 mt-1">En attente</div>
          </div>
          <div class="stat-card">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center"><i class="fas fa-coins text-purple-600"></i></div>
            </div>
            <div id="statRevenue" class="text-2xl font-bold">0 DT</div>
            <div class="text-xs text-gray-400 mt-1">Revenu total</div>
          </div>
        </div>
        <div class="table-container">
          <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="font-semibold">Commandes récentes</h3>
          </div>
          <div class="overflow-x-auto"><table><thead><tr><th>N° Commande</th><th>Client</th><th>Total</th><th>Statut</th><th>Date</th></tr></thead><tbody id="recentOrdersBody"></tbody></table></div>
        </div>
      </div>

      <!-- Orders Section -->
      <div id="sec-orders" class="hidden">
        <div class="flex flex-wrap gap-2 mb-4">
          <button onclick="filterOrders('')" class="px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium">Toutes</button>
          <button onclick="filterOrders('pending')" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">En attente</button>
          <button onclick="filterOrders('confirmed')" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">Confirmées</button>
          <button onclick="filterOrders('shipped')" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">Expédiées</button>
          <button onclick="filterOrders('delivered')" class="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200">Livrées</button>
        </div>
        <div class="table-container">
          <div class="overflow-x-auto"><table><thead><tr><th>N°</th><th>Client</th><th>Téléphone</th><th>Adresse</th><th>Total</th><th>Statut</th><th>Date</th><th>Actions</th></tr></thead><tbody id="ordersBody"></tbody></table></div>
        </div>
      </div>

      <!-- Products Section -->
      <div id="sec-products" class="hidden">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Gestion des Produits</h3>
          <button onclick="openProductModal()" class="bg-brand text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-light transition-colors"><i class="fas fa-plus mr-2"></i>Ajouter</button>
        </div>
        <div class="table-container">
          <div class="overflow-x-auto"><table><thead><tr><th>Produit</th><th>Prix</th><th>Catégorie</th><th>Stock</th><th>Vedette</th><th>Actions</th></tr></thead><tbody id="productsBody"></tbody></table></div>
        </div>
      </div>

      <!-- Categories Section -->
      <div id="sec-categories" class="hidden">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Gestion des Catégories</h3>
          <button onclick="openCategoryModal()" class="bg-brand text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-light transition-colors"><i class="fas fa-plus mr-2"></i>Ajouter</button>
        </div>
        <div class="table-container">
          <div class="overflow-x-auto"><table><thead><tr><th>Nom</th><th>Slug</th><th>Icône</th><th>Ordre</th><th>Actions</th></tr></thead><tbody id="categoriesBody"></tbody></table></div>
        </div>
      </div>

      <!-- Notifications Section -->
      <div id="sec-notifications" class="hidden">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Notifications</h3>
          <button onclick="markNotifsSeen()" class="text-sm text-brand hover:underline">Tout marquer comme lu</button>
        </div>
        <div id="notifList" class="space-y-3"></div>
      </div>
    </div>
  </main>
</div>

<!-- Product Modal -->
<div id="productModal" class="modal-overlay">
  <div class="modal">
    <div class="flex items-center justify-between mb-6">
      <h3 id="productModalTitle" class="text-lg font-bold">Ajouter un Produit</h3>
      <button onclick="closeProductModal()" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times text-xl"></i></button>
    </div>
    <form onsubmit="saveProduct(event)" class="space-y-4">
      <input type="hidden" id="prodId">
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Nom *</label><input type="text" id="prodName" required class="form-input"></div>
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Nom (arabe)</label><input type="text" id="prodNameAr" class="form-input" dir="rtl"></div>
      </div>
      <div><label class="block text-sm font-medium text-gray-600 mb-1">Description</label><textarea id="prodDesc" rows="3" class="form-input resize-none"></textarea></div>
      <div class="grid grid-cols-3 gap-4">
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Prix (DT) *</label><input type="number" id="prodPrice" required step="0.01" class="form-input"></div>
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Ancien prix</label><input type="number" id="prodOldPrice" step="0.01" class="form-input"></div>
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Catégorie</label><select id="prodCategory" class="form-input"><option value="">Choisir...</option></select></div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Image URL</label><input type="text" id="prodImage" class="form-input" placeholder="/static/products/..."></div>
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Badge</label><input type="text" id="prodBadge" class="form-input" placeholder="Promo, Nouveau..."></div>
        <div class="flex items-end gap-4 pb-1">
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="prodStock" checked class="w-4 h-4 text-brand rounded"><span class="text-sm">En stock</span></label>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="prodFeatured" class="w-4 h-4 text-brand rounded"><span class="text-sm">Vedette</span></label>
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeProductModal()" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50">Annuler</button>
        <button type="submit" class="flex-1 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand-light">Enregistrer</button>
      </div>
    </form>
  </div>
</div>

<!-- Category Modal -->
<div id="categoryModal" class="modal-overlay">
  <div class="modal" style="max-width:450px">
    <div class="flex items-center justify-between mb-6">
      <h3 id="catModalTitle" class="text-lg font-bold">Ajouter une Catégorie</h3>
      <button onclick="closeCategoryModal()" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times text-xl"></i></button>
    </div>
    <form onsubmit="saveCategory(event)" class="space-y-4">
      <input type="hidden" id="catId">
      <div><label class="block text-sm font-medium text-gray-600 mb-1">Nom *</label><input type="text" id="catName" required class="form-input"></div>
      <div><label class="block text-sm font-medium text-gray-600 mb-1">Nom (arabe)</label><input type="text" id="catNameAr" class="form-input" dir="rtl"></div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Icône FA</label><input type="text" id="catIcon" class="form-input" placeholder="fa-bolt"></div>
        <div><label class="block text-sm font-medium text-gray-600 mb-1">Ordre</label><input type="number" id="catOrder" class="form-input" value="0"></div>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="button" onclick="closeCategoryModal()" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50">Annuler</button>
        <button type="submit" class="flex-1 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand-light">Enregistrer</button>
      </div>
    </form>
  </div>
</div>

<!-- Order Detail Modal -->
<div id="orderModal" class="modal-overlay">
  <div class="modal">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold"><i class="fas fa-shopping-bag text-brand mr-2"></i>Détails Commande</h3>
      <button onclick="document.getElementById('orderModal').classList.remove('show')" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times text-xl"></i></button>
    </div>
    <div id="orderDetail"></div>
  </div>
</div>

<script>
const API = '/api/admin';
let adminToken = localStorage.getItem('ps_admin_token') || '';
let allCategories = [];
let pollInterval;

// Auth
function authHeaders() { return { 'Authorization': 'Bearer ' + adminToken, 'Content-Type': 'application/json' } }

async function adminLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  try {
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: user, password: pass }) });
    const data = await res.json();
    if (data.token) {
      adminToken = data.token;
      localStorage.setItem('ps_admin_token', adminToken);
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('adminDashboard').classList.remove('hidden');
      loadDashboard();
      startPolling();
    } else {
      document.getElementById('loginError').classList.remove('hidden');
    }
  } catch { document.getElementById('loginError').classList.remove('hidden'); }
}

function adminLogout() {
  adminToken = '';
  localStorage.removeItem('ps_admin_token');
  clearInterval(pollInterval);
  location.reload();
}

// Check existing session
if (adminToken) {
  fetch(API + '/stats', { headers: authHeaders() }).then(r => {
    if (r.ok) {
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('adminDashboard').classList.remove('hidden');
      loadDashboard();
      startPolling();
    } else { adminToken = ''; localStorage.removeItem('ps_admin_token'); }
  }).catch(() => {});
}

function startPolling() { pollInterval = setInterval(() => { loadStats(); }, 15000); }

// Navigation
function showSection(name) {
  document.querySelectorAll('[id^="sec-"]').forEach(s => s.classList.add('hidden'));
  document.getElementById('sec-' + name).classList.remove('hidden');
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.querySelector('[data-section="'+name+'"]')?.classList.add('active');
  const titles = { dashboard: 'Dashboard', orders: 'Commandes', products: 'Produits', categories: 'Catégories', notifications: 'Notifications' };
  document.getElementById('sectionTitle').textContent = titles[name] || name;
  if (name === 'orders') loadOrders();
  if (name === 'products') loadProducts();
  if (name === 'categories') loadCategories();
  if (name === 'notifications') loadNotifications();
}

async function loadDashboard() { await loadStats(); await loadCategories(); }
async function refreshData() { await loadStats(); }

async function loadStats() {
  try {
    const res = await fetch(API + '/stats', { headers: authHeaders() });
    const d = await res.json();
    document.getElementById('statProducts').textContent = d.totalProducts;
    document.getElementById('statOrders').textContent = d.totalOrders;
    document.getElementById('statPending').textContent = d.pendingOrders;
    document.getElementById('statRevenue').textContent = d.totalRevenue.toFixed(2) + ' DT';
    const badge = document.getElementById('ordersBadge');
    if (d.pendingOrders > 0) { badge.textContent = d.pendingOrders; badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
    const nc = document.getElementById('notifCount');
    const nd = document.getElementById('notifDot');
    if (d.unseenNotifications > 0) { nc.textContent = d.unseenNotifications; nc.classList.remove('hidden'); nd.classList.remove('hidden'); } else { nc.classList.add('hidden'); nd.classList.add('hidden'); }
    const tbody = document.getElementById('recentOrdersBody');
    tbody.innerHTML = (d.recentOrders || []).map(o => '<tr class="hover:bg-gray-50"><td class="font-mono text-xs font-semibold text-brand">' + o.order_number + '</td><td>' + o.customer_name + '</td><td class="font-semibold">' + o.total.toFixed(2) + ' DT</td><td><span class="badge badge-' + o.status + '">' + statusLabel(o.status) + '</span></td><td class="text-gray-400 text-xs">' + new Date(o.created_at).toLocaleString('fr-TN') + '</td></tr>').join('');
  } catch(e) { console.error(e); }
}

function statusLabel(s) { return { pending: 'En attente', confirmed: 'Confirmée', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée' }[s] || s; }

// Orders
async function loadOrders(status) {
  const url = status ? API + '/orders?status=' + status : API + '/orders';
  const res = await fetch(url, { headers: authHeaders() });
  const orders = await res.json();
  const tbody = document.getElementById('ordersBody');
  tbody.innerHTML = orders.map(o => '<tr class="hover:bg-gray-50 cursor-pointer" onclick="viewOrder(' + JSON.stringify(JSON.stringify(o)) + ')"><td class="font-mono text-xs font-semibold text-brand">' + o.order_number + '</td><td class="font-medium">' + o.customer_name + '</td><td>' + o.customer_phone + '</td><td class="text-xs text-gray-500 max-w-[150px] truncate">' + o.customer_address + '</td><td class="font-semibold">' + o.total.toFixed(2) + ' DT</td><td><span class="badge badge-' + o.status + '">' + statusLabel(o.status) + '</span></td><td class="text-xs text-gray-400">' + new Date(o.created_at).toLocaleString('fr-TN') + '</td><td><select onchange="updateOrderStatus(' + o.id + ', this.value);event.stopPropagation()" class="text-xs border rounded-lg px-2 py-1"><option value="pending"' + (o.status==='pending'?' selected':'') + '>En attente</option><option value="confirmed"' + (o.status==='confirmed'?' selected':'') + '>Confirmée</option><option value="shipped"' + (o.status==='shipped'?' selected':'') + '>Expédiée</option><option value="delivered"' + (o.status==='delivered'?' selected':'') + '>Livrée</option><option value="cancelled"' + (o.status==='cancelled'?' selected':'') + '>Annulée</option></select></td></tr>').join('');
}

function filterOrders(status) { loadOrders(status); }

async function updateOrderStatus(id, status) {
  await fetch(API + '/orders/' + id, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) });
  loadOrders(); loadStats();
}

function viewOrder(jsonStr) {
  const o = JSON.parse(jsonStr);
  let items = [];
  try { items = JSON.parse(o.items); } catch {}
  document.getElementById('orderDetail').innerHTML = '<div class="space-y-4"><div class="grid grid-cols-2 gap-4 text-sm"><div><span class="text-gray-400">N° Commande</span><div class="font-bold text-brand">' + o.order_number + '</div></div><div><span class="text-gray-400">Statut</span><div><span class="badge badge-' + o.status + '">' + statusLabel(o.status) + '</span></div></div><div><span class="text-gray-400">Client</span><div class="font-semibold">' + o.customer_name + '</div></div><div><span class="text-gray-400">Téléphone</span><div><a href="tel:' + o.customer_phone + '" class="text-brand">' + o.customer_phone + '</a></div></div><div class="col-span-2"><span class="text-gray-400">Adresse</span><div>' + o.customer_address + '</div></div>' + (o.customer_note ? '<div class="col-span-2"><span class="text-gray-400">Note</span><div class="italic">' + o.customer_note + '</div></div>' : '') + '</div><hr><div class="space-y-2">' + items.map(it => '<div class="flex items-center justify-between py-2"><div><span class="font-medium">' + it.name + '</span><span class="text-gray-400 text-sm ml-2">x' + it.quantity + '</span></div><div class="font-semibold">' + (it.price * it.quantity).toFixed(2) + ' DT</div></div>').join('') + '</div><hr><div class="flex justify-between text-lg font-bold"><span>Total</span><span class="text-brand">' + o.total.toFixed(2) + ' DT</span></div><div class="text-xs text-gray-400 mt-2">' + new Date(o.created_at).toLocaleString('fr-TN') + '</div></div>';
  document.getElementById('orderModal').classList.add('show');
}

// Products
async function loadProducts() {
  const res = await fetch(API + '/products', { headers: authHeaders() });
  const products = await res.json();
  const tbody = document.getElementById('productsBody');
  tbody.innerHTML = products.map(p => {
    const pJson = JSON.stringify(p).replace(/"/g, '&quot;');
    return '<tr class="hover:bg-gray-50"><td><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">' + (p.image ? '<img src="' + p.image + '" class="w-full h-full object-cover" onerror="this.style.display=&quot;none&quot;">' : '<i class="fas fa-box text-gray-300"></i>') + '</div><div><div class="font-medium text-sm">' + p.name + '</div><div class="text-xs text-gray-400">' + (p.slug || '') + '</div></div></div></td><td><div class="font-semibold text-brand">' + p.price.toFixed(2) + ' DT</div>' + (p.old_price ? '<div class="text-xs text-gray-400 line-through">' + p.old_price.toFixed(2) + ' DT</div>' : '') + '</td><td class="text-sm">' + (p.category_name || '-') + '</td><td>' + (p.in_stock ? '<span class="text-green-600 text-xs font-medium"><i class="fas fa-check-circle mr-1"></i>Oui</span>' : '<span class="text-red-500 text-xs font-medium"><i class="fas fa-times-circle mr-1"></i>Non</span>') + '</td><td>' + (p.featured ? '<i class="fas fa-star text-yellow-400"></i>' : '<i class="far fa-star text-gray-300"></i>') + '</td><td><div class="flex gap-2"><button onclick="editProduct(' + pJson + ')" class="text-brand hover:text-brand-light text-sm"><i class="fas fa-edit"></i></button><button onclick="deleteProduct(' + p.id + ')" class="text-red-400 hover:text-red-600 text-sm"><i class="fas fa-trash"></i></button></div></td></tr>';
  }).join('');
}

function openProductModal(data) {
  document.getElementById('productModalTitle').textContent = data ? 'Modifier le Produit' : 'Ajouter un Produit';
  document.getElementById('prodId').value = data?.id || '';
  document.getElementById('prodName').value = data?.name || '';
  document.getElementById('prodNameAr').value = data?.name_ar || '';
  document.getElementById('prodDesc').value = data?.description || '';
  document.getElementById('prodPrice').value = data?.price || '';
  document.getElementById('prodOldPrice').value = data?.old_price || '';
  document.getElementById('prodImage').value = data?.image || '';
  document.getElementById('prodBadge').value = data?.badge || '';
  document.getElementById('prodStock').checked = data?.in_stock !== 0;
  document.getElementById('prodFeatured').checked = data?.featured === 1;
  // Fill category select
  const sel = document.getElementById('prodCategory');
  sel.innerHTML = '<option value="">Choisir...</option>' + allCategories.map(c => '<option value="' + c.id + '"' + (data?.category_id == c.id ? ' selected' : '') + '>' + c.name + '</option>').join('');
  document.getElementById('productModal').classList.add('show');
}

function closeProductModal() { document.getElementById('productModal').classList.remove('show'); }

function editProduct(data) { openProductModal(typeof data === 'string' ? JSON.parse(data) : data); }

async function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('prodId').value;
  const body = {
    name: document.getElementById('prodName').value,
    name_ar: document.getElementById('prodNameAr').value,
    description: document.getElementById('prodDesc').value,
    price: parseFloat(document.getElementById('prodPrice').value),
    old_price: parseFloat(document.getElementById('prodOldPrice').value) || null,
    category_id: parseInt(document.getElementById('prodCategory').value) || null,
    image: document.getElementById('prodImage').value,
    badge: document.getElementById('prodBadge').value || null,
    in_stock: document.getElementById('prodStock').checked ? 1 : 0,
    featured: document.getElementById('prodFeatured').checked ? 1 : 0
  };
  const url = id ? API + '/products/' + id : API + '/products';
  const method = id ? 'PUT' : 'POST';
  await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
  closeProductModal(); loadProducts(); loadStats();
}

async function deleteProduct(id) {
  if (!confirm('Supprimer ce produit ?')) return;
  await fetch(API + '/products/' + id, { method: 'DELETE', headers: authHeaders() });
  loadProducts(); loadStats();
}

// Categories
async function loadCategories() {
  const res = await fetch(API + '/categories', { headers: authHeaders() });
  allCategories = await res.json();
  const tbody = document.getElementById('categoriesBody');
  if (tbody) {
    tbody.innerHTML = allCategories.map(c => {
      const cJson = JSON.stringify(c).replace(/"/g, '&quot;');
      return '<tr class="hover:bg-gray-50"><td class="font-medium">' + c.name + (c.name_ar ? ' <span class="text-gray-400 text-xs">(' + c.name_ar + ')</span>' : '') + '</td><td class="font-mono text-xs text-gray-500">' + c.slug + '</td><td><i class="fas ' + (c.icon || 'fa-tag') + ' text-brand"></i> ' + (c.icon || '') + '</td><td>' + c.sort_order + '</td><td><div class="flex gap-2"><button onclick="editCategory(' + cJson + ')" class="text-brand hover:text-brand-light text-sm"><i class="fas fa-edit"></i></button><button onclick="deleteCategory(' + c.id + ')" class="text-red-400 hover:text-red-600 text-sm"><i class="fas fa-trash"></i></button></div></td></tr>';
    }).join('');
  }
}

function openCategoryModal(data) {
  document.getElementById('catModalTitle').textContent = data ? 'Modifier la Catégorie' : 'Ajouter une Catégorie';
  document.getElementById('catId').value = data?.id || '';
  document.getElementById('catName').value = data?.name || '';
  document.getElementById('catNameAr').value = data?.name_ar || '';
  document.getElementById('catIcon').value = data?.icon || '';
  document.getElementById('catOrder').value = data?.sort_order || 0;
  document.getElementById('categoryModal').classList.add('show');
}

function closeCategoryModal() { document.getElementById('categoryModal').classList.remove('show'); }
function editCategory(data) { openCategoryModal(typeof data === 'string' ? JSON.parse(data) : data); }

async function saveCategory(e) {
  e.preventDefault();
  const id = document.getElementById('catId').value;
  const body = {
    name: document.getElementById('catName').value,
    name_ar: document.getElementById('catNameAr').value,
    icon: document.getElementById('catIcon').value,
    sort_order: parseInt(document.getElementById('catOrder').value) || 0
  };
  const url = id ? API + '/categories/' + id : API + '/categories';
  const method = id ? 'PUT' : 'POST';
  await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
  closeCategoryModal(); loadCategories();
}

async function deleteCategory(id) {
  if (!confirm('Supprimer cette catégorie ?')) return;
  await fetch(API + '/categories/' + id, { method: 'DELETE', headers: authHeaders() });
  loadCategories();
}

// Notifications
async function loadNotifications() {
  const res = await fetch(API + '/notifications', { headers: authHeaders() });
  const notifs = await res.json();
  document.getElementById('notifList').innerHTML = notifs.length ? notifs.map(n => '<div class="bg-white rounded-xl p-4 border border-gray-100 ' + (n.seen ? 'opacity-60' : '') + '"><div class="flex items-start gap-3"><div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ' + (n.type === 'new_order' ? 'bg-green-100' : 'bg-blue-100') + '"><i class="fas ' + (n.type === 'new_order' ? 'fa-shopping-bag text-green-600' : 'fa-bell text-blue-600') + '"></i></div><div class="flex-1"><p class="text-sm font-medium">' + n.message + '</p><p class="text-xs text-gray-400 mt-1">' + new Date(n.created_at).toLocaleString('fr-TN') + '</p></div>' + (!n.seen ? '<span class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></span>' : '') + '</div></div>').join('') : '<div class="text-center py-12 text-gray-400"><i class="fas fa-bell-slash text-3xl mb-3"></i><p>Aucune notification</p></div>';
}

async function markNotifsSeen() {
  await fetch(API + '/notifications/seen', { method: 'POST', headers: authHeaders() });
  loadNotifications(); loadStats();
}
</script>
</body>
</html>`
