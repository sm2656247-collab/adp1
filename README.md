# Comfort — Ladies Garments E-Commerce Platform

A production-grade, responsive, full-featured luxury ladies garments e-commerce platform crafted for **Comfort — Ladies Garments**.

Built with an editorial aesthetic celebrating Pakistani women's fashion, authentic combed cotton lawn, intricate threadwork, and artisanal craftsmanship.

---

## 🌸 Brand Identity & Design System

- **Brand Name:** Comfort
- **Sub-Brand:** LADIES GARMENTS
- **Primary Color Palette:**
  - **Primary Rose:** `#B67B8D`
  - **Soft Blush:** `#FFD7C4`
  - **Coral Accent:** `#FF7F50`
  - **Warm Cream:** `#F8EDE3`
  - **Deep Brown:** `#5A3E36`
  - **Soft Black:** `#211A18`
  - **Light Border:** `#E8D8D1`
- **Typography:**
  - Headings & Editorial Hero: **Cormorant Garamond** (High-contrast Serif)
  - UI & Body: **Plus Jakarta Sans**
  - Prices & SKU Metrics: `font-mono tabular-nums`

---

## ✨ Features & Capabilities

### 🛍️ Customer Experience
1. **Editorial Homepage:**
   - Fashion model hero banner ("Grace in Every Stitch") with quick CTAs and trust indicators.
   - Circular category showcase (Unstitched, Stitched Suits, Kurtis, Dresses, Shawls & Dupattas, Bottoms, Accessories).
   - "Our Latest Collection" with interactive category tabs.
   - Promotional banner: "Because You Deserve The Best".
   - "Why Choose Comfort" trust credentials.
2. **Shop & Filtering Catalog:**
   - Multi-facet filters: Category, Size (XS, S, M, L, XL, XXL, Unstitched), Fabric type (Lawn, Cotton, Velvet, Silk, Chiffon), Price range slider, and In-Stock toggle.
   - Sorting options: Featured, Newest, Best Sellers, Price: Low to High, Price: High to Low, Customer Rating.
3. **Product Details Page (PDP):**
   - Multi-image gallery with zoom and thumbnails.
   - Multi-variant selector: Size and color with real-time stock availability check.
   - Structured Specifications table: Fabric, Material, Pattern, Sleeves, Fit, Season, Occasion, Care, Origin, Pieces.
   - Verified Purchase reviews with rating breakdown and submission validation.
   - 1-Click "Buy Now" and "Add to Bag".
4. **Shopping Bag & Slide-Over Drawer:**
   - Free shipping progress bar (Free shipping across Pakistan on orders over PKR 5,000).
   - Quantity boundary checking against real warehouse stock.
   - Coupon voucher engine (e.g. `WELCOME10` for 10% off, `EID500` for PKR 500 off).
5. **Multi-Step Checkout:**
   - Step 1: Customer contact information.
   - Step 2: Shipping destination across Pakistan cities (Lahore, Karachi, Islamabad, Rawalpindi, etc.).
   - Step 3: Courier dispatch speed (Standard vs Priority Express Air).
   - Step 4: Payment methods (Cash on Delivery / COD, Bank Transfer / Raast, Online Credit/Debit Card).
   - Step 5: Review & instant inventory lock.
   - Step 6: Confirmation with unique Order Number (e.g., `COM-2026-004812`).
6. **Live Order Tracking:**
   - Public tracking tool using Order ID or courier tracking number.
   - Visual timeline: Placed → Confirmed → Processing → Packed → Shipped → Out for Delivery → Delivered.
   - Courier partner and tracking ID display (TCS Express, Leopards Courier, Trax).
7. **Printable Invoices:**
   - Professional tax invoices with business NTN, line items, breakdown, and print layout.
8. **Customer Account Portal:**
   - Order history with tracking links and return/exchange initiator.
   - Saved shipping addresses manager.
   - Wishlist manager.
   - Profile & security settings.
9. **CMS & Editorial Content:**
   - About page detailing artisanal hand embroidery in Lahore and Karachi.
   - Fashion blog journal with article modal reader.
   - Customer support desk with ticket logging.
   - Shipping policy, 7-day return guarantee, FAQs, and complete size chart (in inches).

---

### 🛡️ Store Administration Suite (`/admin`)
- **Dashboard:** Revenue KPIs (PKR), weekly SVG trajectory chart, order progression, and low-stock alerts.
- **Product Management:** Full CRUD (Create, Edit, Delete, Duplicate, Publish/Unpublish) with multi-variant stock and pricing.
- **Inventory Ledger:** Real-time stock audit, adjustment modal (Stock Receiving, Damaged, Restock), and immutable inventory change history.
- **Order Management:** Status updater, courier tracking generator, internal notes, and instant invoice printing.
- **Returns & Exchanges:** Review return requests, schedule courier pickups, and authorize refunds.
- **Customer CRM:** Registered profiles, lifetime spend, order histories, and contact info.
- **Review Moderation:** Approve, reject, feature verified purchase customer reviews.
- **Discounts & Coupons:** Create percentage or fixed discount coupons with usage thresholds and expiry dates.
- **Marketing & Growth:** Track abandoned carts with recovery notifications; export newsletter subscribers as CSV.
- **Billing & Reports:** Financial statements, COD vs digital payment breakdown, CSV exports.
- **CMS & Blog Editor:** Edit hero headline, sub-headline, top announcement bar, and publish blog posts.
- **Support Desk:** Answer customer tickets and manage resolution status.
- **Store Settings:** Shipping thresholds, standard/express fees, payment method toggles, and business addresses.
- **Security Audit Log:** Activity trail of all admin actions with timestamps and user signatures.

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Code Quality & Validation
```bash
npm run lint
```
