export const cartPage = () => `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Panier — Phone Store Mourouj 6</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='20' width='100' height='100' fill='%230052B5'/><text x='50' y='68' text-anchor='middle' font-size='50' fill='white'>PS</text></svg>">
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config={theme:{extend:{colors:{brand:'#0052B5','brand-light':'#1a6fd4','brand-dark':'#003d8a',accent:'#FFD54A','accent-dark':'#e6b800',surface:'#0a0f1a','surface-light':'#111827','surface-card':'#1a2236'}}}}</script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/styles.css">
</head>
<body class="bg-gray-50 font-['Inter'] min-h-screen">

<!-- Navbar -->
<nav class="bg-surface sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="flex items-center gap-2 group">
        <svg width="30" height="36" viewBox="0 0 100 120" class="transition-transform group-hover:scale-110">
          <rect x="15" y="5" width="70" height="110" rx="15" fill="none" stroke="#FFD54A" stroke-width="6"/>
          <rect x="35" y="10" width="30" height="6" rx="3" fill="#FFD54A" opacity="0.5"/>
        </svg>
        <div><span class="text-lg font-bold text-white">Phone Store</span><span class="block text-[10px] text-accent -mt-1 tracking-widest">MOUROUJ 6</span></div>
      </a>
      <div class="flex items-center gap-4">
        <a href="/" class="text-white/60 hover:text-accent transition-colors text-sm"><i class="fas fa-arrow-left mr-2"></i>Retour à la boutique</a>
      </div>
    </div>
  </div>
</nav>

<div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
  <h1 class="text-2xl md:text-3xl font-bold mb-8"><i class="fas fa-shopping-bag text-brand mr-3"></i>Mon Panier</h1>

  <!-- Cart Items -->
  <div id="cartContent">
    <div id="cartEmpty" class="hidden text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <i class="fas fa-shopping-bag text-3xl text-gray-300"></i>
      </div>
      <h2 class="text-xl font-semibold text-gray-400 mb-2">Votre panier est vide</h2>
      <p class="text-gray-400 mb-6">Explorez nos produits et ajoutez vos articles préférés</p>
      <a href="/" class="btn-primary inline-flex"><i class="fas fa-bag-shopping mr-2"></i>Voir les produits</a>
    </div>

    <div id="cartFull" class="hidden">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items List -->
        <div class="lg:col-span-2">
          <div id="cartItems" class="space-y-3"></div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 class="font-bold text-lg mb-4">Résumé de la commande</h3>
            <div class="space-y-3 mb-4 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">Sous-total</span><span id="subtotal" class="font-semibold">0 DT</span></div>
              <div class="flex justify-between"><span class="text-gray-500">Livraison</span><span class="text-green-600 font-medium">Gratuit</span></div>
              <hr>
              <div class="flex justify-between text-lg"><span class="font-bold">Total</span><span id="totalPrice" class="font-bold text-brand">0 DT</span></div>
            </div>
            <button id="checkoutBtn" onclick="showCheckout()" class="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02]">
              <i class="fas fa-lock mr-2"></i>Passer la commande
            </button>
            <p class="text-center text-xs text-gray-400 mt-3"><i class="fas fa-shield-halved mr-1"></i>Paiement sécurisé à la livraison</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Checkout Form -->
  <div id="checkoutSection" class="hidden mt-8">
    <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 class="text-xl font-bold mb-6"><i class="fas fa-truck text-brand mr-2"></i>Informations de Livraison</h2>
      <form id="checkoutForm" onsubmit="submitOrder(event)" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
          <input type="text" name="customer_name" required placeholder="Votre nom complet" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone *</label>
          <input type="tel" name="customer_phone" required placeholder="XX XXX XXX" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Adresse de livraison *</label>
          <textarea name="customer_address" required rows="3" placeholder="Adresse complète de livraison" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Note (optionnel)</label>
          <input type="text" name="customer_note" placeholder="Instructions supplémentaires..." class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all">
        </div>
        <div class="bg-gray-50 rounded-xl p-4 text-sm">
          <div class="flex justify-between mb-1"><span class="text-gray-500">Total</span><span id="checkoutTotal" class="font-bold text-brand text-lg">0 DT</span></div>
          <p class="text-gray-400 text-xs">Paiement à la livraison</p>
        </div>
        <button type="submit" id="submitBtn" class="w-full bg-accent hover:bg-accent-dark text-surface py-3.5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]">
          <i class="fas fa-check-circle mr-2"></i>Confirmer la commande
        </button>
      </form>
    </div>
  </div>

  <!-- Order Success -->
  <div id="orderSuccess" class="hidden text-center py-16">
    <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
      <i class="fas fa-check text-4xl text-green-500"></i>
    </div>
    <h2 class="text-2xl font-bold text-green-600 mb-2">Commande Confirmée !</h2>
    <p class="text-gray-500 mb-2">Numéro de commande: <span id="orderNumber" class="font-bold text-brand"></span></p>
    <p class="text-gray-400 text-sm mb-8">Nous vous contacterons bientôt pour confirmer la livraison.</p>
    <a href="/" class="btn-primary inline-flex"><i class="fas fa-bag-shopping mr-2"></i>Continuer les achats</a>
  </div>
</div>

<script src="/static/app.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => { renderCart(); });
</script>
</body>
</html>`
