import React, { useState } from 'react';
import { Layers, AlertTriangle, ArrowUpDown, History, Plus, RotateCcw, X, ShieldAlert } from 'lucide-react';
import { Product, ProductVariant, InventoryLedgerEntry } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface AdminInventoryProps {
  onRefresh: () => void;
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({ onRefresh }) => {
  const { showToast } = useToast();
  const products = StoreService.getProducts();
  const logs = StoreService.getInventoryLogs();

  const [activeSubTab, setActiveSubTab] = useState<'levels' | 'ledger'>('levels');
  const [adjustingVariant, setAdjustingVariant] = useState<{
    product: Product;
    variant: ProductVariant;
  } | null>(null);

  const [newStockValue, setNewStockValue] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('Stock Receiving from Faisalabad Mill');

  // Stats
  let totalUnits = 0;
  let totalRetailValue = 0;
  let totalCostValue = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;

  products.forEach((p) => {
    p.variants.forEach((v) => {
      totalUnits += v.stock;
      totalRetailValue += v.stock * v.price;
      totalCostValue += v.stock * v.costPrice;
      if (v.stock === 0) outOfStockCount++;
      else if (v.stock <= v.lowStockThreshold) lowStockCount++;
    });
  });

  const openAdjustModal = (product: Product, variant: ProductVariant) => {
    setAdjustingVariant({ product, variant });
    setNewStockValue(variant.stock);
    setAdjustmentReason('Stock Receiving / New Batch Arrival');
  };

  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingVariant) return;

    StoreService.adjustStock(
      adjustingVariant.product.id,
      adjustingVariant.variant.id,
      newStockValue,
      adjustmentReason,
      'Super Admin'
    );

    showToast(
      `Stock updated for ${adjustingVariant.product.name} (${adjustingVariant.variant.size}).`,
      'success'
    );
    setAdjustingVariant(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Inventory & Stock Ledger</h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time stock audit, warehouse ledger tracking, and stock-level receiving adjustments.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('levels')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
              activeSubTab === 'levels' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Variant Stock Levels
          </button>
          <button
            onClick={() => setActiveSubTab('ledger')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
              activeSubTab === 'ledger' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            Inventory Audit Ledger ({logs.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-500">Total Units in Stock</span>
          <p className="font-serif text-2xl font-bold text-gray-900 mt-1 tabular-nums">
            {totalUnits.toLocaleString()} units
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gray-500">Retail Inventory Value</span>
          <p className="font-serif text-2xl font-bold text-[#5A3E36] mt-1 tabular-nums">
            PKR {totalRetailValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-amber-600">Low Stock Warnings</span>
          <p className="font-serif text-2xl font-bold text-amber-600 mt-1 tabular-nums">
            {lowStockCount} variants
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-rose-600">Out of Stock Alert</span>
          <p className="font-serif text-2xl font-bold text-rose-600 mt-1 tabular-nums">
            {outOfStockCount} variants
          </p>
        </div>
      </div>

      {/* Subtab 1: Variant Stock Levels */}
      {activeSubTab === 'levels' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase">
                <tr>
                  <th className="py-3 px-4">Garment Item</th>
                  <th className="py-3 px-4">Size & Color</th>
                  <th className="py-3 px-4">SKU / Barcode</th>
                  <th className="py-3 px-4 text-center">Available Stock</th>
                  <th className="py-3 px-4">Inventory Valuation</th>
                  <th className="py-3 px-4 text-right">Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                {products.map((prod) =>
                  prod.variants.map((v) => {
                    const isLow = v.stock <= v.lowStockThreshold && v.stock > 0;
                    const isOut = v.stock === 0;
                    return (
                      <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-gray-900">{prod.name}</p>
                          <p className="text-[11px] text-gray-500">{prod.category}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-gray-900">{v.size}</span>
                          <span className="text-gray-400 mx-1">·</span>
                          <span className="text-gray-600">{v.color}</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-gray-600">
                          {v.sku}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold tabular-nums inline-block ${
                              isOut
                                ? 'bg-rose-100 text-rose-800'
                                : isLow
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {v.stock} in stock
                          </span>
                        </td>
                        <td className="py-3 px-4 tabular-nums">
                          <p className="font-bold text-gray-900">
                            PKR {(v.stock * v.price).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Cost: PKR {(v.stock * v.costPrice).toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openAdjustModal(prod, v)}
                            className="px-3 py-1.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                          >
                            Adjust Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 2: Inventory Audit Ledger */}
      {activeSubTab === 'ledger' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Garment & Variant</th>
                  <th className="py-3 px-4 text-center">Before / After</th>
                  <th className="py-3 px-4 text-center">Stock Change</th>
                  <th className="py-3 px-4">Reason / Notes</th>
                  <th className="py-3 px-4">Authorized By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                      No stock adjustments have been recorded in this session.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-500">
                        {new Date(log.timestamp).toLocaleDateString('en-PK', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-gray-900">{log.productName}</p>
                        <p className="text-[11px] text-gray-500">{log.variantDetails}</p>
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        {log.previousStock} → <span className="font-bold">{log.newStock}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-bold tabular-nums px-2 py-0.5 rounded text-[11px] ${
                            log.change > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {log.change > 0 ? `+${log.change}` : log.change}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{log.reason}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{log.adminUser}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {adjustingVariant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Adjust Inventory Stock
              </h3>
              <button onClick={() => setAdjustingVariant(null)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 space-y-1">
              <p className="font-bold text-gray-900">{adjustingVariant.product.name}</p>
              <p className="text-gray-600">
                Size: <span className="font-semibold">{adjustingVariant.variant.size}</span> · Color:{' '}
                <span className="font-semibold">{adjustingVariant.variant.color}</span>
              </p>
              <p className="text-gray-500 font-mono text-[11px]">SKU: {adjustingVariant.variant.sku}</p>
            </div>

            <form onSubmit={handleSaveAdjustment} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  New Physical Stock Count (Current: {adjustingVariant.variant.stock}) *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newStockValue}
                  onChange={(e) => setNewStockValue(Number(e.target.value))}
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-base font-bold text-center"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">Audit / Ledger Reason *</label>
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                >
                  <option value="Stock Receiving / New Batch Arrival">Stock Receiving / New Batch Arrival</option>
                  <option value="Physical Cycle Count Reconcile">Physical Cycle Count Reconcile</option>
                  <option value="Damaged Fabric / Hem Discard">Damaged Fabric / Hem Discard</option>
                  <option value="Returned Garment Restocked">Returned Garment Restocked</option>
                  <option value="Promotional Sample Allocation">Promotional Sample Allocation</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setAdjustingVariant(null)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A3E36] text-white rounded-xl font-semibold hover:bg-[#462F29]"
                >
                  Record Ledger Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
