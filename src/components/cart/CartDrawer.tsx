import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck, Tag } from 'lucide-react';
import { CartItem } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  onViewBag: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onViewBag,
}) => {
  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  if (!isOpen) return null;

  const settings = StoreService.getSettings();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeThreshold = settings.freeShippingThreshold || 5000;
  const isFreeShipping = subtotal >= freeThreshold;
  const amountToFreeShipping = Math.max(0, freeThreshold - subtotal);
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : settings.standardShippingFee;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = StoreService.validateCoupon(couponCode, subtotal);
    if (res.valid) {
      setAppliedCoupon({ code: res.coupon!.code, discount: res.discount });
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between z-10 border-l border-[#E8D8D1]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8D8D1] flex items-center justify-between bg-[#F8EDE3]/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5A3E36]" />
            <h2 className="font-serif text-lg font-semibold text-[#5A3E36]">
              Your Shopping Bag ({cart.reduce((a, c) => a + c.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-[#5A3E36] hover:bg-white transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#5A3E36] text-[#F8EDE3] px-5 py-3 text-xs">
          <div className="flex items-center gap-1.5 mb-1.5 font-medium">
            <Truck className="w-3.5 h-3.5 text-[#FFD7C4]" />
            {isFreeShipping ? (
              <span className="text-[#FFD7C4]">You qualify for Free Shipping Across Pakistan!</span>
            ) : (
              <span>
                Add <span className="font-bold text-[#FFD7C4]">PKR {amountToFreeShipping.toLocaleString()}</span> more for Free Delivery
              </span>
            )}
          </div>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#FFD7C4] h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F8EDE3] flex items-center justify-center mx-auto text-[#B67B8D]">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#5A3E36]">
                Your bag is waiting for something beautiful.
              </h3>
              <p className="text-xs text-[#5A3E36]/60 max-w-xs mx-auto">
                Explore our pure lawn collections, embroidered festive suits, and graceful kurtis.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 rounded-xl bg-[#5A3E36] text-white text-xs font-semibold hover:bg-[#462F29] transition-colors cursor-pointer"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 rounded-xl border border-[#E8D8D1]/70 bg-white hover:border-[#B67B8D]/40 transition-colors"
              >
                {/* Image */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#F8EDE3]/40 shrink-0 border border-[#E8D8D1]/60">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#5A3E36] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#5A3E36]/60 mt-0.5">
                      Size: <span className="font-medium text-[#5A3E36]">{item.size}</span> · Color:{' '}
                      <span className="font-medium text-[#5A3E36]">{item.color}</span>
                    </p>
                    <p className="text-xs font-bold text-[#5A3E36] mt-1 tabular-nums">
                      PKR {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center border border-[#E8D8D1] rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#5A3E36] hover:bg-gray-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[#5A3E36]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="px-2 py-0.5 text-xs text-[#5A3E36] hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations & CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8D8D1] bg-[#F8EDE3]/30 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Coupon code (e.g. WELCOME10)"
                  className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D] uppercase font-mono"
                />
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#5A3E36] text-[#F8EDE3] rounded-lg text-xs font-medium hover:bg-[#462F29] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span>Coupon ({appliedCoupon.code}) applied</span>
                <span className="font-bold">- PKR {appliedCoupon.discount.toLocaleString()}</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#5A3E36]/80 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-[#5A3E36]">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Discount</span>
                  <span className="font-semibold tabular-nums">
                    - PKR {discount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold tabular-nums text-[#5A3E36]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `PKR ${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#5A3E36] pt-2 border-t border-[#E8D8D1]">
                <span>Total</span>
                <span className="tabular-nums">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#5A3E36] hover:bg-[#462F29] text-[#F8EDE3] rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#FFD7C4]" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewBag();
                }}
                className="w-full py-2 text-center text-xs text-[#5A3E36] hover:text-[#B67B8D] font-medium cursor-pointer"
              >
                View Detailed Bag Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
