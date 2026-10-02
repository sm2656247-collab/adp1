import React, { useState } from 'react';
import { Users, Search, Phone, Mail, MapPin, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Customer } from '../../types/ecommerce';
import { StoreService } from '../../services/store';

export const AdminCustomers: React.FC = () => {
  const customers = StoreService.getCustomers();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Customer Relationship Management</h2>
          <p className="text-xs text-gray-500 mt-1">
            Browse registered customer profiles, lifetime purchase histories, and delivery destinations.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5A3E36]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Registration</th>
                <th className="py-3 px-4 text-center">Orders Count</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-[11px] text-gray-500">{c.email}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-gray-700">{c.phone}</td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(c.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center font-bold tabular-nums">
                    {c.ordersCount}
                  </td>
                  <td className="py-3 px-4 font-bold tabular-nums text-gray-900">
                    PKR {c.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
