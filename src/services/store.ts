import {
  Product,
  Category,
  Collection,
  CartItem,
  Order,
  Review,
  Customer,
  Coupon,
  InventoryLedgerEntry,
  ReturnRequest,
  SupportTicket,
  BlogPost,
  SiteSettings,
  AdminAuditLog,
  AbandonedCart,
  OrderStatus,
  PaymentStatus,
  ProductVariant,
} from '../types/ecommerce';

// Local storage keys
const STORAGE_PREFIX = 'comfort_ladies_garments_';
const KEYS = {
  PRODUCTS: `${STORAGE_PREFIX}products`,
  CATEGORIES: `${STORAGE_PREFIX}categories`,
  COLLECTIONS: `${STORAGE_PREFIX}collections`,
  CART: `${STORAGE_PREFIX}cart`,
  WISHLIST: `${STORAGE_PREFIX}wishlist`,
  ORDERS: `${STORAGE_PREFIX}orders`,
  REVIEWS: `${STORAGE_PREFIX}reviews`,
  CUSTOMERS: `${STORAGE_PREFIX}customers`,
  COUPONS: `${STORAGE_PREFIX}coupons`,
  INVENTORY_LOGS: `${STORAGE_PREFIX}inventory_logs`,
  RETURNS: `${STORAGE_PREFIX}returns`,
  SUPPORT: `${STORAGE_PREFIX}support`,
  BLOG: `${STORAGE_PREFIX}blog`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  AUDIT: `${STORAGE_PREFIX}audit`,
  ABANDONED: `${STORAGE_PREFIX}abandoned`,
  CURRENT_USER: `${STORAGE_PREFIX}current_user`,
};

// Initial Seed Data
const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-unstitched',
    name: 'Unstitched',
    slug: 'unstitched',
    description: 'Premium pure lawn, chiffon, and jacquard 3-piece fabrics ready for custom tailoring.',
    image: '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
    itemCount: 14,
  },
  {
    id: 'cat-stitched',
    name: 'Stitched Suits',
    slug: 'stitched-suits',
    description: 'Impeccably tailored 2-piece and 3-piece designer suits with artisanal embroidery.',
    image: '/src/assets/images/hero_model_editorial_1790830549110.jpg',
    itemCount: 22,
  },
  {
    id: 'cat-kurtis',
    name: 'Kurtis',
    slug: 'kurtis',
    description: 'Contemporary & traditional single-piece tunics for effortless day-to-evening style.',
    image: '/src/assets/images/product_ivory_bloom_1790830571064.jpg',
    itemCount: 18,
  },
  {
    id: 'cat-dresses',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Flowing anarkalis, luxury maxis, and contemporary silhouette gowns.',
    image: '/src/assets/images/product_midnight_formal_1790830581776.jpg',
    itemCount: 10,
  },
  {
    id: 'cat-shawls',
    name: 'Shawls & Dupattas',
    slug: 'shawls-dupattas',
    description: 'Embroidered velvet shawls, organza wraps, and pure silk dupattas.',
    image: '/src/assets/images/banner_craftsmanship_1790830594098.jpg',
    itemCount: 12,
  },
  {
    id: 'cat-bottoms',
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Tailored trousers, embroidered culottes, raw silk pants, and classic shalwars.',
    image: '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
    itemCount: 15,
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Handcrafted potli bags, traditional statement clutches, and embellished trims.',
    image: '/src/assets/images/product_ivory_bloom_1790830571064.jpg',
    itemCount: 8,
  },
];

