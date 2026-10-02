import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { Product, ProductSize } from '../../types/ecommerce';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  initialCollection?: string;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory,
  initialCollection,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onOpenDetails,
  onAddToCart,
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection || 'All');
  const [selectedSize, setSelectedSize] = useState<ProductSize | 'All'>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(25000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Unstitched', 'Stitched Suits', 'Kurtis', 'Dresses', 'Shawls & Dupattas', 'Bottoms'];
  const collections = ['All', 'Festive Eid Collection', 'Summer Lawn Whisper', 'Midnight Formal Royalty', 'Everyday Comfort Classics'];
  const sizes: Array<ProductSize | 'All'> = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unstitched'];
  const fabrics = ['All', 'Lawn', 'Cotton', 'Velvet', 'Silk', 'Chiffon'];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSku && !matchDesc && !matchTags) return false;
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Collection
      if (selectedCollection !== 'All' && p.collection !== selectedCollection) {
        return false;
      }

      // Size
      if (selectedSize !== 'All') {
        const hasSize = p.variants.some((v) => v.size === selectedSize && v.stock > 0);
        if (!hasSize) return false;
      }

      // Fabric
      if (selectedFabric !== 'All') {
        if (!p.specifications.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
      }

      // Price
      if (p.basePrice > priceRange) {
        return false;
      }

      // In stock only
      if (inStockOnly) {
        const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
        if (totalStock <= 0) return false;
      }

      return true;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedSize,
    selectedFabric,
    priceRange,
    inStockOnly,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'price-asc':
        return list.sort((a, b) => a.basePrice - b.basePrice);
      case 'price-desc':
        return list.sort((a, b) => b.basePrice - a.basePrice);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'bestselling':
        return list.filter((p) => p.isBestSeller).concat(list.filter((p) => !p.isBestSeller));
      case 'featured':
      default:
        return list.filter((p) => p.isFeatured).concat(list.filter((p) => !p.isFeatured));
    }
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCollection('All');
    setSelectedSize('All');
    setSelectedFabric('All');
    setPriceRange(25000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedCollection !== 'All' ||
    selectedSize !== 'All' ||
    selectedFabric !== 'All' ||
    priceRange < 25000 ||
    inStockOnly;

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E8D8D1]/80">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5A3E36]">
              {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-[#5A3E36]/70 mt-1">
              Showing {sortedProducts.length} authentic pieces crafted in Pakistan
            </p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lawn, embroidered, kurti..."
              className="w-full bg-white text-xs text-[#5A3E36] placeholder-[#5A3E36]/40 pl-9 pr-4 py-2.5 rounded-xl border border-[#E8D8D1] focus:outline-none focus:border-[#B67B8D] shadow-sm"
            />
            <Search className="w-4 h-4 text-[#B67B8D] absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D8D1] text-xs font-semibold text-[#5A3E36] shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B67B8D]" />
              <span>Filters</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-xs text-[#B67B8D] hover:text-[#5A3E36] font-medium px-2 py-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-[#5A3E36]">
            <span className="text-[#5A3E36]/60">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#E8D8D1] rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-[#5A3E36] focus:outline-none focus:border-[#B67B8D] shadow-sm cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestselling">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A3E36]/50 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filter */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8D8D1]/80 shadow-sm space-y-6 sticky top-28">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A3E36] mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#B67B8D]/15 text-[#5A3E36] font-bold'
                          : 'text-[#5A3E36]/80 hover:bg-[#F8EDE3]/50'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="pt-4 border-t border-[#E8D8D1]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A3E36] mb-3">
                  Sizes
                </h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#5A3E36] text-[#F8EDE3] border-[#5A3E36]'
                          : 'bg-white text-[#5A3E36] border-[#E8D8D1] hover:border-[#B67B8D]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="pt-4 border-t border-[#E8D8D1]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5A3E36] mb-3">
                  Fabric Type
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {fabrics.map((fb) => (
                    <button
                      key={fb}
                      onClick={() => setSelectedFabric(fb)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                        selectedFabric === fb
                          ? 'bg-[#B67B8D] text-white border-[#B67B8D]'
                          : 'bg-white text-[#5A3E36] border-[#E8D8D1] hover:border-[#B67B8D]'
                      }`}
                    >
                      {fb}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#E8D8D1]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#5A3E36] mb-2">
                  <span>Max Price:</span>
                  <span className="font-mono text-[#B67B8D]">PKR {priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#B67B8D] cursor-pointer"
                />
              </div>

              {/* Stock Toggle */}
              <div className="pt-4 border-t border-[#E8D8D1]">
                <label className="flex items-center gap-2.5 text-xs font-medium text-[#5A3E36] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#B67B8D] focus:ring-[#B67B8D] accent-[#B67B8D]"
                  />
                  <span>In Stock Items Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Main Product Grid Area */}
          <main className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8D8D1] max-w-lg mx-auto my-8">
                <Search className="w-12 h-12 text-[#B67B8D]/40 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-medium text-[#5A3E36]">
                  No Garments Found
                </h3>
                <p className="text-xs text-[#5A3E36]/70 mt-2 leading-relaxed">
                  We couldn't find any designs matching your specific filter criteria.
                  Try broadening your price range, clearing size options, or clearing the search term.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-[#5A3E36] text-[#F8EDE3] rounded-xl text-xs font-semibold shadow hover:bg-[#462F29] transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
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
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8D8D1]">
                <h3 className="font-serif text-lg font-semibold text-[#5A3E36]">Filter Wardrobe</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-semibold uppercase text-[#5A3E36] mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded-lg ${
                        selectedCategory === cat ? 'bg-[#B67B8D]/20 font-bold text-[#5A3E36]' : 'text-gray-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs font-semibold uppercase text-[#5A3E36] mb-2">Size</h4>
                <div className="grid grid-cols-3 gap-1">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-1 text-xs rounded border ${
                        selectedSize === sz ? 'bg-[#5A3E36] text-white' : 'border-gray-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Max Price</span>
                  <span className="font-bold">PKR {priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#B67B8D]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8D8D1] flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-[#E8D8D1] rounded-xl text-xs font-medium text-[#5A3E36]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#5A3E36] text-white rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
