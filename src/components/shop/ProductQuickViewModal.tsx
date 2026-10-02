import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Product, ProductVariant, CartItem } from '../../types/ecommerce';
import { useToast } from '../common/Toast';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onOpenDetails: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenDetails,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const { showToast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.stock > 0) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const images = product.images.length > 0 ? product.images : ['/src/assets/images/product_rose_embroidered_1790830559690.jpg'];
  const activeImage = images[selectedImageIndex] || images[0];

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    if (quantity > v.stock) {
      setQuantity(Math.max(1, v.stock));
    }
  };

  const handleAdd = () => {
    if (selectedVariant.stock <= 0) {
      showToast('Selected variant is out of stock.', 'error');
      return;
    }
    const cartItem: CartItem = {
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
    };
    onAddToCart(cartItem);
    showToast(`Added ${quantity} × ${product.name} (${selectedVariant.size}) to your bag.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#E8D8D1] overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5A3E36] hover:text-[#B67B8D] rounded-full bg-white/80 hover:bg-white z-20 shadow-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Gallery Column */}
          <div className="p-6 bg-[#F8EDE3]/30 flex flex-col justify-between">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#E8D8D1]/80 shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
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

          {/* Product Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#5A3E36]/60 mb-1">
                <span className="uppercase text-[10px] font-semibold text-[#B67B8D] tracking-wider">
                  {product.category}
                </span>
                <span className="font-mono text-[10px]">{selectedVariant.sku}</span>
              </div>

              <h2 className="font-serif text-2xl font-medium text-[#5A3E36] leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#5A3E36]">
                <div className="flex text-[#FF7F50]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF7F50]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold tabular-nums">{product.rating}</span>
                <span className="text-[#5A3E36]/50">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-[#5A3E36] tabular-nums">
                  PKR {selectedVariant.price.toLocaleString()}
                </span>
                {selectedVariant.comparePrice && selectedVariant.comparePrice > selectedVariant.price && (
                  <span className="text-sm text-[#5A3E36]/40 line-through tabular-nums">
                    PKR {selectedVariant.comparePrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#5A3E36]/80 leading-relaxed mt-3 line-clamp-3">
                {product.shortDescription || product.description}
              </p>

              {/* Variant Selector */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#5A3E36]">
                  <span>Select Size:</span>
                  <span className="text-[#B67B8D] font-normal">
                    {selectedVariant.stock > 0
                      ? selectedVariant.stock <= selectedVariant.lowStockThreshold
                        ? `Only ${selectedVariant.stock} left in stock!`
                        : `In Stock (${selectedVariant.stock})`
                      : 'Out of stock'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    const isOut = v.stock <= 0;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantSelect(v)}
                        disabled={isOut}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#5A3E36] text-[#F8EDE3] border-[#5A3E36] shadow-sm'
                            : isOut
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                            : 'bg-white text-[#5A3E36] border-[#E8D8D1] hover:border-[#B67B8D]'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-[#5A3E36]">Quantity:</span>
                <div className="flex items-center border border-[#E8D8D1] rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm text-[#5A3E36] hover:bg-[#F8EDE3] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-[#5A3E36] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedVariant.stock, q + 1))}
                    disabled={quantity >= selectedVariant.stock}
                    className="px-3 py-1 text-sm text-[#5A3E36] hover:bg-[#F8EDE3] disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E8D8D1] space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={selectedVariant.stock <= 0}
                  className="flex-1 py-3 px-4 bg-[#5A3E36] hover:bg-[#462F29] disabled:bg-gray-200 disabled:text-gray-400 text-[#F8EDE3] rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FFD7C4]" />
                  <span>{selectedVariant.stock > 0 ? 'Add to Bag' : 'Out of Stock'}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#B67B8D] text-white border-[#B67B8D]'
                      : 'border-[#E8D8D1] text-[#5A3E36] hover:text-[#B67B8D] hover:border-[#B67B8D]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenDetails(product);
                }}
                className="w-full text-center text-xs font-medium text-[#B67B8D] hover:text-[#5A3E36] py-1 cursor-pointer flex items-center justify-center gap-1"
              >
                <span>View Complete Product Details & Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
