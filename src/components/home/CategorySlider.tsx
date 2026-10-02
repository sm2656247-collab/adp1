import React from 'react';
import { Category } from '../../types/ecommerce';

interface CategorySliderProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="py-14 bg-white/70 border-b border-[#E8D8D1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
            Curated Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#5A3E36] mt-1.5">
            Explore by Wardrobe Category
          </h2>
          <p className="text-xs sm:text-sm text-[#5A3E36]/70 mt-2">
            From unstitched luxury cotton lawn to ready-to-wear embroidered masterpieces.
          </p>
        </div>

        {/* Circular category cards list */}
        <div className="flex items-start justify-start sm:justify-center gap-6 sm:gap-8 overflow-x-auto pb-4 pt-1 px-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center group cursor-pointer focus:outline-none shrink-0"
            >
              {/* Circular Avatar Container with refined border */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 border-2 border-transparent group-hover:border-[#B67B8D] transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#F8EDE3] shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title & item count */}
              <span className="mt-3 text-xs sm:text-sm font-medium text-[#5A3E36] group-hover:text-[#B67B8D] transition-colors text-center whitespace-nowrap">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#5A3E36]/50">
                {cat.itemCount} Designs
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
