import React, { useState } from 'react';
import { RotateCcw, Check, XCircle, Clock, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { ReturnRequest, ReturnStatus } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface AdminReturnsProps {
  onRefresh: () => void;
}

export const AdminReturns: React.FC<AdminReturnsProps> = ({ onRefresh }) => {
  const { showToast } = useToast();
  const returns = StoreService.getReturns();

  const handleUpdateStatus = (id: string, status: ReturnStatus) => {
    StoreService.updateReturnStatus(id, status);
    showToast(`Return status updated to ${status}.`, 'success');
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Returns & Exchanges Processing</h2>
        <p className="text-xs text-gray-500 mt-1">
          Review customer exchange claims, approve courier pickups, and release refunds.
        </p>
      </div>

      <div className="space-y-4">
        {returns.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-xs text-gray-500 italic">
            No return requests pending.
          </div>
        ) : (
          returns.map((ret) => (
            <div
              key={ret.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <span className="font-mono font-bold text-sm text-gray-900">{ret.id}</span>
                  <span className="text-gray-400 mx-2">·</span>
                  <span className="text-gray-500">
                    Order Ref: <span className="font-mono font-semibold">{ret.orderId}</span>
                  </span>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold uppercase text-[10px] self-start sm:self-auto">
                  {ret.status.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-900">{ret.customerName}</h4>
                  <p className="text-gray-500">{ret.customerEmail} · {ret.customerPhone}</p>
                  <p className="mt-2 text-gray-800 font-semibold">{ret.productName}</p>
                  <p className="text-gray-500 text-[11px]">{ret.variantDetails}</p>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
                  <p className="font-bold text-gray-900">Reason: {ret.reason}</p>
                  <p className="text-gray-600">{ret.details || 'No additional comment provided.'}</p>
                  <p className="font-bold text-[#5A3E36] pt-1">
                    Refund Amount: PKR {ret.refundAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-gray-400 text-[11px]">
                  Requested on {new Date(ret.requestedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(ret.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(ret.id, 'pickup_scheduled')}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                  >
                    Schedule Courier Pickup
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(ret.id, 'refunded')}
                    className="px-3 py-1.5 bg-[#5A3E36] text-white rounded-lg font-semibold hover:bg-[#462F29] cursor-pointer"
                  >
                    Mark as Refunded
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(ret.id, 'rejected')}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
