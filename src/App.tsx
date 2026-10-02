import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './components/common/Toast';
import { AnnouncementBar } from './components/navigation/AnnouncementBar';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategorySlider } from './components/home/CategorySlider';
import { FeaturedSection } from './components/home/FeaturedSection';
import { PromotionalBanner } from './components/home/PromotionalBanner';
import { WhyChooseComfort } from './components/home/WhyChooseComfort';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailsPage } from './components/shop/ProductDetailsPage';
import { ProductQuickViewModal } from './components/shop/ProductQuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessModal } from './components/orders/OrderSuccessModal';
import { TrackOrderPage } from './components/orders/TrackOrderPage';
import { CustomerAccountPage } from './components/account/CustomerAccountPage';
import { InvoiceModal } from './components/invoices/InvoiceModal';
import { SearchModal } from './components/common/SearchModal';
import { AboutPage } from './components/cms/AboutPage';
import { BlogPage } from './components/cms/BlogPage';
import { ContactPage } from './components/cms/ContactPage';
import { PolicyPages } from './components/cms/PolicyPages';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StoreService } from './services/store';
import { Product, CartItem, Order } from './types/ecommerce';

function MainApp() {
  const { showToast } = useToast();

  // App Navigation & Session State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});
  const [cart, setCart] = useState<CartItem[]>(StoreService.getCart());
  const [wishlist, setWishlist] = useState<string[]>(StoreService.getWishlist());
  const [currentUser, setCurrentUser] = useState(StoreService.getCurrentUser());

  // Interactive Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [orderSuccessOrder, setOrderSuccessOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // Sync state helpers
  const refreshCart = () => setCart(StoreService.getCart());
  const refreshWishlist = () => setWishlist(StoreService.getWishlist());

  const navigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: string) => {
    const res = StoreService.toggleWishlist(productId);
    refreshWishlist();
    if (res.inWishlist) {
      showToast('Saved to your wishlist.', 'success');
    } else {
      showToast('Removed from wishlist.', 'info');
    }
  };

  const handleAddToCart = (productOrItem: Product | CartItem) => {
    let item: CartItem;
    if ('variants' in productOrItem) {
      // Default to first available variant
      const variant = productOrItem.variants.find((v) => v.stock > 0) || productOrItem.variants[0];
      item = {
        id: `${productOrItem.id}-${variant.id}`,
        productId: productOrItem.id,
        variantId: variant.id,
        name: productOrItem.name,
        slug: productOrItem.slug,
        price: variant.price,
        originalPrice: variant.comparePrice,
        size: variant.size,
        color: variant.color,
        colorHex: variant.colorHex,
        image: productOrItem.images[0],
        quantity: 1,
        maxStock: variant.stock,
      };
    } else {
      item = productOrItem;
    }

    const res = StoreService.addToCart(item);
    if (res.success) {
      refreshCart();
      setIsCartDrawerOpen(true);
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleBuyNow = (item: CartItem) => {
    const res = StoreService.addToCart(item);
    if (res.success) {
      refreshCart();
      navigate('checkout');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    StoreService.updateCartQuantity(cartItemId, newQty);
    refreshCart();
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    StoreService.removeFromCart(cartItemId);
    refreshCart();
    showToast('Garment removed from bag.', 'info');
  };

  const handleClearCart = () => {
    StoreService.clearCart();
    refreshCart();
    showToast('Your bag has been cleared.', 'info');
  };

  const handleMoveToWishlist = (productId: string, cartItemId: string) => {
    StoreService.removeFromCart(cartItemId);
    StoreService.toggleWishlist(productId);
    refreshCart();
    refreshWishlist();
    showToast('Garment saved to wishlist.', 'success');
  };

  const handleOrderPlaced = (order: Order) => {
    refreshCart();
    setOrderSuccessOrder(order);
  };

  // Keyboard shortcut listener for Cmd/Ctrl + K (Search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const products = StoreService.getProducts();
  const categories = StoreService.getCategories();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // If viewing admin portal, render dedicated full-screen layout
  if (currentPage === 'admin') {
    return (
      <AdminDashboard
        onBackToStore={() => navigate('home')}
        onViewInvoice={(ord) => setInvoiceOrder(ord)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8EDE3]/30 text-[#211A18]">
      {/* Top Announcement Bar */}
      <AnnouncementBar
        onNavigate={navigate}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
      />

      {/* Main Responsive Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {/* 1. Home Page */}
        {currentPage === 'home' && (
          <div>
            <HeroSection
              onShopNow={() => navigate('shop')}
              onExploreCollection={() => navigate('collections')}
            />
            <CategorySlider
              categories={categories}
              onSelectCategory={(catName) => navigate('shop', { category: catName })}
            />
            <FeaturedSection
              products={products}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
              onOpenDetails={(p) => navigate('product', { slug: p.slug })}
              onAddToCart={handleAddToCart}
              onExploreMore={() => navigate('shop')}
            />
            <PromotionalBanner onShopNow={() => navigate('shop')} />
            <WhyChooseComfort />
          </div>
        )}

        {/* 2. Shop / Catalog Page */}
        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={pageParams.category}
            initialCollection={pageParams.collection}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenDetails={(p) => navigate('product', { slug: p.slug })}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* 3. New Arrivals */}
        {currentPage === 'new-arrivals' && (
          <ShopPage
            products={products.filter((p) => p.isNewArrival)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenDetails={(p) => navigate('product', { slug: p.slug })}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* 4. Collections */}
        {currentPage === 'collections' && (
          <ShopPage
            products={products}
            initialCollection={pageParams.collection}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenDetails={(p) => navigate('product', { slug: p.slug })}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* 5. Product Details Page */}
        {currentPage === 'product' && (
          (() => {
            const product =
              StoreService.getProductBySlug(pageParams.slug) || products[0];
            return (
              <ProductDetailsPage
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onNavigate={navigate}
              />
            );
          })()
        )}

        {/* 6. Cart Page */}
        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onCheckout={() => navigate('checkout')}
            onContinueShopping={() => navigate('shop')}
            onMoveToWishlist={handleMoveToWishlist}
          />
        )}

        {/* 7. Wishlist Page */}
        {currentPage === 'wishlist' && (
          <ShopPage
            products={products.filter((p) => wishlist.includes(p.id))}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenDetails={(p) => navigate('product', { slug: p.slug })}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* 8. Checkout Page */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            onOrderPlaced={handleOrderPlaced}
            onBackToCart={() => navigate('cart')}
            currentUser={currentUser}
          />
        )}

        {/* 9. Track Order Page */}
        {currentPage === 'track-order' && (
          <TrackOrderPage
            initialOrderId={pageParams.orderId}
            onViewInvoice={(ord) => setInvoiceOrder(ord)}
            onContinueShopping={() => navigate('shop')}
          />
        )}

        {/* 10. Customer Account Page */}
        {currentPage === 'account' && (
          <CustomerAccountPage
            onNavigate={navigate}
            onViewInvoice={(ord) => setInvoiceOrder(ord)}
            currentUser={currentUser}
            onUpdateCurrentUser={setCurrentUser}
          />
        )}

        {/* 11. About Us */}
        {currentPage === 'about' && <AboutPage onExplore={() => navigate('shop')} />}

        {/* 12. Blog Journal */}
        {currentPage === 'blog' && <BlogPage />}

        {/* 13. Contact Support */}
        {currentPage === 'contact' && <ContactPage />}

        {/* 14. Policies & FAQs */}
        {currentPage === 'shipping-policy' && <PolicyPages type="shipping" />}
        {currentPage === 'return-policy' && <PolicyPages type="returns" />}
        {currentPage === 'faq' && <PolicyPages type="faq" />}
        {currentPage === 'privacy-policy' && <PolicyPages type="privacy" />}
        {currentPage === 'terms' && <PolicyPages type="terms" />}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={navigate} />

      {/* Slide-over Bag Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartDrawerOpen(false);
          navigate('checkout');
        }}
        onViewBag={() => {
          setIsCartDrawerOpen(false);
          navigate('cart');
        }}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenDetails={(p) => {
          setQuickViewProduct(null);
          navigate('product', { slug: p.slug });
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={(p) => {
          navigate('product', { slug: p.slug });
        }}
        onSearchCategory={(cat) => {
          navigate('shop', { category: cat });
        }}
      />

      {/* Order Success Celebration Modal */}
      <OrderSuccessModal
        order={orderSuccessOrder}
        onClose={() => setOrderSuccessOrder(null)}
        onTrackOrder={(orderId) => {
          setOrderSuccessOrder(null);
          navigate('track-order', { orderId });
        }}
        onViewInvoice={(ord) => {
          setOrderSuccessOrder(null);
          setInvoiceOrder(ord);
        }}
        onContinueShopping={() => {
          setOrderSuccessOrder(null);
          navigate('shop');
        }}
      />

      {/* Printable Tax Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        onClose={() => setInvoiceOrder(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
