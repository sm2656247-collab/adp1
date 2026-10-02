import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Compass,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCartDrawer: () => void;
  onOpenSearchModal: () => void;
  currentUser: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCartDrawer,
  onOpenSearchModal,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'New Arrivals', page: 'new-arrivals' },
    { label: 'Collections', page: 'collections' },
    { label: 'About Us', page: 'about' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' },
  ];

  const categories = [
    { label: 'Unstitched', slug: 'unstitched' },
    { label: 'Stitched Suits', slug: 'stitched-suits' },
    { label: 'Kurtis', slug: 'kurtis' },
    { label: 'Dresses', slug: 'dresses' },
    { label: 'Shawls & Dupattas', slug: 'shawls-dupattas' },
    { label: 'Bottoms', slug: 'bottoms' },
    { label: 'Accessories', slug: 'accessories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8EDE3]/90 backdrop-blur-md border-b border-[#E8D8D1]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Zone: Mobile toggle & Search */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#5A3E36] hover:text-[#B67B8D] transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={onOpenSearchModal}
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#5A3E36]/80 hover:text-[#5A3E36] px-3 py-1.5 rounded-lg border border-[#E8D8D1] hover:border-[#B67B8D] transition-all bg-white/60 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#B67B8D]" />
              <span>Search luxury collection...</span>
              <kbd className="text-[10px] bg-[#F8EDE3] px-1.5 py-0.5 rounded text-[#5A3E36]/60 border border-[#E8D8D1]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Center Zone: Comfort Brand Logo */}
          <div className="flex-1 flex justify-center lg:justify-start lg:ml-8">
            <Logo onClick={() => onNavigate('home')} />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-[#5A3E36]">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#B67B8D] font-semibold'
                      : 'hover:text-[#B67B8D] text-[#5A3E36]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B67B8D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Zone: Icons & Action controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Icon */}
            <button
              onClick={onOpenSearchModal}
              className="lg:hidden p-2 text-[#5A3E36] hover:text-[#B67B8D] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-[#5A3E36] hover:text-[#B67B8D] transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B67B8D] text-white rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Customer Account Button */}
            <button
              onClick={() => onNavigate('account')}
              className="hidden sm:flex items-center gap-1.5 p-2 text-[#5A3E36] hover:text-[#B67B8D] transition-colors cursor-pointer"
              aria-label="Account"
              title={currentUser ? currentUser.name : 'Account'}
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="text-xs font-medium max-w-[80px] truncate text-[#5A3E36]">
                  {currentUser.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCartDrawer}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] transition-all shadow-sm cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFD7C4]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Bag</span>
              <span className="w-5 h-5 bg-[#B67B8D] text-white rounded-full text-[11px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Admin Dashboard Entry Badge */}
            <button
              onClick={() => onNavigate('admin')}
              className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#5A3E36]/90 hover:text-[#B67B8D] px-2.5 py-1.5 rounded-lg border border-[#B67B8D]/30 hover:border-[#B67B8D] transition-colors ml-1 cursor-pointer bg-white/40"
              title="Open Store Administration Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B67B8D]" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F8EDE3] p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8D8D1]">
                <Logo onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#5A3E36] hover:text-[#B67B8D] rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Links */}
              <div className="py-4 space-y-1">
                <p className="text-[11px] font-semibold text-[#B67B8D] uppercase tracking-wider px-3 mb-2">
                  Navigation
                </p>
                {navLinks.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item.page
                        ? 'bg-[#B67B8D]/15 text-[#5A3E36] font-semibold'
                        : 'text-[#5A3E36] hover:bg-white/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#B67B8D]" />
                  </button>
                ))}
              </div>

              {/* Categories Section */}
              <div className="py-4 border-t border-[#E8D8D1] space-y-1">
                <p className="text-[11px] font-semibold text-[#B67B8D] uppercase tracking-wider px-3 mb-2">
                  Shop by Category
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      onNavigate('shop', { category: cat.label });
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#5A3E36]/90 hover:text-[#B67B8D] hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <span>{cat.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5A3E36]/40" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Utility Actions */}
            <div className="pt-6 border-t border-[#E8D8D1] space-y-2">
              <button
                onClick={() => {
                  onNavigate('track-order');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#5A3E36] hover:bg-white/60"
              >
                <Compass className="w-4 h-4 text-[#B67B8D]" />
                <span>Track Your Order</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('account');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#5A3E36] hover:bg-white/60"
              >
                <User className="w-4 h-4 text-[#B67B8D]" />
                <span>Customer Account</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold text-white bg-[#5A3E36] hover:bg-[#462F29] transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFD7C4]" />
                <span>Store Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