const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-summer-lawn',
    name: 'Summer Lawn Whisper',
    slug: 'summer-lawn',
    description: 'Airy, breathable pure cotton lawn enriched with pastel threadwork for sunlit elegance.',
    banner: '/src/assets/images/hero_model_editorial_1790830549110.jpg',
    itemCount: 16,
  },
  {
    id: 'col-festive-eid',
    name: 'Festive Eid Collection',
    slug: 'festive-eid',
    description: 'Opulent embroidery, luminous silk accents, and shimmering tilla details for joyous moments.',
    banner: '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
    itemCount: 20,
  },
  {
    id: 'col-formal-royalty',
    name: 'Midnight Formal Royalty',
    slug: 'formal-royalty',
    description: 'Sumptuous velvet, raw silk, and hand-embroidered zardozi pieces designed for evening grandeur.',
    banner: '/src/assets/images/product_midnight_formal_1790830581776.jpg',
    itemCount: 11,
  },
  {
    id: 'col-everyday-comfort',
    name: 'Everyday Comfort Classics',
    slug: 'everyday-comfort',
    description: 'Relaxed fits and understated aesthetics crafted for workdays and intimate gatherings.',
    banner: '/src/assets/images/product_ivory_bloom_1790830571064.jpg',
    itemCount: 14,
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Rose Garden Embroidered Suit',
    slug: 'rose-garden-embroidered-suit',
    sku: 'COM-RGE-001',
    category: 'Stitched Suits',
    subcategory: '3-Piece Luxury Stitched',
    collection: 'Festive Eid Collection',
    basePrice: 8950,
    comparePrice: 10500,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    shortDescription: 'Sumptuous 3-piece blush rose stitched suit with fine French knot floral embroidery and chiffon dupatta.',
    description:
      'Immerse in pure sartorial poetry with our signature Rose Garden Embroidered Suit. Cut from premium high-thread-count cotton lawn, the kameez features delicate hand-guided floral threadwork across the jewel neckline and scaloped daman. Accompanied by a printed silk-chiffon dupatta and tapered cigarette pants.',
    images: [
      '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
      '/src/assets/images/hero_model_editorial_1790830549110.jpg',
      '/src/assets/images/banner_craftsmanship_1790830594098.jpg',
    ],
    specifications: {
      fabric: 'Superfine Lawn & Silk Chiffon',
      material: '100% Combed Organic Cotton',
      pattern: 'Intricate Floral Threadwork',
      sleeves: 'Full Sleeves with Embroidered Organza Cuffs',
      fit: 'Relaxed Straight Fit',
      season: 'Spring / Summer Festive',
      occasion: 'Festive / Eid / High Tea',
      care: 'Dry Clean Recommended or Gentle Hand Wash in Cold Water',
      origin: 'Lahore, Pakistan',
      pieces: '3-Piece (Shirt, Dupatta, Trouser)',
    },
    variants: [
      {
        id: 'var-001-xs',
        sku: 'COM-RGE-001-XS',
        barcode: '896400100101',
        size: 'XS',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 8950,
        comparePrice: 10500,
        costPrice: 4800,
        stock: 5,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: 'var-001-s',
        sku: 'COM-RGE-001-S',
        barcode: '896400100102',
        size: 'S',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 8950,
        comparePrice: 10500,
        costPrice: 4800,
        stock: 12,
        reservedStock: 1,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: 'var-001-m',
        sku: 'COM-RGE-001-M',
        barcode: '896400100103',
        size: 'M',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 8950,
        comparePrice: 10500,
        costPrice: 4800,
        stock: 18,
        reservedStock: 2,
        lowStockThreshold: 4,
        isAvailable: true,
      },
      {
        id: 'var-001-l',
        sku: 'COM-RGE-001-L',
        barcode: '896400100104',
        size: 'L',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 8950,
        comparePrice: 10500,
        costPrice: 4800,
        stock: 8,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: 'var-001-xl',
        sku: 'COM-RGE-001-XL',
        barcode: '896400100105',
        size: 'XL',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 9250,
        comparePrice: 10800,
        costPrice: 5000,
        stock: 4,
        reservedStock: 0,
        lowStockThreshold: 2,
        isAvailable: true,
      },
    ],
    tags: ['Lawn', 'Embroidered', 'Festive', '3 Piece', 'Pink', 'Stitched'],
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'prod-002',
    name: 'Ivory Bloom Printed Kurti Set',
    slug: 'ivory-bloom-printed-kurti-set',
    sku: 'COM-IBK-002',
    category: 'Kurtis',
    subcategory: '2-Piece Casual Luxury',
    collection: 'Summer Lawn Whisper',
    basePrice: 5450,
    comparePrice: 6200,
    rating: 4.8,
    reviewCount: 29,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    isPublished: true,
    shortDescription: 'Airy ivory and champagne printed lawn kurti with pearl accents and matching cropped culottes.',
    description:
      'A study in quiet luxury. The Ivory Bloom kurti pairs an intricate botanical screen print with delicate pearl hangings along the mandarin collar. Designed with a breezy silhouette for day-long comfort in warm climates.',
    images: [
      '/src/assets/images/product_ivory_bloom_1790830571064.jpg',
      '/src/assets/images/hero_model_editorial_1790830549110.jpg',
    ],
    specifications: {
      fabric: 'Fine Pima Lawn',
      material: '100% Breathable Cotton',
      pattern: 'Botanical Block Print with Pearl Trims',
      sleeves: 'Quarter Length with Slit Detail',
      fit: 'A-Line Comfort Cut',
      season: 'Summer',
      occasion: 'Casual / Workwear / Day Gatherings',
      care: 'Machine Wash Delicate Cycle or Hand Wash Cold',
      origin: 'Karachi, Pakistan',
      pieces: '2-Piece (Kurti & Culotte)',
    },
    variants: [
      {
        id: 'var-002-s',
        sku: 'COM-IBK-002-S',
        barcode: '896400100201',
        size: 'S',
        color: 'Ivory Champagne',
        colorHex: '#F8EDE3',
        price: 5450,
        comparePrice: 6200,
        costPrice: 2800,
        stock: 14,
        reservedStock: 1,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: 'var-002-m',
        sku: 'COM-IBK-002-M',
        barcode: '896400100202',
        size: 'M',
        color: 'Ivory Champagne',
        colorHex: '#F8EDE3',
        price: 5450,
        comparePrice: 6200,
        costPrice: 2800,
        stock: 20,
        reservedStock: 0,
        lowStockThreshold: 5,
        isAvailable: true,
      },
      {
        id: 'var-002-l',
        sku: 'COM-IBK-002-L',
        barcode: '896400100203',
        size: 'L',
        color: 'Ivory Champagne',
        colorHex: '#F8EDE3',
        price: 5450,
        comparePrice: 6200,
        costPrice: 2800,
        stock: 9,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
    ],
    tags: ['Kurti', 'Ivory', 'Printed', 'Summer', '2 Piece', 'Casual'],
    createdAt: '2026-03-12T14:30:00Z',
  },
  {
    id: 'prod-003',
    name: 'Midnight Elegance Formal Velvet Suit',
    slug: 'midnight-elegance-formal-velvet-suit',
    sku: 'COM-MEF-003',
    category: 'Dresses',
    subcategory: '3-Piece Formal Evening',
    collection: 'Midnight Formal Royalty',
    basePrice: 18500,
    comparePrice: 22000,
    rating: 5.0,
    reviewCount: 16,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    shortDescription: 'Regal midnight black pure micro-velvet formal suit with hand-crafted antique gold zardozi and silk shawl.',
    description:
      'Command the room in this showstopping evening ensemble. Crafted from rich midnight black micro-velvet, lavished with traditional zardozi, dabka, and micro-sequins along the neckline, sleeves, and border. Accompanied by raw silk pants and an opulent contrast maroon velvet shawl.',
    images: [
      '/src/assets/images/product_midnight_formal_1790830581776.jpg',
      '/src/assets/images/banner_craftsmanship_1790830594098.jpg',
    ],
    specifications: {
      fabric: 'Pure Micro Velvet 9000 & Rawsilk',
      material: 'Silk Micro Velvet',
      pattern: 'Zardozi, Tilla & Dabka Hand Embellishment',
      sleeves: 'Full Sleeves with Detailed Border',
      fit: 'Straight Royal Cut',
      season: 'Fall / Winter / Wedding Season',
      occasion: 'Wedding / Formal Gala / Reception',
      care: 'Specialist Dry Clean Only',
      origin: 'Lahore, Pakistan',
      pieces: '3-Piece (Velvet Shirt, Velvet Shawl, Rawsilk Trouser)',
    },
    variants: [
      {
        id: 'var-003-s',
        sku: 'COM-MEF-003-S',
        barcode: '896400100301',
        size: 'S',
        color: 'Midnight Black',
        colorHex: '#211A18',
        price: 18500,
        comparePrice: 22000,
        costPrice: 9500,
        stock: 3,
        reservedStock: 0,
        lowStockThreshold: 2,
        isAvailable: true,
      },
      {
        id: 'var-003-m',
        sku: 'COM-MEF-003-M',
        barcode: '896400100302',
        size: 'M',
        color: 'Midnight Black',
        colorHex: '#211A18',
        price: 18500,
        comparePrice: 22000,
        costPrice: 9500,
        stock: 6,
        reservedStock: 1,
        lowStockThreshold: 2,
        isAvailable: true,
      },
      {
        id: 'var-003-l',
        sku: 'COM-MEF-003-L',
        barcode: '896400100303',
        size: 'L',
        color: 'Midnight Black',
        colorHex: '#211A18',
        price: 18500,
        comparePrice: 22000,
        costPrice: 9500,
        stock: 2,
        reservedStock: 0,
        lowStockThreshold: 2,
        isAvailable: true,
      },
    ],
    tags: ['Velvet', 'Formal', 'Wedding', 'Black', 'Zardozi', 'Shawl'],
    createdAt: '2026-02-15T09:15:00Z',
  },
  {
    id: 'prod-004',
    name: 'Blush Serenity Unstitched Lawn Luxury',
    slug: 'blush-serenity-unstitched-lawn',
    sku: 'COM-BSU-004',
    category: 'Unstitched',
    subcategory: '3-Piece Unstitched Fabric',
    collection: 'Summer Lawn Whisper',
    basePrice: 6250,
    comparePrice: 7500,
    rating: 4.7,
    reviewCount: 22,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isPublished: true,
    shortDescription: 'Unstitched 3-piece luxury lawn suit with embroidered neckline patch, organza borders, and voile dupatta.',
    description:
      'Customize your silhouette with our Blush Serenity unstitched set. 3.25 meters of digitally printed lawn shirt fabric, 2.5 meters of dyed cotton cambric trouser, 2.5 meters of featherweight printed voile dupatta, plus 2 organza embroidered borders for custom hem and sleeve tailoring.',
    images: [
      '/src/assets/images/hero_model_editorial_1790830549110.jpg',
      '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
    ],
    specifications: {
      fabric: 'Fine Digital Printed Lawn',
      material: 'Pure Combed Cotton',
      pattern: 'Digital Print with Embroidered Neck Patch',
      sleeves: 'Customizable Unstitched',
      fit: 'Unstitched Fabric - Tailor to Your Fit',
      season: 'Summer Lawn',
      occasion: 'Casual Festive / Everyday Elegance',
      care: 'Do Not Bleach, Gentle Hand Wash Cold',
      origin: 'Faisalabad, Pakistan',
      pieces: '3-Piece Unstitched (3.25m Shirt, 2.5m Dupatta, 2.5m Trouser)',
    },
    variants: [
      {
        id: 'var-004-unstitched',
        sku: 'COM-BSU-004-UNS',
        barcode: '896400100401',
        size: 'Unstitched',
        color: 'Pastel Blush',
        colorHex: '#FFD7C4',
        price: 6250,
        comparePrice: 7500,
        costPrice: 3400,
        stock: 35,
        reservedStock: 2,
        lowStockThreshold: 5,
        isAvailable: true,
      },
    ],
    tags: ['Unstitched', 'Lawn', 'Pastel', 'Blush', 'Summer', '3 Piece'],
    createdAt: '2026-03-01T11:00:00Z',
  },
  {
    id: 'prod-005',
    name: 'Artisan Zari Velvet Shawl',
    slug: 'artisan-zari-velvet-shawl',
    sku: 'COM-AZS-005',
    category: 'Shawls & Dupattas',
    subcategory: 'Luxury Embroidered Shawls',
    collection: 'Midnight Formal Royalty',
    basePrice: 9800,
    comparePrice: 12000,
    rating: 4.9,
    reviewCount: 14,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    isPublished: true,
    shortDescription: 'Heavy embroidered velvet shawl in deep plum with golden zari corners and kiran lace edges.',
    description:
      'A timeless heirloom piece. Handcrafted from heavy micro-velvet, embellished with golden tilla and zari motifs at all four corners, finished with delicate kiran lace tassels on the pallu.',
    images: [
      '/src/assets/images/banner_craftsmanship_1790830594098.jpg',
      '/src/assets/images/product_midnight_formal_1790830581776.jpg',
    ],
    specifications: {
      fabric: 'Micro Velvet 9000',
      material: 'Pure Velvet with Silk Backing',
      pattern: 'Antique Gold Zari Embroidery',
      sleeves: 'N/A',
      fit: 'Standard 2.5 Meter Regal Shawl',
      season: 'Winter / Festive',
      occasion: 'Weddings / Formal Receptions',
      care: 'Dry Clean Only',
      origin: 'Lahore, Pakistan',
      pieces: '1-Piece Embroidered Shawl',
    },
    variants: [
      {
        id: 'var-005-plum',
        sku: 'COM-AZS-005-PLUM',
        barcode: '896400100501',
        size: 'Unstitched',
        color: 'Deep Plum',
        colorHex: '#5A3E36',
        price: 9800,
        comparePrice: 12000,
        costPrice: 5200,
        stock: 9,
        reservedStock: 0,
        lowStockThreshold: 2,
        isAvailable: true,
      },
    ],
    tags: ['Shawl', 'Velvet', 'Zari', 'Winter', 'Festive'],
    createdAt: '2026-01-20T12:00:00Z',
  },
  {
    id: 'prod-006',
    name: 'Raw Silk Straight Cut Trousers',
    slug: 'raw-silk-straight-cut-trousers',
    sku: 'COM-RST-006',
    category: 'Bottoms',
    subcategory: 'Formal Trousers',
    collection: 'Everyday Comfort Classics',
    basePrice: 2950,
    comparePrice: 3500,
    rating: 4.6,
    reviewCount: 19,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isPublished: true,
    shortDescription: 'Tailored 100% Pakistani raw silk straight pants with side pockets and elasticated waistband.',
    description:
      'The essential companion to all your formal and semi-formal tunics. Crafted from high-sheen raw silk with a structured straight-leg drape and comfortable waistband.',
    images: [
      '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
    ],
    specifications: {
      fabric: 'Pakistani Raw Silk (Katan)',
      material: '100% Silk Blend',
      pattern: 'Solid Neutral Dye',
      sleeves: 'N/A',
      fit: 'Straight Leg with Slit Ankle',
      season: 'All Season',
      occasion: 'Casual / Semi-Formal',
      care: 'Dry Clean or Cold Hand Wash',
      origin: 'Rawalpindi, Pakistan',
      pieces: '1-Piece Trouser',
    },
    variants: [
      {
        id: 'var-006-s',
        sku: 'COM-RST-006-S',
        barcode: '896400100601',
        size: 'S',
        color: 'Warm Ivory',
        colorHex: '#F8EDE3',
        price: 2950,
        comparePrice: 3500,
        costPrice: 1400,
        stock: 15,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: 'var-006-m',
        sku: 'COM-RST-006-M',
        barcode: '896400100602',
        size: 'M',
        color: 'Warm Ivory',
        colorHex: '#F8EDE3',
        price: 2950,
        comparePrice: 3500,
        costPrice: 1400,
        stock: 22,
        reservedStock: 1,
        lowStockThreshold: 4,
        isAvailable: true,
      },
      {
        id: 'var-006-l',
        sku: 'COM-RST-006-L',
        barcode: '896400100603',
        size: 'L',
        color: 'Warm Ivory',
        colorHex: '#F8EDE3',
        price: 2950,
        comparePrice: 3500,
        costPrice: 1400,
        stock: 12,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
    ],
    tags: ['Bottoms', 'Pants', 'Raw Silk', 'Trousers', 'Ivory'],
    createdAt: '2026-02-10T16:00:00Z',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'COM-2026-004812',
    createdAt: '2026-03-28T14:32:00Z',
    customerId: 'cust-001',
    customerName: 'Ayesha Khan',
    customerEmail: 'ayesha.khan@example.com',
    customerPhone: '+92 300 1234567',
    shippingAddress: {
      id: 'addr-001',
      isDefault: true,
      fullName: 'Ayesha Khan',
      phone: '+92 300 1234567',
      street: 'House 42-B, Street 7, Phase 5, DHA',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54792',
      country: 'Pakistan',
    },
    items: [
      {
        productId: 'prod-001',
        variantId: 'var-001-m',
        name: 'Rose Garden Embroidered Suit',
        size: 'M',
        color: 'Rose Blush',
        image: '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
        price: 8950,
        quantity: 1,
        sku: 'COM-RGE-001-M',
      },
    ],
    subtotal: 8950,
    discount: 895,
    couponCode: 'WELCOME10',
    shippingFee: 0,
    deliveryMethod: 'standard',
    tax: 0,
    total: 8055,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'shipped',
    courier: {
      carrier: 'TCS Express Pakistan',
      trackingNumber: 'TCS-9928172034',
      estDelivery: 'Tomorrow by 4:00 PM',
    },
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        timestamp: 'March 28, 2026 - 2:32 PM',
        note: 'Customer placed order via Cash on Delivery with coupon WELCOME10 applied.',
      },
      {
        status: 'confirmed',
        title: 'Order Confirmed',
        timestamp: 'March 28, 2026 - 3:00 PM',
        note: 'Phone verification confirmed by customer care team.',
      },
      {
        status: 'processing',
        title: 'Quality Check & Processing',
        timestamp: 'March 29, 2026 - 9:30 AM',
        note: 'Garment passed needlework and seam inspection in Gulberg fulfillment center.',
      },
      {
        status: 'packed',
        title: 'Parcel Packed & Sealed',
        timestamp: 'March 29, 2026 - 1:15 PM',
        note: 'Sealed in signature Comfort rose luxury box with garment bag.',
      },
      {
        status: 'shipped',
        title: 'Dispatched with Courier',
        timestamp: 'March 30, 2026 - 11:20 AM',
        note: 'Handed over to TCS Express. Tracking ID: TCS-9928172034.',
      },
    ],
    internalNotes: 'VIP customer. Include complimentary fragrance sampler sachet in parcel.',
  },
  {
    id: 'COM-2026-004790',
    createdAt: '2026-03-25T11:15:00Z',
    customerId: 'cust-002',
    customerName: 'Fatima Zahra',
    customerEmail: 'fatima.zahra@example.com',
    customerPhone: '+92 321 9876543',
    shippingAddress: {
      id: 'addr-002',
      isDefault: true,
      fullName: 'Fatima Zahra',
      phone: '+92 321 9876543',
      street: 'Apartment 402, Clifton Heights, Block 4',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75600',
      country: 'Pakistan',
    },
    items: [
      {
        productId: 'prod-002',
        variantId: 'var-002-s',
        name: 'Ivory Bloom Printed Kurti Set',
        size: 'S',
        color: 'Ivory Champagne',
        image: '/src/assets/images/product_ivory_bloom_1790830571064.jpg',
        price: 5450,
        quantity: 1,
        sku: 'COM-IBK-002-S',
      },
    ],
    subtotal: 5450,
    discount: 0,
    shippingFee: 0,
    deliveryMethod: 'standard',
    tax: 0,
    total: 5450,
    paymentMethod: 'online_card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    courier: {
      carrier: 'Leopards Courier',
      trackingNumber: 'LEO-488192003',
      estDelivery: 'Delivered on March 27',
    },
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed & Paid',
        timestamp: 'March 25, 2026 - 11:15 AM',
        note: 'Online debit card payment verified.',
      },
      {
        status: 'shipped',
        title: 'Shipped via Leopards',
        timestamp: 'March 26, 2026 - 10:00 AM',
        note: 'Tracking ID: LEO-488192003.',
      },
      {
        status: 'delivered',
        title: 'Package Delivered',
        timestamp: 'March 27, 2026 - 3:45 PM',
        note: 'Delivered and signed by recipient.',
      },
    ],
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    productName: 'Rose Garden Embroidered Suit',
    orderId: 'COM-2026-004812',
    customerName: 'Ayesha Khan',
    customerEmail: 'ayesha.khan@example.com',
    rating: 5,
    title: 'Exquisite stitching and authentic luxury lawn',
    comment:
      'The finish on the embroidery is so refined and gentle on the skin. You can immediately feel the quality of the combed cotton lawn. The chiffon dupatta drapes gracefully without slipping. Truly lives up to the Comfort name!',
    createdAt: '2026-03-29T18:00:00Z',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    helpfulCount: 24,
  },
  {
    id: 'rev-002',
    productId: 'prod-002',
    productName: 'Ivory Bloom Printed Kurti Set',
    orderId: 'COM-2026-004790',
    customerName: 'Fatima Zahra',
    customerEmail: 'fatima.zahra@example.com',
    rating: 5,
    title: 'Perfect fit for humid Karachi weather',
    comment:
      'Breathable, chic, and the pearl neck detailing looks like bespoke boutique wear. Will definitely be ordering the other colors for my work wardrobe.',
    createdAt: '2026-03-28T09:30:00Z',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    helpfulCount: 18,
  },
  {
    id: 'rev-003',
    productId: 'prod-003',
    productName: 'Midnight Elegance Formal Velvet Suit',
    customerName: 'Mariam Siddiqui',
    customerEmail: 'mariam.s@example.com',
    rating: 5,
    title: 'Heirloom quality velvet and zardozi',
    comment:
      'Wore this to my cousin’s valima and received countless compliments. The velvet has a deep, rich luster without being heavy or stifling, and the shawl embroidery is museum grade.',
    createdAt: '2026-03-15T12:00:00Z',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    helpfulCount: 31,
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567',
    registeredAt: '2026-01-14T08:00:00Z',
    addresses: [
      {
        id: 'addr-001',
        isDefault: true,
        fullName: 'Ayesha Khan',
        phone: '+92 300 1234567',
        street: 'House 42-B, Street 7, Phase 5, DHA',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54792',
        country: 'Pakistan',
      },
    ],
    ordersCount: 3,
    totalSpent: 26850,
    status: 'active',
    notes: 'Prefers daytime courier delivery.',
  },
  {
    id: 'cust-002',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@example.com',
    phone: '+92 321 9876543',
    registeredAt: '2026-02-02T10:00:00Z',
    addresses: [
      {
        id: 'addr-002',
        isDefault: true,
        fullName: 'Fatima Zahra',
        phone: '+92 321 9876543',
        street: 'Apartment 402, Clifton Heights, Block 4',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75600',
        country: 'Pakistan',
      },
    ],
    ordersCount: 2,
    totalSpent: 14400,
    status: 'active',
  },
  {
    id: 'cust-003',
    name: 'Zainab Baloch',
    email: 'zainab.b@example.com',
    phone: '+92 333 4567890',
    registeredAt: '2026-02-18T16:20:00Z',
    addresses: [],
    ordersCount: 1,
    totalSpent: 9800,
    status: 'active',
  },
];

