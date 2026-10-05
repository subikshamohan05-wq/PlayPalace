import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Trees, HeartHandshake } from 'lucide-react';
import { HERO_IMAGE } from '../data/toys';

interface HeroProps {
  onExploreClick: () => void;
  onCustomBoxClick: () => void;
  onOpenGiftFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCustomBoxClick,
  onOpenGiftFinder,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E8E1D5]">
      {/* Subtle organic warmth background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text / Campaign Zone */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A25735]">
              <span>Atelier & Toymakers</span>
              <span aria-hidden="true" className="opacity-60">·</span>
              <span>Est. 2018</span>
              <span aria-hidden="true" className="opacity-60">·</span>
              <span>Bavaria & Cotswolds</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D2A26] leading-[1.12] tracking-tight [text-wrap:balance]">
              Treasures crafted for childhood wonder and generations ahead.
            </h1>

            <p className="text-base sm:text-lg text-[#635D54] leading-relaxed max-w-xl">
              Slow-turned European hardwood, gentle organic botanic plush, and mechanical marvels. Built by hand to inspire quiet curiosity and limitless open-ended play.
            </p>

            {/* Functional CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#2D2A26] text-[#FAF7F2] text-sm font-semibold rounded-lg hover:bg-[#433E38] transition-all shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>Explore the Toybox</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomBoxClick}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#EFE9DF] text-[#2D2A26] text-sm font-semibold rounded-lg hover:bg-[#E5DDCF] border border-[#DDD4C5] transition-all active:scale-[0.98]"
              >
                <span>Curate a WonderBox</span>
              </button>
            </div>

            {/* Trust Badges - unboxed typographic markers */}
            <div className="pt-6 border-t border-[#E8E1D5] grid grid-cols-3 gap-4 text-xs text-[#635D54]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#2D2A26]">
                  <Trees className="w-3.5 h-3.5 text-[#3E5C46]" />
                  <span>100% FSC Timber</span>
                </div>
                <p className="text-[11px] leading-tight text-[#7D766C]">Beech, maple & linden</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#2D2A26]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3E5C46]" />
                  <span>Pure Non-Toxic</span>
                </div>
                <p className="text-[11px] leading-tight text-[#7D766C]">EN71 & ASTM tested</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#2D2A26]">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#3E5C46]" />
                  <span>Lifetime Care</span>
                </div>
                <p className="text-[11px] leading-tight text-[#7D766C]">Repairable heirlooms</p>
              </div>
            </div>
          </div>

          {/* Right Showcase Image Module */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E3DBD0] bg-[#EBE4D8] aspect-[16/10] sm:aspect-[16/11]">
              <img
                src={HERO_IMAGE}
                alt="Handcrafted wooden toys and plush companion on natural oak workshop table"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Quick Action Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white p-3.5 rounded-xl bg-[#2D2A26]/80 backdrop-blur-md border border-white/10">
                <div className="space-y-0.5">
                  <div className="text-xs uppercase tracking-wider text-[#E5B57A] font-semibold">Curator’s Choice</div>
                  <div className="text-sm font-medium">Bespoke Heirlooms for Autumn & Winter</div>
                </div>
                <button
                  onClick={onOpenGiftFinder}
                  className="px-3 py-1.5 bg-[#FAF7F2] text-[#2D2A26] rounded-md text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A25735]" />
                  <span>Gift Finder</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
