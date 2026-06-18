const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [

  // ══ ELECTRONICS ══════════════════════════════════════════════════
  {
    name: 'Apple iPhone 15 Pro',
    description: 'The latest iPhone 15 Pro with A17 Pro chip, titanium design, and advanced camera system with 48MP main sensor. Features USB-C, ProMotion 120Hz display, and Action Button.',
    price: 134900, discount: 5, category: 'Electronics', brand: 'Apple',
    stock: 50, isFeatured: true, rating: 4.8, numReviews: 1284,
    images: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&h=500&fit=crop']
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Samsung Galaxy S24 Ultra with 200MP camera, built-in S Pen, Snapdragon 8 Gen 3, and Galaxy AI-powered features for enhanced productivity.',
    price: 129999, discount: 8, category: 'Electronics', brand: 'Samsung',
    stock: 35, isFeatured: true, rating: 4.7, numReviews: 953,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop']
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with 8 microphones, exceptional sound quality, 30-hour battery life, and hands-free calling with speak-to-chat.',
    price: 29990, discount: 15, category: 'Electronics', brand: 'Sony',
    stock: 80, isFeatured: true, rating: 4.9, numReviews: 3420,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop']
  },
  {
    name: 'MacBook Air M3',
    description: 'Supercharged by the M3 chip. Incredibly thin and light laptop with 18-hour battery life, 13.6-inch Liquid Retina display, and 8-core CPU.',
    price: 114900, discount: 3, category: 'Electronics', brand: 'Apple',
    stock: 25, isFeatured: true, rating: 4.9, numReviews: 2105,
    images: ['https://images.unsplash.com/photo-1611186871525-8a3da29d2c89?w=500&h=500&fit=crop']
  },
  {
    name: 'iPad Pro 12.9" M2',
    description: 'The most advanced iPad ever with M2 chip, Liquid Retina XDR display, Apple Pencil 2 support, and Thunderbolt connectivity.',
    price: 112900, discount: 7, category: 'Electronics', brand: 'Apple',
    stock: 40, isFeatured: true, rating: 4.8, numReviews: 1893,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop']
  },
  {
    name: 'Samsung 55" QLED 4K Smart TV',
    description: 'Stunning 4K QLED display with Quantum Processor 4K, 120Hz refresh rate, Dolby Atmos audio, and Smart TV with built-in streaming apps.',
    price: 74999, discount: 18, category: 'Electronics', brand: 'Samsung',
    stock: 20, isFeatured: true, rating: 4.6, numReviews: 3123,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f4754a?w=500&h=500&fit=crop']
  },
  {
    name: 'Canon EOS R50 Mirrorless Camera',
    description: 'Compact mirrorless camera with 24.2MP APS-C sensor, 4K video recording, dual AF systems, and vari-angle touchscreen LCD.',
    price: 69990, discount: 10, category: 'Electronics', brand: 'Canon',
    stock: 22, isFeatured: false, rating: 4.7, numReviews: 1432,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764b22?w=500&h=500&fit=crop']
  },
  {
    name: 'JBL Flip 6 Bluetooth Speaker',
    description: 'Portable waterproof (IP67) speaker with powerful stereo sound, PartyBoost to link multiple speakers, and 12-hour battery life.',
    price: 9999, discount: 22, category: 'Electronics', brand: 'JBL',
    stock: 90, isFeatured: false, rating: 4.5, numReviews: 8763,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop']
  },
  {
    name: 'Dell XPS 15 Laptop',
    description: 'Premium 15.6" OLED laptop with Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, NVIDIA RTX 4060 graphics, and stunning InfinityEdge display.',
    price: 149990, discount: 6, category: 'Electronics', brand: 'Dell',
    stock: 18, isFeatured: true, rating: 4.7, numReviews: 2010,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop']
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Most powerful Apple Watch with S9 chip, Double Tap gesture, 45mm Always-On Retina display, advanced health sensors including ECG and blood oxygen.',
    price: 41900, discount: 5, category: 'Electronics', brand: 'Apple',
    stock: 55, isFeatured: true, rating: 4.8, numReviews: 4452,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop']
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    description: 'Advanced wireless mouse with MagSpeed electromagnetic scrolling, 8K DPI optical sensor, USB-C charging, and quiet clicks for office use.',
    price: 9995, discount: 12, category: 'Electronics', brand: 'Logitech',
    stock: 75, isFeatured: false, rating: 4.8, numReviews: 6341,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop']
  },
  {
    name: 'OnePlus 12 5G',
    description: 'Flagship with Snapdragon 8 Gen 3, Hasselblad triple camera system, 100W SUPERVOOC fast charging, and 5400mAh battery.',
    price: 64999, discount: 10, category: 'Electronics', brand: 'OnePlus',
    stock: 45, isFeatured: false, rating: 4.6, numReviews: 2876,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop']
  },
  {
    name: 'Sony PlayStation 5',
    description: 'Next-gen gaming with ultra-high-speed SSD, ray tracing, 3D Audio, 4K gaming at 120fps, and DualSense haptic feedback controller.',
    price: 54990, discount: 0, category: 'Electronics', brand: 'Sony',
    stock: 15, isFeatured: true, rating: 4.9, numReviews: 10230,
    images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop']
  },
  {
    name: 'Amazon Echo Dot 5th Gen',
    description: 'Compact smart speaker with improved audio, Alexa voice assistant, motion detection sensor, and works with smart home devices.',
    price: 4499, discount: 30, category: 'Electronics', brand: 'Amazon',
    stock: 200, isFeatured: false, rating: 4.4, numReviews: 34210,
    images: ['https://images.unsplash.com/photo-1512446816042-444d641267d4?w=500&h=500&fit=crop']
  },
  {
    name: 'Bose QuietComfort Earbuds II',
    description: 'True wireless earbuds with world-class noise cancellation, CustomTune technology for personalized sound, and 6-hour battery life.',
    price: 26900, discount: 12, category: 'Electronics', brand: 'Bose',
    stock: 60, isFeatured: false, rating: 4.7, numReviews: 5432,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop']
  },
  {
    name: 'GoPro HERO12 Black',
    description: 'Waterproof action camera with 5.3K video, 27MP photos, HyperSmooth 6.0 stabilization, and unlimited cloud backup.',
    price: 39999, discount: 8, category: 'Electronics', brand: 'GoPro',
    stock: 35, isFeatured: false, rating: 4.8, numReviews: 2341,
    images: ['https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=500&h=500&fit=crop']
  },
  {
    name: 'Microsoft Surface Pro 9',
    description: '2-in-1 laptop-tablet with Intel Core i5/i7, detachable keyboard, Surface Pen support, and 13" PixelSense Flow display.',
    price: 119990, discount: 7, category: 'Electronics', brand: 'Microsoft',
    stock: 28, isFeatured: false, rating: 4.6, numReviews: 1234,
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop']
  },
  {
    name: 'Garmin Forerunner 255',
    description: 'GPS running smartwatch with advanced training metrics, race predictor, sleep tracking, and 14-day battery life.',
    price: 32999, discount: 15, category: 'Electronics', brand: 'Garmin',
    stock: 42, isFeatured: false, rating: 4.7, numReviews: 3456,
    images: ['https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop']
  },

  // ══ FASHION ══════════════════════════════════════════════════════
  {
    name: 'Nike Air Max 270',
    description: 'Inspired by iconic big Air shoes, the Nike Air Max 270 delivers a super-smooth ride with 270-degree Air unit, mesh upper for breathability.',
    price: 12995, discount: 20, category: 'Fashion', brand: 'Nike',
    stock: 120, isFeatured: true, rating: 4.5, numReviews: 5672,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop']
  },
  {
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit jeans in Levi's signature stretch denim. Sits below the waist with a slim fit through the thigh and leg for a clean, modern look.",
    price: 3999, discount: 25, category: 'Fashion', brand: "Levi's",
    stock: 200, isFeatured: false, rating: 4.3, numReviews: 8921,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop']
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Premium running shoe with BOOST midsole for incredible energy return, Continental rubber outsole, and breathable Primeknit+ upper.',
    price: 14999, discount: 15, category: 'Fashion', brand: 'Adidas',
    stock: 85, isFeatured: true, rating: 4.7, numReviews: 4321,
    images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop']
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Iconic aviator sunglasses with polarized lenses, 100% UV protection, lightweight metal frame, and signature teardrop shape.',
    price: 8999, discount: 10, category: 'Fashion', brand: 'Ray-Ban',
    stock: 150, isFeatured: false, rating: 4.6, numReviews: 6789,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop']
  },
  {
    name: 'Tommy Hilfiger Classic Polo',
    description: 'Premium cotton polo shirt with signature embroidered logo, ribbed collar, and 2-button placket. Available in multiple colors.',
    price: 2999, discount: 30, category: 'Fashion', brand: 'Tommy Hilfiger',
    stock: 300, isFeatured: false, rating: 4.4, numReviews: 3456,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop']
  },
  {
    name: 'Michael Kors Leather Handbag',
    description: 'Luxurious genuine leather tote bag with gold hardware, interior pockets, magnetic snap closure, and adjustable shoulder strap.',
    price: 18999, discount: 20, category: 'Fashion', brand: 'Michael Kors',
    stock: 45, isFeatured: true, rating: 4.5, numReviews: 2134,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop']
  },
  {
    name: 'Fossil Gen 6 Smartwatch',
    description: 'Hybrid smartwatch with traditional watch design, health tracking, 2-week battery life, and smartphone notifications.',
    price: 15999, discount: 18, category: 'Fashion', brand: 'Fossil',
    stock: 60, isFeatured: false, rating: 4.3, numReviews: 1987,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop']
  },
  {
    name: "Men's Formal Suit - Navy Blue",
    description: 'Premium Italian wool blend suit with slim fit design, 2-button single-breasted jacket, and flat-front trousers. Perfect for formal occasions.',
    price: 12499, discount: 25, category: 'Fashion', brand: 'Arrow',
    stock: 70, isFeatured: false, rating: 4.6, numReviews: 1543,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b5b56?w=500&h=500&fit=crop']
  },

  // ══ BEAUTY ═══════════════════════════════════════════════════════
  {
    name: 'CeraVe Moisturizing Cream',
    description: 'Daily face and body moisturizer with hyaluronic acid, ceramides, and MVE delivery technology. Fragrance-free, suitable for all skin types.',
    price: 1299, discount: 15, category: 'Beauty', brand: 'CeraVe',
    stock: 200, isFeatured: false, rating: 4.7, numReviews: 34567,
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop']
  },
  {
    name: 'Dyson Airwrap Multi-Styler',
    description: 'Complete hair styling set with Coanda effect for curls, waves, and smooth styles without extreme heat. Includes 6 attachments.',
    price: 44900, discount: 5, category: 'Beauty', brand: 'Dyson',
    stock: 30, isFeatured: true, rating: 4.8, numReviews: 8901,
    images: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop']
  },
  {
    name: 'MAC Studio Fix Foundation',
    description: 'Full-coverage matte foundation with SPF 15, available in 67 shades, long-wearing formula that controls shine for 24 hours.',
    price: 2800, discount: 10, category: 'Beauty', brand: 'MAC',
    stock: 180, isFeatured: false, rating: 4.5, numReviews: 5678,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop']
  },
  {
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    description: 'High-strength vitamin and mineral blemish formula that reduces appearances of blemishes, congestion, and brightens skin tone.',
    price: 699, discount: 5, category: 'Beauty', brand: 'The Ordinary',
    stock: 500, isFeatured: false, rating: 4.6, numReviews: 45678,
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop']
  },
  {
    name: 'Forest Essentials Facial Ubtan',
    description: 'Luxurious Ayurvedic face cleanser with turmeric, saffron, and sandalwood. Gently exfoliates and brightens skin for a natural glow.',
    price: 1750, discount: 12, category: 'Beauty', brand: 'Forest Essentials',
    stock: 120, isFeatured: false, rating: 4.4, numReviews: 2341,
    images: ['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=500&fit=crop']
  },
  {
    name: 'Philips Hair Straightener',
    description: 'Advanced LED hair straightener with titanium plates, ionic technology, temperature control 150°C-230°C, and fast 30-second heat-up.',
    price: 5999, discount: 20, category: 'Beauty', brand: 'Philips',
    stock: 90, isFeatured: false, rating: 4.5, numReviews: 3456,
    images: ['https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&h=500&fit=crop']
  },

  // ══ HOME & KITCHEN ════════════════════════════════════════════════
  {
    name: 'Instant Pot Duo 7-in-1',
    description: '7-in-1 electric pressure cooker: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté Pan, Yogurt Maker, and Food Warmer. 6-quart capacity.',
    price: 8999, discount: 30, category: 'Home & Kitchen', brand: 'Instant Pot',
    stock: 60, isFeatured: true, rating: 4.7, numReviews: 12040,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop']
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    description: 'Powerful cordless vacuum with laser dust detection technology, LCD screen showing particle count, and 60-minute run time.',
    price: 52900, discount: 10, category: 'Home & Kitchen', brand: 'Dyson',
    stock: 30, isFeatured: false, rating: 4.8, numReviews: 4452,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop']
  },
  {
    name: 'Philips Air Fryer XXL',
    description: 'Extra-large 7.3L capacity air fryer with TurboStar technology, digital touchscreen, 5 preset programs, and dishwasher-safe parts.',
    price: 12999, discount: 25, category: 'Home & Kitchen', brand: 'Philips',
    stock: 75, isFeatured: true, rating: 4.6, numReviews: 7890,
    images: ['https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=500&fit=crop']
  },
  {
    name: 'Godrej Refrigerator 265L',
    description: 'Double door refrigerator with 265L capacity, 5-star energy rating, inverter compressor, and special vegetable crisper with moisture control.',
    price: 28999, discount: 15, category: 'Home & Kitchen', brand: 'Godrej',
    stock: 20, isFeatured: false, rating: 4.4, numReviews: 1234,
    images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&h=500&fit=crop']
  },
  {
    name: 'Nespresso Vertuo Coffee Machine',
    description: 'Premium coffee machine with centrifusion technology, automatic capsule detection, and 5 cup sizes from espresso to alto.',
    price: 14999, discount: 12, category: 'Home & Kitchen', brand: 'Nespresso',
    stock: 45, isFeatured: false, rating: 4.7, numReviews: 3456,
    images: ['https://images.unsplash.com/photo-1521302200778-33500795e128?w=500&h=500&fit=crop']
  },
  {
    name: 'Solimo Memory Foam Pillow Set',
    description: 'Set of 2 premium memory foam pillows with bamboo-infused pillowcases, cooling gel layer, and medium-firm support for all sleep positions.',
    price: 2499, discount: 35, category: 'Home & Kitchen', brand: 'Solimo',
    stock: 150, isFeatured: false, rating: 4.3, numReviews: 5678,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop']
  },
  {
    name: 'IKEA KALLAX Shelf Unit',
    description: 'Versatile 4-cube shelf unit in white, perfect as a room divider, bookcase, or TV unit. Easy assembly with clear instructions.',
    price: 3499, discount: 0, category: 'Home & Kitchen', brand: 'IKEA',
    stock: 40, isFeatured: false, rating: 4.5, numReviews: 9012,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop']
  },

  // ══ SPORTS ═══════════════════════════════════════════════════════
  {
    name: 'Yoga Mat Premium Non-Slip',
    description: 'Eco-friendly non-slip yoga mat with alignment lines, 6mm thickness for joint support, carrying strap, and suitable for all yoga styles.',
    price: 1999, discount: 10, category: 'Sports', brand: 'Liforme',
    stock: 150, isFeatured: false, rating: 4.6, numReviews: 7230,
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop']
  },
  {
    name: 'Nivia Football Size 5',
    description: 'FIFA-approved match football with 32-panel construction, hand-stitched design, water-resistant coating, and excellent air retention.',
    price: 1499, discount: 20, category: 'Sports', brand: 'Nivia',
    stock: 200, isFeatured: false, rating: 4.3, numReviews: 3456,
    images: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&h=500&fit=crop']
  },
  {
    name: 'Yonex Badminton Racket Arcsaber 11',
    description: 'Professional badminton racket with Nanomesh Neo graphite shaft, slim tapered shaft design, and repulsion power for powerful smashes.',
    price: 7999, discount: 12, category: 'Sports', brand: 'Yonex',
    stock: 50, isFeatured: false, rating: 4.7, numReviews: 1234,
    images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&h=500&fit=crop']
  },
  {
    name: 'Decathlon Treadmill T540F',
    description: 'Foldable home treadmill with 12km/h max speed, 12 programs, LCD display, pulse sensors, and integrated phone holder.',
    price: 34999, discount: 18, category: 'Sports', brand: 'Decathlon',
    stock: 12, isFeatured: true, rating: 4.5, numReviews: 892,
    images: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop']
  },
  {
    name: 'Protein Whey Isolate 2kg',
    description: 'Whey protein isolate with 27g protein per serving, low fat, low carb, natural chocolate flavor, and digestive enzymes blend.',
    price: 3999, discount: 15, category: 'Sports', brand: 'MuscleBlaze',
    stock: 100, isFeatured: false, rating: 4.4, numReviews: 5678,
    images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=500&fit=crop']
  },
  {
    name: 'Adjustable Dumbbell Set 20kg',
    description: 'Space-saving adjustable dumbbell set with weight dial selector from 2kg to 20kg, chrome steel construction, and anti-slip grip handles.',
    price: 8999, discount: 22, category: 'Sports', brand: 'PowerMax',
    stock: 35, isFeatured: false, rating: 4.6, numReviews: 2345,
    images: ['https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=500&h=500&fit=crop']
  },

  // ══ BOOKS ════════════════════════════════════════════════════════
  {
    name: 'Atomic Habits by James Clear',
    description: 'Tiny Changes, Remarkable Results. An Easy and Proven Way to Build Good Habits and Break Bad Ones. Over 15 million copies sold worldwide.',
    price: 499, discount: 20, category: 'Books', brand: 'Penguin',
    stock: 300, isFeatured: false, rating: 4.9, numReviews: 23410,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop']
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not! A global bestseller by Robert T. Kiyosaki.',
    price: 399, discount: 25, category: 'Books', brand: 'Plata Publishing',
    stock: 400, isFeatured: false, rating: 4.7, numReviews: 45678,
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=500&fit=crop']
  },
  {
    name: 'The Psychology of Money',
    description: 'Timeless Lessons on Wealth, Greed, and Happiness by Morgan Housel. 19 short stories exploring the strange ways people think about money.',
    price: 449, discount: 15, category: 'Books', brand: 'Jaico Publishing',
    stock: 250, isFeatured: false, rating: 4.8, numReviews: 18923,
    images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=500&fit=crop']
  },
  {
    name: 'Think and Grow Rich',
    description: "Napoleon Hill's classic masterpiece on the power of thought, perseverance, and organized planning for personal and financial success.",
    price: 299, discount: 10, category: 'Books', brand: 'Fingerprint',
    stock: 350, isFeatured: false, rating: 4.6, numReviews: 56789,
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop']
  },

  // ══ TOYS ═════════════════════════════════════════════════════════
  {
    name: 'LEGO Technic Bugatti Chiron',
    description: 'Build the iconic Bugatti Chiron with 3599 pieces. Features working 8-speed dual-clutch gearbox, rear wing, and detailed engine. For ages 16+.',
    price: 14999, discount: 5, category: 'Toys', brand: 'LEGO',
    stock: 45, isFeatured: true, rating: 4.9, numReviews: 6780,
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop']
  },
  {
    name: 'Hot Wheels Ultimate Garage',
    description: 'Epic 5-level garage playset with elevator, 90+ car capacity, T-Rex attack feature, and 1 exclusive car included.',
    price: 3999, discount: 15, category: 'Toys', brand: 'Hot Wheels',
    stock: 60, isFeatured: false, rating: 4.5, numReviews: 3456,
    images: ['https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=500&h=500&fit=crop']
  },
  {
    name: 'Nerf Elite 2.0 Blaster',
    description: 'High-performance Nerf Elite 2.0 blaster with 20-dart capacity, motorized rapid fire, customizable barrel and stock attachments, and 24 darts included.',
    price: 2499, discount: 18, category: 'Toys', brand: 'Nerf',
    stock: 80, isFeatured: false, rating: 4.5, numReviews: 5123,
    images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop']
  },
  {
    name: 'Funskool Monopoly Classic Board Game',
    description: 'Classic Monopoly board game with updated tokens, vibrant board design, property cards, and hours of family fun for 2-6 players aged 8 and above.',
    price: 1299, discount: 12, category: 'Toys', brand: 'Funskool',
    stock: 120, isFeatured: false, rating: 4.6, numReviews: 8902,
    images: ['https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500&h=500&fit=crop']
  },
  {
    name: 'Remote Control Racing Car',
    description: 'High-speed 1:16 scale RC racing car with 2.4GHz control, 30km/h top speed, rechargeable battery, off-road tyres, and LED headlights.',
    price: 3499, discount: 22, category: 'Toys', brand: 'Redcat Racing',
    stock: 55, isFeatured: true, rating: 4.7, numReviews: 3210,
    images: ['https://images.unsplash.com/photo-1541336032412-2048a678540d?w=500&h=500&fit=crop']
  },

  // ══ AUTOMOTIVE ═══════════════════════════════════════════════════
  {
    name: 'Bosch Digital Tyre Inflator',
    description: 'Portable digital tyre inflator with preset pressure function, auto shut-off, LED light, and compact design for cars, bikes, and balls.',
    price: 2499, discount: 20, category: 'Automotive', brand: 'Bosch',
    stock: 120, isFeatured: false, rating: 4.5, numReviews: 4567,
    images: ['https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?w=500&h=500&fit=crop']
  },
  {
    name: '70mai Dash Cam Pro Plus',
    description: '2.7K resolution dash camera with built-in GPS, ADAS driver assistance, 140° wide angle, and parking surveillance mode.',
    price: 8999, discount: 15, category: 'Automotive', brand: '70mai',
    stock: 80, isFeatured: false, rating: 4.6, numReviews: 2345,
    images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop']
  },
  {
    name: 'Michelin Premium Car Seat Cover Set',
    description: 'Universal fit premium leather car seat covers set for 5 seats, waterproof, easy to clean, with anti-slip backing.',
    price: 3499, discount: 25, category: 'Automotive', brand: 'Michelin',
    stock: 65, isFeatured: false, rating: 4.4, numReviews: 1876,
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=500&fit=crop']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products only (preserve users)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Seed products
    const inserted = await Product.insertMany(products);
    console.log(`\n📦 ${inserted.length} products seeded successfully!\n`);

    // Category breakdown
    const cats = {};
    products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    console.log('📊 Category Breakdown:');
    Object.entries(cats).forEach(([cat, count]) => {
      console.log(`   ${cat.padEnd(18)} → ${count} products`);
    });

    console.log('\n🌟 Featured products:', products.filter(p => p.isFeatured).length);
    console.log('✅ Done! Run the server to see products in ShopEZ.\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
