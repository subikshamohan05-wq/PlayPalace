import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Sparkles, Printer, ArrowLeft } from 'lucide-react';
import { CartItem, OrderConfirmation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderCompleted: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Customer form fields
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.jenkins@example.com');
  const [phone, setPhone] = useState('+1 (555) 382-9912');
  const [address, setAddress] = useState('42 Meadowlark Lane');
  const [city, setCity] = useState('Portland');
  const [postalCode, setPostalCode] = useState('97201');
  const [giftWrap, setGiftWrap] = useState(true);
  const [giftMessage, setGiftMessage] = useState('Happy 4th Birthday to our little star!');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'apple_pay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: OrderConfirmation = {
        orderId: `TP-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        items,
        subtotal,
        discount,
        shipping,
        total,
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          postalCode,
          giftWrap,
          giftMessage,
          paymentMethod:
            paymentMethod === 'card'
              ? 'Credit Card (ending 4242)'
              : paymentMethod === 'cod'
              ? 'Cash on Delivery (Verified)'
              : 'Apple Pay',
        },
      };

      setConfirmedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmed');
      onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E1D5] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D5] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-lg text-[#2D2A26]">
              {step === 'confirmed' ? 'Order Confirmed' : 'Tinker & Pip Checkout'}
            </h3>
            {step !== 'confirmed' && (
              <span className="text-xs text-[#7D766C]">
                · Step {step === 'details' ? '1 of 2' : '2 of 2'}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D766C] hover:text-[#2D2A26] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div className="space-y-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  Shipping Address & Contact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-white text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                </div>
              </div>

              {/* Complimentary Heirloom Gift Wrapping */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E1D5] space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2D2A26]">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded text-[#2D2A26] focus:ring-0"
                  />
                  <span>Include Complimentary Heirloom Gift Wrapping & Wax Seal</span>
                </label>
                {giftWrap && (
                  <div>
                    <label className="block text-[11px] font-medium text-[#7D766C] mb-1">
                      Enclosed Hand-Calligraphed Note:
                    </label>
                    <input
                      type="text"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="e.g. Happy Birthday!"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] text-[#2D2A26]"
                    />
                  </div>
                )}
              </div>

              {/* Order total preview */}
              <div className="p-4 bg-[#F5EFE6] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#2D2A26]">{items.length} item(s)</span>
                  <span className="text-[#7D766C] ml-2">Estimated delivery: 2-3 business days</span>
                </div>
                <div className="font-mono font-bold text-sm text-[#2D2A26] tabular-nums">
                  Total: ${total.toFixed(2)}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#2D2A26] text-white text-sm font-semibold rounded-lg hover:bg-[#433E38] transition-all shadow-sm active:scale-[0.98]"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleFinalPayment} className="space-y-5">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#7D766C] hover:text-[#2D2A26] flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping Address</span>
              </button>

              <div className="space-y-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  Select Payment Method
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 text-left rounded-xl border text-xs font-semibold flex flex-col justify-between space-y-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#2D2A26] bg-[#FAF7F2] ring-1 ring-[#2D2A26]'
                        : 'border-[#DDD4C5] bg-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#2D2A26]" />
                    <div>
                      <div className="text-[#2D2A26]">Credit / Debit</div>
                      <div className="text-[10px] text-[#7D766C] font-normal">Visa, Mastercard, Amex</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3.5 text-left rounded-xl border text-xs font-semibold flex flex-col justify-between space-y-2 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#2D2A26] bg-[#FAF7F2] ring-1 ring-[#2D2A26]'
                        : 'border-[#DDD4C5] bg-white'
                    }`}
                  >
                    <span className="font-serif font-bold text-sm"> Pay</span>
                    <div>
                      <div className="text-[#2D2A26]">Instant 1-Click</div>
                      <div className="text-[10px] text-[#7D766C] font-normal">Biometric checkout</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 text-left rounded-xl border text-xs font-semibold flex flex-col justify-between space-y-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#2D2A26] bg-[#FAF7F2] ring-1 ring-[#2D2A26]'
                        : 'border-[#DDD4C5] bg-white'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#2D2A26]" />
                    <div>
                      <div className="text-[#2D2A26]">Cash on Delivery</div>
                      <div className="text-[10px] text-[#7D766C] font-normal">Pay upon receipt</div>
                    </div>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-white rounded-xl border border-[#DDD4C5] space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] font-mono text-[#2D2A26]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#575149] mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] font-mono text-[#2D2A26]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#575149] mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="text"
                        defaultValue="891"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] font-mono text-[#2D2A26]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#EAF2ED] border border-[#CCDED3] rounded-xl text-xs text-[#2F5338] space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cash on Delivery Verification</span>
                  </div>
                  <p>
                    Please have exactly <strong>${total.toFixed(2)}</strong> ready in cash upon arrival. Our courier will provide a physical receipt and tamper-evident seal inspection.
                  </p>
                </div>
              )}

              {/* Order summary box */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E1D5] space-y-2 text-xs text-[#635D54]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#2D2A26]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#3E5C46]">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums text-[#2D2A26]">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D5] flex justify-between items-baseline font-bold text-base text-[#2D2A26]">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-xl tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 bg-[#2D2A26] text-white text-sm font-semibold rounded-lg hover:bg-[#433E38] transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? 'Securing Your Heirloom Order...' : `Authorize & Place Order · $${total.toFixed(2)}`}
              </button>
            </form>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#E8F1EC] text-[#3E5C46] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  Thank You for Your Order!
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2D2A26]">
                  Order {confirmedOrder.orderId} Confirmed
                </h3>
                <p className="text-xs text-[#7D766C]">
                  A detailed confirmation and dispatch tracking link have been dispatched to{' '}
                  <strong className="text-[#2D2A26]">{confirmedOrder.customer.email}</strong>.
                </p>
              </div>

              {/* Order Tracking Timeline */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E1D5] text-left text-xs space-y-3">
                <div className="font-semibold text-[#2D2A26] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#3E5C46]" />
                  <span>Shipment Status: Preparing Workshop Dispatch</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                  <div className="p-2 bg-[#FAF7F2] rounded border border-[#2D2A26] font-semibold text-[#2D2A26]">
                    1. Wood Inspection
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded border border-[#E8E1D5] text-[#7D766C]">
                    2. Gift Wrapping
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded border border-[#E8E1D5] text-[#7D766C]">
                    3. Courier Transit
                  </div>
                </div>
              </div>

              {/* Itemized Receipt Summary */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E1D5] text-left text-xs space-y-2">
                <div className="font-semibold text-[#2D2A26] pb-1 border-b border-[#E8E1D5]">
                  Purchased Items ({confirmedOrder.items.length})
                </div>
                {confirmedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between py-1 border-b border-[#F5F2EB] last:border-none">
                    <span className="text-[#575149]">
                      {it.quantity}x {it.toy.name}
                    </span>
                    <span className="font-mono text-[#2D2A26] font-medium tabular-nums">
                      ${(it.toy.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-sm text-[#2D2A26]">
                  <span>Total Paid ({confirmedOrder.customer.paymentMethod})</span>
                  <span className="font-mono tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-4 border border-[#DDD4C5] rounded-lg text-xs font-semibold text-[#2D2A26] hover:bg-[#EFEAE1] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-[#2D2A26] text-white rounded-lg text-xs font-semibold hover:bg-[#433E38] transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
