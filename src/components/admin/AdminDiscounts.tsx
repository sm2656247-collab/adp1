import React, { useState } from 'react';
import { Tag, Plus, Check, X, Percent, Calendar } from 'lucide-react';
import { Coupon } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AdminDiscounts: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const { showToast } = useToast();
  const coupons = StoreService.getCoupons();

  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percent' | 'fixed'>('percent');
  const [value, setValue] = useState(10);
  const [minOrder, setMinOrder] = useState(3000);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [usageLimit, setUsageLimit] = useState(500);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    StoreService.saveCoupon({
      id: `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minOrder: Number(minOrder),
      expiryDate,
      usageLimit: Number(usageLimit),
      timesUsed: 0,
      isActive: true,
    });

    showToast(`Coupon ${code.toUpperCase()} created successfully!`, 'success');
    setShowModal(false);
    setCode('');
    onRefresh();
  };

  const toggleCoupon = (c: Coupon) => {
    c.isActive = !c.isActive;
    StoreService.saveCoupon(c);
    showToast(`Coupon ${c.code} status updated.`, 'success');
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Promotions & Discount Vouchers</h2>
          <p className="text-xs text-gray-500 mt-1">
            Configure promotional percentage discounts, seasonal coupon codes, and usage limits.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#FFD7C4]" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`p-6 rounded-2xl border shadow-sm space-y-4 text-xs transition-all ${
              c.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-base font-bold text-gray-900 tracking-wider">
                  {c.code}
                </span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {c.type === 'percent' ? `${c.value}% Off Order` : `PKR ${c.value} Fixed Discount`}
                </p>
              </div>
              <button
                onClick={() => toggleCoupon(c)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                  c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {c.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>

            <div className="space-y-1.5 text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Min Order:</span>
                <span className="font-semibold text-gray-800">PKR {c.minOrder.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Usage Progress:</span>
                <span className="font-semibold text-gray-800 font-mono">
                  {c.timesUsed} / {c.usageLimit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Valid Until:</span>
                <span className="font-semibold text-gray-800">{c.expiryDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="font-serif text-lg font-bold text-gray-900">Create Discount Voucher</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. EIDGIFT15"
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200 uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Min Order (PKR)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(Number(e.target.value))}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">Max Usage Limit</label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A3E36] text-white rounded-xl font-semibold hover:bg-[#462F29]"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
