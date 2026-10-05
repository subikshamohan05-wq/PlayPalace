import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Toy } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Toy[];
  onRemoveFromWishlist: (toyId: string) => void;
  onMoveToCart: (toy: Toy) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl border-l border-[#E8E1D5] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C87D55] fill-[#C87D55]" />
            <h2 className="font-serif font-bold text-lg text-[#2D2A26]">
              Saved Treasures ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D766C] hover:text-[#2D2A26] rounded-lg"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#7D766C]">
              <div className="w-16 h-16 rounded-full bg-[#EFEAE1] flex items-center justify-center text-2xl">
                🤍
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2A26]">No saved treasures yet</h3>
              <p className="text-xs max-w-xs">
                Tap the heart on any toy to keep track of birthday wishes or future nursery additions.
              </p>
            </div>
          ) : (
            wishlist.map((toy) => (
              <div
                key={toy.id}
                className="p-3.5 bg-white rounded-xl border border-[#E8E1D5] flex gap-3 items-center"
              >
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#F5F2EB] shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-[#2D2A26] truncate">
                      {toy.name}
                    </h4>
                    <button
                      onClick={() => onRemoveFromWishlist(toy.id)}
                      className="text-[#9E978C] hover:text-[#C87D55] p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#7D766C]">{toy.ageLabel}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2D2A26] tabular-nums">
                      ${toy.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        onMoveToCart(toy);
                        onRemoveFromWishlist(toy.id);
                      }}
                      className="px-2.5 py-1 bg-[#2D2A26] text-white text-[11px] font-semibold rounded hover:bg-[#433E38] transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
