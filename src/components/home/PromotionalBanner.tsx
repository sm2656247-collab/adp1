import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PromotionalBannerProps {
  onShopNow: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onShopNow }) => {
  return (
    <section className="relative overflow-hidden py-20 bg-[#5A3E36] text-white">
      {/* Background photography with luxury gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/banner_craftsmanship_1790830594098.jpg"
          alt="Artisanal Handcrafted Embroidery"
          className="w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A3E36] via-[#5A3E36]/90 to-[#5A3E36]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD7C4]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7F50]" />
            <span>Artisan Craftsmanship & Heritage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Because You Deserve The Best
          </h2>

          <p className="text-sm sm:text-base text-[#F8EDE3]/85 font-normal leading-relaxed">
            Premium fabrics <span className="text-[#FFD7C4]">|</span> Trendy designs{' '}
            <span className="text-[#FFD7C4]">|</span> Unmatched comfort. Each ensemble is sculpted with
            breathtaking precision, tailored to celebrate femininity and effortless grace.
          </p>

          <div className="pt-2">
            <button
              onClick={onShopNow}
              className="px-8 py-3.5 bg-[#B67B8D] hover:bg-[#9D6475] text-white rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-[#FFD7C4] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
