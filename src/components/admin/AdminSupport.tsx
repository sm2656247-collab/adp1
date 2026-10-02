import React, { useState } from 'react';
import { MessageSquare, Check, Clock, User, Send, X } from 'lucide-react';
import { SupportTicket } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AdminSupport: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const { showToast } = useToast();
  const tickets = StoreService.getSupportTickets();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [status, setStatus] = useState<SupportTicket['status']>('resolved');

  const openReply = (t: SupportTicket) => {
    setSelectedTicket(t);
    setReplyText(t.adminReply || '');
    setStatus(t.status);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText) return;

    StoreService.replyToSupportTicket(selectedTicket.id, replyText, status);
    showToast(`Replied to ticket ${selectedTicket.id}`, 'success');
    setSelectedTicket(null);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Customer Support Desk</h2>
        <p className="text-xs text-gray-500 mt-1">
          Respond to customer inquiries, size consultations, and tracking questions.
        </p>
      </div>

      <div className="space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gray-900">{t.id}</span>
                <span className="text-gray-400">·</span>
                <span className="font-semibold text-gray-800">{t.name}</span>
                <span className="text-gray-500">({t.email})</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  t.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : t.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {t.status.replace('_', ' ')}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">{t.subject}</h4>
              {t.orderNumber && (
                <p className="text-[11px] text-[#B67B8D] font-mono mt-0.5">
                  Order Ref: {t.orderNumber}
                </p>
              )}
              <p className="text-gray-700 mt-1 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
                "{t.message}"
              </p>
            </div>

            {t.adminReply && (
              <div className="bg-[#F8EDE3]/40 p-3 rounded-xl border border-[#E8D8D1] space-y-1">
                <p className="font-bold text-[#5A3E36]">Admin Response:</p>
                <p className="text-gray-700">{t.adminReply}</p>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-gray-400 text-[11px]">
              <span>Received {new Date(t.createdAt).toLocaleDateString()}</span>
              <button
                onClick={() => openReply(t)}
                className="px-3.5 py-1.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-lg font-semibold text-xs cursor-pointer"
              >
                {t.adminReply ? 'Update Response' : 'Reply to Customer'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <h3 className="font-serif text-lg font-bold text-gray-900">
                Reply to {selectedTicket.name} ({selectedTicket.id})
              </h3>
              <button onClick={() => setSelectedTicket(null)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200"
                >
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Response Message *</label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Dear customer, thank you for reaching out..."
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A3E36] text-white rounded-xl font-semibold hover:bg-[#462F29]"
                >
                  Send Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
