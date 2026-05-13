/* ═══════════════════════════════════════════════════
   Phone Store Mourouj 6 — Main Application JS
   ═══════════════════════════════════════════════════ */

// ─── State ───
let cart = JSON.parse(localStorage.getItem('ps_cart') || '[]');
let allProducts = [];
let allCategories = [];
let currentFilter = 'all';
let productLimit = 12;

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initSearch();
  initAnimations();
  initCounters();
  initSwiper();
  updateCartBadge();
  loadData();
});

// ─── Preloader ───
function initPreloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  window.addEventListener('load', () => {
    setTimeout(() => pre.classList.add('hidden'), 800);
  });
  setTimeout(() => pre.classList.add('hidden'), 3000);
}

// ─── Navbar ───
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    lastScroll = y;
  });
  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });
}

// ─── Mobile Menu ───
function initMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.add('hidden');
      const icon = btn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

// ─── Search ───
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  if (!toggle || !overlay) return;
  toggle.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
    if (!overlay.classList.contains('hidden')) input.focus();
  });
  let debounce;
  if (input) {
    input.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => searchProducts(input.value), 300);
    });
  }
  document.addEventListener('click', (e) => {
    if (!overlay.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
      overlay.classList.add('hidden');
    }
  });
}

async function searchProducts(query) {
  const container = document.getElementById('searchResults');
  if (!container) return;
  if (!query || query.length < 2) { container.innerHTML = ''; return; }
  try {
    const res = await fetch('/api/products?search=' + encodeURIComponent(query) + '&limit=6');
    const products = await res.json();
    if (products.length === 0) {
      container.innerHTML = '<p class="text-white/40 text-sm py-3">Aucun produit trouvé</p>';
      return;
    }
    container.innerHTML = products.map(p => `
      <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors" onclick="openQuickView(${JSON.stringify(JSON.stringify(p))})">
        <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          ${p.image ? `<img src="${p.image}" class="w-full h-full object-cover rounded-lg" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-box text-white/30\\'></i>'">` : '<i class="fas fa-box text-white/30"></i>'}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white text-sm font-medium truncate">${p.name}</div>
          <div class="text-accent text-sm font-bold">${p.price.toFixed(2)} DT</div>
        </div>
        <button onclick="event.stopPropagation();addToCart(${JSON.stringify(JSON.stringify(p))})" class="text-white/40 hover:text-accent transition-colors p-2"><i class="fas fa-cart-plus"></i></button>
      </div>
    `).join('');
  } catch (e) { console.error(e); }
}

// ─── Load Data ───
async function loadData() {
  try {
    const [catRes, prodRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/products?limit=' + productLimit)
    ]);
    allCategories = await catRes.json();
    allProducts = await prodRes.json();
    renderCategories();
    renderFilters();
    renderProducts();
  } catch (e) {
    console.error('Error loading data:', e);
    // Show placeholder content
    renderPlaceholders();
  }
}

// ─── Render Categories ───
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = allCategories.map((c, i) => `
    <div class="category-card" onclick="filterByCategory('${c.slug}')" data-animate="fade-up" data-delay="${i * 50}" style="animation-delay:${i * 50}ms">
      <div class="icon-wrap"><i class="fas ${c.icon || 'fa-tag'}"></i></div>
      <div class="cat-name">${c.name}</div>
    </div>
  `).join('');
  // Re-init animations for new elements
  setTimeout(() => initAnimations(), 100);
}

// ─── Render Filters ───
function renderFilters() {
  const container = document.getElementById('productFilters');
  if (!container) return;
  container.innerHTML = `<button class="filter-btn active" data-filter="all" onclick="setFilter('all')">Tous</button>` +
    allCategories.map(c => `<button class="filter-btn" data-filter="${c.slug}" onclick="setFilter('${c.slug}')">${c.name}</button>`).join('');
}

function setFilter(slug) {
  currentFilter = slug;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === slug);
  });
  loadFilteredProducts();
}

function filterByCategory(slug) {
  setFilter(slug);
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

async function loadFilteredProducts() {
  try {
    const url = currentFilter === 'all' ? '/api/products?limit=' + productLimit : '/api/products?category=' + currentFilter + '&limit=' + productLimit;
    const res = await fetch(url);
    allProducts = await res.json();
    renderProducts();
  } catch (e) { console.error(e); }
}

// ─── Render Products ───
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  
  if (allProducts.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400"><i class="fas fa-box-open text-4xl mb-3"></i><p>Aucun produit trouvé dans cette catégorie</p></div>';
    return;
  }

  grid.innerHTML = allProducts.map((p, i) => {
    const discount = p.old_price ? Math.round((1 - p.price / p.old_price) * 100) : 0;
    const inCart = cart.find(c => c.id === p.id);
    return `
    <div class="product-card" data-animate="fade-up" style="animation-delay:${i * 60}ms">
      <div class="card-image">
        ${p.badge ? `<span class="card-badge ${discount > 0 ? 'sale' : ''}">${p.badge}</span>` : (discount > 0 ? `<span class="card-badge sale">-${discount}%</span>` : '')}
        <div class="card-actions">
          <button onclick="openQuickView(${escapeAttr(JSON.stringify(p))})" title="Aperçu rapide"><i class="fas fa-eye text-gray-600"></i></button>
        </div>
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.parentElement.querySelector('.product-icon').style.display='block'"><i class="fas fa-box product-icon" style="display:none"></i>` : `<i class="fas fa-box product-icon"></i>`}
      </div>
      <div class="card-body">
        <div class="card-category">${p.category_name || ''}</div>
        <h3 class="card-title">${p.name}</h3>
        <div class="card-prices">
          <span class="card-price">${p.price.toFixed(2)} DT</span>
          ${p.old_price ? `<span class="card-old-price">${p.old_price.toFixed(2)} DT</span>` : ''}
          ${discount > 0 ? `<span class="card-discount">-${discount}%</span>` : ''}
        </div>
        ${p.in_stock ?
          `<button class="add-to-cart ${inCart ? 'added' : ''}" onclick="addToCart(${escapeAttr(JSON.stringify(p))})" id="atc-${p.id}">
            ${inCart ? '<i class="fas fa-check"></i> Ajouté' : '<i class="fas fa-cart-plus"></i> Ajouter au panier'}
          </button>` :
          `<button class="add-to-cart opacity-50 cursor-not-allowed" disabled><i class="fas fa-times"></i> Rupture de stock</button>`
        }
      </div>
    </div>`;
  }).join('');
  
  setTimeout(() => initAnimations(), 100);
}

function escapeAttr(str) {
  return "'" + str.replace(/'/g, "\\'").replace(/"/g, '&quot;') + "'";
}

function renderPlaceholders() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = Array(8).fill(0).map(() => `
    <div class="product-card">
      <div class="card-image"><div class="skeleton w-full h-full"></div></div>
      <div class="card-body">
        <div class="skeleton h-3 w-16 mb-2"></div>
        <div class="skeleton h-4 w-full mb-2"></div>
        <div class="skeleton h-5 w-20 mb-3"></div>
        <div class="skeleton h-10 w-full rounded-lg"></div>
      </div>
    </div>
  `).join('');
}

// ─── Load More ───
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    productLimit += 12;
    await loadFilteredProducts();
  });
}

// ─── Quick View ───
function openQuickView(productStr) {
  const p = typeof productStr === 'string' ? JSON.parse(productStr) : productStr;
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!modal || !content) return;
  const discount = p.old_price ? Math.round((1 - p.price / p.old_price) * 100) : 0;
  content.innerHTML = `
    <div class="quick-view-img">
      ${p.image ? `<img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">` : '<i class="fas fa-box text-6xl text-gray-300"></i>'}
    </div>
    <div class="p-6">
      <span class="text-xs font-semibold text-brand uppercase tracking-wider">${p.category_name || ''}</span>
      <h2 class="text-xl font-bold mt-1 mb-3">${p.name}</h2>
      <p class="text-gray-500 text-sm leading-relaxed mb-4">${p.description || 'Produit de qualité premium disponible chez Phone Store Mourouj 6.'}</p>
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl font-black text-brand">${p.price.toFixed(2)} DT</span>
        ${p.old_price ? `<span class="text-lg text-gray-400 line-through">${p.old_price.toFixed(2)} DT</span>` : ''}
        ${discount > 0 ? `<span class="bg-red-100 text-red-600 px-2 py-1 rounded-md text-xs font-bold">-${discount}%</span>` : ''}
      </div>
      <div class="flex items-center gap-2 mb-4">
        ${p.in_stock ? '<span class="text-green-600 text-sm font-medium"><i class="fas fa-check-circle mr-1"></i>En stock</span>' : '<span class="text-red-500 text-sm font-medium"><i class="fas fa-times-circle mr-1"></i>Rupture de stock</span>'}
      </div>
      ${p.in_stock ? `<button onclick="addToCart('${JSON.stringify(p).replace(/'/g, "\\'")}');closeQuickView()" class="w-full bg-brand hover:bg-brand-light text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]"><i class="fas fa-cart-plus mr-2"></i>Ajouter au panier</button>` : ''}
      <a href="https://wa.me/21654663209?text=${encodeURIComponent('Bonjour, je suis intéressé par: ' + p.name)}" target="_blank" class="block text-center mt-3 text-sm text-green-600 hover:text-green-700 font-medium"><i class="fab fa-whatsapp mr-1"></i>Commander via WhatsApp</a>
    </div>
  `;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ─── Cart System ───
function addToCart(productStr) {
  const p = typeof productStr === 'string' ? JSON.parse(productStr) : productStr;
  const existing = cart.find(c => c.id === p.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 });
  }
  saveCart();
  updateCartBadge();
  
  // Update button visual
  const btn = document.getElementById('atc-' + p.id);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Ajouté';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter au panier';
    }, 2000);
  }
  
  showToast('Produit ajouté au panier !');
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateQuantity(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) { removeFromCart(id); return; }
  saveCart();
  updateCartBadge();
  renderCart();
}

function saveCart() {
  localStorage.setItem('ps_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ─── Cart Page Rendering ───
function renderCart() {
  const empty = document.getElementById('cartEmpty');
  const full = document.getElementById('cartFull');
  const items = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('totalPrice');
  
  if (!empty || !full) return;

  if (cart.length === 0) {
    empty.classList.remove('hidden');
    full.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  full.classList.remove('hidden');

  if (items) {
    items.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">` : '<i class="fas fa-box text-gray-300 text-xl"></i>'}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-sm truncate">${item.name}</h3>
          <div class="text-brand font-bold mt-1">${item.price.toFixed(2)} DT</div>
        </div>
        <div class="flex items-center gap-2">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="w-8 text-center font-semibold text-sm">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <div class="text-right">
          <div class="font-bold text-sm">${(item.price * item.quantity).toFixed(2)} DT</div>
          <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-600 text-xs mt-1 transition-colors"><i class="fas fa-trash mr-1"></i>Supprimer</button>
        </div>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (subtotalEl) subtotalEl.textContent = total.toFixed(2) + ' DT';
  if (totalEl) totalEl.textContent = total.toFixed(2) + ' DT';
  
  const checkoutTotal = document.getElementById('checkoutTotal');
  if (checkoutTotal) checkoutTotal.textContent = total.toFixed(2) + ' DT';
}

// ─── Checkout ───
function showCheckout() {
  const section = document.getElementById('checkoutSection');
  if (section) {
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

async function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';

  const form = document.getElementById('checkoutForm');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: form.customer_name.value,
        customer_phone: form.customer_phone.value,
        customer_address: form.customer_address.value,
        customer_note: form.customer_note.value,
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        total: total
      })
    });
    const data = await res.json();
    
    if (data.success) {
      document.getElementById('orderNumber').textContent = data.order_number;
      document.getElementById('cartContent').classList.add('hidden');
      document.getElementById('checkoutSection').classList.add('hidden');
      document.getElementById('orderSuccess').classList.remove('hidden');
      
      // Clear cart
      cart = [];
      saveCart();
      updateCartBadge();
    } else {
      alert('Erreur: ' + (data.error || 'Veuillez réessayer'));
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Confirmer la commande';
    }
  } catch (err) {
    alert('Erreur de connexion. Veuillez réessayer.');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Confirmer la commande';
  }
}

// ─── Toast Notification ───
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification fixed top-24 right-4 z-[300] bg-surface text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium transform translate-x-full transition-transform duration-300';
  toast.innerHTML = `<i class="fas fa-check-circle text-green-400"></i>${message}`;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });
  
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── FAQ Toggle ───
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isActive) item.classList.add('active');
}

// ─── Scroll Animations ───
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0');
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-animate]:not(.visible)').forEach(el => observer.observe(el));
}

// ─── Animated Counters ───
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const decimal = parseInt(el.dataset.decimal || '0');
  const duration = 2000;
  const start = performance.now();
  
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = eased * target;
    
    if (decimal > 0) {
      el.textContent = current.toFixed(decimal);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
    
    if (progress < 1) requestAnimationFrame(update);
    else {
      if (decimal > 0) el.textContent = target.toFixed(decimal);
      else el.textContent = target.toLocaleString();
      if (target > 100) el.textContent += '+';
    }
  }
  requestAnimationFrame(update);
}

// ─── Swiper ───
function initSwiper() {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.reviewsSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

// ─── Smooth scroll for anchor links ───
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
});
