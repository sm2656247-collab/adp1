import React from 'react';
import { History, Shield, Clock } from 'lucide-react';
import { StoreService } from '../../services/store';

export const AdminAudit: React.FC = () => {
  const logs = StoreService.getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Admin Security & Audit Trail</h2>
        <p className="text-xs text-gray-500 mt-1">
          Immutable logging of product alterations, price edits, stock changes, and order status transitions.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Reference ID</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                    No security audit logs recorded yet in this session.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-mono text-[11px] text-gray-500">
                      {new Date(log.timestamp).toLocaleDateString('en-PK', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-gray-900">{log.user}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 font-mono text-[11px] text-gray-700">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-gray-600">{log.entity}</td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-gray-500">
                      {log.entityId}
                    </td>
                    <td className="py-2.5 px-4 text-gray-700">{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
