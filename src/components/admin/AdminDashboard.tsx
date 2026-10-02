import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Star,
  RotateCcw,
  Tag,
  TrendingUp,
  FileText,
  DollarSign,
  HelpCircle,
  Settings,
  Shield,
  ArrowLeft,
  ExternalLink,
  Menu,
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { StoreService } from '../../services/store';
import { Order } from '../../types/ecommerce';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminInventory } from './AdminInventory';
import { AdminReviews } from './AdminReviews';
import { AdminReturns } from './AdminReturns';
import { AdminCustomers } from './AdminCustomers';
import { AdminDiscounts } from './AdminDiscounts';
import { AdminMarketing } from './AdminMarketing';
import { AdminBilling } from './AdminBilling';
import { AdminCMS } from './AdminCMS';
import { AdminSupport } from './AdminSupport';
import { AdminSettings } from './AdminSettings';
import { AdminAudit } from './AdminAudit';

interface AdminDashboardProps {
  onBackToStore: () => void;
  onViewInvoice: (order: Order) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToStore,
  onViewInvoice,
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  const orders = StoreService.getOrders();
  const products = StoreService.getProducts();
  const reviews = StoreService.getReviews();
  const returns = StoreService.getReturns();
  const tickets = StoreService.getSupportTickets();

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === 'placed' || o.orderStatus === 'confirmed' || o.orderStatus === 'processing'
  ).length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'delivered').length;
  const pendingReviews = reviews.filter((r) => r.status === 'pending').length;

  let lowStockCount = 0;
  products.forEach((p) => {
    p.variants.forEach((v) => {
      if (v.stock <= v.lowStockThreshold) lowStockCount++;
    });
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'orders', label: `Orders (${orders.length})`, icon: Package, badge: pendingOrders > 0 ? pendingOrders : null },
    { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory & Ledger', icon: Layers, badge: lowStockCount > 0 ? lowStockCount : null },
    { id: 'returns', label: `Returns (${returns.length})`, icon: RotateCcw },
    { id: 'customers', label: 'Customers CRM', icon: Users },
    { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star, badge: pendingReviews > 0 ? pendingReviews : null },
    { id: 'discounts', label: 'Discounts & Coupons', icon: Tag },
    { id: 'marketing', label: 'Marketing & Carts', icon: TrendingUp },
    { id: 'billing', label: 'Billing & Reports', icon: DollarSign },
    { id: 'cms', label: 'CMS & Blogs', icon: FileText },
    { id: 'support', label: `Support (${tickets.filter((t) => t.status === 'open').length})`, icon: HelpCircle },
    { id: 'settings', label: 'Store Settings', icon: Settings },
    { id: 'audit', label: 'Security Audit Log', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-gray-900">Comfort</span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-[#5A3E36] text-[#FFD7C4] px-2 py-0.5 rounded">
              Store Administration
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Customer Storefront</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#B67B8D] text-white flex items-center justify-center font-bold text-xs">
              SA
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-bold text-gray-900 leading-none">Super Administrator</p>
              <p className="text-[10px] text-gray-500 leading-none mt-1">Full System Authority</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
            Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#5A3E36] text-[#FFD7C4] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-[#FFD7C4] text-[#5A3E36]'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-serif">Executive Dashboard</h1>
                <p className="text-xs text-gray-500 mt-1">
                  High-level performance summary for Comfort Ladies Garments.
                </p>
              </div>

              {/* 4 Primary Top Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Total Revenue
                  </span>
                  <p className="font-serif text-2xl font-bold text-gray-900 mt-1 tabular-nums">
                    PKR {totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    ↑ 14.8% vs last month
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Orders Processed
                  </span>
                  <p className="font-serif text-2xl font-bold text-gray-900 mt-1 tabular-nums">
                    {orders.length} orders
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {pendingOrders} awaiting fulfillment
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Delivered Successfully
                  </span>
                  <p className="font-serif text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
                    {deliveredOrders} parcels
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">100% on-time delivery SLA</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Low Stock Alerts
                  </span>
                  <p className="font-serif text-2xl font-bold text-amber-600 mt-1 tabular-nums">
                    {lowStockCount} variants
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Reorder threshold reached</p>
                </div>
              </div>

              {/* Visual Performance Chart */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-gray-900">
                    Weekly Revenue Trajectory (PKR)
                  </h3>
                  <span className="text-xs text-gray-400">Past 7 Days</span>
                </div>

                {/* SVG Line Chart */}
                <div className="h-44 w-full pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B67B8D" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#B67B8D" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 120 Q 80 90 140 100 T 260 70 T 380 40 T 500 50 T 580 20 L 580 140 L 20 140 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 20 120 Q 80 90 140 100 T 260 70 T 380 40 T 500 50 T 580 20"
                      fill="none"
                      stroke="#5A3E36"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Data dots */}
                    {[
                      { x: 20, y: 120, label: 'Mon' },
                      { x: 140, y: 100, label: 'Tue' },
                      { x: 260, y: 70, label: 'Wed' },
                      { x: 380, y: 40, label: 'Thu' },
                      { x: 500, y: 50, label: 'Fri' },
                      { x: 580, y: 20, label: 'Sat' },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="4" fill="#B67B8D" stroke="#fff" strokeWidth="2" />
                        <text x={pt.x} y="148" textAnchor="middle" fontSize="10" fill="#9ca3af">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-serif text-base font-bold text-gray-900">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-[#B67B8D] hover:underline font-semibold"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100 text-xs">
                    {orders.slice(0, 4).map((ord) => (
                      <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-mono font-bold text-gray-900">{ord.id}</p>
                          <p className="text-gray-500">{ord.customerName} · {ord.shippingAddress.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold tabular-nums text-gray-900">
                            PKR {ord.total.toLocaleString()}
                          </p>
                          <span className="text-[10px] font-bold uppercase text-emerald-700">
                            {ord.orderStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 text-xs">
                  <h3 className="font-serif text-base font-bold text-gray-900">
                    Quick Operational Tasks
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('products')}
                      className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 font-semibold text-gray-800 transition-colors flex items-center justify-between"
                    >
                      <span>Add New Garment / Stitched Suit</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 font-semibold text-gray-800 transition-colors flex items-center justify-between"
                    >
                      <span>Record Stock Receiving</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('discounts')}
                      className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 font-semibold text-gray-800 transition-colors flex items-center justify-between"
                    >
                      <span>Create Eid Promo Voucher</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('marketing')}
                      className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 font-semibold text-gray-800 transition-colors flex items-center justify-between"
                    >
                      <span>Send Cart Recovery Notifications</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <AdminOrders onViewInvoice={onViewInvoice} onRefresh={handleRefresh} />
          )}

          {activeTab === 'products' && (
            <AdminProducts onRefresh={handleRefresh} />
          )}

          {activeTab === 'inventory' && (
            <AdminInventory onRefresh={handleRefresh} />
          )}

          {activeTab === 'reviews' && (
            <AdminReviews onRefresh={handleRefresh} />
          )}

          {activeTab === 'returns' && (
            <AdminReturns onRefresh={handleRefresh} />
          )}

          {activeTab === 'customers' && (
            <AdminCustomers />
          )}

          {activeTab === 'discounts' && (
            <AdminDiscounts onRefresh={handleRefresh} />
          )}

          {activeTab === 'marketing' && (
            <AdminMarketing />
          )}

          {activeTab === 'billing' && (
            <AdminBilling />
          )}

          {activeTab === 'cms' && (
            <AdminCMS />
          )}

          {activeTab === 'support' && (
            <AdminSupport onRefresh={handleRefresh} />
          )}

          {activeTab === 'settings' && (
            <AdminSettings />
          )}

          {activeTab === 'audit' && (
            <AdminAudit />
          )}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-4 shadow-xl overflow-y-auto space-y-1">
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-gray-200">
              <span className="font-serif text-lg font-bold">Admin Console</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    activeTab === item.id ? 'bg-[#5A3E36] text-white' : 'text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
