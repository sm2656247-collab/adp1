import React from 'react';
import { CheckCircle2, Package, Truck, Printer, ArrowRight, MapPin } from 'lucide-react';
import { Order } from '../../types/ecommerce';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
  onViewInvoice: (order: Order) => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  onViewInvoice,
  onContinueShopping,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8D8D1] z-10 text-center my-8">
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-widest text-[#B67B8D]">
          Confirmation Receipt
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#5A3E36] mt-1">
          Order Placed Successfully!
        </h2>
        <p className="text-xs text-[#5A3E36]/70 mt-1 max-w-md mx-auto">
          Thank you for shopping with Comfort. A confirmation message and tracking dispatch details
          have been registered for your order.
        </p>

        {/* Order Card Summary */}
        <div className="mt-6 p-5 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1] text-left text-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D8D1]">
            <div>
              <span className="text-[10px] uppercase text-[#5A3E36]/60">Order Number</span>
              <p className="font-mono text-sm font-bold text-[#5A3E36]">{order.id}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#5A3E36]/60">Total Paid / COD</span>
              <p className="font-serif text-sm font-bold text-[#5A3E36] tabular-nums">
                PKR {order.total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-[#5A3E36]/80">
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="font-medium text-[#5A3E36]">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-medium text-[#5A3E36] capitalize">
                {order.paymentMethod.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Address:</span>
              <span className="font-medium text-[#5A3E36] text-right max-w-[240px] truncate">
                {order.shippingAddress.street}, {order.shippingAddress.city}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onTrackOrder(order.id);
            }}
            className="flex-1 py-3 px-4 bg-[#5A3E36] hover:bg-[#462F29] text-[#F8EDE3] rounded-xl text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#FFD7C4]" />
            <span>Track Order Progress</span>
          </button>

          <button
            onClick={() => onViewInvoice(order)}
            className="flex-1 py-3 px-4 bg-white hover:bg-[#F8EDE3]/40 text-[#5A3E36] border border-[#E8D8D1] rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#B67B8D]" />
            <span>Print Invoice</span>
          </button>
        </div>

        <button
          onClick={() => {
            onClose();
            onContinueShopping();
          }}
          className="mt-4 text-xs font-medium text-[#B67B8D] hover:underline cursor-pointer"
        >
          Continue Shopping with Comfort →
        </button>
      </div>
    </div>
  );
};
