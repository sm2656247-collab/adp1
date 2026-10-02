import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, Tag, Truck, ShieldCheck, Heart } from 'lucide-react';
import { CartItem } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  onMoveToWishlist: (productId: string, cartItemId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onContinueShopping,
  onMoveToWishlist,
}) => {
  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

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
    <div className="bg-[#F8EDE3]/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E8D8D1]/80 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[#5A3E36]">Shopping Bag</h1>
            <p className="text-xs text-[#5A3E36]/70 mt-1">
              Review and adjust the quantities of your selected garments.
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#B67B8D] hover:text-[#5A3E36] font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8D8D1] max-w-lg mx-auto my-10 shadow-sm">
            <ShoppingBag className="w-16 h-16 text-[#B67B8D]/30 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-medium text-[#5A3E36]">
              Your cart is waiting for something beautiful.
            </h2>
            <p className="text-xs text-[#5A3E36]/70 mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our stitched lawn suits, delicate kurtis, and royal shawls designed for effortless grace.
            </p>
            <button
              onClick={onContinueShopping}
              className="mt-6 px-8 py-3 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow transition-all cursor-pointer"
            >
              Discover The Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping bar */}
              <div className="bg-[#5A3E36] text-[#F8EDE3] p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <Truck className="w-4 h-4 text-[#FFD7C4]" />
                  {isFreeShipping ? (
                    <span className="text-[#FFD7C4] font-medium">
                      Congratulations! You unlocked Free Shipping Across Pakistan.
                    </span>
                  ) : (
                    <span>
                      Add <span className="font-bold text-[#FFD7C4]">PKR {amountToFreeShipping.toLocaleString()}</span> more for Free Delivery
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/60 font-mono">
                  PKR {subtotal.toLocaleString()} / PKR {freeThreshold.toLocaleString()}
                </span>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-2xl border border-[#E8D8D1] shadow-sm divide-y divide-[#E8D8D1]/60">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-26 rounded-xl overflow-hidden bg-[#F8EDE3]/40 border border-[#E8D8D1]/80 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-semibold text-[#5A3E36]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#5A3E36]/60 mt-0.5">
                          Size: <span className="font-medium text-[#5A3E36]">{item.size}</span> · Color:{' '}
                          <span className="font-medium text-[#5A3E36]">{item.color}</span>
                        </p>
                        <p className="text-xs font-bold text-[#5A3E36] mt-2 tabular-nums">
                          PKR {item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8D8D1] rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-xs text-[#5A3E36] hover:bg-[#F8EDE3] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 text-xs font-bold tabular-nums text-[#5A3E36]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="px-3 py-1.5 text-xs text-[#5A3E36] hover:bg-[#F8EDE3] disabled:opacity-30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="font-serif text-base font-bold text-[#5A3E36] tabular-nums min-w-[100px] text-right">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Actions: Save for later & remove */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onMoveToWishlist(item.productId, item.id)}
                          className="p-2 text-gray-400 hover:text-[#B67B8D] rounded-lg transition-colors cursor-pointer"
                          title="Save for later"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-gray-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={onClearCart}
                  className="text-xs text-[#5A3E36]/60 hover:text-rose-600 underline cursor-pointer"
                >
                  Clear Entire Bag
                </button>
                <button
                  onClick={onContinueShopping}
                  className="text-xs text-[#B67B8D] hover:text-[#5A3E36] font-medium cursor-pointer"
                >
                  Add More Items →
                </button>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-[#E8D8D1] shadow-sm space-y-4">
                <h2 className="font-serif text-lg font-semibold text-[#5A3E36]">Order Summary</h2>

                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="block text-xs font-semibold text-[#5A3E36]">Promo / Discount Voucher</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 bg-white text-xs px-3 py-2 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D] uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#5A3E36] text-[#F8EDE3] rounded-xl text-xs font-semibold hover:bg-[#462F29] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <span>Coupon {appliedCoupon.code} applied</span>
                    <span className="font-bold">- PKR {appliedCoupon.discount.toLocaleString()}</span>
                  </div>
                )}

                {/* Calculations Table */}
                <div className="space-y-2.5 text-xs text-[#5A3E36]/80 pt-2 border-t border-[#E8D8D1]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold tabular-nums text-[#5A3E36]">
                      PKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Discount Voucher</span>
                      <span className="font-semibold tabular-nums">
                        - PKR {discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold tabular-nums text-[#5A3E36]">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700">FREE</span>
                      ) : (
                        `PKR ${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#5A3E36] pt-3 border-t border-[#E8D8D1]">
                    <span>Grand Total</span>
                    <span className="tabular-nums">PKR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={onCheckout}
                  className="w-full py-4 px-6 bg-[#5A3E36] hover:bg-[#462F29] text-[#F8EDE3] rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD7C4]" />
                </button>

                <p className="text-[11px] text-center text-[#5A3E36]/60">
                  Cash on Delivery & Secure Online Payments Accepted
                </p>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8D8D1] text-xs space-y-3">
                <div className="flex items-center gap-2.5 text-[#5A3E36]">
                  <ShieldCheck className="w-4 h-4 text-[#B67B8D]" />
                  <span>100% Original Pakistani Fabric Guaranteed</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#5A3E36]">
                  <Truck className="w-4 h-4 text-[#B67B8D]" />
                  <span>Nationwide Express Dispatch in 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
