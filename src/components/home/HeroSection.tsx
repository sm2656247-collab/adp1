import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExploreCollection,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8EDE3] via-[#F8EDE3]/70 to-[#F8EDE3]/30 pt-8 pb-16 lg:py-20 border-b border-[#E8D8D1]/60">
      {/* Subtle floral decorative vector background art */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="#5A3E36" strokeWidth="1" strokeDasharray="4 4" />
          <path
            d="M100 20C100 20 120 70 180 100C120 130 100 180 100 180C100 180 80 130 20 100C80 70 100 20 100 20Z"
            stroke="#B67B8D"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            {/* Curated kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spring / Summer 2026 Collection</span>
            </div>

            {/* Headline in High-End Serif */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#5A3E36] leading-[1.12] [text-wrap:balance]">
              Grace in Every Stitch
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#5A3E36]/80 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Premium Ladies Garments for Every Mood, Every Occasion. Crafted from pure combed lawn,
              artisanal embroidery, and ethereal silks.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-[#FFD7C4] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollection}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/80 hover:bg-white text-[#5A3E36] border border-[#E8D8D1] hover:border-[#B67B8D] rounded-xl font-medium text-sm transition-all shadow-sm flex items-center justify-center cursor-pointer"
              >
                Explore Collection
              </button>
            </div>

            {/* Trust Indicators bar */}
            <div className="pt-8 border-t border-[#E8D8D1] grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="font-serif text-lg font-semibold text-[#5A3E36]">100%</p>
                <p className="text-xs text-[#5A3E36]/70 mt-0.5">Combed Lawn Cotton</p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#5A3E36]">Free Delivery</p>
                <p className="text-xs text-[#5A3E36]/70 mt-0.5">Across Pakistan</p>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-[#5A3E36]">7 Days</p>
                <p className="text-xs text-[#5A3E36]/70 mt-0.5">Easy Return Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: Large Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame with soft blush glow */}
              <div className="absolute inset-0 bg-[#FFD7C4]/30 rounded-2xl transform rotate-1 scale-[1.02] filter blur-sm pointer-events-none" />

              <div className="relative overflow-hidden rounded-2xl border border-[#E8D8D1] shadow-xl bg-white aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/hero_model_editorial_1790830549110.jpg"
                  alt="Comfort Ladies Garments Spring Campaign Editorial"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Scrim overlay with gentle caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#5A3E36]/80 via-[#5A3E36]/30 to-transparent p-6 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#FFD7C4]">
                      Featured Ensemble
                    </span>
                    <h3 className="font-serif text-lg text-white">Rose Garden Luxury Lawn</h3>
                  </div>
                  <button
                    onClick={onShopNow}
                    className="text-xs font-medium text-[#FFD7C4] hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    View Piece →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
