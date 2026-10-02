import React from 'react';
import { Truck, Sparkles, MapPin, HelpCircle, Heart, User, ShoppingBag } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigate: (page: string) => void;
  wishlistCount: number;
  cartCount: number;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onNavigate,
  wishlistCount,
  cartCount,
}) => {
  return (
    <div className="bg-[#5A3E36] text-[#F8EDE3] text-xs py-2 px-4 sm:px-8 border-b border-[#B67B8D]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left / Center: Shipping & Welcome Offer Message */}
        <div className="flex items-center gap-2 sm:gap-4 text-center overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          <div className="flex items-center gap-1.5 font-medium text-[#FFD7C4]">
            <Truck className="w-3.5 h-3.5 text-[#FFD7C4]" />
            <span>Free Shipping Across Pakistan</span>
          </div>
          <span className="hidden sm:inline text-white/30">|</span>
          <div className="flex items-center gap-1.5 text-white/90">
            <Sparkles className="w-3 h-3 text-[#FF7F50]" />
            <span>10% OFF on Your First Order</span>
            <span className="text-[#FFD7C4] font-semibold underline decoration-[#FFD7C4]/40 underline-offset-2">
              Code: WELCOME10
            </span>
          </div>
        </div>

        {/* Right utility links */}
        <div className="hidden lg:flex items-center gap-5 text-white/80 font-medium">
          <button
            onClick={() => onNavigate('track-order')}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-[#FFD7C4]" />
            <span>Track Order</span>
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-[#FFD7C4]" />
            <span>Help</span>
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={() => onNavigate('wishlist')}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <Heart className="w-3 h-3 text-[#FFD7C4]" />
            <span>Wishlist ({wishlistCount})</span>
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={() => onNavigate('account')}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <User className="w-3 h-3 text-[#FFD7C4]" />
            <span>Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
