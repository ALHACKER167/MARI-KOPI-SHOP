// ============================================================
//  MARI KOPI SHOP — Menu Data v4 (Enhanced)
// ============================================================

const WA_NUMBER = '+6282275033270';
const TG_HANDLE = 'ridwanbalista';

const TESTIMONIALS = [
  { name: 'Rina S.', avatar: '👩', stars: 5, text: 'Kopi Susu Aren-nya mantap banget! Manis alami, kopinya kuat. Pasti balik lagi! ☕', item: 'Kopi Susu Aren' },
  { name: 'Budi H.', avatar: '👨', stars: 5, text: 'Caramel Latte favorit saya setiap pagi. Rasanya konsisten dan harganya terjangkau!', item: 'Caramel Latte' },
  { name: 'Siti N.', avatar: '👩‍🦱', stars: 5, text: 'Cappuccino-nya creamy banget, foam susunya sempurna. Cafe ini jadi tempat nongkrong favorit!', item: 'Cappuccino' },
  { name: 'Ahmad R.', avatar: '🧔', stars: 5, text: 'Vietnamese Coffee-nya authentic! Drip-nya lambat tapi worth it. Rasa kopinya dalam banget.', item: 'Vietnamese Coffee' },
  { name: 'Dewi K.', avatar: '👧', stars: 5, text: 'Hazelnut Latte top markotop! Nggak terlalu manis, aroma hazelnut-nya natural. Love it!', item: 'Hazelnut Latte' },
  { name: 'Farhan M.', avatar: '🧑', stars: 5, text: 'Respon WA-nya cepat, kopi datang masih panas & fresh. Kopi Hitam Tubruk-nya klasik banget!', item: 'Kopi Hitam Tubruk' },
  { name: 'Maya P.', avatar: '👩‍🦰', stars: 5, text: 'Brown Sugar Boba Latte-nya beneran hits! Bobanya kenyal, rasanya kaya. Jadi favorit baru!', item: 'Brown Sugar Boba Latte' },
  { name: 'Rizki A.', avatar: '🧑‍🦱', stars: 5, text: 'Cold Brew-nya smooth banget, nggak pahit sama sekali. Perfect untuk summer!', item: 'Cold Brew' },
];

