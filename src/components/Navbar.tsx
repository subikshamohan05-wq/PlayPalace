import React, { useState } from 'react';
import { ShoppingBag, Heart, Sparkles, Menu, X, Gift } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenGiftFinder: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onScrollToWonderBox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenGiftFinder,
  onSelectCategory,
  activeCategory,
  onScrollToWonderBox,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Slim Dismissible Announcement Bar */}
      <div className="bg-[#2D2A26] text-[#F4EFE6] px-4 py-2 text-xs text-center font-medium tracking-wide">
        <span>Handcrafted with FSC-certified timber</span>
        <span className="mx-2 opacity-50" aria-hidden="true">·</span>
        <span>Complimentary gift box on orders over $65</span>
        <span className="mx-2 opacity-50" aria-hidden="true">·</span>
        <span className="text-[#E5B57A]">Code TINKER10 for 10% off</span>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#2D2A26] hover:opacity-90 transition-opacity"
          >
            Tinker & Pip
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#575149]">
            <button
              onClick={() => {
                onSelectCategory('All');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#2D2A26] transition-colors ${
                activeCategory === 'All' ? 'text-[#2D2A26] font-semibold underline underline-offset-8 decoration-2 decoration-[#C87D55]' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => {
                onSelectCategory('Wooden Heirlooms');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#2D2A26] transition-colors ${
                activeCategory === 'Wooden Heirlooms' ? 'text-[#2D2A26] font-semibold underline underline-offset-8 decoration-2 decoration-[#C87D55]' : ''
              }`}
            >
              Wooden Heirlooms
            </button>
            <button
              onClick={() => {
                onSelectCategory('Plush & Companions');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#2D2A26] transition-colors ${
                activeCategory === 'Plush & Companions' ? 'text-[#2D2A26] font-semibold underline underline-offset-8 decoration-2 decoration-[#C87D55]' : ''
              }`}
            >
              Plush & Companions
            </button>
            <button
              onClick={() => {
                onSelectCategory('STEM & Building');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#2D2A26] transition-colors ${
                activeCategory === 'STEM & Building' ? 'text-[#2D2A26] font-semibold underline underline-offset-8 decoration-2 decoration-[#C87D55]' : ''
              }`}
            >
              STEM & Puzzles
            </button>
            <button
              onClick={onScrollToWonderBox}
              className="hover:text-[#2D2A26] transition-colors flex items-center gap-1.5 text-[#A25735] font-semibold"
            >
              <Gift className="w-4 h-4" />
              <span>WonderBox Builder</span>
            </button>
            <button
              onClick={onOpenGiftFinder}
              className="hover:text-[#2D2A26] transition-colors flex items-center gap-1 text-[#3E5C46] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gift Finder</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#575149] hover:text-[#2D2A26] hover:bg-[#EFEAE1] rounded-lg transition-colors relative"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C87D55] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#F4EFE6] bg-[#2D2A26] rounded-lg hover:bg-[#433E38] transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-mono text-xs">
                ({cartCount}) {cartTotal > 0 && `· $${cartTotal.toFixed(2)}`}
              </span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#575149] hover:text-[#2D2A26] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E1D5] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {['All', 'Wooden Heirlooms', 'Plush & Companions', 'STEM & Building', 'Pretend Play & Music'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeCategory === cat ? 'bg-[#EFEAE1] text-[#2D2A26] font-semibold' : 'text-[#575149]'
                  }`}
                >
                  {cat === 'All' ? 'Shop All Toys' : cat}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToWonderBox();
                }}
                className="text-left px-3 py-2 rounded-md text-sm font-semibold text-[#A25735] flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                WonderBox Builder
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGiftFinder();
                }}
                className="text-left px-3 py-2 rounded-md text-sm font-semibold text-[#3E5C46] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Gift Finder Quiz
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
