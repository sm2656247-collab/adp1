import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  Star,
  MapPin,
  Shield,
  RotateCcw,
  LogOut,
  ChevronRight,
  Eye,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { Order, Review, Address, ReturnRequest, Product } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface CustomerAccountPageProps {
  onNavigate: (page: string, params?: any) => void;
  onViewInvoice: (order: Order) => void;
  currentUser: { name: string; email: string; phone: string } | null;
  onUpdateCurrentUser: (user: { name: string; email: string; phone: string } | null) => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({
  onNavigate,
  onViewInvoice,
  currentUser,
  onUpdateCurrentUser,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'returns' | 'profile'>('dashboard');

  // Customer state (fallback to seed customer if not logged in)
  const defaultCustomer = StoreService.getCustomers()[0];
  const activeUser = currentUser || {
    name: defaultCustomer.name,
    email: defaultCustomer.email,
    phone: defaultCustomer.phone,
  };

  const orders = StoreService.getOrders().filter(
    (o) => o.customerEmail.toLowerCase() === activeUser.email.toLowerCase()
  );
  const reviews = StoreService.getReviews().filter(
    (r) => r.customerEmail.toLowerCase() === activeUser.email.toLowerCase()
  );
  const returns = StoreService.getReturns().filter(
    (ret) => ret.customerEmail.toLowerCase() === activeUser.email.toLowerCase()
  );
  const wishlistIds = StoreService.getWishlist();
  const products = StoreService.getProducts();
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Address Modal state
  const [addresses, setAddresses] = useState<Address[]>(defaultCustomer.addresses || []);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('Lahore');
  const [newProvince, setNewProvince] = useState('Punjab');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Return request form state
  const [returnOrderId, setReturnOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [returnDetails, setReturnDetails] = useState('');
  const [showReturnModal, setShowReturnModal] = useState(false);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet) return;
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
      fullName: activeUser.name,
      phone: activeUser.phone,
      street: newStreet,
      city: newCity,
      province: newProvince,
      postalCode: '54000',
      country: 'Pakistan',
    };
    setAddresses([...addresses, newAddr]);
    setShowAddressForm(false);
    setNewStreet('');
    showToast('New shipping address saved successfully.', 'success');
  };

  const handleCreateReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrderId || !returnReason) return;
    const matchingOrder = orders.find((o) => o.id === returnOrderId);
    if (!matchingOrder) {
      showToast('Order not found.', 'error');
      return;
    }

    StoreService.createReturnRequest({
      orderId: matchingOrder.id,
      customerName: activeUser.name,
      customerEmail: activeUser.email,
      customerPhone: activeUser.phone,
      productId: matchingOrder.items[0]?.productId || 'prod-001',
      productName: matchingOrder.items[0]?.name || 'Garment Item',
      variantDetails: `${matchingOrder.items[0]?.size || 'M'} / ${matchingOrder.items[0]?.color || 'Rose'}`,
      reason: returnReason,
      details: returnDetails,
      refundAmount: matchingOrder.total,
    });

    showToast('Return/Exchange request lodged. Our support team will contact you within 24 hours.', 'success');
    setShowReturnModal(false);
    setReturnReason('');
    setReturnDetails('');
  };

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D8D1] shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#B67B8D]/20 text-[#5A3E36] flex items-center justify-center font-serif text-2xl font-bold border border-[#B67B8D]/30">
              {activeUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-medium text-[#5A3E36]">
                  Welcome back, {activeUser.name}
                </h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full uppercase">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-[#5A3E36]/60 mt-0.5">
                {activeUser.email} · {activeUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Shop New Arrivals
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-[#E8D8D1] shadow-sm space-y-1">
              {[
                { id: 'dashboard', label: 'Overview', icon: User },
                { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
                { id: 'wishlist', label: `Wishlist (${wishlistIds.length})`, icon: Heart },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'returns', label: `Returns & Exchanges (${returns.length})`, icon: RotateCcw },
                { id: 'profile', label: 'Profile & Security', icon: Shield },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#5A3E36] text-[#FFD7C4] font-semibold shadow-sm'
                        : 'text-[#5A3E36] hover:bg-[#F8EDE3]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Main Body Content */}
          <main className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D8D1] shadow-sm min-h-[500px]">
            {/* Tab: Overview / Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <h2 className="font-serif text-xl font-medium text-[#5A3E36]">Account Dashboard</h2>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1]">
                    <span className="text-[10px] uppercase font-bold text-[#B67B8D]">Total Orders</span>
                    <p className="font-serif text-3xl font-bold text-[#5A3E36] mt-1 tabular-nums">
                      {orders.length}
                    </p>
                    <p className="text-[11px] text-[#5A3E36]/60 mt-1">Across all seasons</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1]">
                    <span className="text-[10px] uppercase font-bold text-[#B67B8D]">Wishlist Items</span>
                    <p className="font-serif text-3xl font-bold text-[#5A3E36] mt-1 tabular-nums">
                      {wishlistIds.length}
                    </p>
                    <p className="text-[11px] text-[#5A3E36]/60 mt-1">Saved for later</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1]">
                    <span className="text-[10px] uppercase font-bold text-[#B67B8D]">Verified Reviews</span>
                    <p className="font-serif text-3xl font-bold text-[#5A3E36] mt-1 tabular-nums">
                      {reviews.length}
                    </p>
                    <p className="text-[11px] text-[#5A3E36]/60 mt-1">Shared with community</p>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-base font-semibold text-[#5A3E36]">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-[#B67B8D] hover:underline"
                    >
                      View All Orders →
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No orders placed yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 2).map((ord) => (
                        <div
                          key={ord.id}
                          className="p-4 rounded-xl border border-[#E8D8D1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <span className="font-mono font-bold text-[#5A3E36]">{ord.id}</span>
                            <p className="text-[#5A3E36]/70 mt-0.5">
                              {ord.items.length} item(s) · PKR {ord.total.toLocaleString()} ·{' '}
                              <span className="capitalize font-semibold text-[#5A3E36]">{ord.orderStatus}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onNavigate('track-order', { orderId: ord.id })}
                              className="px-3 py-1.5 bg-[#5A3E36] text-white rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Track Shipment
                            </button>
                            <button
                              onClick={() => onViewInvoice(ord)}
                              className="px-3 py-1.5 border border-[#E8D8D1] text-[#5A3E36] rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Invoice
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8D8D1]">
                  <div>
                    <h2 className="font-serif text-xl font-medium text-[#5A3E36]">My Orders History</h2>
                    <p className="text-xs text-[#5A3E36]/70 mt-1">
                      Track deliveries, download invoices, or initiate returns within 7 days.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl border border-[#E8D8D1] space-y-4 hover:border-[#B67B8D]/40 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
                        <div>
                          <span className="font-mono font-bold text-sm text-[#5A3E36]">{ord.id}</span>
                          <span className="text-gray-400 mx-2">·</span>
                          <span className="text-[#5A3E36]/60">
                            {new Date(ord.createdAt).toLocaleDateString('en-PK', { dateStyle: 'medium' })}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold uppercase text-[10px] self-start sm:self-auto">
                          {ord.orderStatus.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg border border-[#E8D8D1]" />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#5A3E36] truncate">{item.name}</p>
                              <p className="text-[#5A3E36]/60 text-[11px]">
                                Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                              </p>
                            </div>
                            <span className="font-bold tabular-nums">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
                        <div className="text-[#5A3E36]/70">
                          Total: <span className="font-serif text-sm font-bold text-[#5A3E36]">PKR {ord.total.toLocaleString()}</span> (
                          <span className="capitalize">{ord.paymentMethod.replace('_', ' ')}</span>)
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onNavigate('track-order', { orderId: ord.id })}
                            className="px-3.5 py-1.5 bg-[#5A3E36] text-white rounded-lg font-semibold hover:bg-[#462F29] transition-colors cursor-pointer"
                          >
                            Live Tracking
                          </button>
                          <button
                            onClick={() => onViewInvoice(ord)}
                            className="px-3.5 py-1.5 border border-[#E8D8D1] text-[#5A3E36] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Invoice
                          </button>
                          <button
                            onClick={() => {
                              setReturnOrderId(ord.id);
                              setShowReturnModal(true);
                            }}
                            className="px-3.5 py-1.5 border border-[#E8D8D1] text-[#B67B8D] rounded-lg font-semibold hover:bg-[#F8EDE3]/50 transition-colors cursor-pointer"
                          >
                            Return / Exchange
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">Saved To Wishlist</h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    Your favorite designer pieces saved for immediate review or purchase.
                  </p>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <p className="text-xs text-gray-500 italic py-8">Your wishlist is currently empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl border border-[#E8D8D1] space-y-3">
                        <img src={p.images[0]} alt={p.name} className="w-full aspect-[3/4] object-cover rounded-xl" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-[#B67B8D]">{p.category}</p>
                          <h4 className="font-serif text-sm font-semibold text-[#5A3E36] truncate">{p.name}</h4>
                          <p className="text-xs font-bold text-[#5A3E36] mt-1 tabular-nums">
                            PKR {p.basePrice.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => onNavigate('product', { slug: p.slug })}
                          className="w-full py-2 bg-[#5A3E36] text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8D8D1]">
                  <div>
                    <h2 className="font-serif text-xl font-medium text-[#5A3E36]">Shipping Addresses</h2>
                    <p className="text-xs text-[#5A3E36]/70 mt-1">
                      Manage delivery destinations across Pakistan.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-4 py-2 bg-[#5A3E36] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="p-5 rounded-2xl bg-[#F8EDE3]/40 border border-[#E8D8D1] space-y-3 text-xs">
                    <h4 className="font-serif text-sm font-semibold text-[#5A3E36]">Add New Address</h4>
                    <div>
                      <label className="block font-medium mb-1">Street Address & Plot # *</label>
                      <input
                        type="text"
                        required
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="House 12, Street 4, Sector G-11"
                        className="w-full bg-white p-2.5 rounded-lg border border-[#E8D8D1]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium mb-1">City *</label>
                        <select
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-white p-2.5 rounded-lg border border-[#E8D8D1]"
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Province *</label>
                        <select
                          value={newProvince}
                          onChange={(e) => setNewProvince(e.target.value)}
                          className="w-full bg-white p-2.5 rounded-lg border border-[#E8D8D1]"
                        >
                          <option value="Punjab">Punjab</option>
                          <option value="Sindh">Sindh</option>
                          <option value="KPK">Khyber Pakhtunkhwa</option>
                          <option value="Federal">Islamabad ICT</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="px-3 py-1.5 text-xs text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#5A3E36] text-white rounded-lg font-semibold"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-4 rounded-xl border border-[#E8D8D1] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#5A3E36]">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                            Default Address
                          </span>
                        )}
                      </div>
                      <p className="text-[#5A3E36]/80">{addr.street}</p>
                      <p className="text-[#5A3E36]/80">
                        {addr.city}, {addr.province} ({addr.postalCode})
                      </p>
                      <p className="text-[#5A3E36]/80 font-medium">Contact: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Returns & Exchanges */}
            {activeTab === 'returns' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">Returns & Exchange Claims</h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    We offer hassle-free 7-day pickup and size exchanges.
                  </p>
                </div>

                <div className="space-y-3">
                  {returns.map((ret) => (
                    <div key={ret.id} className="p-4 rounded-xl border border-[#E8D8D1] text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-[#5A3E36]">{ret.id}</span>
                        <span className="px-2 py-0.5 bg-[#FFD7C4]/50 text-[#5A3E36] rounded font-semibold uppercase text-[10px]">
                          {ret.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="font-semibold text-[#5A3E36]">{ret.productName}</p>
                      <p className="text-[#5A3E36]/70">Reason: {ret.reason}</p>
                      <p className="text-[#5A3E36]/60 text-[11px]">{ret.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Profile & Security */}
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-md">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#5A3E36]">Profile Details</h2>
                  <p className="text-xs text-[#5A3E36]/70 mt-1">
                    Update your account details and password.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={activeUser.name}
                      className="w-full bg-[#F8EDE3]/30 p-2.5 rounded-lg border border-[#E8D8D1]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={activeUser.email}
                      className="w-full bg-[#F8EDE3]/30 p-2.5 rounded-lg border border-[#E8D8D1]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      defaultValue={activeUser.phone}
                      className="w-full bg-[#F8EDE3]/30 p-2.5 rounded-lg border border-[#E8D8D1]"
                    />
                  </div>
                  <button
                    onClick={() => showToast('Profile details updated.', 'success')}
                    className="px-5 py-2.5 bg-[#5A3E36] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Return Request Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211A18]/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-[#5A3E36]">
              Initiate Return / Exchange Request
            </h3>
            <p className="text-gray-500">Order Ref: {returnOrderId}</p>
            <form onSubmit={handleCreateReturn} className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Reason for Return / Exchange *</label>
                <select
                  required
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-lg border border-[#E8D8D1]"
                >
                  <option value="">Select a reason</option>
                  <option value="Size exchange needed (larger)">Size exchange needed (larger)</option>
                  <option value="Size exchange needed (smaller)">Size exchange needed (smaller)</option>
                  <option value="Color nuance different than expected">Color nuance different than expected</option>
                  <option value="Damaged during courier transit">Damaged during courier transit</option>
                  <option value="Defective stitching or hem">Defective stitching or hem</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  value={returnDetails}
                  onChange={(e) => setReturnDetails(e.target.value)}
                  placeholder="Describe your desired size or reason..."
                  className="w-full bg-white p-2.5 rounded-lg border border-[#E8D8D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReturnModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B67B8D] text-white rounded-lg font-semibold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
