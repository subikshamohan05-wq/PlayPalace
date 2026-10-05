/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';
import { INITIAL_TOYS } from './data/toys';
import { Toy, CartItem, OrderConfirmation, Review } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WonderBoxBuilder } from './components/WonderBoxBuilder';
import { GiftFinderModal } from './components/GiftFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CraftStory } from './components/CraftStory';
import { Footer } from './components/Footer';

export default function App() {
  const [toys, setToys] = useState<Toy[]>(INITIAL_TOYS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAge, setSelectedAge] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Interactive Overlays State
  const [selectedToyForModal, setSelectedToyForModal] = useState<Toy | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'default-cart-item',
      toy: INITIAL_TOYS[0],
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<Toy[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Filtered and Sorted Catalog
  const filteredToys = useMemo(() => {
    return toys
      .filter((toy) => {
        const matchesCategory =
          selectedCategory === 'All' || toy.category === selectedCategory;
        const matchesAge = selectedAge === 'All' || toy.ageGroup === selectedAge;
        const matchesSearch =
          searchQuery.trim() === '' ||
          toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesAge && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured' keeps original ordering
      });
  }, [toys, selectedCategory, selectedAge, searchQuery, sortBy]);

  // Cart Calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.toy.price * item.quantity,
    0
  );
  const discountAmount = cartSubtotal * discountPercent;
  const shippingAmount = cartSubtotal >= 65 || cartSubtotal === 0 ? 0 : 8.5;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingAmount);

  // Cart Actions
  const handleAddToCart = (toy: Toy, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.toy.id === toy.id && !item.isCustomBundle
      );
      if (existing) {
        return prevCart.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: `cart-${Date.now()}-${toy.id}`,
          toy,
          quantity,
        },
      ];
    });
  };

  const handleAddBundleToCart = (bundleItem: CartItem) => {
    setCart((prevCart) => [bundleItem, ...prevCart]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Promo Code Validation
  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'TINKER10') {
      setPromoCode('TINKER10');
      setDiscountPercent(0.1);
      return true;
    }
    return false;
  };

  // Wishlist Actions
  const handleToggleWishlist = (toy: Toy) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === toy.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== toy.id);
      } else {
        return [...prevWishlist, toy];
      }
    });
  };

  const handleRemoveFromWishlist = (toyId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((t) => t.id !== toyId));
  };

  // Reviews submission
  const handleAddReview = (
    toyId: string,
    newRev: Omit<Review, 'id' | 'date' | 'verified'>
  ) => {
    setToys((prevToys) =>
      prevToys.map((t) => {
        if (t.id === toyId) {
          const review: Review = {
            ...newRev,
            id: `rev-${Date.now()}`,
            date: 'Today',
            verified: true,
          };
          const newReviews = [review, ...t.reviews];
          const newAvgRating =
            Math.round(
              (newReviews.reduce((sum, r) => sum + r.rating, 0) /
                newReviews.length) *
                10
            ) / 10;
          return {
            ...t,
            reviews: newReviews,
            reviewCount: t.reviewCount + 1,
            rating: newAvgRating,
          };
        }
        return t;
      })
    );
  };

  const handleOrderCompleted = (order: OrderConfirmation) => {
    setCart([]);
  };

  const handleScrollToWonderBox = () => {
    const el = document.getElementById('wonderbox-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2A26]">
      {/* Navigation Bar adhering to 3-Zone Top Bar Contract */}
      <Navbar
        cartCount={cartItemCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        activeCategory={selectedCategory}
        onScrollToWonderBox={handleScrollToWonderBox}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero
          onExploreClick={handleExploreClick}
          onCustomBoxClick={handleScrollToWonderBox}
          onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        />

        {/* Catalog Section with Rich Filters */}
        <section id="catalog-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          
          {/* Section Header & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                The Workshop Collection
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A26]">
                {selectedCategory === 'All' ? 'All Handcrafted Toys' : selectedCategory}
              </h2>
            </div>
            
            {/* Live Search and Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9E978C]" />
                <input
                  type="text"
                  placeholder="Search toys, trains, bears..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs pl-8 pr-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] placeholder-[#9E978C] focus:outline-none focus:border-[#2D2A26] w-48 sm:w-60"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Interactive Filter Segmented Controls */}
          <div className="space-y-4 mb-8 pb-6 border-b border-[#E8E1D5]">
            
            {/* Category Segmented Controls */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                'All',
                'Wooden Heirlooms',
                'Plush & Companions',
                'STEM & Building',
                'Pretend Play & Music',
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-[#2D2A26] text-[#FAF7F2] shadow-xs'
                      : 'bg-white text-[#575149] border border-[#DDD4C5] hover:border-[#2D2A26] hover:text-[#2D2A26]'
                  }`}
                >
                  {category === 'All' ? 'All Toys' : category}
                </button>
              ))}
            </div>

            {/* Age Filter Segmented Controls */}
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#7D766C] font-medium">Age Filter:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { label: 'All Ages', val: 'All' },
                    { label: '0–2 Years', val: '0-2' },
                    { label: '3–5 Years', val: '3-5' },
                    { label: '6–8 Years', val: '6-8' },
                    { label: '9+ Years', val: '9+' },
                  ].map((age) => (
                    <button
                      key={age.val}
                      onClick={() => setSelectedAge(age.val)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        selectedAge === age.val
                          ? 'bg-[#E5DDCF] text-[#2D2A26] font-semibold'
                          : 'text-[#635D54] hover:text-[#2D2A26]'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Results Summary */}
              <div className="text-xs text-[#7D766C]">
                Showing <strong className="text-[#2D2A26] font-mono tabular-nums">{filteredToys.length}</strong> heirloom toys
                {(selectedCategory !== 'All' || selectedAge !== 'All' || searchQuery !== '') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedAge('All');
                      setSearchQuery('');
                    }}
                    className="ml-3 text-[#A25735] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Product Grid */}
          {filteredToys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredToys.map((toy) => (
                <ProductCard
                  key={toy.id}
                  toy={toy}
                  isWishlisted={wishlist.some((w) => w.id === toy.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(t) => handleAddToCart(t, 1)}
                  onQuickView={(t) => setSelectedToyForModal(t)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#E8E1D5] p-8 space-y-3">
              <div className="w-12 h-12 bg-[#F3EDE2] rounded-full flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2A26]">No toys found</h3>
              <p className="text-xs text-[#7D766C] max-w-sm mx-auto">
                We couldn't find any creations matching your search. Try resetting filters or browsing all handcrafted collections.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedAge('All');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 bg-[#2D2A26] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
              >
                Show All Toys
              </button>
            </div>
          )}
        </section>

        {/* Interactive WonderBox Builder */}
        <WonderBoxBuilder
          toys={toys}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* Atelier Craftsmanship & Safety Story */}
        <CraftStory />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        toy={selectedToyForModal}
        isOpen={Boolean(selectedToyForModal)}
        onClose={() => setSelectedToyForModal(null)}
        isWishlisted={
          selectedToyForModal
            ? wishlist.some((w) => w.id === selectedToyForModal.id)
            : false
        }
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
      />

      {/* Gift Finder Quiz Modal */}
      <GiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        toys={toys}
        onSelectToy={(t) => setSelectedToyForModal(t)}
        onAddToCart={(t) => handleAddToCart(t, 1)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
        appliedDiscount={discountPercent}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={(t) => handleAddToCart(t, 1)}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={discountAmount}
        shipping={shippingAmount}
        total={cartTotal}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}
