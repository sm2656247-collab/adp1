import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Order } from '../../types/ecommerce';
import { Logo } from '../common/Logo';
import { StoreService } from '../../services/store';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const settings = StoreService.getSettings();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm no-print" onClick={onClose} />

      {/* Invoice Container */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-8 sm:p-12 shadow-2xl border border-[#E8D8D1] z-10 my-8 overflow-hidden print:m-0 print:p-6 print:border-none print:shadow-none">
        {/* Top Action Bar (hidden when printing) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8D8D1] no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A3E36] uppercase tracking-wider">
              Official Tax Invoice
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#FFD7C4]" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-[#E8D8D1]">
          <div>
            <Logo variant="dark" />
            <div className="mt-4 text-xs text-[#5A3E36]/75 space-y-0.5">
              <p className="font-semibold text-[#5A3E36]">{settings.storeName} (Pvt.) Ltd.</p>
              <p>{settings.address}</p>
              <p>{settings.city}, {settings.country}</p>
              <p>Email: {settings.email} | Phone: {settings.phone}</p>
              <p className="font-mono text-[11px] text-[#5A3E36]/50">NTN / STRN: 8947261-4</p>
            </div>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B67B8D]">
              Sales Invoice
            </span>
            <p className="font-mono text-xl font-bold text-[#5A3E36]">INV-{order.id.replace('COM-', '')}</p>
            <p className="text-xs text-[#5A3E36]/70">
              Order Date:{' '}
              {new Date(order.createdAt).toLocaleDateString('en-PK', {
                dateStyle: 'medium',
              })}
            </p>
            <div className="inline-block mt-2 px-3 py-1 bg-[#F8EDE3] rounded-lg text-xs font-semibold text-[#5A3E36] capitalize">
              Payment: {order.paymentMethod.replace('_', ' ')} ({order.paymentStatus})
            </div>
          </div>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-[#E8D8D1] text-xs text-[#5A3E36]">
          <div>
            <h4 className="font-semibold text-[#B67B8D] uppercase tracking-wider mb-2">Billed & Shipped To</h4>
            <p className="font-bold text-sm text-[#5A3E36]">{order.customerName}</p>
            <p className="text-[#5A3E36]/80 mt-1">{order.shippingAddress.street}</p>
            {order.shippingAddress.apartment && (
              <p className="text-[#5A3E36]/80">{order.shippingAddress.apartment}</p>
            )}
            <p className="text-[#5A3E36]/80">
              {order.shippingAddress.city}, {order.shippingAddress.province} ({order.shippingAddress.postalCode})
            </p>
            <p className="text-[#5A3E36]/80 mt-1">Phone: {order.customerPhone}</p>
            <p className="text-[#5A3E36]/80">Email: {order.customerEmail}</p>
          </div>

          <div className="sm:text-right">
            <h4 className="font-semibold text-[#B67B8D] uppercase tracking-wider mb-2">Dispatch Courier</h4>
            <p className="font-bold text-[#5A3E36]">{order.courier ? order.courier.carrier : 'TCS Express Pakistan'}</p>
            <p className="text-[#5A3E36]/80 mt-1">
              Tracking: <span className="font-mono font-semibold">{order.courier?.trackingNumber || 'Pending Courier Pickup'}</span>
            </p>
            <p className="text-[#5A3E36]/80">Dispatch Speed: {order.deliveryMethod === 'express' ? 'Express Priority' : 'Standard 3-5 Days'}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8D8D1] text-[#5A3E36]/60 font-semibold uppercase">
                <th className="pb-3">Item Description</th>
                <th className="pb-3 text-center">Variant / SKU</th>
                <th className="pb-3 text-center">Qty</th>
                <th className="pb-3 text-right">Unit Price</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8D1]/60">
              {order.items.map((item, idx) => (
                <tr key={idx} className="text-[#5A3E36]">
                  <td className="py-3">
                    <p className="font-bold text-[#5A3E36]">{item.name}</p>
                    <p className="text-[10px] text-[#5A3E36]/60">Color: {item.color}</p>
                  </td>
                  <td className="py-3 text-center font-mono text-[11px]">
                    Size {item.size} · {item.sku}
                  </td>
                  <td className="py-3 text-center font-bold tabular-nums">{item.quantity}</td>
                  <td className="py-3 text-right tabular-nums">PKR {item.price.toLocaleString()}</td>
                  <td className="py-3 text-right font-bold tabular-nums">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="pt-4 border-t border-[#E8D8D1] flex justify-end">
          <div className="w-64 space-y-2 text-xs text-[#5A3E36]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold tabular-nums">PKR {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discount ({order.couponCode}):</span>
                <span className="font-semibold tabular-nums">- PKR {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="font-semibold tabular-nums">
                {order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee.toLocaleString()}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#E8D8D1]">
              <span>Grand Total:</span>
              <span className="tabular-nums">PKR {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Invoice Footer */}
        <div className="mt-12 pt-6 border-t border-[#E8D8D1] text-center text-[10px] text-[#5A3E36]/60 space-y-1">
          <p>Thank you for shopping with Comfort Ladies Garments.</p>
          <p>This is a computer-generated tax invoice and requires no physical signature.</p>
          <p>For any return inquiries, please initiate a request within 7 days of parcel receipt.</p>
        </div>
      </div>
    </div>
  );
};
