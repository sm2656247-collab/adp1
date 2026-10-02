import React, { useState } from 'react';
import {
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Instagram,
  Facebook,
  Music2,
  Share2,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useToast } from '../common/Toast';

interface FooterProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Comfort Circle! Your 10% welcome voucher code is WELCOME10', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#5A3E36] text-[#F8EDE3] pt-16 pb-12 border-t border-[#B67B8D]/30">
      {/* Trust credentials band */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#B67B8D]/20 flex items-center justify-center text-[#FFD7C4] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Pure Artisanal Fabrics</h4>
              <p className="text-xs text-[#F8EDE3]/70 mt-1">
                Fine combed lawn, authentic micro-velvet & pure organza.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#B67B8D]/20 flex items-center justify-center text-[#FFD7C4] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Nationwide Express</h4>
              <p className="text-xs text-[#F8EDE3]/70 mt-1">
                Rapid delivery across all cities with live tracking updates.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#B67B8D]/20 flex items-center justify-center text-[#FFD7C4] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hassle-Free Returns</h4>
              <p className="text-xs text-[#F8EDE3]/70 mt-1">
                7-day easy exchange and return policy for unworn garments.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#B67B8D]/20 flex items-center justify-center text-[#FFD7C4] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Secure Payments</h4>
              <p className="text-xs text-[#F8EDE3]/70 mt-1">
                Cash on Delivery, direct bank transfer & encrypted cards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" onClick={() => onNavigate('home')} />
            <p className="font-serif italic text-lg text-[#FFD7C4]">
              "Elegance is a choice."
            </p>
            <p className="text-xs leading-relaxed text-[#F8EDE3]/75 max-w-sm">
              Comfort Ladies Garments crafts premium Pakistani women's attire celebrating
              heritage needlecraft, timeless silhouettes, and uncompromising daily comfort.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3 text-white/80">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); showToast('Comfort Official Instagram: @comfortgarments.pk'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B67B8D] hover:border-transparent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); showToast('Comfort Official Facebook: fb.me/comfortgarments.pk'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B67B8D] hover:border-transparent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => { e.preventDefault(); showToast('Comfort Official TikTok: @comfortladies'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B67B8D] hover:border-transparent transition-colors"
                aria-label="TikTok"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href="#pinterest"
                onClick={(e) => { e.preventDefault(); showToast('Comfort Style Boards on Pinterest'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B67B8D] hover:border-transparent transition-colors"
                aria-label="Pinterest"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD7C4]">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-[#F8EDE3]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fashion Editorial & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD7C4]">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs text-[#F8EDE3]/80">
              <li>
                <button
                  onClick={() => onNavigate('track-order')}
                  className="hover:text-white transition-colors cursor-pointer font-medium text-[#FFD7C4]"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shipping-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('return-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size Guide & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD7C4]">
              Be the First to Know
            </h5>
            <p className="text-xs text-[#F8EDE3]/75 leading-relaxed">
              Get exclusive early access to lawn drops, seasonal sales, and Eid capsule launches.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 text-white placeholder-white/50 text-xs px-3.5 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:border-[#FFD7C4] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#B67B8D] text-white hover:bg-[#9D6475] rounded-lg text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#FFD7C4]">Thank you! Check your inbox for WELCOME10.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8EDE3]/60">
        <p>© 2026 Comfort Ladies Garments. Crafted with grace in Pakistan. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('admin')}
            className="hover:text-[#FFD7C4] transition-colors cursor-pointer"
          >
            Admin Panel
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigate('faq')}
            className="hover:text-[#FFD7C4] transition-colors cursor-pointer"
          >
            Help Center
          </button>
          <span>·</span>
          <span>Lahore · Karachi · Islamabad</span>
        </div>
      </div>
    </footer>
  );
};
