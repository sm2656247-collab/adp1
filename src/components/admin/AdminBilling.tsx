import React, { useState } from 'react';
import { DollarSign, Download, ArrowUpRight, TrendingUp, Calendar, CreditCard, Banknote } from 'lucide-react';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AdminBilling: React.FC = () => {
  const { showToast } = useToast();
  const orders = StoreService.getOrders();
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const grossSales = orders.reduce((acc, o) => acc + o.subtotal, 0);
  const totalDiscounts = orders.reduce((acc, o) => acc + o.discount, 0);
  const totalShippingCollected = orders.reduce((acc, o) => acc + o.shippingFee, 0);
  const netSales = orders.reduce((acc, o) => acc + o.total, 0);

  const codSales = orders
    .filter((o) => o.paymentMethod === 'cod')
    .reduce((acc, o) => acc + o.total, 0);

  const onlineSales = orders
    .filter((o) => o.paymentMethod !== 'cod')
    .reduce((acc, o) => acc + o.total, 0);

  const handleExportFinancials = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Order ID,Customer,Date,Subtotal,Discount,Shipping,Total,Payment Method,Status\n' +
      orders
        .map(
          (o) =>
            `${o.id},${o.customerName},${o.createdAt},${o.subtotal},${o.discount},${o.shippingFee},${o.total},${o.paymentMethod},${o.orderStatus}`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `comfort_financial_statement_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Financial ledger CSV exported.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Billing & Financial Performance</h2>
          <p className="text-xs text-gray-500 mt-1">
            Revenue breakdown, cash-on-delivery reconciliations, and tax statements in PKR.
          </p>
        </div>

        <button
          onClick={handleExportFinancials}
          className="px-4 py-2.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#FFD7C4]" />
          <span>Export Financial Statement</span>
        </button>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-500">Gross Sales</span>
          <p className="font-serif text-2xl font-bold text-gray-900 mt-1 tabular-nums">
            PKR {grossSales.toLocaleString()}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">Before coupons & promos</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-700">Net Settled Revenue</span>
          <p className="font-serif text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
            PKR {netSales.toLocaleString()}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">Total revenue collected</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-[#B67B8D]">Voucher Deductions</span>
          <p className="font-serif text-2xl font-bold text-[#B67B8D] mt-1 tabular-nums">
            PKR {totalDiscounts.toLocaleString()}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">Customer coupon savings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-500">Shipping Revenue</span>
          <p className="font-serif text-2xl font-bold text-gray-900 mt-1 tabular-nums">
            PKR {totalShippingCollected.toLocaleString()}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">Courier fees charged</p>
        </div>
      </div>

      {/* Payment Gateway Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif text-base font-bold text-gray-900">
              Cash on Delivery (COD) Inflow
            </h3>
          </div>
          <p className="font-serif text-2xl font-bold text-gray-900 tabular-nums">
            PKR {codSales.toLocaleString()}
          </p>
          <p className="text-gray-500">
            Collected by TCS / Leopards couriers and remitted to Meezan Bank master account weekly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="font-serif text-base font-bold text-gray-900">
              Direct Digital Payments
            </h3>
          </div>
          <p className="font-serif text-2xl font-bold text-gray-900 tabular-nums">
            PKR {onlineSales.toLocaleString()}
          </p>
          <p className="text-gray-500">
            Instant 3D-Secure debit/credit card and 1LINK Raast settlements.
          </p>
        </div>
      </div>
    </div>
  );
};
