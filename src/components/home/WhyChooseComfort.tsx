import React from 'react';
import { Feather, HeartHandshake, Gem, RefreshCw, Headphones } from 'lucide-react';

export const WhyChooseComfort: React.FC = () => {
  const reasons = [
    {
      icon: Feather,
      title: 'Premium Quality Fabrics',
      description: 'Finest 100% long-staple combed cotton lawn, micro-velvets, and pure silk blends.',
    },
    {
      icon: Gem,
      title: 'Trendy & Elegant Designs',
      description: 'Sophisticated contemporary silhouettes rooted in rich South Asian heritage embroideries.',
    },
    {
      icon: HeartHandshake,
      title: 'Affordable Luxury',
      description: 'Boutique-grade artisanal craftsmanship priced transparently without middleman markups.',
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free Returns',
      description: 'Complimentary 7-day exchange or return guarantee for seamless peace of mind.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Care',
      description: 'Dedicated sizing advisors and real-time WhatsApp & phone assistance 7 days a week.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8D8D1]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
            The Comfort Promise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#5A3E36] mt-1.5">
            Why Choose Comfort
          </h2>
          <p className="text-xs sm:text-sm text-[#5A3E36]/70 mt-2">
            Built on trust, exceptional quality, and an unwavering commitment to women’s comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center sm:text-left">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center sm:items-start p-5 rounded-2xl bg-[#F8EDE3]/30 border border-[#E8D8D1]/60 hover:bg-[#F8EDE3]/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#B67B8D] shadow-sm mb-4 border border-[#E8D8D1]/80">
                  <Icon className="w-6 h-6 text-[#B67B8D]" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[#5A3E36]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A3E36]/70 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
