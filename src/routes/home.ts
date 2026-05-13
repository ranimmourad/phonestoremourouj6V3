export const homePage = () => `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Phone Store Mourouj 6 — Accessoires & Réparation</title>
<meta name="description" content="Phone Store Mourouj 6 - Votre boutique de confiance pour accessoires tech, réparation téléphones et ordinateurs en Tunisie. Qualité premium, prix imbattables.">
<meta name="keywords" content="phone store, mourouj, réparation téléphone, accessoires, tunisie, chargeur, coque, écouteurs">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='20' width='100' height='100' fill='%230052B5'/><text x='50' y='68' text-anchor='middle' font-size='50' fill='white'>PS</text></svg>">
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config={theme:{extend:{colors:{brand:'#0052B5','brand-light':'#1a6fd4','brand-dark':'#003d8a',accent:'#FFD54A','accent-dark':'#e6b800',surface:'#0a0f1a','surface-light':'#111827','surface-card':'#1a2236'}}}}</script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<link rel="stylesheet" href="/static/styles.css">
</head>
<body class="bg-white text-gray-900 font-['Inter'] overflow-x-hidden">

<!-- Preloader -->
<div id="preloader" class="fixed inset-0 z-[9999] bg-surface flex items-center justify-center">
  <div class="text-center">
    <div class="logo-pulse mb-4">
      <svg width="80" height="80" viewBox="0 0 100 120" class="mx-auto">
        <rect x="15" y="5" width="70" height="110" rx="15" fill="none" stroke="#FFD54A" stroke-width="6"/>
        <rect x="35" y="10" width="30" height="6" rx="3" fill="#FFD54A" opacity="0.5"/>
      </svg>
    </div>
    <div class="text-white text-xl font-bold tracking-wider">PHONE STORE</div>
    <div class="loading-bar mt-4 mx-auto"></div>
  </div>
</div>

<!-- Navbar -->
<nav id="navbar" class="fixed top-0 w-full z-[100] transition-all duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16 md:h-20">
      <a href="/" class="flex items-center gap-2 group">
        <svg width="36" height="44" viewBox="0 0 100 120" class="transition-transform group-hover:scale-110">
          <rect x="15" y="5" width="70" height="110" rx="15" fill="none" stroke="#FFD54A" stroke-width="6"/>
          <rect x="35" y="10" width="30" height="6" rx="3" fill="#FFD54A" opacity="0.5"/>
        </svg>
        <div>
          <span class="text-lg md:text-xl font-bold text-white">Phone Store</span>
          <span class="block text-[10px] text-accent font-medium -mt-1 tracking-widest">MOUROUJ 6</span>
        </div>
      </a>
      <div class="hidden lg:flex items-center gap-1">
        <a href="#hero" class="nav-link">Accueil</a>
        <a href="#products" class="nav-link">Produits</a>
        <a href="#services" class="nav-link">Services</a>
        <a href="#reviews" class="nav-link">Avis</a>
        <a href="#faq" class="nav-link">FAQ</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <div class="flex items-center gap-3">
        <button id="searchToggle" class="p-2 text-white/80 hover:text-accent transition-colors"><i class="fas fa-search text-lg"></i></button>
        <a href="/cart" class="relative p-2 text-white/80 hover:text-accent transition-colors">
          <i class="fas fa-shopping-bag text-lg"></i>
          <span id="cartCount" class="absolute -top-1 -right-1 bg-accent text-surface text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
        </a>
        <a href="tel:54663209" class="hidden md:flex items-center gap-2 bg-accent hover:bg-accent-dark text-surface px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105">
          <i class="fas fa-phone"></i> Appelez-nous
        </a>
        <button id="menuBtn" class="lg:hidden p-2 text-white"><i class="fas fa-bars text-xl"></i></button>
      </div>
    </div>
  </div>
  <!-- Search Overlay -->
  <div id="searchOverlay" class="hidden absolute top-full left-0 w-full bg-surface-light/95 backdrop-blur-xl border-t border-white/10 p-4">
    <div class="max-w-2xl mx-auto relative">
      <input type="text" id="searchInput" placeholder="Rechercher des produits..." class="w-full bg-white/10 text-white border border-white/20 rounded-xl px-5 py-3 pr-12 focus:outline-none focus:border-accent placeholder-white/40">
      <i class="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-white/40"></i>
    </div>
    <div id="searchResults" class="max-w-2xl mx-auto mt-3"></div>
  </div>
  <!-- Mobile Menu -->
  <div id="mobileMenu" class="hidden lg:hidden bg-surface-light/98 backdrop-blur-xl border-t border-white/10">
    <div class="px-4 py-6 space-y-1">
      <a href="#hero" class="mobile-nav-link">Accueil</a>
      <a href="#products" class="mobile-nav-link">Produits</a>
      <a href="#services" class="mobile-nav-link">Services</a>
      <a href="#reviews" class="mobile-nav-link">Avis</a>
      <a href="#faq" class="mobile-nav-link">FAQ</a>
      <a href="#contact" class="mobile-nav-link">Contact</a>
      <a href="/cart" class="mobile-nav-link"><i class="fas fa-shopping-bag mr-2"></i>Panier</a>
    </div>
  </div>
</nav>

<!-- HERO SECTION -->
<section id="hero" class="relative min-h-screen flex items-center bg-surface overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-brand/30 via-surface to-surface-light"></div>
    <div class="hero-grid"></div>
    <div class="floating-orb orb-1"></div>
    <div class="floating-orb orb-2"></div>
    <div class="floating-orb orb-3"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="text-center lg:text-left" data-animate="fade-right">
        <div class="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6">
          <span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          <span class="text-accent text-sm font-medium">N°1 à El Mourouj</span>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
          <span class="block">Votre Expert</span>
          <span class="text-gradient block">Tech & Réparation</span>
          <span class="block text-2xl sm:text-3xl lg:text-4xl font-light text-white/70 mt-2">à El Mourouj</span>
        </h1>
        <p class="text-white/60 text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
          Accessoires premium, réparation professionnelle de téléphones et ordinateurs. Service rapide et garanti.
        </p>
        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
          <a href="#products" class="btn-primary"><i class="fas fa-bag-shopping mr-2"></i>Voir les Produits</a>
          <a href="#services" class="btn-outline"><i class="fas fa-tools mr-2"></i>Nos Services</a>
        </div>
        <div class="flex items-center gap-8 mt-10 justify-center lg:justify-start">
          <div class="text-center"><div class="text-2xl font-bold text-white counter" data-target="5000">0</div><div class="text-xs text-white/50">Clients Satisfaits</div></div>
          <div class="w-px h-10 bg-white/20"></div>
          <div class="text-center"><div class="text-2xl font-bold text-white counter" data-target="3000">0</div><div class="text-xs text-white/50">Réparations</div></div>
          <div class="w-px h-10 bg-white/20"></div>
          <div class="text-center"><div class="text-2xl font-bold text-accent counter" data-target="4.9" data-decimal="1">0</div><div class="text-xs text-white/50">Note Google</div></div>
        </div>
      </div>
      <div class="relative hidden lg:flex justify-center" data-animate="fade-left">
        <div class="hero-phone-mockup">
          <div class="phone-frame">
            <div class="phone-screen">
              <div class="phone-content">
                <div class="p-4 bg-gradient-to-b from-brand to-brand-dark text-white text-center">
                  <i class="fas fa-mobile-screen-button text-4xl mb-2 text-accent"></i>
                  <div class="text-lg font-bold">Phone Store</div>
                  <div class="text-xs text-white/70">Mourouj 6</div>
                </div>
                <div class="p-3 space-y-2">
                  <div class="glass-mini rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center"><i class="fas fa-bolt text-accent"></i></div>
                    <div><div class="text-xs font-semibold text-white">Charge Rapide</div><div class="text-[10px] text-white/50">45 DT</div></div>
                  </div>
                  <div class="glass-mini rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center"><i class="fas fa-headphones text-accent"></i></div>
                    <div><div class="text-xs font-semibold text-white">AirPods Pro</div><div class="text-[10px] text-white/50">89 DT</div></div>
                  </div>
                  <div class="glass-mini rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center"><i class="fas fa-clock text-accent"></i></div>
                    <div><div class="text-xs font-semibold text-white">Smart Watch</div><div class="text-[10px] text-white/50">150 DT</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="floating-card card-1 glass-card p-3">
            <div class="flex items-center gap-2"><i class="fas fa-shield-halved text-green-400"></i><span class="text-white text-xs font-medium">Garantie incluse</span></div>
          </div>
          <div class="floating-card card-2 glass-card p-3">
            <div class="flex items-center gap-2"><i class="fas fa-truck-fast text-accent"></i><span class="text-white text-xs font-medium">Livraison rapide</span></div>
          </div>
          <div class="floating-card card-3 glass-card p-3">
            <div class="flex items-center gap-2"><i class="fas fa-star text-yellow-400"></i><span class="text-white text-xs font-medium">4.9 ★ Avis</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
</section>

<!-- MARQUEE -->
<section class="bg-white py-4 border-y border-gray-100 overflow-hidden">
  <div class="marquee">
    <div class="marquee-content">
      <span class="marquee-item"><i class="fas fa-bolt text-brand mr-2"></i>Chargeurs Rapides</span>
      <span class="marquee-item"><i class="fas fa-mobile-screen text-brand mr-2"></i>Coques Premium</span>
      <span class="marquee-item"><i class="fas fa-headphones text-brand mr-2"></i>Écouteurs & EarPods</span>
      <span class="marquee-item"><i class="fas fa-clock text-brand mr-2"></i>Montres Connectées</span>
      <span class="marquee-item"><i class="fas fa-gamepad text-brand mr-2"></i>Gaming</span>
      <span class="marquee-item"><i class="fas fa-screwdriver-wrench text-brand mr-2"></i>Réparation Express</span>
      <span class="marquee-item"><i class="fas fa-laptop text-brand mr-2"></i>Accessoires PC</span>
      <span class="marquee-item"><i class="fas fa-shield-halved text-brand mr-2"></i>Protection Écran</span>
      <span class="marquee-item"><i class="fas fa-plug text-brand mr-2"></i>Câbles & Adaptateurs</span>
      <span class="marquee-item"><i class="fas fa-lightbulb text-brand mr-2"></i>Ring Lights</span>
      <span class="marquee-item"><i class="fas fa-bolt text-brand mr-2"></i>Chargeurs Rapides</span>
      <span class="marquee-item"><i class="fas fa-mobile-screen text-brand mr-2"></i>Coques Premium</span>
      <span class="marquee-item"><i class="fas fa-headphones text-brand mr-2"></i>Écouteurs & EarPods</span>
      <span class="marquee-item"><i class="fas fa-clock text-brand mr-2"></i>Montres Connectées</span>
      <span class="marquee-item"><i class="fas fa-gamepad text-brand mr-2"></i>Gaming</span>
      <span class="marquee-item"><i class="fas fa-screwdriver-wrench text-brand mr-2"></i>Réparation Express</span>
      <span class="marquee-item"><i class="fas fa-laptop text-brand mr-2"></i>Accessoires PC</span>
      <span class="marquee-item"><i class="fas fa-shield-halved text-brand mr-2"></i>Protection Écran</span>
    </div>
  </div>
</section>

<!-- CATEGORIES -->
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12" data-animate="fade-up">
      <span class="text-brand text-sm font-semibold tracking-widest uppercase">Catégories</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2">Explorez nos Catégories</h2>
      <p class="text-gray-500 mt-3 max-w-xl mx-auto">Trouvez exactement ce dont vous avez besoin parmi notre large gamme de produits tech</p>
    </div>
    <div id="categoriesGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    </div>
  </div>
</section>

<!-- FEATURED PRODUCTS -->
<section id="products" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12" data-animate="fade-up">
      <div>
        <span class="text-brand text-sm font-semibold tracking-widest uppercase">Boutique</span>
        <h2 class="text-3xl md:text-4xl font-bold mt-2">Produits Vedettes</h2>
        <p class="text-gray-500 mt-3">Les meilleurs accessoires tech sélectionnés pour vous</p>
      </div>
      <div class="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 scrollbar-hide" id="productFilters">
        <button class="filter-btn active" data-filter="all">Tous</button>
      </div>
    </div>
    <div id="productsGrid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    </div>
    <div class="text-center mt-12">
      <button id="loadMore" class="btn-outline"><i class="fas fa-plus mr-2"></i>Voir Plus</button>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="py-16 md:py-24 bg-surface relative overflow-hidden">
  <div class="absolute inset-0 opacity-30"><div class="hero-grid"></div></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16" data-animate="fade-up">
      <span class="text-accent text-sm font-semibold tracking-widest uppercase">Services</span>
      <h2 class="text-3xl md:text-4xl font-bold text-white mt-2">Nos Services Professionnels</h2>
      <p class="text-white/50 mt-3 max-w-xl mx-auto">Des experts certifiés à votre service pour toutes vos réparations</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="service-card group" data-animate="fade-up" data-delay="0">
        <div class="service-icon bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white"><i class="fas fa-mobile-screen-button text-2xl"></i></div>
        <h3 class="text-white font-bold text-lg mb-2">Réparation Téléphones</h3>
        <p class="text-white/50 text-sm leading-relaxed">Écran cassé, batterie, connecteur de charge, caméra, boutons... Toutes marques: iPhone, Samsung, Huawei, Xiaomi.</p>
        <ul class="mt-4 space-y-1.5 text-white/40 text-xs">
          <li><i class="fas fa-check text-accent mr-2"></i>Diagnostic gratuit</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Pièces d'origine</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Garantie 6 mois</li>
        </ul>
      </div>
      <div class="service-card group" data-animate="fade-up" data-delay="100">
        <div class="service-icon bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white"><i class="fas fa-laptop text-2xl"></i></div>
        <h3 class="text-white font-bold text-lg mb-2">Réparation PC</h3>
        <p class="text-white/50 text-sm leading-relaxed">Formatage, installation Windows/Mac, remplacement disque dur SSD, RAM, nettoyage et maintenance.</p>
        <ul class="mt-4 space-y-1.5 text-white/40 text-xs">
          <li><i class="fas fa-check text-accent mr-2"></i>Toutes marques</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Service rapide</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Devis gratuit</li>
        </ul>
      </div>
      <div class="service-card group" data-animate="fade-up" data-delay="200">
        <div class="service-icon bg-green-500/20 text-green-400 group-hover:bg-green-500 group-hover:text-white"><i class="fas fa-bag-shopping text-2xl"></i></div>
        <h3 class="text-white font-bold text-lg mb-2">Vente d'Accessoires</h3>
        <p class="text-white/50 text-sm leading-relaxed">Large gamme d'accessoires: chargeurs, coques, écouteurs, câbles, montres connectées et plus encore.</p>
        <ul class="mt-4 space-y-1.5 text-white/40 text-xs">
          <li><i class="fas fa-check text-accent mr-2"></i>Produits certifiés</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Meilleurs prix</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Garantie produit</li>
        </ul>
      </div>
      <div class="service-card group" data-animate="fade-up" data-delay="300">
        <div class="service-icon bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"><i class="fas fa-headset text-2xl"></i></div>
        <h3 class="text-white font-bold text-lg mb-2">Support Technique</h3>
        <p class="text-white/50 text-sm leading-relaxed">Conseils personnalisés, assistance technique, configuration appareils et transfert de données.</p>
        <ul class="mt-4 space-y-1.5 text-white/40 text-xs">
          <li><i class="fas fa-check text-accent mr-2"></i>Conseils experts</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Disponibilité 6j/7</li>
          <li><i class="fas fa-check text-accent mr-2"></i>Suivi personnalisé</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- WHY CHOOSE US -->
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-16" data-animate="fade-up">
      <span class="text-brand text-sm font-semibold tracking-widest uppercase">Avantages</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2">Pourquoi Nous Choisir ?</h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="text-center group" data-animate="fade-up" data-delay="0">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand/10 flex items-center justify-center group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
          <i class="fas fa-award text-2xl text-brand group-hover:text-white transition-colors"></i>
        </div>
        <h3 class="font-bold text-lg mb-2">Qualité Garantie</h3>
        <p class="text-gray-500 text-sm">Produits certifiés et pièces d'origine pour toutes les réparations</p>
      </div>
      <div class="text-center group" data-animate="fade-up" data-delay="100">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
          <i class="fas fa-tags text-2xl text-green-600 group-hover:text-white transition-colors"></i>
        </div>
        <h3 class="font-bold text-lg mb-2">Meilleurs Prix</h3>
        <p class="text-gray-500 text-sm">Les prix les plus compétitifs de la zone avec des promotions régulières</p>
      </div>
      <div class="text-center group" data-animate="fade-up" data-delay="200">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
          <i class="fas fa-bolt text-2xl text-purple-600 group-hover:text-white transition-colors"></i>
        </div>
        <h3 class="font-bold text-lg mb-2">Service Rapide</h3>
        <p class="text-gray-500 text-sm">Réparation express en 30 minutes pour la plupart des interventions</p>
      </div>
      <div class="text-center group" data-animate="fade-up" data-delay="300">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
          <i class="fas fa-heart text-2xl text-orange-600 group-hover:text-white transition-colors"></i>
        </div>
        <h3 class="font-bold text-lg mb-2">Service Client</h3>
        <p class="text-gray-500 text-sm">Une équipe passionnée et à l'écoute pour vous conseiller</p>
      </div>
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section id="reviews" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12" data-animate="fade-up">
      <span class="text-brand text-sm font-semibold tracking-widest uppercase">Témoignages</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2">Ce que Disent nos Clients</h2>
      <div class="flex items-center justify-center gap-1 mt-4">
        <i class="fas fa-star text-yellow-400"></i>
        <i class="fas fa-star text-yellow-400"></i>
        <i class="fas fa-star text-yellow-400"></i>
        <i class="fas fa-star text-yellow-400"></i>
        <i class="fas fa-star text-yellow-400"></i>
        <span class="ml-2 text-gray-600 font-semibold">4.9/5 sur Google</span>
      </div>
    </div>
    <div class="swiper reviewsSwiper">
      <div class="swiper-wrapper pb-12">
        <div class="swiper-slide">
          <div class="review-card">
            <div class="flex gap-1 mb-4"><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i></div>
            <p class="text-gray-600 leading-relaxed mb-6 italic">"Je tiens à vous remercier pour votre excellent service. Votre professionnalisme et votre sérieux donnent vraiment confiance. Merci encore pour votre accueil et votre efficacité !"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center"><span class="text-brand font-bold text-sm">RB</span></div>
              <div><div class="font-semibold text-sm">Ranim Bach</div><div class="text-xs text-gray-400">Cliente vérifiée</div></div>
              <i class="fab fa-google ml-auto text-gray-300"></i>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="review-card">
            <div class="flex gap-1 mb-4"><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i></div>
            <p class="text-gray-600 leading-relaxed mb-6 italic">"Best phone repair shop. Very punctual, serious and helpful staff, and good prices. I highly recommend it"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><span class="text-green-600 font-bold text-sm">SE</span></div>
              <div><div class="font-semibold text-sm">Sana El Kadhi</div><div class="text-xs text-gray-400">Cliente vérifiée</div></div>
              <i class="fab fa-google ml-auto text-gray-300"></i>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="review-card">
            <div class="flex gap-1 mb-4"><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i></div>
            <p class="text-gray-600 leading-relaxed mb-6 italic">"Excellent customer service tfol metrabi w les prix ahsen haja fel zone"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"><span class="text-purple-600 font-bold text-sm">KZ</span></div>
              <div><div class="font-semibold text-sm">Kalil Zouaghia</div><div class="text-xs text-gray-400">Client vérifié</div></div>
              <i class="fab fa-google ml-auto text-gray-300"></i>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="review-card">
            <div class="flex gap-1 mb-4"><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i><i class="fas fa-star text-yellow-400"></i></div>
            <p class="text-gray-600 leading-relaxed mb-6 italic">"Service impeccable ! J'ai fait réparer mon iPhone en 20 minutes. Les prix sont très raisonnables et l'accueil est top. Je recommande vivement !"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"><span class="text-orange-600 font-bold text-sm">MA</span></div>
              <div><div class="font-semibold text-sm">Mohamed Amri</div><div class="text-xs text-gray-400">Client vérifié</div></div>
              <i class="fab fa-google ml-auto text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="py-16 md:py-24 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12" data-animate="fade-up">
      <span class="text-brand text-sm font-semibold tracking-widest uppercase">FAQ</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2">Questions Fréquentes</h2>
    </div>
    <div class="space-y-3" data-animate="fade-up">
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>Combien de temps prend une réparation d'écran ?</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer"><p>La plupart des réparations d'écran sont effectuées en 20 à 45 minutes selon le modèle. Pour les cas plus complexes, nous vous informons du délai exact après diagnostic.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>Offrez-vous une garantie sur les réparations ?</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer"><p>Oui, toutes nos réparations sont garanties 6 mois. Si un problème survient suite à notre intervention, nous le corrigeons gratuitement.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>Acceptez-vous les réparations sans rendez-vous ?</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer"><p>Absolument ! Vous pouvez passer directement au magasin. Le diagnostic est gratuit et immédiat. Nous sommes ouverts 6 jours sur 7.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>Quels modes de paiement acceptez-vous ?</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer"><p>Nous acceptons le paiement en espèces et par carte bancaire. Pour les commandes en ligne, le paiement se fait à la livraison.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>Livrez-vous dans toute la Tunisie ?</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer"><p>Oui, nous livrons partout en Tunisie. La livraison est gratuite dans la zone d'El Mourouj et ses environs. Pour les autres régions, des frais de livraison s'appliquent.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-btn" onclick="toggleFaq(this)">
          <span>Les accessoires vendus sont-ils d'origine ?</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer"><p>Nous proposons des accessoires originaux et des alternatives de haute qualité certifiées. Chaque produit est vérifié et garanti pour assurer votre satisfaction.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="py-16 bg-gradient-to-r from-brand to-brand-dark relative overflow-hidden">
  <div class="absolute inset-0 opacity-10"><div class="hero-grid"></div></div>
  <div class="relative max-w-3xl mx-auto px-4 text-center" data-animate="fade-up">
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Restez Connecté</h2>
    <p class="text-white/70 mb-8">Recevez nos offres exclusives et nouveautés directement</p>
    <div class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input type="email" placeholder="Votre adresse email" class="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent backdrop-blur-sm">
      <button class="bg-accent hover:bg-accent-dark text-surface px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 whitespace-nowrap">S'abonner</button>
    </div>
  </div>
</section>

<!-- CONTACT & MAP -->
<section id="contact" class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12" data-animate="fade-up">
      <span class="text-brand text-sm font-semibold tracking-widest uppercase">Contact</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2">Contactez-Nous</h2>
    </div>
    <div class="grid lg:grid-cols-2 gap-8">
      <div data-animate="fade-right">
        <div class="grid sm:grid-cols-2 gap-4 mb-6">
          <a href="tel:54663209" class="contact-card group">
            <div class="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand transition-colors"><i class="fas fa-phone text-brand group-hover:text-white transition-colors"></i></div>
            <div><div class="text-xs text-gray-400">Téléphone</div><div class="font-semibold">54 663 209</div></div>
          </a>
          <a href="tel:51884577" class="contact-card group">
            <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 transition-colors"><i class="fas fa-screwdriver-wrench text-purple-600 group-hover:text-white transition-colors"></i></div>
            <div><div class="text-xs text-gray-400">Service Technique</div><div class="font-semibold">51 884 577</div></div>
          </a>
          <a href="mailto:phonestoremourouj6@gmail.com" class="contact-card group">
            <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors"><i class="fas fa-envelope text-green-600 group-hover:text-white transition-colors"></i></div>
            <div><div class="text-xs text-gray-400">Email</div><div class="font-semibold text-sm">phonestoremourouj6@gmail.com</div></div>
          </a>
          <a href="https://maps.app.goo.gl/G59Ro3ZfmUW6DEFN9" target="_blank" class="contact-card group">
            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors"><i class="fas fa-location-dot text-orange-600 group-hover:text-white transition-colors"></i></div>
            <div><div class="text-xs text-gray-400">Adresse</div><div class="font-semibold">El Mourouj 2074</div></div>
          </a>
        </div>
        <div class="flex gap-3 mb-6">
          <a href="https://www.facebook.com/phonestoremourouj/" target="_blank" class="social-btn bg-[#1877F2]"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/phone_store_mourouj6" target="_blank" class="social-btn bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]"><i class="fab fa-instagram"></i></a>
          <a href="https://www.tiktok.com/@phone_store_mourouj_6" target="_blank" class="social-btn bg-black"><i class="fab fa-tiktok"></i></a>
          <a href="https://wa.me/21654663209" target="_blank" class="social-btn bg-[#25D366]"><i class="fab fa-whatsapp"></i></a>
        </div>
        <div class="bg-gray-50 rounded-2xl p-6">
          <h3 class="font-bold mb-4"><i class="fas fa-clock text-brand mr-2"></i>Horaires d'ouverture</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-gray-500">Lundi - Samedi</span><span class="font-semibold">09:00 - 20:00</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Dimanche</span><span class="font-semibold text-red-500">Fermé</span></div>
          </div>
        </div>
      </div>
      <div class="rounded-2xl overflow-hidden shadow-lg h-[400px]" data-animate="fade-left">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.0!2d10.16!3d36.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQzJzQ4LjAiTiAxMMKwMDknMzYuMCJF!5e0!3m2!1sfr!2stn!4v1" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="bg-surface pt-16 pb-6">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <svg width="30" height="36" viewBox="0 0 100 120"><rect x="15" y="5" width="70" height="110" rx="15" fill="none" stroke="#FFD54A" stroke-width="6"/><rect x="35" y="10" width="30" height="6" rx="3" fill="#FFD54A" opacity="0.5"/></svg>
          <div><span class="text-lg font-bold text-white">Phone Store</span><span class="block text-[10px] text-accent -mt-1 tracking-widest">MOUROUJ 6</span></div>
        </div>
        <p class="text-white/40 text-sm leading-relaxed">Votre partenaire de confiance pour tous vos besoins en accessoires tech et réparation à El Mourouj.</p>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4">Liens Rapides</h4>
        <ul class="space-y-2 text-white/40 text-sm">
          <li><a href="#products" class="hover:text-accent transition-colors">Produits</a></li>
          <li><a href="#services" class="hover:text-accent transition-colors">Services</a></li>
          <li><a href="#reviews" class="hover:text-accent transition-colors">Avis Clients</a></li>
          <li><a href="#faq" class="hover:text-accent transition-colors">FAQ</a></li>
          <li><a href="#contact" class="hover:text-accent transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4">Services</h4>
        <ul class="space-y-2 text-white/40 text-sm">
          <li>Réparation Téléphones</li>
          <li>Réparation PC</li>
          <li>Vente Accessoires</li>
          <li>Support Technique</li>
          <li>Livraison Tunisie</li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-4">Contact</h4>
        <ul class="space-y-2 text-white/40 text-sm">
          <li><i class="fas fa-phone text-accent mr-2"></i>54 663 209</li>
          <li><i class="fas fa-wrench text-accent mr-2"></i>51 884 577</li>
          <li><i class="fas fa-envelope text-accent mr-2"></i>phonestoremourouj6@gmail.com</li>
          <li><i class="fas fa-location-dot text-accent mr-2"></i>El Mourouj 2074</li>
        </ul>
        <div class="flex gap-3 mt-4">
          <a href="https://www.facebook.com/phonestoremourouj/" target="_blank" class="text-white/30 hover:text-[#1877F2] transition-colors"><i class="fab fa-facebook text-lg"></i></a>
          <a href="https://www.instagram.com/phone_store_mourouj6" target="_blank" class="text-white/30 hover:text-pink-500 transition-colors"><i class="fab fa-instagram text-lg"></i></a>
          <a href="https://www.tiktok.com/@phone_store_mourouj_6" target="_blank" class="text-white/30 hover:text-white transition-colors"><i class="fab fa-tiktok text-lg"></i></a>
        </div>
      </div>
    </div>
    <div class="pt-6 flex flex-col sm:flex-row justify-between items-center text-white/30 text-sm">
      <p>&copy; 2025 Phone Store Mourouj 6. Tous droits réservés.</p>
      <p class="mt-2 sm:mt-0">Fait avec <i class="fas fa-heart text-red-500"></i> en Tunisie</p>
    </div>
  </div>
</footer>

<!-- WhatsApp Float -->
<a href="https://wa.me/21654663209" target="_blank" id="whatsappFloat" class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-all group">
  <i class="fab fa-whatsapp text-white text-2xl"></i>
  <span class="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Discutez avec nous !</span>
</a>

<!-- Quick View Modal -->
<div id="quickViewModal" class="fixed inset-0 z-[200] hidden">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeQuickView()"></div>
  <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
    <button onclick="closeQuickView()" class="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"><i class="fas fa-times text-gray-500"></i></button>
    <div id="quickViewContent"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="/static/app.js"></script>
</body>
</html>`
