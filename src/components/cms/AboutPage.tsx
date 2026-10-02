import React from 'react';
import { Sparkles, Heart, ShieldCheck, Award } from 'lucide-react';

export const AboutPage: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
            The Heritage of Comfort
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#5A3E36] leading-tight">
            Grace in Every Stitch, Comfort in Every Thread
          </h1>
          <p className="text-sm sm:text-base text-[#5A3E36]/80 leading-relaxed">
            Founded with an enduring devotion to Pakistani craftsmanship, Comfort redefines
            contemporary women's fashion through pure organic cotton lawn, authentic embroidery,
            and understated luxury.
          </p>
        </div>

        {/* Editorial Craftsmanship Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8D8D1] aspect-[16/9] relative">
          <img
            src="/src/assets/images/banner_craftsmanship_1790830594098.jpg"
            alt="Artisanal Embroidery in Lahore Workshop"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed">
            <h2 className="font-serif text-2xl font-medium text-[#5A3E36]">
              Our Philosophy: Elegance Never Compromises Ease
            </h2>
            <p>
              For generations, Pakistani women have balanced regal cultural traditions with dynamic,
              modern lives. Comfort was born from the realization that formal elegance should never
              come at the cost of restrictive, synthetic fabrics.
            </p>
            <p>
              Every collection begins at the fiber level. We source long-staple cotton from the fertile
              plains of Southern Punjab and spin it into high-density lawn that breathes effortlessly
              even during the peak of South Asian summers.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed bg-white p-8 rounded-3xl border border-[#E8D8D1] shadow-sm">
            <h3 className="font-serif text-xl font-medium text-[#5A3E36]">
              Preserving Master Needlecraft
            </h3>
            <p>
              Our master karigars (artisans) in Lahore, Multan, and Karachi specialize in centuries-old
              techniques—from delicate French knot shadow-work to antique tilla, dabka, and zardozi.
            </p>
            <p>
              By paying ethical living wages and fostering artistic independence, every Comfort
              garment supports authentic heirloom embroidery communities.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#E8D8D1]">
          <div className="p-6 rounded-2xl bg-white border border-[#E8D8D1] text-center">
            <Award className="w-8 h-8 text-[#B67B8D] mx-auto mb-3" />
            <h4 className="font-serif text-base font-semibold text-[#5A3E36]">Uncompromised Fabric</h4>
            <p className="text-xs text-[#5A3E36]/70 mt-1">100% genuine combed cotton, micro-velvet, and pure silks.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8D8D1] text-center">
            <Heart className="w-8 h-8 text-[#B67B8D] mx-auto mb-3" />
            <h4 className="font-serif text-base font-semibold text-[#5A3E36]">Ethical Artisanship</h4>
            <p className="text-xs text-[#5A3E36]/70 mt-1">Empowering local weavers, pattern cutters, and embroiderers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E8D8D1] text-center">
            <ShieldCheck className="w-8 h-8 text-[#B67B8D] mx-auto mb-3" />
            <h4 className="font-serif text-base font-semibold text-[#5A3E36]">Customer Trust</h4>
            <p className="text-xs text-[#5A3E36]/70 mt-1">Transparent pricing, verified reviews, and easy returns.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <button
            onClick={onExplore}
            className="px-8 py-3.5 bg-[#5A3E36] text-[#F8EDE3] hover:bg-[#462F29] rounded-xl text-xs font-semibold shadow transition-all cursor-pointer"
          >
            Explore Our Curated Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