const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-001',
    code: 'WELCOME10',
    type: 'percent',
    value: 10,
    minOrder: 3000,
    maxDiscount: 2000,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    timesUsed: 64,
    isActive: true,
  },
  {
    id: 'coup-002',
    code: 'EID500',
    type: 'fixed',
    value: 500,
    minOrder: 5000,
    expiryDate: '2026-05-15',
    usageLimit: 300,
    timesUsed: 42,
    isActive: true,
  },
  {
    id: 'coup-003',
    code: 'COMFORTFREE',
    type: 'fixed',
    value: 250,
    minOrder: 2500,
    expiryDate: '2026-12-31',
    usageLimit: 1000,
    timesUsed: 89,
    isActive: true,
  },
];

const INITIAL_SETTINGS: SiteSettings = {
  storeName: 'Comfort',
  brandTagline: 'LADIES GARMENTS',
  phone: '+92 42 3578 9200',
  email: 'care@comfortgarments.pk',
  address: 'Plot 18-C, Gulberg III, M.M. Alam Road',
  city: 'Lahore',
  country: 'Pakistan',
  freeShippingThreshold: 5000,
  standardShippingFee: 250,
  expressShippingFee: 450,
  taxRate: 0,
  allowCod: true,
  allowBankTransfer: true,
  allowOnlinePayment: true,
  announcementBarText: 'Free Shipping Across Pakistan on Orders Over PKR 5,000',
  announcementDiscountCode: '10% OFF on Your First Order | Code: WELCOME10',
  heroHeadline: 'Grace in Every Stitch',
  heroSubheadline: 'Premium Ladies Garments for Every Mood, Every Occasion.',
};

