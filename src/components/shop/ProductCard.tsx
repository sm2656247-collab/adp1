import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types/ecommerce';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onOpenDetails,
  onToggleWishlist,
  isWishlisted,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images[0] || '/src/assets/images/hero_model_editorial_1790830549110.jpg';
  const secondaryImage = product.images[1] || primaryImage;

  // Check overall stock
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const isOutOfStock = totalStock <= 0;

  // Calculate discount percentage
  const discountPercent =
    product.comparePrice && product.comparePrice > product.basePrice
      ? Math.round(((product.comparePrice - product.basePrice) / product.comparePrice) * 100)
      : null;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl border border-[#E8D8D1]/80 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-[3/4] bg-[#F8EDE3]/40 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(product)}>
        {/* Main Image */}
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent && (
            <span className="bg-[#B67B8D] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase shadow-sm">
              Save {discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#5A3E36] text-[#FFD7C4] text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
              New
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-[#211A18] text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-[#B67B8D] text-white shadow-md'
              : 'bg-white/80 text-[#5A3E36] hover:bg-white hover:text-[#B67B8D]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Bar */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 text-[#5A3E36] hover:bg-white hover:text-[#B67B8D] rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#5A3E36]/60 mb-1">
            <span className="uppercase text-[10px] tracking-wider font-semibold text-[#B67B8D]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#5A3E36]">
              <Star className="w-3 h-3 text-[#FF7F50] fill-[#FF7F50]" />
              <span className="tabular-nums font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-[#5A3E36]/40">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-serif text-base font-medium text-[#5A3E36] group-hover:text-[#B67B8D] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Fabric note */}
          <p className="text-xs text-[#5A3E36]/70 mt-1 line-clamp-1">
            {product.specifications.fabric}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-3 border-t border-[#E8D8D1]/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-[#5A3E36] tabular-nums">
              PKR {product.basePrice.toLocaleString()}
            </span>
            {product.comparePrice && product.comparePrice > product.basePrice && (
              <span className="text-xs text-[#5A3E36]/40 line-through tabular-nums">
                PKR {product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (isOutOfStock) return;
              onAddToCart(product);
            }}
            disabled={isOutOfStock}
            className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#5A3E36]/10 text-[#5A3E36] hover:bg-[#5A3E36] hover:text-[#F8EDE3]'
            }`}
            title={isOutOfStock ? 'Out of stock' : 'Add to Bag'}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
