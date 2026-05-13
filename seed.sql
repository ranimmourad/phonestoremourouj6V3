-- Default admin (password: admin123)
INSERT OR IGNORE INTO admins (username, password_hash) VALUES ('admin', 'admin123');

-- Categories
INSERT OR IGNORE INTO categories (name, name_ar, slug, icon, sort_order) VALUES
('Chargeurs', 'شواحن', 'chargeurs', 'fa-bolt', 1),
('Câbles USB', 'كوابل USB', 'cables-usb', 'fa-plug', 2),
('Adaptateurs', 'محولات', 'adaptateurs', 'fa-right-left', 3),
('Coques & Étuis', 'أغطية و حافظات', 'coques-etuis', 'fa-mobile-screen', 4),
('Protection Écran', 'حماية الشاشة', 'protection-ecran', 'fa-shield-halved', 5),
('Écouteurs', 'سماعات', 'ecouteurs', 'fa-headphones', 6),
('EarPods', 'إيربودز', 'earpods', 'fa-earlybirds', 7),
('Montres Connectées', 'ساعات ذكية', 'montres-connectees', 'fa-clock', 8),
('Ring Lights', 'إضاءة تصوير', 'ring-lights', 'fa-lightbulb', 9),
('Accessoires Gaming', 'إكسسوارات قيمينغ', 'gaming', 'fa-gamepad', 10),
('Accessoires PC', 'إكسسوارات كمبيوتر', 'accessoires-pc', 'fa-laptop', 11);