const INITIAL_BLOG: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'The Art of Pure Pakistani Lawn: From Loom to Luxury',
    slug: 'art-of-pakistani-lawn',
    excerpt: 'Discover why high-thread-count combed cotton lawn remains the world standard for breathable summer comfort and vibrant drape.',
    content:
      'Pakistani lawn has captivated textile connoisseurs worldwide for decades. Unlike mass-manufactured synthetic textiles, our pure combed cotton is spun from long-staple fibers that permit natural micro-ventilation while providing a velvety hand feel. Each printed and embroidered garment is pre-shrunk and color-fasted to ensure years of heirloom enjoyment...',
    coverImage: '/src/assets/images/banner_craftsmanship_1790830594098.jpg',
    author: 'Saman Arshad, Textile Designer',
    category: 'Craftsmanship & Fabric Care',
    tags: ['Lawn', 'Textiles', 'Summer', 'Fabric Guide'],
    publishedAt: 'March 24, 2026',
    readTime: '4 min read',
  },
  {
    id: 'blog-002',
    title: '5 Ways to Style an Embroidered Dupatta for Festive Evenings',
    slug: 'styling-embroidered-dupatta',
    excerpt: 'Effortless styling techniques from the classic shoulder pleat to contemporary cape drapes.',
    content:
      'A luxury dupatta is more than an accessory—it is the crown jewel of any traditional Pakistani ensemble. In this visual guide, our lead stylists illustrate how to balance heavy zardozi embroidery with minimalistic jewels...',
    coverImage: '/src/assets/images/hero_model_editorial_1790830549110.jpg',
    author: 'Hina Tariq, Fashion Stylist',
    category: 'Style Inspirations',
    tags: ['Dupatta', 'Festive', 'Styling', 'Eid'],
    publishedAt: 'March 18, 2026',
    readTime: '5 min read',
  },
];