const PROMO_ITEMS = [
  {
    id: 'p1', tag: '🔥 PROMO HARI INI', title: 'Buy 2 Get 1 Free!',
    subtitle: 'Berlaku untuk semua menu kopi',
    desc: 'Beli 2 minuman kopi apapun dari menu kami, dapatkan 1 minuman gratis! Promo berlaku setiap hari mulai pukul 08.00 – 21.00. Tidak berlaku bersamaan dengan promo lain.',
    badge: 'SAVE 33%', emoji: '☕', color: '#d4891a', accent: '#ffb347',
    bg: 'linear-gradient(135deg,#1a0900 0%,#3d1800 35%,#5c2800 60%,#3d1800 100%)',
    valid: 'Berlaku setiap hari • 08.00 – 21.00', hot: true,
  },
  {
    id: 'p2', tag: '⭐ MENU BARU', title: 'Brown Sugar Boba Latte',
    subtitle: 'Menu terbaru & paling hits!',
    desc: 'Perpaduan sempurna antara brown sugar syrup, espresso segar, susu fresh, dan boba kenyal. Tampilan cantik, rasa luar biasa. Tersedia hot & iced. Wajib dicoba!',
    badge: 'NEW', emoji: '🧋', color: '#c8a55a', accent: '#ffe066',
    bg: 'linear-gradient(135deg,#0d0a00 0%,#2a1a00 35%,#3d2800 60%,#2a1a00 100%)',
    valid: 'Tersedia setiap hari', hot: false,
  },
  {
    id: 'p3', tag: '❄️ FLASH SALE', title: 'Diskon 20% Cold Brew',
    subtitle: 'Hanya hari ini — jangan sampai kehabisan!',
    desc: '12 jam cold extraction menghasilkan kopi yang smooth, low acid, dan naturally sweet. Diskon 20% untuk semua varian Cold Brew. Stok terbatas, segera order!',
    badge: '-20%', emoji: '🧊', color: '#4a9eca', accent: '#00e5ff',
    bg: 'linear-gradient(135deg,#010508 0%,#051520 35%,#0a2535 60%,#051520 100%)',
    valid: 'Hari ini saja • Stok terbatas', hot: true,
  },
  {
    id: 'p4', tag: '👑 MEMBER SPECIAL', title: 'Free Upgrade ke Large!',
    subtitle: 'Khusus member setia Mari Kopi',
    desc: 'Tunjukkan member card atau screenshot chat pembelian sebelumnya, dapatkan upgrade gratis ke ukuran Large untuk semua minuman. Bergabung jadi member via WhatsApp sekarang!',
    badge: 'FREE', emoji: '👑', color: '#b8a04a', accent: '#ffd700',
    bg: 'linear-gradient(135deg,#0a0800 0%,#1e1600 35%,#302200 60%,#1e1600 100%)',
    valid: 'Khusus member terdaftar', hot: false,
  },
  {
    id: 'p5', tag: '🌅 HAPPY HOUR', title: 'Semua Kopi Rp15rb!',
    subtitle: 'Spesial jam 14.00 – 16.00',
    desc: 'Nikmati semua minuman kopi hanya Rp15.000 selama Happy Hour! Berlaku untuk semua ukuran reguler. Kesempatan emas untuk mencoba menu baru favoritmu tanpa khawatir budget.',
    badge: 'HOT', emoji: '🌅', color: '#ff7043', accent: '#ffab40',
    bg: 'linear-gradient(135deg,#0d0500 0%,#2a1000 35%,#3d1800 60%,#1a0800 100%)',
    valid: 'Setiap hari • 14.00 – 16.00', hot: true,
  },
  {
    id: 'p6', tag: '💚 COMBO HEMAT', title: 'Kopi + Snack = Rp75rb',
    subtitle: 'Hemat hingga 30% dengan combo ini',
    desc: 'Paket combo terbaik: 1 minuman signature + 1 pastry pilihan hanya Rp75.000! Cocok untuk morning boost atau afternoon treat. Pilih dari croissant, muffin, atau banana bread.',
    badge: '-30%', emoji: '🥐', color: '#66bb6a', accent: '#a5d6a7',
    bg: 'linear-gradient(135deg,#020a02 0%,#0d200d 35%,#152815 60%,#0d200d 100%)',
    valid: 'Tersedia setiap hari • Stok terbatas', hot: false,
  },
  {
    id: 'p7', tag: '🎂 BIRTHDAY TREAT', title: 'Gratis 1 Kopi di Ultah!',
    subtitle: 'Hadiah spesial dari Mari Kopi Shop',
    desc: 'Di hari ulang tahunmu, dapatkan 1 minuman gratis pilihan dari menu signature kami! Cukup tunjukkan KTP atau bukti ulang tahun ke kasir atau via WhatsApp. Kami senang merayakan hari istimewamu!',
    badge: 'GRATIS', emoji: '🎂', color: '#e91e63', accent: '#f48fb1',
    bg: 'linear-gradient(135deg,#0d0008 0%,#200010 35%,#350018 60%,#200010 100%)',
    valid: 'Khusus di hari ulang tahun', hot: false,
  },
  {
    id: 'p8', tag: '📱 ORDER ONLINE', title: 'Diskon 10% via WA & TG',
    subtitle: 'Order online lebih hemat!',
    desc: 'Pesan melalui WhatsApp atau Telegram dan dapatkan diskon 10% untuk setiap transaksi! Minimum order Rp50.000. Berlaku untuk pickup dan delivery area terdekat. Gunakan kode: ONLINE10.',
    badge: '-10%', emoji: '📱', color: '#7c4dff', accent: '#b39ddb',
    bg: 'linear-gradient(135deg,#050010 0%,#100030 35%,#180040 60%,#100030 100%)',
    valid: 'Min. order ฿50 • Kode: ONLINE10', hot: false,
  },
];

