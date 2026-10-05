import React from 'react';
import { Trees, Compass, Heart, Shield } from 'lucide-react';

export const CraftStory: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A25735]">
            <span>The Workshop Manifesto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A26] [text-wrap:balance]">
            Crafted slowly, built to outlast childhood.
          </h2>
          <p className="text-sm text-[#635D54] leading-relaxed">
            In an era of disposable plastic novelties, we return to the quiet dignity of slow woodworking, honest organic textiles, and natural sensory touch.
          </p>
        </div>

        {/* 3 Editorial Pillars (adhering to clean typography & whitespace) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-xl bg-white border border-[#E8E1D5] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#EAEFEA] text-[#3E5C46] flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D2A26]">
              01. Forest-To-Crib Stewardship
            </h3>
            <p className="text-xs text-[#635D54] leading-relaxed">
              Every train carriage, block set, and puzzle begins as responsibly harvested Bavarian beech or alpine maple. For each fallen timber trunk turned on our lathes, three saplings are rooted back into native European soil.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#E8E1D5] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5ECE5] text-[#A25735] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D2A26]">
              02. Food-Grade Botanics & Dyes
            </h3>
            <p className="text-xs text-[#635D54] leading-relaxed">
              Babies explore with their mouths before their hands. That’s why our stains are extracted from walnut shells, red radish, and garden spinach, sealed only in pure food-grade cold-pressed linseed oils and filtered beeswax.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#E8E1D5] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#EFEAE2] text-[#433E38] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D2A26]">
              03. The Heirloom Promise
            </h3>
            <p className="text-xs text-[#635D54] leading-relaxed">
              Our joints are pinned with hardwood dowels rather than brittle glue. If a wheel loosens or a track splits over years of boisterous adventures, send it home to our atelier for complimentary restoration.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