const INITIAL_SUPPORT: SupportTicket[] = [
  {
    id: 'TICK-101',
    name: 'Sobia Imran',
    email: 'sobia.i@example.com',
    phone: '+92 312 3456789',
    orderNumber: 'COM-2026-004812',
    subject: 'Request size measurement confirmation for trousers',
    message: 'Hello, could you please confirm the waist and hip measurements for size Medium in the Rose Garden suit? Thank you!',
    status: 'resolved',
    createdAt: '2026-03-27T10:14:00Z',
    adminReply: 'Dear Sobia, for size Medium, the relaxed waist is 28 inches stretching up to 34 inches, with a hip circumference of 42 inches.',
  },
];

const INITIAL_RETURNS: ReturnRequest[] = [
  {
    id: 'RET-201',
    orderId: 'COM-2026-004790',
    customerName: 'Fatima Zahra',
    customerEmail: 'fatima.zahra@example.com',
    customerPhone: '+92 321 9876543',
    productId: 'prod-002',
    productName: 'Ivory Bloom Printed Kurti Set',
    variantDetails: 'Size S / Ivory Champagne',
    reason: 'Size exchange needed for Small to Medium',
    details: 'The kurti fits slightly snug across shoulders. Would love an exchange for Size M.',
    status: 'under_review',
    requestedAt: '2026-03-29T15:00:00Z',
    refundAmount: 5450,
  },
];