const BEST_ITEMS = [
  { emoji: '☕', name: 'Kopi Susu Aren', sub: 'Gula aren asli + espresso', tag: '🔥 Best Seller', bg: 'linear-gradient(135deg,#2a1000 0%,#4a2010 60%,#2a1000 100%)' },
  { emoji: '🧋', name: 'Brown Sugar Latte', sub: 'Boba + susu segar', tag: '⭐ Favorit', bg: 'linear-gradient(135deg,#1a0a00 0%,#3a1a05 60%,#1a0a00 100%)' },
  { emoji: '🫗', name: 'Caramel Macchiato', sub: 'Vanilla + espresso + caramel', tag: '💛 Premium', bg: 'linear-gradient(135deg,#1a1000 0%,#3a2800 60%,#1a1000 100%)' },
  { emoji: '🧊', name: 'Cold Brew', sub: '12 jam cold extraction', tag: '❄️ Cold', bg: 'linear-gradient(135deg,#050a10 0%,#0a1a28 60%,#050a10 100%)' },
  { emoji: '🍵', name: 'Matcha Latte', sub: 'Ceremonial grade matcha', tag: '🌿 Trendy', bg: 'linear-gradient(135deg,#020a02 0%,#0d200d 60%,#020a02 100%)' },
  { emoji: '✨', name: 'Nitro Cold Brew', sub: 'Nitrogen infused cold brew', tag: '💫 New', bg: 'linear-gradient(135deg,#050510 0%,#0a1025 60%,#050510 100%)' },
];

