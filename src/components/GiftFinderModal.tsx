import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { Toy } from '../types';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  toys: Toy[];
  onSelectToy: (toy: Toy) => void;
  onAddToCart: (toy: Toy) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  toys,
  onSelectToy,
  onAddToCart,
}) => {
  const [ageGroup, setAgeGroup] = useState<'0-2' | '3-5' | '6-8' | '9+'>('3-5');
  const [personality, setPersonality] = useState<string>('builder');
  const [budgetMax, setBudgetMax] = useState<number>(100);

  if (!isOpen) return null;

  // Curate recommendations based on answers
  const recommended = toys
    .filter((toy) => {
      // Age filter
      const matchesAge = toy.ageGroup === ageGroup || ageGroup === '3-5';
      const matchesBudget = toy.price <= budgetMax;
      return matchesBudget && (matchesAge || toy.rating >= 4.9);
    })
    .sort((a, b) => {
      // Priority sorting
      if (personality === 'builder' && a.category === 'STEM & Building') return -1;
      if (personality === 'cuddler' && a.category === 'Plush & Companions') return -1;
      if (personality === 'storyteller' && a.category === 'Pretend Play & Music') return -1;
      return b.rating - a.rating;
    })
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E1D5] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E1D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FAF7F2] rounded-lg text-[#3E5C46]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2D2A26]">
                The Gift Finder Assistant
              </h3>
              <p className="text-xs text-[#7D766C]">
                Answer 3 quick questions to discover the ideal heirloom toy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D766C] hover:text-[#2D2A26] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Question 1: Age */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A25735]">
              1. Child's Age Group
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '0–2 Years', group: '0-2' as const },
                { label: '3–5 Years', group: '3-5' as const },
                { label: '6–8 Years', group: '6-8' as const },
                { label: '9+ Years', group: '9+' as const },
              ].map((item) => (
                <button
                  key={item.group}
                  onClick={() => setAgeGroup(item.group)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    ageGroup === item.group
                      ? 'bg-[#2D2A26] text-white border-[#2D2A26]'
                      : 'bg-white text-[#575149] border-[#DDD4C5] hover:border-[#2D2A26]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Play Style */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A25735]">
              2. Play Style & Spirit
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'builder', title: 'Curious Maker', desc: 'Loves blocks, mechanics, and constructing' },
                { id: 'cuddler', title: 'Gentle Dreamer', desc: 'Loves bedtime buddies, warmth, and quiet stories' },
                { id: 'storyteller', title: 'Imaginative Pretender', desc: 'Loves tea parties, music, and roleplay' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setPersonality(style.id)}
                  className={`p-3 text-left rounded-lg border transition-all text-xs ${
                    personality === style.id
                      ? 'bg-[#FAF7F2] border-[#2D2A26] ring-1 ring-[#2D2A26]'
                      : 'bg-white border-[#DDD4C5] hover:border-[#C4BAA9]'
                  }`}
                >
                  <div className="font-semibold text-[#2D2A26]">{style.title}</div>
                  <div className="text-[11px] text-[#7D766C] mt-0.5">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Budget Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#A25735]">
                3. Maximum Budget
              </label>
              <span className="font-mono font-bold text-sm text-[#2D2A26] tabular-nums">
                Up to ${budgetMax}
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={110}
              step={5}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="w-full accent-[#2D2A26] cursor-pointer"
            />
          </div>

          {/* Curated Recommendations */}
          <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3E5C46]">
                Curated Suggestions ({recommended.length})
              </span>
              <span className="text-xs text-[#7D766C]">Matched to play temperament</span>
            </div>

            <div className="space-y-3">
              {recommended.map((toy) => (
                <div
                  key={toy.id}
                  className="p-3 bg-white rounded-xl border border-[#E8E1D5] flex items-center justify-between gap-4 hover:border-[#2D2A26] transition-colors"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectToy(toy);
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={toy.image}
                      alt={toy.name}
                      className="w-14 h-14 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7D766C]">
                        <span>{toy.ageLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-0.5 text-[#D49B3E]">
                          <Star className="w-3 h-3 fill-[#D49B3E]" /> {toy.rating}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#2D2A26] truncate">
                        {toy.name}
                      </h4>
                      <div className="font-mono text-xs font-bold text-[#2D2A26] tabular-nums">
                        ${toy.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(toy)}
                      className="px-3 py-1.5 bg-[#2D2A26] text-white text-xs font-semibold rounded-lg hover:bg-[#433E38] transition-colors flex items-center gap-1 active:scale-[0.96]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectToy(toy);
                      }}
                      className="px-2.5 py-1.5 border border-[#DDD4C5] text-[#2D2A26] text-xs font-medium rounded-lg hover:bg-[#F3EDE2] transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
