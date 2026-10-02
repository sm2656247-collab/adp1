import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { ProductCard } from '../shop/ProductCard';

interface FeaturedSectionProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreMore: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onOpenDetails,
  onAddToCart,
  onExploreMore,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Stitched Suits' | 'Unstitched' | 'Kurtis' | 'Dresses'>('All');

  const tabs: Array<'All' | 'Stitched Suits' | 'Unstitched' | 'Kurtis' | 'Dresses'> = [
    'All',
    'Stitched Suits',
    'Unstitched',
    'Kurtis',
    'Dresses',
  ];

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter((p) => p.category === activeTab);

  return (
    <section className="py-16 sm:py-20 bg-[#F8EDE3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="shrink-0 p-2 rounded-2xl bg-white/90 border border-[#E8D8D1] shadow-sm hover:scale-105 transition-transform">
              <img
                src="/src/assets/images/comfort_logo.png"
                alt="Comfort Ladies Garments Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B67B8D] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Couture & Ready-To-Wear</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#5A3E36]">
                Our Latest Collection
              </h2>
              <p className="text-xs sm:text-sm text-[#5A3E36]/75 mt-1.5 max-w-xl">
                Discover the perfect blend of tradition and modern style. Crafted for women who love
                elegance and comfort.
              </p>
            </div>
          </div>

          {/* Interactive filter tabs (Buttons with click handlers) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/70 border border-[#E8D8D1] rounded-xl overflow-x-auto scrollbar-none self-start md:self-auto">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#5A3E36] text-[#F8EDE3] shadow-sm font-semibold'
                      : 'text-[#5A3E36]/80 hover:text-[#5A3E36] hover:bg-white/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onOpenDetails={onOpenDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Bottom CTA to Shop */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-[#E8D8D1] hover:border-[#B67B8D] text-[#5A3E36] hover:text-[#B67B8D] text-sm font-medium shadow-sm hover:shadow transition-all cursor-pointer group"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
