import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#262320] text-[#E0D8CB] pt-16 pb-12 border-t border-[#3B3631]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3B3631]">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif font-bold text-2xl text-[#FAF7F2]">
              Tinker & Pip Toy Co.
            </span>
            <p className="text-xs text-[#A89F93] leading-relaxed max-w-sm">
              Makers of heirloom wooden toys, gentle organic plush companions, and open-ended curiosity kits. Designed in our workshop to nourish joyful childhood imaginations.
            </p>
            <div className="pt-2 text-xs text-[#8C8478] space-y-1">
              <div>Atelier: 14 Woodturner's Way, Black Forest / Cotswolds</div>
              <div>Customer Care: hello@tinkerandpiptoys.com · +1 (800) 412-8821</div>
            </div>
          </div>

          {/* Column: Collections */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E5B57A]">
              Collections
            </div>
            <ul className="space-y-2 text-xs text-[#A89F93]">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Wooden Heirlooms</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Plush & Soft Companions</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">STEM & Kinematics</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Pretend Play & Music</a></li>
              <li><a href="#wonderbox-section" className="hover:text-white transition-colors">Curated WonderBoxes</a></li>
            </ul>
          </div>

          {/* Column: Care & Safety */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E5B57A]">
              Safety & Standards
            </div>
            <ul className="space-y-2 text-xs text-[#A89F93]">
              <li><span>FSC-Certified Sourcing</span></li>
              <li><span>ASTM F963 & EN-71 Standards</span></li>
              <li><span>Food-Safe Natural Oils</span></li>
              <li><span>Lifetime Wooden Toy Repair</span></li>
              <li><span>Complimentary Gift Packaging</span></li>
            </ul>
          </div>

          {/* Column: Workshop Dispatch Letter */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E5B57A]">
              Workshop Gazette
            </div>
            <p className="text-xs text-[#A89F93] leading-relaxed">
              Quiet notes on child development, woodturning stories, and private batch releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-l-lg bg-[#332F2A] border border-[#48423B] text-[#FAF7F2] placeholder-[#80776D] focus:outline-none focus:border-[#E5B57A]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#E5B57A] text-[#262320] rounded-r-lg font-semibold text-xs hover:bg-[#F3C488] transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-[#A7D1B4] flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  <span>Welcome to the workshop family!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#80776D] gap-4">
          <div>
            © {new Date().getFullYear()} Tinker & Pip Toy Co. All rights reserved. Handcrafted with care.
          </div>
          <div className="flex items-center gap-4 text-[#A89F93]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