-- Products
INSERT OR IGNORE INTO products (name, slug, description, price, old_price, category_id, in_stock, featured, badge, image) VALUES
('Chargeur Rapide USB-C 25W', 'chargeur-rapide-usbc-25w', 'Chargeur rapide compatible Samsung, iPhone 15+ et tous les appareils USB-C. Charge complète en moins d''une heure.', 45.00, 65.00, 1, 1, 1, 'Promo', '/static/products/charger-25w.svg'),
('Chargeur iPhone 20W Original', 'chargeur-iphone-20w', 'Chargeur Apple original 20W avec technologie de charge rapide. Compatible iPhone 8 et versions ultérieures.', 55.00, 75.00, 1, 1, 1, 'Best-seller', '/static/products/charger-iphone.svg'),
('Chargeur Sans Fil MagSafe 15W', 'chargeur-magsafe-15w', 'Chargeur sans fil magnétique compatible MagSafe. Charge rapide 15W pour iPhone 12+.', 65.00, 89.00, 1, 1, 0, NULL, '/static/products/charger-wireless.svg'),
('Câble USB-C vers USB-C 2m', 'cable-usbc-usbc-2m', 'Câble USB-C haute qualité, charge rapide 60W et transfert de données 480Mbps. Nylon tressé résistant.', 25.00, 35.00, 2, 1, 1, 'Nouveau', '/static/products/cable-usbc.svg'),
('Câble Lightning Original 1m', 'cable-lightning-1m', 'Câble Lightning Apple certifié MFi. Compatible tous les iPhones et iPads avec port Lightning.', 30.00, 45.00, 2, 1, 1, NULL, '/static/products/cable-lightning.svg'),
('Câble USB-C vers Lightning', 'cable-usbc-lightning', 'Câble de charge rapide USB-C vers Lightning pour iPhone. Charge jusqu''à 3x plus rapide.', 35.00, 50.00, 2, 1, 0, NULL, '/static/products/cable-usbc-light.svg'),
('Adaptateur USB-C Hub 6-en-1', 'adaptateur-usbc-hub', 'Hub USB-C multifonction: HDMI 4K, USB 3.0, lecteur carte SD, charge PD 100W.', 85.00, 120.00, 3, 1, 1, 'Top', '/static/products/hub-usbc.svg'),
('Adaptateur Jack 3.5mm Lightning', 'adaptateur-jack-lightning', 'Adaptateur audio Lightning vers jack 3.5mm pour iPhone. Son haute qualité.', 15.00, 25.00, 3, 1, 0, NULL, '/static/products/adapter-jack.svg'),
('Coque iPhone 15 Pro Max Premium', 'coque-iphone15-promax', 'Coque de protection premium en silicone avec intérieur microfibre. Anti-choc et anti-rayures.', 35.00, 55.00, 4, 1, 1, 'Populaire', '/static/products/case-iphone15.svg'),
('Coque Samsung S24 Ultra Clear', 'coque-samsung-s24', 'Coque transparente ultra-fine pour Samsung Galaxy S24 Ultra. Protection anti-jaunissement.', 30.00, 45.00, 4, 1, 1, NULL, '/static/products/case-samsung.svg'),
('Coque Antichoc Militaire', 'coque-antichoc-militaire', 'Protection militaire grade MIL-STD-810G. Résiste aux chutes de 3 mètres. Disponible pour tous les modèles.', 45.00, 65.00, 4, 1, 0, 'Résistant', '/static/products/case-military.svg'),
('Verre Trempé iPhone 15 Pro', 'verre-trempe-iphone15', 'Protection écran en verre trempé 9H. Anti-empreintes, anti-reflet. Installation facile avec guide.', 20.00, 30.00, 5, 1, 1, NULL, '/static/products/screen-iphone.svg'),
('Film Protection Samsung S24', 'film-samsung-s24', 'Film de protection incurvé pour Samsung Galaxy S24. Couverture complète bord à bord.', 25.00, 35.00, 5, 1, 0, NULL, '/static/products/screen-samsung.svg'),
('AirPods Pro 2 Compatible', 'airpods-pro-2', 'Écouteurs sans fil compatibles avec réduction de bruit active. Son spatial et autonomie 6h.', 89.00, 130.00, 7, 1, 1, 'Best-seller', '/static/products/airpods.svg'),
('Casque Bluetooth Pro', 'casque-bluetooth-pro', 'Casque sans fil avec réduction de bruit active, autonomie 30h. Son Hi-Fi immersif.', 120.00, 180.00, 6, 1, 1, 'Premium', '/static/products/headphone-bt.svg'),
('Écouteurs Filaires USB-C', 'ecouteurs-filaires-usbc', 'Écouteurs intra-auriculaires USB-C avec micro intégré. Compatible Android et iPhone 15+.', 25.00, 35.00, 6, 1, 0, NULL, '/static/products/earphone-usbc.svg'),
('Smart Watch Sport Pro', 'smartwatch-sport-pro', 'Montre connectée avec suivi santé complet, GPS intégré, écran AMOLED 1.8". Autonomie 7 jours.', 150.00, 220.00, 8, 1, 1, 'Nouveau', '/static/products/smartwatch.svg'),
('Smart Watch Série Classic', 'smartwatch-classic', 'Montre connectée élégante, notifications, appels Bluetooth, capteur cardiaque. Design premium.', 95.00, 140.00, 8, 1, 0, NULL, '/static/products/smartwatch-classic.svg'),
('Ring Light 10" LED Pro', 'ring-light-10-pro', 'Anneau lumineux LED 10 pouces avec trépied réglable, 3 modes d''éclairage et support téléphone.', 75.00, 110.00, 9, 1, 1, NULL, '/static/products/ringlight.svg'),
('Manette Gaming Bluetooth', 'manette-gaming-bt', 'Manette de jeu Bluetooth compatible Android, iOS et PC. Design ergonomique, vibration HD.', 65.00, 95.00, 10, 1, 1, 'Gamer', '/static/products/gamepad.svg'),
('Clavier Mécanique RGB Gaming', 'clavier-mecanique-rgb', 'Clavier mécanique rétroéclairé RGB avec switches mécaniques. Anti-ghosting, construction métal.', 110.00, 160.00, 10, 1, 0, NULL, '/static/products/keyboard.svg'),
('Souris Sans Fil Ergonomique', 'souris-ergonomique', 'Souris sans fil 2.4GHz avec récepteur USB. 3 niveaux DPI, design ergonomique silencieux.', 35.00, 50.00, 11, 1, 1, NULL, '/static/products/mouse.svg'),
('Support Laptop Aluminium', 'support-laptop-alu', 'Support ordinateur portable en aluminium réglable. Compatible 10-17". Ventilation optimale.', 55.00, 80.00, 11, 1, 0, NULL, '/static/products/laptop-stand.svg'),
('Tapis de Souris XXL Gaming', 'tapis-souris-xxl', 'Tapis de souris gaming XXL 80x30cm avec éclairage RGB. Surface lisse, base antidérapante.', 40.00, 60.00, 10, 1, 1, 'RGB', '/static/products/mousepad.svg');
