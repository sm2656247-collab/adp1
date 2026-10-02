export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Unstitched';

export interface ProductVariant {
  id: string;
  sku: string;
  barcode: string;
  size: ProductSize;
  color: string;
  colorHex: string;
  price: number;
  comparePrice?: number;
  costPrice: number;
  stock: number;
  reservedStock: number;
  lowStockThreshold: number;
  image?: string;
  isAvailable: boolean;
}

export interface ProductSpecifications {
  fabric: string;
  material: string;
  pattern: string;
  sleeves: string;
  fit: string;
  season: string;
  occasion: string;
  care: string;
  origin: string;
  pieces: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  subcategory: string;
  collection: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  images: string[];
  specifications: ProductSpecifications;
  variants: ProductVariant[];
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  color: string;
  colorHex: string;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface Address {
  id: string;
  isDefault: boolean;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'cod' | 'bank_transfer' | 'online_card';
export type PaymentStatus = 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded';
export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  size: ProductSize;
  color: string;
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  title: string;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string; // e.g. COM-2026-004812
  createdAt: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  deliveryMethod: 'standard' | 'express';
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  courier?: {
    carrier: string;
    trackingNumber: string;
    estDelivery: string;
  };
  timeline: OrderTimelineStep[];
  internalNotes?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  orderId?: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  createdAt: string;
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  isFeatured: boolean;
  helpfulCount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  addresses: Address[];
  ordersCount: number;
  totalSpent: number;
  status: 'active' | 'disabled';
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
}

export interface InventoryLedgerEntry {
  id: string;
  timestamp: string;
  productId: string;
  productName: string;
  variantId: string;
  variantDetails: string;
  previousStock: number;
  newStock: number;
  change: number;
  reason: string;
  adminUser: string;
}

export type ReturnStatus =
  | 'requested'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'pickup_scheduled'
  | 'received'
  | 'refunded'
  | 'completed';

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productId: string;
  productName: string;
  variantDetails: string;
  reason: string;
  details: string;
  status: ReturnStatus;
  requestedAt: string;
  refundAmount: number;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderNumber?: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  adminReply?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
}

export interface SiteSettings {
  storeName: string;
  brandTagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
  taxRate: number; // e.g. 0% or 5%
  allowCod: boolean;
  allowBankTransfer: boolean;
  allowOnlinePayment: boolean;
  announcementBarText: string;
  announcementDiscountCode: string;
  heroHeadline: string;
  heroSubheadline: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
}

export interface AbandonedCart {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  cartValue: number;
  updatedAt: string;
  reminderSent: boolean;
}