// Helper to get from storage or fallback
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// Master Store Engine
export const StoreService = {
  init() {
    if (!localStorage.getItem(KEYS.PRODUCTS)) setStored(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    if (!localStorage.getItem(KEYS.CATEGORIES)) setStored(KEYS.CATEGORIES, INITIAL_CATEGORIES);
    if (!localStorage.getItem(KEYS.COLLECTIONS)) setStored(KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
    if (!localStorage.getItem(KEYS.ORDERS)) setStored(KEYS.ORDERS, INITIAL_ORDERS);
    if (!localStorage.getItem(KEYS.REVIEWS)) setStored(KEYS.REVIEWS, INITIAL_REVIEWS);
    if (!localStorage.getItem(KEYS.CUSTOMERS)) setStored(KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    if (!localStorage.getItem(KEYS.COUPONS)) setStored(KEYS.COUPONS, INITIAL_COUPONS);
    if (!localStorage.getItem(KEYS.SETTINGS)) setStored(KEYS.SETTINGS, INITIAL_SETTINGS);
    if (!localStorage.getItem(KEYS.BLOG)) setStored(KEYS.BLOG, INITIAL_BLOG);
    if (!localStorage.getItem(KEYS.SUPPORT)) setStored(KEYS.SUPPORT, INITIAL_SUPPORT);
    if (!localStorage.getItem(KEYS.RETURNS)) setStored(KEYS.RETURNS, INITIAL_RETURNS);
    if (!localStorage.getItem(KEYS.CART)) setStored(KEYS.CART, []);
    if (!localStorage.getItem(KEYS.WISHLIST)) setStored(KEYS.WISHLIST, ['prod-001', 'prod-003']);
    if (!localStorage.getItem(KEYS.AUDIT)) setStored(KEYS.AUDIT, []);
    if (!localStorage.getItem(KEYS.INVENTORY_LOGS)) setStored(KEYS.INVENTORY_LOGS, []);
    if (!localStorage.getItem(KEYS.ABANDONED)) setStored(KEYS.ABANDONED, []);
  },

  // Products
  getProducts(): Product[] {
    return getStored<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  getProductBySlug(slug: string): Product | undefined {
    const products = this.getProducts();
    return products.find((p) => p.slug === slug || p.id === slug);
  },

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      products[idx] = product;
      this.logAudit('Super Admin', 'Product Updated', 'Product', product.id, `Updated ${product.name}`);
    } else {
      products.unshift(product);
      this.logAudit('Super Admin', 'Product Created', 'Product', product.id, `Created new product ${product.name}`);
    }
    setStored(KEYS.PRODUCTS, products);
  },

  deleteProduct(productId: string): void {
    const products = this.getProducts().filter((p) => p.id !== productId);
    setStored(KEYS.PRODUCTS, products);
    this.logAudit('Super Admin', 'Product Deleted', 'Product', productId, `Deleted product ID ${productId}`);
  },

  // Categories & Collections
  getCategories(): Category[] {
    return getStored<Category[]>(KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  saveCategory(cat: Category): void {
    const categories = this.getCategories();
    const idx = categories.findIndex((c) => c.id === cat.id);
    if (idx >= 0) categories[idx] = cat;
    else categories.push(cat);
    setStored(KEYS.CATEGORIES, categories);
  },

  deleteCategory(catId: string): void {
    const cats = this.getCategories().filter((c) => c.id !== catId);
    setStored(KEYS.CATEGORIES, cats);
  },

  getCollections(): Collection[] {
    return getStored<Collection[]>(KEYS.COLLECTIONS, INITIAL_COLLECTIONS);
  },

  saveCollection(col: Collection): void {
    const collections = this.getCollections();
    const idx = collections.findIndex((c) => c.id === col.id);
    if (idx >= 0) collections[idx] = col;
    else collections.push(col);
    setStored(KEYS.COLLECTIONS, collections);
  },

  // Cart
  getCart(): CartItem[] {
    return getStored<CartItem[]>(KEYS.CART, []);
  },

  addToCart(item: CartItem): { success: boolean; message: string; cart: CartItem[] } {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      (c) => c.productId === item.productId && c.variantId === item.variantId
    );

    // Verify stock from live product
    const product = this.getProducts().find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    const maxStock = variant ? variant.stock : item.maxStock;

    if (existingIndex >= 0) {
      const currentQty = cart[existingIndex].quantity;
      if (currentQty + item.quantity > maxStock) {
        return {
          success: false,
          message: `Only ${maxStock} items available in stock for this variant.`,
          cart,
        };
      }
      cart[existingIndex].quantity += item.quantity;
    } else {
      if (item.quantity > maxStock) {
        return {
          success: false,
          message: `Only ${maxStock} items available in stock.`,
          cart,
        };
      }
      cart.push({ ...item, maxStock });
    }

    setStored(KEYS.CART, cart);
    return { success: true, message: `Added to bag!`, cart };
  },

  updateCartQuantity(cartItemId: string, newQty: number): CartItem[] {
    let cart = this.getCart();
    if (newQty <= 0) {
      cart = cart.filter((item) => item.id !== cartItemId);
    } else {
      const item = cart.find((i) => i.id === cartItemId);
      if (item) {
        item.quantity = Math.min(newQty, item.maxStock);
      }
    }
    setStored(KEYS.CART, cart);
    return cart;
  },

  removeFromCart(cartItemId: string): CartItem[] {
    const cart = this.getCart().filter((item) => item.id !== cartItemId);
    setStored(KEYS.CART, cart);
    return cart;
  },

  clearCart(): void {
    setStored(KEYS.CART, []);
  },

  // Wishlist
  getWishlist(): string[] {
    return getStored<string[]>(KEYS.WISHLIST, ['prod-001', 'prod-003']);
  },

  toggleWishlist(productId: string): { inWishlist: boolean; wishlist: string[] } {
    let wishlist = this.getWishlist();
    const exists = wishlist.includes(productId);
    if (exists) {
      wishlist = wishlist.filter((id) => id !== productId);
    } else {
      wishlist.push(productId);
    }
    setStored(KEYS.WISHLIST, wishlist);
    return { inWishlist: !exists, wishlist };
  },

  // Coupons
  getCoupons(): Coupon[] {
    return getStored<Coupon[]>(KEYS.COUPONS, INITIAL_COUPONS);
  },

  validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; discount: number; message: string } {
    const coupons = this.getCoupons();
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid promo code.' };
    }

    if (!coupon.isActive) {
      return { valid: false, discount: 0, message: 'This promo code is no longer active.' };
    }

    const today = new Date().toISOString().split('T')[0];
    if (coupon.expiryDate < today) {
      return { valid: false, discount: 0, message: 'This coupon has expired.' };
    }

    if (coupon.timesUsed >= coupon.usageLimit) {
      return { valid: false, discount: 0, message: 'This coupon code has reached its maximum usage limit.' };
    }

    if (subtotal < coupon.minOrder) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order of PKR ${coupon.minOrder.toLocaleString()} required for this coupon.`,
      };
    }

    let discount = 0;
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    return {
      valid: true,
      coupon,
      discount,
      message: `Coupon ${coupon.code} applied! Saved PKR ${discount.toLocaleString()}`,
    };
  },

  saveCoupon(coupon: Coupon): void {
    const coupons = this.getCoupons();
    const idx = coupons.findIndex((c) => c.id === coupon.id);
    if (idx >= 0) coupons[idx] = coupon;
    else coupons.unshift(coupon);
    setStored(KEYS.COUPONS, coupons);
    this.logAudit('Super Admin', 'Coupon Saved', 'Coupon', coupon.code, `Saved coupon ${coupon.code}`);
  },

  // Checkout & Order Placement with Inventory Transaction
  placeOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'timeline' | 'orderStatus'>): {
    success: boolean;
    order?: Order;
    error?: string;
  } {
    // 1. Transactional check & inventory decrement
    const products = this.getProducts();

    for (const item of orderData.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod) {
        return { success: false, error: `Product ${item.name} not found.` };
      }
      const variant = prod.variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return { success: false, error: `Variant for ${item.name} not found.` };
      }
      if (variant.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${item.name} (${item.size}). Available: ${variant.stock}`,
        };
      }
    }

    // 2. Decrement inventory and record ledger
    for (const item of orderData.items) {
      const prod = products.find((p) => p.id === item.productId)!;
      const variant = prod.variants.find((v) => v.id === item.variantId)!;
      const prevStock = variant.stock;
      variant.stock -= item.quantity;

      this.recordInventoryChange(
        prod.id,
        prod.name,
        variant.id,
        `${variant.size} / ${variant.color}`,
        prevStock,
        variant.stock,
        -item.quantity,
        `Customer Order Checkout`,
        'System Transaction'
      );
    }
    setStored(KEYS.PRODUCTS, products);

    // 3. Increment coupon usage if used
    if (orderData.couponCode) {
      const coupons = this.getCoupons();
      const coup = coupons.find((c) => c.code === orderData.couponCode);
      if (coup) {
        coup.timesUsed += 1;
        setStored(KEYS.COUPONS, coupons);
      }
    }

    // 4. Generate unique order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `COM-2026-00${randomSuffix}`;
    const now = new Date().toISOString();
    const formattedDate = new Intl.DateTimeFormat('en-PK', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: now,
      orderStatus: 'placed',
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed Successfully',
          timestamp: formattedDate,
          note: `Order received via ${orderData.paymentMethod.replace('_', ' ').toUpperCase()}. Confirmation sent to ${orderData.customerEmail}.`,
        },
      ],
    };

    // 5. Store order
    const orders = this.getOrders();
    orders.unshift(newOrder);
    setStored(KEYS.ORDERS, orders);

    // 6. Update or create customer profile
    this.recordCustomerOrder(newOrder);

    // 7. Clear cart
    this.clearCart();

    // 8. Log audit
    this.logAudit('System', 'Order Placed', 'Order', orderId, `New order by ${newOrder.customerName} for PKR ${newOrder.total}`);

    return { success: true, order: newOrder };
  },

  getOrders(): Order[] {
    return getStored<Order[]>(KEYS.ORDERS, INITIAL_ORDERS);
  },

  getOrderById(orderId: string): Order | undefined {
    const orders = this.getOrders();
    const cleanId = orderId.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === cleanId ||
        (o.courier?.trackingNumber && o.courier.trackingNumber.toUpperCase() === cleanId)
    );
  },

  updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    adminNote?: string,
    courierInfo?: { carrier: string; trackingNumber: string; estDelivery: string }
  ): Order | undefined {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return undefined;

    order.orderStatus = newStatus;
    if (courierInfo) {
      order.courier = courierInfo;
    }

    const titles: Record<OrderStatus, string> = {
      placed: 'Order Placed',
      confirmed: 'Order Confirmed',
      processing: 'Processing & Tailoring Quality Check',
      packed: 'Parcel Packed & Inspected',
      shipped: 'Dispatched with Courier',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Order Cancelled',
      returned: 'Returned to Warehouse',
    };

    const formattedDate = new Intl.DateTimeFormat('en-PK', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    order.timeline.push({
      status: newStatus,
      title: titles[newStatus] || 'Status Updated',
      timestamp: formattedDate,
      note: adminNote || `Status updated to ${newStatus.replace('_', ' ')}.`,
    });

    if (newStatus === 'delivered' && order.paymentMethod === 'cod') {
      order.paymentStatus = 'paid';
    }

    setStored(KEYS.ORDERS, orders);
    this.logAudit('Store Admin', 'Order Status Update', 'Order', orderId, `Updated order status to ${newStatus}`);
    return order;
  },

  // Reviews
  getReviews(productId?: string): Review[] {
    const reviews = getStored<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
    if (productId) {
      return reviews.filter((r) => r.productId === productId);
    }
    return reviews;
  },

  canCustomerReviewProduct(customerEmail: string, productId: string): { canReview: boolean; orderId?: string } {
    const orders = this.getOrders();
    const matchingOrder = orders.find(
      (o) =>
        o.customerEmail.toLowerCase() === customerEmail.toLowerCase() &&
        (o.orderStatus === 'delivered' || o.orderStatus === 'shipped' || o.orderStatus === 'confirmed') &&
        o.items.some((item) => item.productId === productId)
    );
    if (matchingOrder) {
      return { canReview: true, orderId: matchingOrder.id };
    }
    return { canReview: false };
  },

  submitReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'status' | 'helpfulCount' | 'isFeatured'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending', // Requires admin moderation
      isFeatured: false,
      helpfulCount: 0,
    };
    reviews.unshift(newRev);
    setStored(KEYS.REVIEWS, reviews);
    this.logAudit('Customer', 'Review Submitted', 'Review', newRev.id, `Submitted review for ${newRev.productName}`);
    return newRev;
  },

  moderateReview(reviewId: string, status: 'approved' | 'rejected' | 'pending', isFeatured?: boolean): void {
    const reviews = this.getReviews();
    const rev = reviews.find((r) => r.id === reviewId);
    if (rev) {
      rev.status = status;
      if (typeof isFeatured === 'boolean') rev.isFeatured = isFeatured;
      setStored(KEYS.REVIEWS, reviews);
      this.logAudit('Admin', 'Review Moderated', 'Review', reviewId, `Status set to ${status}`);
    }
  },

  // Inventory Management & Ledger
  getInventoryLogs(): InventoryLedgerEntry[] {
    return getStored<InventoryLedgerEntry[]>(KEYS.INVENTORY_LOGS, []);
  },

  recordInventoryChange(
    productId: string,
    productName: string,
    variantId: string,
    variantDetails: string,
    previousStock: number,
    newStock: number,
    change: number,
    reason: string,
    adminUser: string = 'Super Admin'
  ) {
    const logs = this.getInventoryLogs();
    const entry: InventoryLedgerEntry = {
      id: `inv-log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      productId,
      productName,
      variantId,
      variantDetails,
      previousStock,
      newStock,
      change,
      reason,
      adminUser,
    };
    logs.unshift(entry);
    setStored(KEYS.INVENTORY_LOGS, logs);
  },

  adjustStock(
    productId: string,
    variantId: string,
    newQuantity: number,
    reason: string,
    adminUser: string = 'Super Admin'
  ): boolean {
    const products = this.getProducts();
    const prod = products.find((p) => p.id === productId);
    if (!prod) return false;
    const variant = prod.variants.find((v) => v.id === variantId);
    if (!variant) return false;

    const previousStock = variant.stock;
    const change = newQuantity - previousStock;
    variant.stock = newQuantity;

    this.recordInventoryChange(
      prod.id,
      prod.name,
      variant.id,
      `${variant.size} / ${variant.color}`,
      previousStock,
      newQuantity,
      change,
      reason,
      adminUser
    );

    setStored(KEYS.PRODUCTS, products);
    this.logAudit(adminUser, 'Stock Adjustment', 'Inventory', variant.sku, `${prod.name} (${variant.size}) stock adjusted from ${previousStock} to ${newQuantity}`);
    return true;
  },

  // Returns & Refunds
  getReturns(): ReturnRequest[] {
    return getStored<ReturnRequest[]>(KEYS.RETURNS, INITIAL_RETURNS);
  },

  createReturnRequest(data: Omit<ReturnRequest, 'id' | 'requestedAt' | 'status'>): ReturnRequest {
    const returns = this.getReturns();
    const newReq: ReturnRequest = {
      ...data,
      id: `RET-${Date.now().toString().slice(-5)}`,
      requestedAt: new Date().toISOString(),
      status: 'requested',
    };
    returns.unshift(newReq);
    setStored(KEYS.RETURNS, returns);
    this.logAudit('Customer', 'Return Requested', 'ReturnRequest', newReq.id, `Return requested for Order ${newReq.orderId}`);
    return newReq;
  },

  updateReturnStatus(returnId: string, status: ReturnRequest['status']): void {
    const returns = this.getReturns();
    const ret = returns.find((r) => r.id === returnId);
    if (ret) {
      ret.status = status;
      setStored(KEYS.RETURNS, returns);
      this.logAudit('Admin', 'Return Status Updated', 'ReturnRequest', returnId, `Status updated to ${status}`);
    }
  },

  // Customers
  getCustomers(): Customer[] {
    return getStored<Customer[]>(KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  },

  recordCustomerOrder(order: Order): void {
    const customers = this.getCustomers();
    let cust = customers.find((c) => c.email.toLowerCase() === order.customerEmail.toLowerCase());
    if (cust) {
      cust.ordersCount += 1;
      cust.totalSpent += order.total;
      const addrExists = cust.addresses.some(
        (a) => a.street.toLowerCase() === order.shippingAddress.street.toLowerCase()
      );
      if (!addrExists) {
        cust.addresses.push(order.shippingAddress);
      }
    } else {
      cust = {
        id: `cust-${Date.now()}`,
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        registeredAt: new Date().toISOString(),
        addresses: [order.shippingAddress],
        ordersCount: 1,
        totalSpent: order.total,
        status: 'active',
      };
      customers.push(cust);
    }
    setStored(KEYS.CUSTOMERS, customers);
  },

  // Support Tickets
  getSupportTickets(): SupportTicket[] {
    return getStored<SupportTicket[]>(KEYS.SUPPORT, INITIAL_SUPPORT);
  },

  createSupportTicket(data: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>): SupportTicket {
    const tickets = this.getSupportTickets();
    const newTick: SupportTicket = {
      ...data,
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'open',
    };
    tickets.unshift(newTick);
    setStored(KEYS.SUPPORT, tickets);
    return newTick;
  },

  replyToSupportTicket(ticketId: string, reply: string, status: SupportTicket['status']): void {
    const tickets = this.getSupportTickets();
    const t = tickets.find((tick) => tick.id === ticketId);
    if (t) {
      t.adminReply = reply;
      t.status = status;
      setStored(KEYS.SUPPORT, tickets);
      this.logAudit('Support Agent', 'Support Reply', 'SupportTicket', ticketId, `Replied to ticket ${ticketId}`);
    }
  },

  // Blog
  getBlogPosts(): BlogPost[] {
    return getStored<BlogPost[]>(KEYS.BLOG, INITIAL_BLOG);
  },

  saveBlogPost(post: BlogPost): void {
    const posts = this.getBlogPosts();
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx >= 0) posts[idx] = post;
    else posts.unshift(post);
    setStored(KEYS.BLOG, posts);
    this.logAudit('Marketing Admin', 'Blog Post Saved', 'Blog', post.slug, `Saved blog post ${post.title}`);
  },

  deleteBlogPost(postId: string): void {
    const posts = this.getBlogPosts().filter((p) => p.id !== postId);
    setStored(KEYS.BLOG, posts);
  },

  // Site Settings
  getSettings(): SiteSettings {
    return getStored<SiteSettings>(KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  saveSettings(settings: SiteSettings): void {
    setStored(KEYS.SETTINGS, settings);
    this.logAudit('Super Admin', 'Settings Saved', 'SiteSettings', 'global', 'Updated store configuration');
  },

  // Audit Logs
  getAuditLogs(): AdminAuditLog[] {
    return getStored<AdminAuditLog[]>(KEYS.AUDIT, []);
  },

  logAudit(user: string, action: string, entity: string, entityId: string, details: string) {
    const logs = this.getAuditLogs();
    const entry: AdminAuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      user,
      action,
      entity,
      entityId,
      details,
    };
    logs.unshift(entry);
    setStored(KEYS.AUDIT, logs.slice(0, 200)); // Keep last 200 logs
  },

  // Abandoned Carts
  getAbandonedCarts(): AbandonedCart[] {
    return getStored<AbandonedCart[]>(KEYS.ABANDONED, [
      {
        id: 'ab-01',
        customerName: 'Hira Salman',
        customerEmail: 'hira.s@example.com',
        items: [
          {
            id: 'c-1',
            productId: 'prod-001',
            variantId: 'var-001-s',
            name: 'Rose Garden Embroidered Suit',
            slug: 'rose-garden-embroidered-suit',
            price: 8950,
            size: 'S',
            color: 'Rose Blush',
            colorHex: '#B67B8D',
            image: '/src/assets/images/product_rose_embroidered_1790830559690.jpg',
            quantity: 1,
            maxStock: 12,
          },
        ],
        cartValue: 8950,
        updatedAt: '2 hours ago',
        reminderSent: false,
      },
    ]);
  },

  sendCartReminder(cartId: string): boolean {
    const carts = this.getAbandonedCarts();
    const c = carts.find((cart) => cart.id === cartId);
    if (c) {
      c.reminderSent = true;
      setStored(KEYS.ABANDONED, carts);
      this.logAudit('Marketing Agent', 'Cart Recovery Sent', 'AbandonedCart', cartId, `Sent email reminder to ${c.customerEmail}`);
      return true;
    }
    return false;
  },

  // Authentication State Simulation
  getCurrentUser() {
    return getStored<{ name: string; email: string; phone: string; isAdmin?: boolean } | null>(
      KEYS.CURRENT_USER,
      null
    );
  },

  setCurrentUser(user: { name: string; email: string; phone: string; isAdmin?: boolean } | null) {
    setStored(KEYS.CURRENT_USER, user);
  },
};

// Auto-run init
StoreService.init();
