import React, { useState } from 'react';
import { Gift, Check, Sparkles, X, Plus } from 'lucide-react';
import { Toy, CartItem } from '../types';
import { BOX_STYLES, RIBBON_STYLES } from '../data/toys';

interface WonderBoxBuilderProps {
  toys: Toy[];
  onAddBundleToCart: (bundleItem: CartItem) => void;
}

export const WonderBoxBuilder: React.FC<WonderBoxBuilderProps> = ({
  toys,
  onAddBundleToCart,
}) => {
  const [selectedBoxId, setSelectedBoxId] = useState(BOX_STYLES[0].id);
  const [selectedRibbonId, setSelectedRibbonId] = useState(RIBBON_STYLES[0].id);
  const [selectedToyIds, setSelectedToyIds] = useState<string[]>([
    toys[0]?.id || '',
    toys[1]?.id || '',
  ]);
  const [childName, setChildName] = useState('Oliver');
  const [giftNote, setGiftNote] = useState('Wishing you endless days of imagination, laughter, and wonder.');
  const [bundleAdded, setBundleAdded] = useState(false);

  const selectedBox = BOX_STYLES.find((b) => b.id === selectedBoxId) || BOX_STYLES[0];
  const selectedRibbon = RIBBON_STYLES.find((r) => r.id === selectedRibbonId) || RIBBON_STYLES[0];
  const selectedToyObjects = selectedToyIds
    .map((id) => toys.find((t) => t.id === id))
    .filter(Boolean) as Toy[];

  // Pricing: Box price + toys sum minus 10% bundle discount
  const rawSum = selectedBox.price + selectedToyObjects.reduce((acc, t) => acc + t.price, 0);
  const bundleDiscount = rawSum * 0.10;
  const bundleFinalPrice = Math.round((rawSum - bundleDiscount) * 100) / 100;

  const toggleToy = (toyId: string) => {
    if (selectedToyIds.includes(toyId)) {
      if (selectedToyIds.length > 1) {
        setSelectedToyIds(selectedToyIds.filter((id) => id !== toyId));
      }
    } else {
      if (selectedToyIds.length < 3) {
        setSelectedToyIds([...selectedToyIds, toyId]);
      }
    }
  };

  const handleAddBundle = () => {
    const dummyToy: Toy = {
      id: `wonderbox-${Date.now()}`,
      name: `Bespoke WonderBox for ${childName || 'Little One'}`,
      category: 'Wooden Heirlooms',
      ageGroup: '3-5',
      ageLabel: 'Curated Bundle',
      price: bundleFinalPrice,
      rating: 5.0,
      reviewCount: 1,
      image: selectedToyObjects[0]?.image || toys[0].image,
      description: `${selectedBox.name} with ${selectedRibbon.name} ribbon, holding ${selectedToyObjects.map((t) => t.name).join(', ')}.`,
      longDescription: `Custom curated heirloom bundle including ${selectedBox.name}, tied in ${selectedRibbon.name} ribbon. Inscribed with note for ${childName}: "${giftNote}"`,
      materials: [selectedBox.name, selectedRibbon.name, 'Handwritten calligraphic card'],
      dimensions: 'Gift presentation box',
      inStock: true,
      stockCount: 99,
      reviews: []
    };

    const bundleItem: CartItem = {
      id: `bundle-${Date.now()}`,
      toy: dummyToy,
      quantity: 1,
      isCustomBundle: true,
      bundleDetails: {
        boxName: selectedBox.name,
        ribbon: selectedRibbon.name,
        recipientName: childName || 'Little Explorer',
        message: giftNote,
        includedToys: selectedToyObjects.map((t) => t.name),
      }
    };

    onAddBundleToCart(bundleItem);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2400);
  };

  return (
    <section id="wonderbox-section" className="py-16 bg-[#F4EFE6] border-b border-[#E8E1D5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A25735]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Gift Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A26] [text-wrap:balance]">
            Curate a Bespoke WonderBox
          </h2>
          <p className="text-sm text-[#635D54] leading-relaxed">
            Select an heirloom keepsake box, choose 2–3 treasures, and personalize with handwritten calligraphy and hand-tied luxury ribbon. Automatic 10% bundle savings.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Vessel selection */}
            <div className="p-5 bg-white rounded-xl border border-[#E8E1D5] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  01. Choose Keepsake Vessel
                </span>
                <span className="text-xs text-[#7D766C]">Reusable nursery storage</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BOX_STYLES.map((box) => (
                  <button
                    key={box.id}
                    onClick={() => setSelectedBoxId(box.id)}
                    className={`p-3 text-left rounded-lg border transition-all text-xs space-y-1.5 ${
                      selectedBoxId === box.id
                        ? 'border-[#2D2A26] bg-[#FAF7F2] ring-1 ring-[#2D2A26]'
                        : 'border-[#E8E1D5] hover:border-[#C4BAA9] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-[#2D2A26]">
                      <span>{box.name}</span>
                      {selectedBoxId === box.id && <Check className="w-3.5 h-3.5 text-[#3E5C46]" />}
                    </div>
                    <p className="text-[#7D766C] text-[11px] leading-snug line-clamp-2">{box.description}</p>
                    <div className="font-mono text-[#2D2A26] font-semibold pt-1">
                      +${box.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Toys */}
            <div className="p-5 bg-white rounded-xl border border-[#E8E1D5] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  02. Select 2 or 3 Toys ({selectedToyIds.length}/3 selected)
                </span>
                <span className="text-xs text-[#7D766C]">Click to add or swap</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                {toys.map((toy) => {
                  const isSelected = selectedToyIds.includes(toy.id);
                  return (
                    <button
                      key={toy.id}
                      onClick={() => toggleToy(toy.id)}
                      className={`relative p-2.5 text-left rounded-lg border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#2D2A26] bg-[#FAF7F2] ring-1 ring-[#2D2A26]'
                          : 'border-[#E8E1D5] hover:border-[#D0C7B8] bg-white'
                      }`}
                    >
                      <div className="aspect-[4/3] rounded overflow-hidden bg-[#F0EBE1] mb-2">
                        <img
                          src={toy.image}
                          alt={toy.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold text-[#2D2A26] line-clamp-1 leading-snug">
                          {toy.name}
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#7D766C]">{toy.ageLabel}</span>
                          <span className="font-mono font-bold text-[#2D2A26]">${toy.price}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#2D2A26] text-white p-1 rounded-full">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 & 4: Ribbon & Personal Note */}
            <div className="p-5 bg-white rounded-xl border border-[#E8E1D5] shadow-xs space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  03. Hand-Tied Ribbon Accent
                </span>
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {RIBBON_STYLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRibbonId(r.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedRibbonId === r.id
                          ? 'border-[#2D2A26] bg-[#FAF7F2] font-semibold'
                          : 'border-[#E8E1D5] hover:border-[#C4BAA9]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: r.color }}
                      />
                      <span>{r.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E1D5] space-y-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#A25735]">
                  04. Handwritten Keepsake Gift Card
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Recipient / Child's Name:
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="e.g. Oliver"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#575149] mb-1">
                      Calligraphy Note:
                    </label>
                    <input
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Message for the child..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#DDD4C5] bg-[#FAF7F2] text-[#2D2A26] focus:outline-none focus:border-[#2D2A26]"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Live Preview & Order Box Column (Right) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="p-6 bg-white rounded-2xl border border-[#DDD4C5] shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D5]">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#A25735]" />
                  <span className="font-serif font-bold text-lg text-[#2D2A26]">Bespoke WonderBox</span>
                </div>
                <span className="text-xs text-[#3E5C46] font-semibold bg-[#E8F1EC] px-2 py-0.5 rounded">
                  10% Bundle Perk
                </span>
              </div>

              {/* Visual Box Packing Simulation */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7D766C]">
                  <span>Vessel: <strong className="text-[#2D2A26]">{selectedBox.name}</strong></span>
                  <span className="flex items-center gap-1">
                    Ribbon:
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: selectedRibbon.color }}
                    />
                    <strong className="text-[#2D2A26]">{selectedRibbon.name}</strong>
                  </span>
                </div>

                {/* Packed Items List */}
                <div className="space-y-2">
                  {selectedToyObjects.map((toy) => (
                    <div
                      key={toy.id}
                      className="flex items-center gap-3 p-2 bg-white rounded-lg border border-[#E8E1D5]"
                    >
                      <img
                        src={toy.image}
                        alt={toy.name}
                        className="w-10 h-10 rounded object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#2D2A26] truncate">{toy.name}</div>
                        <div className="text-[11px] text-[#7D766C]">{toy.category}</div>
                      </div>
                      <div className="font-mono text-xs font-semibold text-[#2D2A26] tabular-nums">
                        ${toy.price}
                      </div>
                      <button
                        onClick={() => toggleToy(toy.id)}
                        disabled={selectedToyIds.length <= 1}
                        className="p-1 text-[#9E978C] hover:text-[#C87D55] disabled:opacity-30"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Simulated Calligraphy Card Preview */}
                <div className="p-3 bg-[#FCFAF7] border border-[#E4D9C8] rounded-lg relative overflow-hidden font-serif">
                  <div className="text-[10px] uppercase tracking-wider text-[#A25735] font-sans font-semibold mb-1">
                    Attached Calligraphy Card:
                  </div>
                  <div className="text-sm italic text-[#2D2A26]">
                    "Dearest {childName || 'Little One'}, {giftNote}"
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-[#635D54]">
                <div className="flex justify-between">
                  <span>Keepsake Vessel</span>
                  <span className="font-mono tabular-nums text-[#2D2A26]">${selectedBox.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Toys Total ({selectedToyObjects.length} items)</span>
                  <span className="font-mono tabular-nums text-[#2D2A26]">
                    ${selectedToyObjects.reduce((a, b) => a + b.price, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#3E5C46]">
                  <span>10% Bundle Saving</span>
                  <span className="font-mono tabular-nums">-${bundleDiscount.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D5] flex justify-between items-baseline text-base font-bold text-[#2D2A26]">
                  <span>Total Bundle Price</span>
                  <span className="font-mono text-xl tabular-nums">${bundleFinalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add WonderBox to Cart CTA */}
              <button
                onClick={handleAddBundle}
                className={`w-full py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] ${
                  bundleAdded
                    ? 'bg-[#3E5C46] text-white'
                    : 'bg-[#2D2A26] text-[#FAF7F2] hover:bg-[#433E38]'
                }`}
              >
                {bundleAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>WonderBox Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>Add Custom WonderBox to Bag</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#7D766C]">
                Includes complimentary heirloom tissue wrapping and wax seal.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
