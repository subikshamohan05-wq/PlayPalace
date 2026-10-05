import React, { useState } from 'react';
import { Heart, Plus, Star, Eye, Check } from 'lucide-react';
import { Toy } from '../types';

interface ProductCardProps {
  toy: Toy;
  isWishlisted: boolean;
  onToggleWishlist: (toy: Toy) => void;
  onAddToCart: (toy: Toy) => void;
  onQuickView: (toy: Toy) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  toy,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(toy);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(toy);
  };

  return (
    <article
      onClick={() => onQuickView(toy)}
      className="group relative flex flex-col bg-[#FFFFFF] rounded-xl border border-[#E8E1D5] overflow-hidden hover:border-[#D0C7B8] hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Visual Slot - 65% - 75% focus with neutral backdrop */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F2EB]">
        {!imgError ? (
          <img
            src={toy.image}
            alt={toy.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F3EDE2] text-[#7D766C]">
            <div className="w-12 h-12 rounded-full bg-[#E5DDCF] flex items-center justify-center mb-2 text-[#433E38]">
              🪵
            </div>
            <span className="text-xs font-medium">{toy.name}</span>
          </div>
        )}

        {/* Subtle Text Tag (at most 1) */}
        {toy.tag && (
          <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-[#2D2A26]/85 backdrop-blur-xs text-[#FAF7F2] rounded-md shadow-xs pointer-events-none">
            {toy.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#575149] hover:text-[#C87D55] hover:bg-white shadow-xs transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C87D55] text-[#C87D55]' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(toy);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-md text-[#2D2A26] rounded-lg text-xs font-semibold hover:bg-white transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#575149]" />
            <span>Quick Inspect</span>
          </button>
        </div>
      </div>

      {/* Card Content - Clean unboxed metadata with typographic separators */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7D766C] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#A25735]">{toy.category}</span>
            <span aria-hidden="true">·</span>
            <span>{toy.ageLabel}</span>
          </div>

          <h3 className="text-base font-semibold text-[#2D2A26] group-hover:text-[#A25735] transition-colors leading-snug line-clamp-1">
            {toy.name}
          </h3>

          <p className="mt-1 text-xs text-[#635D54] line-clamp-2 leading-relaxed">
            {toy.description}
          </p>
        </div>

        {/* Price Baseline, Rating & Quick Add */}
        <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#2D2A26] font-mono tabular-nums">
                ${toy.price.toFixed(2)}
              </span>
              {toy.originalPrice && (
                <span className="text-xs text-[#9E978C] line-through font-mono tabular-nums">
                  ${toy.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#7D766C]">
              <Star className="w-3 h-3 fill-[#D49B3E] text-[#D49B3E]" />
              <span className="font-semibold text-[#2D2A26]">{toy.rating}</span>
              <span>({toy.reviewCount})</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!toy.inStock}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-[0.96] ${
              addedRecently
                ? 'bg-[#3E5C46] text-white'
                : 'bg-[#2D2A26] text-[#FAF7F2] hover:bg-[#433E38]'
            }`}
            aria-label={`Add ${toy.name} to cart`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
