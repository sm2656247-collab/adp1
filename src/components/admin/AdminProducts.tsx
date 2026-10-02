import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Eye, Search, Check, X, AlertCircle } from 'lucide-react';
import { Product, ProductVariant, ProductSize } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

interface AdminProductsProps {
  onRefresh: () => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ onRefresh }) => {
  const { showToast } = useToast();
  const products = StoreService.getProducts();
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Stitched Suits');
  const [subcategory, setSubcategory] = useState('3-Piece Luxury');
  const [collection, setCollection] = useState('Festive Eid Collection');
  const [basePrice, setBasePrice] = useState(8950);
  const [comparePrice, setComparePrice] = useState(10500);
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('Combed Cotton Lawn');
  const [material, setMaterial] = useState('100% Cotton');
  const [pattern, setPattern] = useState('Embroidered');
  const [sleeves, setSleeves] = useState('Full Sleeves');
  const [fit, setFit] = useState('Regular Fit');
  const [season, setSeason] = useState('Summer Festive');
  const [occasion, setOccasion] = useState('Festive / Casual');
  const [care, setCare] = useState('Hand Wash Cold');
  const [origin, setOrigin] = useState('Lahore, Pakistan');
  const [pieces, setPieces] = useState('3-Piece');
  const [imagesText, setImagesText] = useState('');
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const startCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setName('');
    setCategory('Stitched Suits');
    setSubcategory('3-Piece Luxury');
    setCollection('Festive Eid Collection');
    setBasePrice(7500);
    setComparePrice(8900);
    setSku(`COM-PRD-${Math.floor(100 + Math.random() * 900)}`);
    setDescription('Handcrafted luxury ensemble tailored from pure lawn with delicate thread embroidery.');
    setFabric('Fine Combed Lawn');
    setMaterial('100% Cotton');
    setPattern('Hand-guided Floral Threadwork');
    setSleeves('Full Sleeves');
    setFit('Straight Cut');
    setSeason('Summer / Festive');
    setOccasion('Eid / Festive');
    setCare('Dry Clean or Gentle Hand Wash');
    setOrigin('Lahore, Pakistan');
    setPieces('3-Piece (Shirt, Dupatta, Trouser)');
    setImagesText('/src/assets/images/product_rose_embroidered_1790830559690.jpg');

    // Default variants
    setVariants([
      {
        id: `var-${Date.now()}-s`,
        sku: `COM-NEW-S`,
        barcode: '8964009001',
        size: 'S',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 7500,
        comparePrice: 8900,
        costPrice: 4000,
        stock: 10,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: `var-${Date.now()}-m`,
        sku: `COM-NEW-M`,
        barcode: '8964009002',
        size: 'M',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 7500,
        comparePrice: 8900,
        costPrice: 4000,
        stock: 15,
        reservedStock: 0,
        lowStockThreshold: 3,
        isAvailable: true,
      },
      {
        id: `var-${Date.now()}-l`,
        sku: `COM-NEW-L`,
        barcode: '8964009003',
        size: 'L',
        color: 'Rose Blush',
        colorHex: '#B67B8D',
        price: 7500,
        comparePrice: 8900,
        costPrice: 4000,
        stock: 8,
        reservedStock: 0,
        lowStockThreshold: 2,
        isAvailable: true,
      },
    ]);
  };

  const startEdit = (p: Product) => {
    setEditingProduct(p);
    setIsCreating(false);
    setName(p.name);
    setCategory(p.category);
    setSubcategory(p.subcategory);
    setCollection(p.collection);
    setBasePrice(p.basePrice);
    setComparePrice(p.comparePrice || p.basePrice);
    setSku(p.sku);
    setDescription(p.description);
    setFabric(p.specifications.fabric);
    setMaterial(p.specifications.material);
    setPattern(p.specifications.pattern);
    setSleeves(p.specifications.sleeves);
    setFit(p.specifications.fit);
    setSeason(p.specifications.season);
    setOccasion(p.specifications.occasion);
    setCare(p.specifications.care);
    setOrigin(p.specifications.origin);
    setPieces(p.specifications.pieces);
    setImagesText(p.images.join('\n'));
    setVariants([...p.variants]);
  };

  const handleDuplicate = (p: Product) => {
    const clone: Product = {
      ...p,
      id: `prod-${Date.now()}`,
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy-${Math.floor(100 + Math.random() * 900)}`,
      sku: `${p.sku}-CPY`,
      createdAt: new Date().toISOString(),
      variants: p.variants.map((v) => ({
        ...v,
        id: `var-${Date.now()}-${v.size.toLowerCase()}`,
        sku: `${v.sku}-CPY`,
      })),
    };
    StoreService.saveProduct(clone);
    showToast(`Duplicated ${p.name}`, 'success');
    onRefresh();
  };

  const handleDelete = (id: string, prodName: string) => {
    if (window.confirm(`Are you sure you want to delete ${prodName}?`)) {
      StoreService.deleteProduct(id);
      showToast(`Product deleted.`, 'success');
      onRefresh();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku) {
      showToast('Name and SKU are required.', 'error');
      return;
    }

    const images = imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      sku,
      category,
      subcategory,
      collection,
      description,
      shortDescription: description.slice(0, 120),
      basePrice: Number(basePrice),
      comparePrice: Number(comparePrice),
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      isPublished: true,
      images: images.length > 0 ? images : ['/src/assets/images/product_rose_embroidered_1790830559690.jpg'],
      specifications: {
        fabric,
        material,
        pattern,
        sleeves,
        fit,
        season,
        occasion,
        care,
        origin,
        pieces,
      },
      variants,
      tags: [category, fabric, collection],
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString(),
    };

    StoreService.saveProduct(productData);
    showToast(`Product ${name} successfully saved.`, 'success');
    setIsCreating(false);
    setEditingProduct(null);
    onRefresh();
  };

  const updateVariantStock = (idx: number, newStock: number) => {
    const updated = [...variants];
    updated[idx].stock = Math.max(0, newStock);
    setVariants(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Garment Catalog Management</h2>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, duplicate, and manage multi-variant inventory across Pakistani fashion lines.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="px-4 py-2.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#FFD7C4]" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, or category..."
            className="w-full bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5A3E36]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">SKU / Category</th>
                <th className="py-3 px-4">Price (PKR)</th>
                <th className="py-3 px-4">Variants / Total Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filtered.map((prod) => {
                const totalStock = prod.variants.reduce((a, v) => a + v.stock, 0);
                return (
                  <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-12 object-cover rounded-lg border border-gray-200"
                        />
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{prod.name}</p>
                          <p className="text-[11px] text-gray-500">{prod.collection}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-mono text-gray-700">{prod.sku}</p>
                      <p className="text-[11px] text-[#B67B8D] font-medium">{prod.category}</p>
                    </td>
                    <td className="py-3 px-4 font-bold tabular-nums">
                      PKR {prod.basePrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold tabular-nums ${
                            totalStock <= 5 ? 'text-rose-600' : 'text-gray-900'
                          }`}
                        >
                          {totalStock} units
                        </span>
                        <span className="text-[10px] text-gray-400">
                          ({prod.variants.length} sizes)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Published
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(prod)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                          title="Edit Garment"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(prod)}
                          className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal (Create / Edit) */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 z-10 my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 className="font-serif text-xl font-bold text-gray-900">
                {editingProduct ? `Edit Garment: ${editingProduct.name}` : 'Add New Garment to Catalog'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs text-gray-800">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rose Garden Embroidered Suit"
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5A3E36]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Base Master SKU *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value.toUpperCase())}
                    placeholder="e.g. COM-RGE-001"
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5A3E36] font-mono"
                  />
                </div>
              </div>

              {/* Category & Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  >
                    <option value="Unstitched">Unstitched</option>
                    <option value="Stitched Suits">Stitched Suits</option>
                    <option value="Kurtis">Kurtis</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Shawls & Dupattas">Shawls & Dupattas</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Collection</label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  >
                    <option value="Festive Eid Collection">Festive Eid Collection</option>
                    <option value="Summer Lawn Whisper">Summer Lawn Whisper</option>
                    <option value="Midnight Formal Royalty">Midnight Formal Royalty</option>
                    <option value="Everyday Comfort Classics">Everyday Comfort Classics</option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Base Retail Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Compare-At Strikeout Price (PKR)</label>
                  <input
                    type="number"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(Number(e.target.value))}
                    className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              {/* Editorial Description */}
              <div>
                <label className="block font-semibold mb-1">Product Description *</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
                />
              </div>

              {/* Specifications Box */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <h4 className="font-semibold text-gray-900 uppercase text-[11px]">
                  Garment Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] mb-1">Fabric</label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] mb-1">Material</label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] mb-1">Pattern</label>
                    <input
                      type="text"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] mb-1">Origin</label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Images URL (one per line) */}
              <div>
                <label className="block font-semibold mb-1">Image URLs (one per line)</label>
                <textarea
                  rows={2}
                  value={imagesText}
                  onChange={(e) => setImagesText(e.target.value)}
                  className="w-full bg-gray-50 p-2 rounded-xl border border-gray-200 font-mono text-[11px]"
                />
              </div>

              {/* Variants Stock Editor */}
              <div className="p-4 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900 uppercase text-[11px]">
                    Size Variants & Stock Quantities
                  </h4>
                </div>

                <div className="space-y-2">
                  {variants.map((v, i) => (
                    <div key={v.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                      <span className="w-10 font-bold text-center text-gray-900">{v.size}</span>
                      <span className="font-mono text-[11px] text-gray-500 w-32">{v.sku}</span>
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-[11px] text-gray-600">Stock:</span>
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => updateVariantStock(i, Number(e.target.value))}
                          className="w-20 bg-white p-1 rounded border text-center font-bold"
                        />
                      </div>
                      <span className="font-bold text-gray-700">PKR {v.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#5A3E36] text-white rounded-xl font-semibold hover:bg-[#462F29]"
                >
                  Save Product to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
