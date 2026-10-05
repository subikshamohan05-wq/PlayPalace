import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Gift, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  onApplyPromo: (code: string) => boolean;
  appliedDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  onApplyPromo,
  appliedDiscount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.toy.price * item.quantity, 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const freeShippingThreshold = 65;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shipping = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 8.5;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shipping);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim());
    if (success) {
      setPromoMessage({ text: 'Promo code applied! 10% off', error: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code (try TINKER10)', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl border-l border-[#E8E1D5] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2D2A26]" />
            <h2 className="font-serif font-bold text-lg text-[#2D2A26]">
              Your Toybag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D766C] hover:text-[#2D2A26] rounded-lg"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#F3EDE2] px-5 py-3 border-b border-[#E8E1D5] text-xs text-[#575149]">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span>Add <strong className="text-[#2D2A26] font-mono tabular-nums">${remainingForFreeShipping.toFixed(2)}</strong> for Free Heirloom Shipping</span>
                <span className="font-mono tabular-nums">{Math.round((rawSubtotal / freeShippingThreshold) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#DDD4C5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3E5C46] transition-all duration-300"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#3E5C46] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>You've unlocked Complimentary Express Shipping!</span>
            </div>
          )}
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#7D766C]">
              <div className="w-16 h-16 rounded-full bg-[#EFEAE1] flex items-center justify-center text-2xl text-[#2D2A26]">
                🎁
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2D2A26]">Your toybag is empty</h3>
              <p className="text-xs max-w-xs">
                Explore our handcrafted wooden railway sets, plush companions, or build a personalized WonderBox.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#2D2A26] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors"
              >
                Browse Toys
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-xl border border-[#E8E1D5] flex gap-3 relative group"
              >
                <img
                  src={item.toy.image}
                  alt={item.toy.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#F5F2EB] shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#2D2A26] leading-snug line-clamp-1">
                        {item.toy.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9E978C] hover:text-[#C87D55] p-1 -mr-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.isCustomBundle && item.bundleDetails ? (
                      <div className="text-[10px] text-[#7D766C] mt-0.5 space-y-0.5">
                        <span className="text-[#A25735] font-semibold">Bespoke Bundle:</span>{' '}
                        <span>{item.bundleDetails.boxName} · {item.bundleDetails.ribbon}</span>
                        <div className="italic text-[#635D54]">For {item.bundleDetails.recipientName}</div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#7D766C]">{item.toy.ageLabel}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#DDD4C5] rounded bg-[#FAF7F2]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#575149] hover:bg-[#EFEAE1]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-semibold text-[#2D2A26] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-[#575149] hover:bg-[#EFEAE1]"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-mono text-xs font-bold text-[#2D2A26] tabular-nums">
                      ${(item.toy.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D5] bg-white space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#9E978C]" />
                <input
                  type="text"
                  placeholder="Promo Code (TINKER10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#FAF7F2] text-[#2D2A26] text-xs font-semibold rounded-lg border border-[#DDD4C5] hover:bg-[#EFEAE1] transition-colors"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div
                className={`text-[11px] font-medium ${
                  promoMessage.error ? 'text-red-600' : 'text-[#3E5C46]'
                }`}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Subtotal, Shipping, Total */}
            <div className="space-y-1.5 text-xs text-[#635D54]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#2D2A26]">${rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#3E5C46]">
                  <span>Discount ({appliedDiscount * 100}%)</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums text-[#2D2A26]">
                  {shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8E1D5] flex justify-between items-baseline text-base font-bold text-[#2D2A26]">
                <span>Total</span>
                <span className="font-mono text-xl tabular-nums">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-6 bg-[#2D2A26] text-white text-sm font-semibold rounded-lg hover:bg-[#433E38] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
