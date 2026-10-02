import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, Trash2, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Review } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface AdminReviewsProps {
  onRefresh: () => void;
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({ onRefresh }) => {
  const { showToast } = useToast();
  const reviews = StoreService.getReviews();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filtered = reviews.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const handleModerate = (id: string, status: 'approved' | 'rejected', isFeatured?: boolean) => {
    StoreService.moderateReview(id, status, isFeatured);
    showToast(`Review status set to ${status}.`, 'success');
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Review Moderation Queue</h2>
          <p className="text-xs text-gray-500 mt-1">
            Moderate customer testimonials. Verified purchase reviews are flagged automatically.
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize cursor-pointer ${
                filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              {f} ({reviews.filter((r) => f === 'all' || r.status === f).length})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-xs text-gray-500 italic">
            No reviews match this filter.
          </div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{rev.customerName}</span>
                    <span className="text-gray-400">({rev.customerEmail})</span>
                    {rev.isVerifiedPurchase && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Product: <span className="font-semibold text-gray-800">{rev.productName}</span> ·{' '}
                    Order: <span className="font-mono">{rev.orderId || 'Direct'}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      rev.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rev.status}
                  </span>
                  {rev.isFeatured && (
                    <span className="px-2 py-0.5 bg-[#FFD7C4] text-[#5A3E36] rounded-full text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Star Rating & Content */}
              <div className="space-y-1">
                <div className="flex text-[#FF7F50]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-[#FF7F50]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <h4 className="font-serif text-sm font-bold text-gray-900">{rev.title}</h4>
                <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
              </div>

              {/* Moderation Controls */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[11px]">
                  Submitted {new Date(rev.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => handleModerate(rev.id, 'approved', true)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Feature</span>
                    </button>
                  )}
                  {rev.status !== 'rejected' && (
                    <button
                      onClick={() => handleModerate(rev.id, 'rejected', false)}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
