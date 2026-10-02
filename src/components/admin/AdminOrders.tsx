import React, { useState } from 'react';
import { Search, Eye, Truck, Printer, CheckCircle, Clock, X, AlertTriangle } from 'lucide-react';
import { Order, OrderStatus } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface AdminOrdersProps {
  onViewInvoice: (order: Order) => void;
  onRefresh: () => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ onViewInvoice, onRefresh }) => {
  const { showToast } = useToast();
  const orders = StoreService.getOrders();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status Updater modal state
  const [newStatus, setNewStatus] = useState<OrderStatus>('processing');
  const [carrier, setCarrier] = useState('TCS Express Pakistan');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estDelivery, setEstDelivery] = useState('2-3 Days');
  const [adminNote, setAdminNote] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.orderStatus !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.toLowerCase().includes(q);
      const matchTracking = o.courier?.trackingNumber.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchTracking) return false;
    }
    return true;
  });

  const openStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setCarrier(order.courier?.carrier || 'TCS Express Pakistan');
    setTrackingNumber(order.courier?.trackingNumber || `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setEstDelivery(order.courier?.estDelivery || 'Within 48 Hours');
    setAdminNote('');
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    StoreService.updateOrderStatus(
      selectedOrder.id,
      newStatus,
      adminNote,
      trackingNumber
        ? {
            carrier,
            trackingNumber,
            estDelivery,
          }
        : undefined
    );

    showToast(`Order ${selectedOrder.id} status updated to ${newStatus}.`, 'success');
    setSelectedOrder(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order Management & Fulfillment</h2>
          <p className="text-xs text-gray-500 mt-1">
            Dispatch parcels, generate courier tracking numbers, print invoices, and update order statuses.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-gray-100 rounded-xl w-full md:w-auto">
          {['all', 'placed', 'confirmed', 'processing', 'packed', 'shipped', 'delivered', 'cancelled'].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap cursor-pointer transition-colors ${
                  statusFilter === status
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            )
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID, Name, Phone..."
            className="w-full bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5A3E36]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Items / Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 italic">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-gray-900">{ord.id}</span>
                      <p className="text-[11px] text-gray-500">
                        {new Date(ord.createdAt).toLocaleDateString('en-PK', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-gray-900">{ord.customerName}</p>
                      <p className="text-[11px] text-gray-500">{ord.customerPhone}</p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-900">{ord.shippingAddress.city}</p>
                      <p className="text-[11px] text-gray-500 truncate max-w-[140px]">
                        {ord.shippingAddress.street}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold tabular-nums text-gray-900">
                        PKR {ord.total.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-gray-500">{ord.items.length} garment(s)</p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="capitalize font-semibold text-gray-700">
                        {ord.paymentMethod.replace('_', ' ')}
                      </span>
                      <p
                        className={`text-[10px] font-bold uppercase ${
                          ord.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {ord.paymentStatus}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          ord.orderStatus === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.orderStatus === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : ord.orderStatus === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.orderStatus.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openStatusModal(ord)}
                          className="px-2.5 py-1.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-lg font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5 text-[#FFD7C4]" />
                          <span>Dispatch / Update</span>
                        </button>

                        <button
                          onClick={() => onViewInvoice(ord)}
                          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer"
                          title="Print Official Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Status & Courier Dispatch Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B67B8D]">Fulfillment Control</span>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  Update Order: {selectedOrder.id}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Order Progression Status *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200 font-semibold capitalize"
                >
                  <option value="placed">Placed (Order Received)</option>
                  <option value="confirmed">Confirmed (Phone Verified)</option>
                  <option value="processing">Processing & Quality Check</option>
                  <option value="packed">Packed in Box & Sealed</option>
                  <option value="shipped">Shipped with Courier</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered to Customer</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned to Fulfillment Center</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <h4 className="font-bold text-gray-900 text-[11px] uppercase">
                  Courier Dispatch Details
                </h4>

                <div>
                  <label className="block text-[11px] font-medium mb-1">Carrier Network</label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full bg-white p-2 rounded-lg border border-gray-200"
                  >
                    <option value="TCS Express Pakistan">TCS Express Pakistan</option>
                    <option value="Leopards Courier">Leopards Courier</option>
                    <option value="Trax Logistics">Trax Logistics</option>
                    <option value="M&P Express">M&P Express</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium mb-1">Tracking Number</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="e.g. TCS-9928172034"
                      className="w-full bg-white p-2 rounded-lg border border-gray-200 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium mb-1">Est. Delivery Window</label>
                    <input
                      type="text"
                      value={estDelivery}
                      onChange={(e) => setEstDelivery(e.target.value)}
                      placeholder="e.g. Tomorrow by 5 PM"
                      className="w-full bg-white p-2 rounded-lg border border-gray-200 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">Timeline Note (Visible on customer tracking)</label>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="e.g. Handed over to rider. Arriving shortly."
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5A3E36] text-white rounded-xl font-semibold hover:bg-[#462F29]"
                >
                  Save & Update Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
