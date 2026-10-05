import React, { useState } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Box, RefreshCw, Send } from 'lucide-react';
import { Toy, Review } from '../types';

interface ProductDetailModalProps {
  toy: Toy | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (toy: Toy) => void;
  onAddToCart: (toy: Toy, quantity: number) => void;
  onAddReview: (toyId: string, review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  toy,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onAddReview,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'reviews'>('details');

  // New review form state
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!isOpen || !toy) return null;

  const handleAdd = () => {
    onAddToCart(toy, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;
    onAddReview(toy.id, {
      author: reviewerName.trim(),
      rating,
      comment: comment.trim(),
    });
    setReviewerName('');
    setComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E1D5] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 text-[#2D2A26] hover:bg-white shadow-sm transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column (Left) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F0EBE1] border border-[#E4DDD0]">
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {toy.tag && (
                  <span className="absolute top-3 left-3 text-xs font-semibold uppercase px-2.5 py-1 bg-[#2D2A26]/80 text-[#FAF7F2] rounded-md backdrop-blur-xs">
                    {toy.tag}
                  </span>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E8E0D2] space-y-2 text-xs text-[#575149]">
                <div className="flex items-center gap-2 font-semibold text-[#2D2A26]">
                  <ShieldCheck className="w-4 h-4 text-[#3E5C46]" />
                  <span>Certified Non-Toxic & Safety Verified</span>
                </div>
                <p>Fully compliant with ASTM F963 (US) and EN-71 (Europe). Completely free of BPA, phthalates, lead, and volatile organic compounds.</p>
                <div className="flex items-center gap-2 pt-1 font-semibold text-[#2D2A26]">
                  <RefreshCw className="w-4 h-4 text-[#3E5C46]" />
                  <span>30-Day Happiness Guarantee & Free Returns</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module (Right) */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#7D766C] mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#A25735]">{toy.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{toy.ageLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className={toy.inStock ? 'text-[#3E5C46] font-medium' : 'text-red-600'}>
                    {toy.inStock ? `In Stock (${toy.stockCount} units)` : 'Out of Stock'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2A26] leading-tight">
                  {toy.name}
                </h2>

                {/* Rating summary */}
                <div className="flex items-center gap-2 mt-2 text-xs text-[#635D54]">
                  <div className="flex items-center gap-0.5 text-[#D49B3E]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(toy.rating) ? 'fill-[#D49B3E]' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-[#2D2A26] tabular-nums">{toy.rating}</span>
                  <span aria-hidden="true">·</span>
                  <span>{toy.reviewCount} customer reviews</span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif font-bold text-[#2D2A26] font-mono tabular-nums">
                  ${toy.price.toFixed(2)}
                </span>
                {toy.originalPrice && (
                  <span className="text-base text-[#9E978C] line-through font-mono tabular-nums">
                    ${toy.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#7D766C]">Taxes calculated at checkout</span>
              </div>

              <p className="text-sm text-[#575149] leading-relaxed">
                {toy.longDescription}
              </p>

              {/* Quantity Stepper & Add to Cart Controls */}
              <div className="pt-3 border-t border-[#E8E1D5] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#DDD4C5] rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-[#575149] hover:bg-[#F3EDE2] text-sm font-semibold transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-[#2D2A26] font-mono tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(toy.stockCount, quantity + 1))}
                      className="px-3 py-2 text-[#575149] hover:bg-[#F3EDE2] text-sm font-semibold transition-colors"
                      disabled={quantity >= toy.stockCount}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={!toy.inStock}
                    className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] ${
                      added
                        ? 'bg-[#3E5C46] text-white'
                        : 'bg-[#2D2A26] text-[#FAF7F2] hover:bg-[#433E38]'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <span>Add {quantity > 1 ? `${quantity} to Bag` : 'to Bag'}</span>
                        <span className="font-mono text-xs opacity-90 tabular-nums">
                          · ${(toy.price * quantity).toFixed(2)}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(toy)}
                    className="p-3 border border-[#DDD4C5] rounded-lg bg-white text-[#575149] hover:text-[#C87D55] hover:bg-[#F7F2EA] transition-colors"
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C87D55] text-[#C87D55]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Segmented Information Tabs */}
              <div className="pt-4 border-t border-[#E8E1D5]">
                <div className="flex border-b border-[#E8E1D5] gap-4 text-xs font-semibold text-[#7D766C]">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'details'
                        ? 'text-[#2D2A26] border-b-2 border-[#C87D55]'
                        : 'hover:text-[#2D2A26]'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'materials'
                        ? 'text-[#2D2A26] border-b-2 border-[#C87D55]'
                        : 'hover:text-[#2D2A26]'
                    }`}
                  >
                    Sourcing & Materials
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'text-[#2D2A26] border-b-2 border-[#C87D55]'
                        : 'hover:text-[#2D2A26]'
                    }`}
                  >
                    Reviews ({toy.reviews.length})
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#575149] min-h-[100px]">
                  {activeTab === 'details' && (
                    <dl className="grid grid-cols-2 gap-y-2">
                      <dt className="text-[#8C8478]">Recommended Age:</dt>
                      <dd className="font-medium text-[#2D2A26]">{toy.ageLabel}</dd>
                      <dt className="text-[#8C8478]">Dimensions:</dt>
                      <dd className="font-medium text-[#2D2A26]">{toy.dimensions}</dd>
                      <dt className="text-[#8C8478]">Play Domain:</dt>
                      <dd className="font-medium text-[#2D2A26]">{toy.category}</dd>
                    </dl>
                  )}

                  {activeTab === 'materials' && (
                    <ul className="space-y-1.5 list-disc pl-4">
                      {toy.materials.map((m, idx) => (
                        <li key={idx} className="text-[#2D2A26]">{m}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {toy.reviews.map((rev) => (
                          <div key={rev.id} className="p-2.5 rounded bg-white border border-[#EFEAE1] space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-[#2D2A26]">{rev.author}</span>
                              <span className="text-[#9E978C]">{rev.date}</span>
                            </div>
                            <p className="text-xs text-[#575149] italic">"{rev.comment}"</p>
                          </div>
                        ))}
                      </div>

                      {/* Add Review mini-form */}
                      <form onSubmit={handleReviewSubmit} className="pt-2 border-t border-[#E8E1D5] space-y-2">
                        <div className="font-semibold text-[#2D2A26] text-xs">Share Your Feedback:</div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            className="flex-1 text-xs px-2.5 py-1.5 rounded border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#C87D55]"
                            required
                          />
                          <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="text-xs px-2 py-1.5 rounded border border-[#DDD4C5] bg-white text-[#2D2A26]"
                          >
                            <option value={5}>5 Stars ★★★★★</option>
                            <option value={4}>4 Stars ★★★★☆</option>
                            <option value={3}>3 Stars ★★★☆☆</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="What did your little one think?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 text-xs px-2.5 py-1.5 rounded border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#C87D55]"
                            required
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-[#2D2A26] text-white rounded text-xs font-semibold hover:bg-[#433E38] transition-colors flex items-center gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Post</span>
                          </button>
                        </div>
                        {reviewSubmitted && (
                          <div className="text-[11px] text-[#3E5C46] font-semibold">Thank you for sharing your thoughts!</div>
                        )}
                      </form>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
