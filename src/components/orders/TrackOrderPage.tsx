import React, { useState } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Printer,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types/ecommerce';
import { StoreService } from '../../services/store';

interface TrackOrderPageProps {
  initialOrderId?: string;
  onViewInvoice: (order: Order) => void;
  onContinueShopping: () => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderId = '',
  onViewInvoice,
  onContinueShopping,
}) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    initialOrderId ? StoreService.getOrderById(initialOrderId) || null : null
  );
  const [searchAttempted, setSearchAttempted] = useState(Boolean(initialOrderId));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    const found = StoreService.getOrderById(orderQuery);
    setSearchedOrder(found || null);
    setSearchAttempted(true);
  };

  const stepsOrder: Array<{ status: OrderStatus; label: string }> = [
    { status: 'placed', label: 'Order Placed' },
    { status: 'confirmed', label: 'Confirmed' },
    { status: 'processing', label: 'Tailoring / QA' },
    { status: 'packed', label: 'Packed' },
    { status: 'shipped', label: 'Dispatched' },
    { status: 'out_for_delivery', label: 'Out for Delivery' },
    { status: 'delivered', label: 'Delivered' },
  ];

  const getStepStatus = (stepStatus: OrderStatus, currentOrderStatus: OrderStatus) => {
    const statuses = ['placed', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statuses.indexOf(currentOrderStatus);
    const stepIndex = statuses.indexOf(stepStatus);

    if (currentOrderStatus === 'cancelled' || currentOrderStatus === 'returned') {
      return 'neutral';
    }

    if (currentIndex >= stepIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
            Live Shipment Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5A3E36] mt-1.5">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E36]/70 mt-2">
            Enter your Comfort Order Reference (e.g., <span className="font-mono font-bold">COM-2026-004812</span>)
            or Courier Tracking Number to view status.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                placeholder="Enter Order # or Tracking #"
                className="w-full bg-white text-xs px-4 py-3 pl-10 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D] font-mono shadow-sm uppercase"
              />
              <Search className="w-4 h-4 text-[#B67B8D] absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow transition-all cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Quick Demo Links */}
          <div className="mt-3 text-[11px] text-[#5A3E36]/60 flex items-center justify-center gap-2">
            <span>Try sample order:</span>
            <button
              onClick={() => {
                setOrderQuery('COM-2026-004812');
                setSearchedOrder(StoreService.getOrderById('COM-2026-004812') || null);
                setSearchAttempted(true);
              }}
              className="underline text-[#B67B8D] hover:text-[#5A3E36] font-mono cursor-pointer"
            >
              COM-2026-004812
            </button>
            <span>or</span>
            <button
              onClick={() => {
                setOrderQuery('COM-2026-004790');
                setSearchedOrder(StoreService.getOrderById('COM-2026-004790') || null);
                setSearchAttempted(true);
              }}
              className="underline text-[#B67B8D] hover:text-[#5A3E36] font-mono cursor-pointer"
            >
              COM-2026-004790
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchedOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D8D1] shadow-sm space-y-8">
            {/* Top Bar with Status and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D8D1]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B67B8D]">
                  Current Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className="font-serif text-2xl font-bold text-[#5A3E36] capitalize">
                    {searchedOrder.orderStatus.replace('_', ' ')}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold uppercase">
                    Active Dispatch
                  </span>
                </div>
                <p className="text-xs text-[#5A3E36]/60 mt-1">
                  Order ID: <span className="font-mono font-bold text-[#5A3E36]">{searchedOrder.id}</span> ·
                  Placed on{' '}
                  {new Date(searchedOrder.createdAt).toLocaleDateString('en-PK', {
                    dateStyle: 'medium',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onViewInvoice(searchedOrder)}
                  className="px-4 py-2 bg-white hover:bg-[#F8EDE3]/50 text-[#5A3E36] border border-[#E8D8D1] rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#B67B8D]" />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>

            {/* Courier Dispatch Card */}
            {searchedOrder.courier && (
              <div className="p-4 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#5A3E36] shadow-sm">
                    <Truck className="w-5 h-5 text-[#B67B8D]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#5A3E36]">{searchedOrder.courier.carrier}</p>
                    <p className="text-[#5A3E36]/70">
                      Tracking ID: <span className="font-mono font-bold">{searchedOrder.courier.trackingNumber}</span>
                    </p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase text-[#5A3E36]/60">Estimated Delivery</span>
                  <p className="font-semibold text-emerald-800">{searchedOrder.courier.estDelivery}</p>
                </div>
              </div>
            )}

            {/* Progress Stepper Bar */}
            <div className="py-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A3E36] mb-6">
                Shipment Progression
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {stepsOrder.map((s, idx) => {
                  const state = getStepStatus(s.status, searchedOrder.orderStatus);
                  const isDone = state === 'completed';
                  return (
                    <div key={s.status} className="flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-[#5A3E36] text-[#FFD7C4]'
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span className={`text-[10px] mt-1.5 leading-tight ${isDone ? 'font-bold text-[#5A3E36]' : 'text-gray-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Timeline Feed */}
            <div className="pt-6 border-t border-[#E8D8D1]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A3E36] mb-4">
                Fulfillment Activity Log
              </h3>
              <div className="space-y-4">
                {searchedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#B67B8D] mt-1.5 shrink-0 ring-4 ring-[#B67B8D]/20" />
                    <div className="flex-1 bg-white p-3.5 rounded-xl border border-[#E8D8D1]/80 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#5A3E36]">{step.title}</span>
                        <span className="text-[10px] text-[#5A3E36]/50">{step.timestamp}</span>
                      </div>
                      <p className="text-[#5A3E36]/80 mt-1">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Items Summary */}
            <div className="pt-6 border-t border-[#E8D8D1] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5A3E36]/80">
              <div>
                <h4 className="font-bold text-[#5A3E36] mb-2 uppercase text-[11px]">Delivery Address</h4>
                <p>{searchedOrder.shippingAddress.fullName}</p>
                <p>{searchedOrder.shippingAddress.street}</p>
                <p>
                  {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.province} ({searchedOrder.shippingAddress.postalCode})
                </p>
                <p className="mt-1 font-medium text-[#5A3E36]">Contact: {searchedOrder.customerPhone}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#5A3E36] mb-2 uppercase text-[11px]">Enclosed Items</h4>
                <div className="space-y-2">
                  {searchedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>
                        {item.quantity} × {item.name} ({item.size})
                      </span>
                      <span className="font-bold tabular-nums">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : searchAttempted ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8D8D1] max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-[#FF7F50] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-medium text-[#5A3E36]">
              Order Not Found
            </h3>
            <p className="text-xs text-[#5A3E36]/70 mt-1 max-w-sm mx-auto">
              We couldn't locate an order with ID "{orderQuery}". Please check your order confirmation
              receipt or contact customer support.
            </p>
            <button
              onClick={onContinueShopping}
              className="mt-6 px-6 py-2.5 bg-[#5A3E36] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