const CATEGORIES = [
  {
    id: 'espresso', name: 'Espresso Base', emoji: '☕',
    items: [
      { id: 1,  name: 'Espresso Single', price: 25, desc: '1 shot espresso murni — bold, thick, intense. Dasar semua kopi kami', emoji: '☕' },
      { id: 2,  name: 'Espresso Double', price: 35, desc: '2 shot espresso murni — untuk jiwa petualang kopi sejati', emoji: '☕' },
      { id: 3,  name: 'Americano', price: 35, desc: '2 shot espresso + hot water — bersih, kuat, klasik tanpa susu', emoji: '🖤' },
      { id: 4,  name: 'Long Black', price: 35, desc: 'Hot water dituang espresso — crema terjaga sempurna', emoji: '🖤' },
      { id: 5,  name: 'Cappuccino', price: 45, desc: '2 shot espresso + steamed milk + milk foam tebal — klasik Italia', emoji: '☕' },
      { id: 6,  name: 'Caffe Latte', price: 45, desc: '2 shot espresso + steamed milk banyak — smooth & creamy', emoji: '🥛' },
      { id: 7,  name: 'Flat White', price: 50, desc: '2 shot ristretto + microfoam susu — kuat tapi lembut', emoji: '☕' },
      { id: 8,  name: 'Cortado', price: 40, desc: '1 shot espresso + sedikit steamed milk — balance sempurna', emoji: '☕' },
      { id: 9,  name: 'Macchiato', price: 35, desc: '1 shot espresso + sedikit foam susu — simple & bold', emoji: '☕' },
    ]
  },
  {
    id: 'signature', name: 'Signature Coffee', emoji: '⭐',
    items: [
      { id: 10, name: 'Kopi Susu Aren', price: 55, desc: 'Espresso + gula aren asli + fresh milk — manis alami yang nagih', emoji: '🍯', badge: '🔥 Best' },
      { id: 11, name: 'Brown Sugar Boba Latte', price: 65, desc: 'Espresso + brown sugar syrup + fresh milk + boba kenyal', emoji: '🧋', badge: '⭐ Top' },
      { id: 12, name: 'Caramel Macchiato', price: 60, desc: 'Vanilla syrup + steamed milk + espresso + caramel drizzle', emoji: '🫗' },
      { id: 13, name: 'Hazelnut Latte', price: 60, desc: 'Espresso + hazelnut syrup + steamed milk — aroma kacang mewah', emoji: '🌰' },
      { id: 14, name: 'Vanilla Latte', price: 55, desc: 'Espresso + vanilla syrup + steamed milk — manis lembut', emoji: '🌸' },
      { id: 15, name: 'Salted Caramel Latte', price: 65, desc: 'Espresso + salted caramel + steamed milk — manis-asin sempurna', emoji: '🧂' },
      { id: 16, name: 'Coconut Latte', price: 60, desc: 'Espresso + coconut milk + coconut syrup — tropical vibes', emoji: '🥥' },
      { id: 17, name: 'Toffee Nut Latte', price: 65, desc: 'Espresso + toffee nut syrup + steamed milk — premium & rich', emoji: '☕' },
      { id: 18, name: 'Lavender Honey Latte', price: 65, desc: 'Espresso + lavender syrup + honey + steamed milk — floral & sweet', emoji: '💜' },
      { id: 55, name: 'Rose Gold Latte', price: 70, desc: 'Espresso + rose syrup + edible gold + steamed milk — cantik & premium', emoji: '🌹', badge: '✨ New' },
      { id: 56, name: 'Caramel Burnt Latte', price: 65, desc: 'Espresso + burnt caramel syrup + sea salt + steamed milk — bold & complex', emoji: '🔥' },
    ]
  },
  {
    id: 'cold', name: 'Cold Coffee', emoji: '🧊',
    items: [
      { id: 19, name: 'Iced Americano', price: 40, desc: '2 shot espresso + cold water + ice — segar & kuat', emoji: '🧊' },
      { id: 20, name: 'Iced Latte', price: 50, desc: 'Espresso + cold milk + ice — smooth & refreshing', emoji: '🥛' },
      { id: 21, name: 'Cold Brew', price: 55, desc: '12 jam cold extraction — smooth, low acid, naturally sweet', emoji: '🖤', badge: '❄️ Top' },
      { id: 22, name: 'Cold Brew Milk', price: 65, desc: 'Cold brew + fresh milk + simple syrup — refreshing banget', emoji: '🥛' },
      { id: 23, name: 'Dalgona Coffee', price: 60, desc: 'Whipped coffee foam di atas susu dingin — viral & delicious', emoji: '☁️' },
      { id: 24, name: 'Es Kopi Susu', price: 45, desc: 'Kopi robusta + susu kental manis + es — khas Indonesia', emoji: '🧊' },
      { id: 25, name: 'Iced Brown Sugar Latte', price: 65, desc: 'Brown sugar + espresso + cold milk + ice — Instagram-worthy', emoji: '🧋', badge: '📸' },
      { id: 26, name: 'Iced Caramel Latte', price: 60, desc: 'Espresso + caramel + cold milk + ice — summer favorite', emoji: '🫗' },
      { id: 57, name: 'Nitro Cold Brew', price: 75, desc: 'Cold brew infused nitrogen — creamy tanpa susu, velvet texture', emoji: '✨', badge: '🆕 New' },
      { id: 58, name: 'Iced Spanish Latte', price: 65, desc: 'Espresso + sweetened condensed milk + cold milk + ice — creamy & sweet', emoji: '🇪🇸' },
    ]
  },
  {
    id: 'manual', name: 'Manual Brew', emoji: '🫖',
    items: [
      { id: 27, name: 'Pour Over V60', price: 55, desc: 'Single origin + V60 dripper — clean, bright, floral notes', emoji: '🫖' },
      { id: 28, name: 'Chemex', price: 60, desc: 'Single origin + Chemex — crystal clear, sweet, tea-like', emoji: '⚗️' },
      { id: 29, name: 'AeroPress', price: 55, desc: 'Pressure brewing — smooth, concentrated, versatile', emoji: '🔬' },
      { id: 30, name: 'French Press', price: 50, desc: 'Full immersion — heavy body, rich & bold', emoji: '🫖' },
      { id: 31, name: 'Moka Pot', price: 45, desc: 'Italian stovetop method — strong espresso-style coffee', emoji: '☕' },
      { id: 32, name: 'Siphon Coffee', price: 70, desc: 'Vacuum pressure method — theatrical & uniquely clean', emoji: '⚗️', badge: '✨' },
      { id: 33, name: 'Kopi Tubruk', price: 30, desc: 'Kopi hitam tradisional Indonesia — bubuk langsung diseduh', emoji: '🖤' },
      { id: 34, name: 'Vietnamese Drip Coffee', price: 45, desc: 'Robusta Vietnam drip + susu kental manis — authentic & rich', emoji: '🫗' },
    ]
  },
  {
    id: 'nonkopi', name: 'Non-Coffee', emoji: '🍵',
    items: [
      { id: 35, name: 'Matcha Latte', price: 55, desc: 'Premium ceremonial grade matcha + steamed milk — earthy & smooth', emoji: '🍵', badge: '🌿 Top' },
      { id: 36, name: 'Iced Matcha Latte', price: 60, desc: 'Matcha + cold milk + ice — refreshing Japanese style', emoji: '🍵' },
      { id: 37, name: 'Hojicha Latte', price: 55, desc: 'Roasted green tea + steamed milk — nutty & low caffeine', emoji: '🫖' },
      { id: 38, name: 'Chai Latte', price: 55, desc: 'Masala chai spices + steamed milk — warm & spicy', emoji: '🌶️' },
      { id: 39, name: 'Iced Thai Tea Latte', price: 55, desc: 'Thai tea + susu evaporasi + ice — manis creamy', emoji: '🧋' },
      { id: 40, name: 'Hot Chocolate', price: 50, desc: 'Premium cocoa + steamed milk + whipped cream', emoji: '🍫' },
      { id: 41, name: 'Iced Chocolate', price: 55, desc: 'Premium cocoa + cold milk + ice — rich & indulgent', emoji: '🍫' },
      { id: 42, name: 'Taro Milk Latte', price: 55, desc: 'Taro powder + steamed milk — purple & dreamy', emoji: '🟣', badge: '💜' },
      { id: 59, name: 'Strawberry Matcha', price: 65, desc: 'Matcha + strawberry puree + susu — viral pink-green aesthetic', emoji: '🍓', badge: '🆕 New' },
      { id: 60, name: 'Oat Milk Latte', price: 60, desc: 'Espresso alternative + creamy oat milk — plant-based goodness', emoji: '🌾' },
    ]
  },
  {
    id: 'snack', name: 'Snack & Pastry', emoji: '🥐',
    items: [
      { id: 43, name: 'Croissant Butter', price: 45, desc: 'Croissant lapis demi-puff pastry — flaky, buttery, golden', emoji: '🥐' },
      { id: 44, name: 'Croissant Almond', price: 55, desc: 'Croissant isi almond cream + topping almond slice', emoji: '🥐' },
      { id: 45, name: 'Banana Bread Slice', price: 40, desc: 'Banana bread moist & fluffy — homemade style', emoji: '🍌' },
      { id: 46, name: 'Chocolate Muffin', price: 35, desc: 'Double chocolate muffin — crispy top, moist inside', emoji: '🧁' },
      { id: 47, name: 'Cheese Scone', price: 40, desc: 'Scone keju cheddar — renyah luar, lembut dalam', emoji: '🧀' },
      { id: 48, name: 'Cinnamon Roll', price: 45, desc: 'Roti gulung kayu manis + cream cheese frosting', emoji: '🌀' },
      { id: 61, name: 'Cookies & Cream Cake', price: 55, desc: 'Slice kue cookies & cream — moist, rich, indulgent', emoji: '🎂', badge: '🆕 New' },
      { id: 62, name: 'Avocado Toast', price: 50, desc: 'Sourdough + alpukat creamy + poached egg + microgreens', emoji: '🥑' },
    ]
  },
];
