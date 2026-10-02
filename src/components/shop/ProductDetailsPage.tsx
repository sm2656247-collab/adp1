import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Share2,
  Info,
  MessageSquare,
} from 'lucide-react';
import { Product, ProductVariant, CartItem, Review } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface ProductDetailsPageProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onNavigate: (page: string, params?: any) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.stock > 0) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'shipping'>('specs');

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const images = product.images.length > 0 ? product.images : ['/src/assets/images/product_rose_embroidered_1790830559690.jpg'];
  const activeImage = images[selectedImageIndex] || images[0];
  const reviews = StoreService.getReviews(product.id);

  const discountPercent =
    selectedVariant.comparePrice && selectedVariant.comparePrice > selectedVariant.price
      ? Math.round(((selectedVariant.comparePrice - selectedVariant.price) / selectedVariant.comparePrice) * 100)
      : null;

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    if (quantity > v.stock) {
      setQuantity(Math.max(1, v.stock));
    }
  };

  const createCartItem = (): CartItem => ({
    id: `${product.id}-${selectedVariant.id}`,
    productId: product.id,
    variantId: selectedVariant.id,
    name: product.name,
    slug: product.slug,
    price: selectedVariant.price,
    originalPrice: selectedVariant.comparePrice,
    size: selectedVariant.size,
    color: selectedVariant.color,
    colorHex: selectedVariant.colorHex,
    image: activeImage,
    quantity,
    maxStock: selectedVariant.stock,
  });

  const handleAdd = () => {
    if (selectedVariant.stock <= 0) {
      showToast('This size is currently out of stock.', 'error');
      return;
    }
    onAddToCart(createCartItem());
    showToast(`Added ${quantity} × ${product.name} to your bag.`, 'success');
  };

  const handleBuy = () => {
    if (selectedVariant.stock <= 0) {
      showToast('This size is currently out of stock.', 'error');
      return;
    }
    onBuyNow(createCartItem());
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewEmail || !reviewTitle || !reviewComment) {
      showToast('Please fill in all review fields.', 'error');
      return;
    }

    // Verify customer purchase
    const check = StoreService.canCustomerReviewProduct(reviewEmail, product.id);
    if (!check.canReview) {
      showToast(
        'Verified Purchase Policy: Only customers with a confirmed or delivered order for this garment can submit a verified review.',
        'error'
      );
      return;
    }

    StoreService.submitReview({
      productId: product.id,
      productName: product.name,
      orderId: check.orderId,
      customerName: reviewName,
      customerEmail: reviewEmail,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      isVerifiedPurchase: true,
    });

    showToast('Your verified review has been submitted and is in the moderation queue.', 'success');
    setShowReviewForm(false);
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#5A3E36]/60 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#5A3E36] cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate('shop')} className="hover:text-[#5A3E36] cursor-pointer">
            Shop
          </button>
          <ChevronRight className="w-3 h-3" />
          <button
            onClick={() => onNavigate('shop', { category: product.category })}
            className="hover:text-[#5A3E36] cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5A3E36] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* 2-Column Product Core Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D8D1]/80 shadow-sm">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F8EDE3]/50 border border-[#E8D8D1]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {discountPercent && (
                <div className="absolute top-4 left-4 bg-[#B67B8D] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow">
                  Save {discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-26 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#B67B8D] shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5A3E36]/70 mb-2">
                <span className="uppercase text-xs font-semibold text-[#B67B8D] tracking-widest">
                  {product.category} · {product.subcategory}
                </span>
                <span className="font-mono text-xs text-[#5A3E36]/50">SKU: {selectedVariant.sku}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5A3E36] leading-tight">
                {product.name}
              </h1>

              {/* Rating & Verified reviews count */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex text-[#FF7F50]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF7F50]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#5A3E36] tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-[#5A3E36]/40">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-[#B67B8D] hover:underline cursor-pointer font-medium"
                >
                  {product.reviewCount} Verified Reviews
                </button>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-5 pb-5 border-b border-[#E8D8D1]/80">
                <span className="text-3xl font-bold text-[#5A3E36] tabular-nums">
                  PKR {selectedVariant.price.toLocaleString()}
                </span>
                {selectedVariant.comparePrice && selectedVariant.comparePrice > selectedVariant.price && (
                  <span className="text-base text-[#5A3E36]/40 line-through tabular-nums">
                    PKR {selectedVariant.comparePrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-[#5A3E36]/60 ml-2">Tax included. Free shipping eligible.</span>
              </div>

              {/* Short editorial description */}
              <p className="text-sm text-[#5A3E36]/80 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Color variant */}
              <div className="mt-6">
                <label className="block text-xs font-semibold text-[#5A3E36] uppercase tracking-wider mb-2">
                  Color: <span className="text-[#B67B8D] font-medium">{selectedVariant.color}</span>
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full border-2 border-[#5A3E36] p-0.5"
                    style={{ backgroundColor: selectedVariant.colorHex }}
                  />
                  <span className="text-xs text-[#5A3E36]/80">{selectedVariant.color}</span>
                </div>
              </div>

              {/* Size variant selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#5A3E36] uppercase tracking-wider">
                    Select Size:
                  </span>
                  <button
                    onClick={() => onNavigate('faq')}
                    className="text-[#B67B8D] hover:underline cursor-pointer"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    const isOut = v.stock <= 0;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantSelect(v)}
                        disabled={isOut}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#5A3E36] text-[#F8EDE3] border-[#5A3E36] shadow-sm'
                            : isOut
                            ? 'bg-gray-50 text-gray-400 border-gray-200 line-through cursor-not-allowed'
                            : 'bg-white text-[#5A3E36] border-[#E8D8D1] hover:border-[#B67B8D]'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock notice indicator */}
                <div className="mt-2 text-xs flex items-center gap-1.5">
                  {selectedVariant.stock > 0 ? (
                    selectedVariant.stock <= selectedVariant.lowStockThreshold ? (
                      <span className="text-[#FF7F50] font-semibold flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        Hurry! Only {selectedVariant.stock} items left in stock.
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        In Stock ({selectedVariant.stock} available)
                      </span>
                    )
                  ) : (
                    <span className="text-rose-600 font-semibold">Out of Stock in this size</span>
                  )}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-semibold text-[#5A3E36] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#E8D8D1] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 text-sm text-[#5A3E36] hover:bg-[#F8EDE3] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#5A3E36] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedVariant.stock, q + 1))}
                    disabled={quantity >= selectedVariant.stock}
                    className="px-3.5 py-1.5 text-sm text-[#5A3E36] hover:bg-[#F8EDE3] disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={selectedVariant.stock <= 0}
                    className="flex-1 py-3.5 px-6 bg-[#5A3E36] hover:bg-[#462F29] disabled:bg-gray-200 disabled:text-gray-400 text-[#F8EDE3] rounded-xl text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FFD7C4]" />
                    <span>{selectedVariant.stock > 0 ? 'Add to Bag' : 'Out of Stock'}</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#B67B8D] text-white border-[#B67B8D]'
                        : 'border-[#E8D8D1] text-[#5A3E36] hover:text-[#B67B8D] hover:border-[#B67B8D]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={selectedVariant.stock <= 0}
                  className="w-full py-3.5 px-6 bg-[#B67B8D] hover:bg-[#9D6475] disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl text-sm font-semibold tracking-wide shadow-sm transition-all cursor-pointer"
                >
                  Buy Now with 1-Click Checkout
                </button>
              </div>

              {/* Fast Trust Badges */}
              <div className="mt-8 pt-6 border-t border-[#E8D8D1]/80 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#B67B8D] mb-1" />
                  <span className="text-[11px] font-semibold text-[#5A3E36]">Nationwide Express</span>
                  <span className="text-[10px] text-[#5A3E36]/60">2-4 Business Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#B67B8D] mb-1" />
                  <span className="text-[11px] font-semibold text-[#5A3E36]">7 Days Return</span>
                  <span className="text-[10px] text-[#5A3E36]/60">Hassle-Free Exchange</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#B67B8D] mb-1" />
                  <span className="text-[11px] font-semibold text-[#5A3E36]">100% Genuine</span>
                  <span className="text-[10px] text-[#5A3E36]/60">Authentic Fabric</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications, Reviews & Delivery Policy */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D8D1]/80 shadow-sm">
          {/* Tab buttons */}
          <div className="flex border-b border-[#E8D8D1] gap-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-medium transition-colors relative cursor-pointer ${
                activeTab === 'specs'
                  ? 'text-[#5A3E36] font-semibold'
                  : 'text-[#5A3E36]/60 hover:text-[#5A3E36]'
              }`}
            >
              Product Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B67B8D]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-medium transition-colors relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#5A3E36] font-semibold'
                  : 'text-[#5A3E36]/60 hover:text-[#5A3E36]'
              }`}
            >
              Customer Reviews ({reviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B67B8D]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm font-medium transition-colors relative cursor-pointer ${
                activeTab === 'shipping'
                  ? 'text-[#5A3E36] font-semibold'
                  : 'text-[#5A3E36]/60 hover:text-[#5A3E36]'
              }`}
            >
              Shipping & Returns
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B67B8D]" />
              )}
            </button>
          </div>

          {/* Tab 1: Specifications */}
          {activeTab === 'specs' && (
            <div className="py-6">
              <h3 className="font-serif text-xl font-medium text-[#5A3E36] mb-4">
                Garment Attributes & Craftsmanship
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2 border-b border-[#E8D8D1]/60 text-xs"
                  >
                    <span className="font-medium text-[#5A3E36]/70 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-semibold text-[#5A3E36] text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-6 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D8D1]">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#5A3E36]">
                    Verified Customer Feedback
                  </h3>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    Reviews can only be submitted by verified purchasers with confirmed order numbers.
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-5 py-2.5 rounded-xl bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#FFD7C4]" />
                  <span>Write a Verified Review</span>
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1] space-y-4"
                >
                  <h4 className="font-serif text-base font-semibold text-[#5A3E36]">
                    Share Your Experience
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-medium text-[#5A3E36] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        className="w-full bg-white px-3.5 py-2 rounded-lg border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-[#5A3E36] mb-1">
                        Order Email (for Purchase Verification) *
                      </label>
                      <input
                        type="email"
                        required
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        placeholder="email used during checkout"
                        className="w-full bg-white px-3.5 py-2 rounded-lg border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-medium text-[#5A3E36] mb-1">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= reviewRating
                                ? 'text-[#FF7F50] fill-[#FF7F50]'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-medium text-[#5A3E36] mb-1">Review Headline *</label>
                    <input
                      type="text"
                      required
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Magnificent stitching and elegant drape"
                      className="w-full bg-white px-3.5 py-2 rounded-lg border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block font-medium text-[#5A3E36] mb-1">Detailed Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Tell other women about fabric softness, fit, stitching quality, and color fidelity..."
                      className="w-full bg-white px-3.5 py-2 rounded-lg border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 text-xs text-[#5A3E36] hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#B67B8D] text-white rounded-lg text-xs font-semibold hover:bg-[#9D6475] transition-colors cursor-pointer"
                    >
                      Submit for Moderation
                    </button>
                  </div>
                </form>
              )}

              {/* Review List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-xs text-[#5A3E36]/60 italic">
                    Be the first verified customer to leave a review for this piece!
                  </p>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-[#E8D8D1]/80 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#5A3E36]">{rev.customerName}</span>
                          {rev.isVerifiedPurchase && (
                            <span className="text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[#5A3E36]/40 text-[11px]">
                          {new Date(rev.createdAt).toLocaleDateString('en-PK', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex text-[#FF7F50]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-[#FF7F50]' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      <h5 className="font-serif text-sm font-semibold text-[#5A3E36]">{rev.title}</h5>
                      <p className="text-xs text-[#5A3E36]/80 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Returns */}
          {activeTab === 'shipping' && (
            <div className="py-6 space-y-4 text-xs text-[#5A3E36]/80 leading-relaxed">
              <h3 className="font-serif text-xl font-medium text-[#5A3E36]">
                Delivery & Exchange Protocols
              </h3>
              <p>
                <strong>Delivery Across Pakistan:</strong> Orders are dispatched via TCS Express or Leopards
                Courier within 24 hours of confirmation. Delivery takes 2-4 business days for major cities
                (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad) and 3-5 days for other regions.
              </p>
              <p>
                <strong>Free Shipping:</strong> Enjoy complimentary shipping nationwide on all orders exceeding
                PKR 5,000. Standard shipping fee of PKR 250 applies to smaller orders.
              </p>
              <p>
                <strong>7-Day Return Policy:</strong> If you are not completely enchanted with your purchase, you
                may request an exchange or full refund within 7 days of delivery, provided tags remain intact and
                the garment is unworn.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
