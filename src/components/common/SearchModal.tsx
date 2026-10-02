import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { StoreService } from '../../services/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchCategory: (category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const products = StoreService.getProducts();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = ['Lawn', 'Embroidered Suit', 'Festive Eid', 'Kurti', 'Velvet Shawl', 'Unstitched'];

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.specifications.fabric.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full mx-auto shadow-2xl border border-[#E8D8D1] overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8D8D1] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B67B8D]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lawn, embroidered suits, kurtis, velvet, SKUs..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#5A3E36] placeholder-[#5A3E36]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 rounded-lg cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-[11px] font-semibold text-[#B67B8D] uppercase tracking-wider">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#5A3E36] bg-[#F8EDE3]/60 hover:bg-[#B67B8D]/20 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto divide-y divide-[#E8D8D1]/60">
            {results.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#5A3E36]/60">
                No designs found matching "{query}". Try checking for spelling or searching by category.
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-[#F8EDE3]/40 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-lg border border-[#E8D8D1]"
                    />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#B67B8D]">
                        {product.category}
                      </p>
                      <h4 className="font-serif text-sm font-semibold text-[#5A3E36]">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#5A3E36]/60">{product.specifications.fabric}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xs text-[#5A3E36] tabular-nums">
                      PKR {product.basePrice.toLocaleString()}
                    </p>
                    <span className="text-[11px] text-[#B67B8D] font-medium flex items-center justify-end gap-1">
                      View Piece <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
