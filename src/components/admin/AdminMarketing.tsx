import React, { useState } from 'react';
import { Mail, Send, ShoppingBag, Users, CheckCircle, Sparkles } from 'lucide-react';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AdminMarketing: React.FC = () => {
  const { showToast } = useToast();
  const abandonedCarts = StoreService.getAbandonedCarts();

  const subscribers = [
    { email: 'hira.salman@example.com', date: 'March 29, 2026', source: 'Homepage Footer' },
    { email: 'zainab.b@example.com', date: 'March 27, 2026', source: 'Checkout Opt-in' },
    { email: 'maryam.ali@example.com', date: 'March 25, 2026', source: 'Lawn Drop Pop-up' },
    { email: 'sana.rehman@example.com', date: 'March 22, 2026', source: 'Homepage Footer' },
  ];

  const handleSendReminder = (cartId: string, email: string) => {
    StoreService.sendCartReminder(cartId);
    showToast(`Cart recovery reminder with 10% coupon sent to ${email}`, 'success');
  };

  const handleExportSubscribers = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Email,Subscription Date,Source\n' +
      subscribers.map((s) => `${s.email},${s.date},${s.source}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'comfort_newsletter_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Subscribers CSV exported successfully.', 'success');
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Marketing & Growth Campaigns</h2>
        <p className="text-xs text-gray-500 mt-1">
          Recover abandoned checkout bags, manage email subscriber lists, and launch seasonal campaigns.
        </p>
      </div>

      {/* Abandoned Carts Recovery */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B67B8D]" />
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Abandoned Shopping Bags
            </h3>
          </div>
          <span className="text-xs text-gray-500">{abandonedCarts.length} tracked carts</span>
        </div>

        <div className="space-y-3">
          {abandonedCarts.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div>
                <p className="font-bold text-gray-900">{c.customerName}</p>
                <p className="text-gray-500">{c.customerEmail} · Abandoned {c.updatedAt}</p>
                <p className="text-gray-800 mt-1 font-semibold">
                  Bag Value: PKR {c.cartValue.toLocaleString()} ({c.items.length} item)
                </p>
              </div>

              <div>
                {c.reminderSent ? (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Reminder Sent
                  </span>
                ) : (
                  <button
                    onClick={() => handleSendReminder(c.id, c.customerEmail)}
                    className="px-4 py-2 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FFD7C4]" />
                    <span>Send Recovery Offer</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Subscribers */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#B67B8D]" />
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Comfort Circle Subscribers ({subscribers.length})
            </h3>
          </div>

          <button
            onClick={handleExportSubscribers}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-4">Subscriber Email</th>
                <th className="py-2.5 px-4">Subscribed Date</th>
                <th className="py-2.5 px-4">Acquisition Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {subscribers.map((sub, i) => (
                <tr key={i}>
                  <td className="py-2.5 px-4 font-semibold">{sub.email}</td>
                  <td className="py-2.5 px-4 text-gray-500">{sub.date}</td>
                  <td className="py-2.5 px-4 text-gray-600">{sub.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
