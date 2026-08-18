import React, { useState } from 'react';
import { Flame, Eye, ShoppingBag, Star, ChevronRight, X, ShieldAlert } from 'lucide-react';

const FLAVORS = [
  {
    id: 'peri-peri',
    name: 'PERI PERI',
    badge: 'FLAGSHIP FLAVOR',
    tagline: 'African Bird’s Eye Chili & Zesty Lemon',
    heat: '10/10',
    color: 'from-[#E85D04] via-[#FF6B00] to-[#C1121F]',
    borderColor: 'border-[#E85D04]',
    badgeBg: 'bg-[#E85D04]',
    image: '/frames/ezgif-frame-120.jpg',
    description: 'Our flagship kettle-cooked crisp. Slow-roasted Mozambique chilis blended with garlic, onion, and sun-ripened citrus.',
    ingredients: 'Single-origin potatoes, sunflower oil, Peri Peri spice mix (chili, lemon peel, sea salt, garlic, onion, smoked paprika).'
  },
  {
    id: 'tangy-masala',
    name: 'TANGY MASALA',
    badge: 'ZESTY STREET SPICE',
    tagline: 'Cumin, Black Salt & Dry Mango Powder',
    heat: '6/10',
    color: 'from-[#D97706] via-[#F59E0B] to-[#B45309]',
    borderColor: 'border-[#D97706]',
    badgeBg: 'bg-[#D97706]',
    image: '/frames/ezgif-frame-080.jpg',
    description: 'An explosion of street-food spices! Tangy amchoor mango powder combined with roasted cumin and crushed black pepper.',
    ingredients: 'Single-origin potatoes, sunflower oil, Masala spice mix (black salt, cumin, coriander, mango powder, black pepper).'
  },
  {
    id: 'sea-salt',
    name: 'CLASSIC SEA SALT',
    badge: 'PURIST CRISP',
    tagline: 'Coarse Ocean Salt & Pure Potato Taste',
    heat: '1/10',
    color: 'from-[#0284C7] via-[#38BDF8] to-[#0369A1]',
    borderColor: 'border-[#0284C7]',
    badgeBg: 'bg-[#0284C7]',
    image: '/frames/ezgif-frame-040.jpg',
    description: 'For potato purists. Thick-cut kettle crisps lightly dusted with hand-harvested Atlantic sea salt flakes.',
    ingredients: 'Single-origin potatoes, sunflower oil, coarse Atlantic sea salt.'
  },
  {
    id: 'cheese-blast',
    name: 'SMOKEY CHEESE',
    badge: 'DECADENT & RICH',
    tagline: 'Aged Cheddar & Hickory Paprika',
    heat: '5/10',
    color: 'from-[#EA580C] via-[#F97316] to-[#C2410C]',
    borderColor: 'border-[#EA580C]',
    badgeBg: 'bg-[#EA580C]',
    image: '/frames/ezgif-frame-100.jpg',
    description: 'Decadent aged cheddar cheese powder infused with hickory smoke paprika for a savory, velvety crunch.',
    ingredients: 'Single-origin potatoes, sunflower oil, aged cheddar cheese powder, hickory paprika, whey powder, sea salt.'
  }
];

export default function ProductRange({ onOpenStoreModal }) {
  const [activeModalFlavor, setActiveModalFlavor] = useState(null);

  return (
    <section id="flavors" className="relative py-16 sm:py-28 bg-[#080808] overflow-hidden border-t border-neutral-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-[#121212] border-2 border-[#E85D04] text-[#FF6B00] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 shadow-[3px_3px_0px_#000] -rotate-1">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00] fill-[#FF6B00]" />
              THE FULL FLAVOR LINEUP
            </div>
            <h2 className="text-3xl sm:text-7xl font-black uppercase tracking-tight font-display text-white leading-tight">
              EXPLORE OUR <span className="text-gradient-fiery">FLAVOR VARIANTS</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-base max-w-md leading-relaxed font-medium">
            From fiery Mozambique Peri Peri burn to classic Atlantic sea salt simplicity, discover your favorite kettle crisp profile.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {FLAVORS.map((flavor) => (
            <div
              key={flavor.id}
              className={`group relative bg-[#121212] p-5 sm:p-6 border-2 border-neutral-800 hover:${flavor.borderColor} transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch`}
            >
              <div>
                {/* Flavor Badge */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span
                    className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase border border-black shadow-[2px_2px_0px_#000] ${flavor.badgeBg}`}
                  >
                    {flavor.badge}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-neutral-400 flex items-center gap-1">
                    <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF6B00]" />
                    {flavor.heat}
                  </span>
                </div>

                {/* Product Image Preview */}
                <div className="relative my-4 sm:my-6 flex justify-center h-40 sm:h-52 items-center overflow-hidden bg-neutral-950 p-3 sm:p-4 border border-neutral-800">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${flavor.color} opacity-15 group-hover:opacity-30 transition-opacity`} />
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="h-full w-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Flavor Name & Description */}
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide font-display text-white mb-1.5 sm:mb-2">
                  {flavor.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed mb-4 sm:mb-6 font-medium">
                  {flavor.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-neutral-800">
                <button
                  onClick={() => setActiveModalFlavor(flavor)}
                  className="flex-1 py-2.5 sm:py-3 bg-[#080808] border border-neutral-700 text-[10px] sm:text-xs font-bold text-neutral-300 hover:text-white hover:border-[#E85D04] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>QUICK VIEW</span>
                </button>
                
                <button
                  onClick={onOpenStoreModal}
                  className={`p-2.5 sm:p-3 bg-gradient-to-r ${flavor.color} text-white border border-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-transform cursor-pointer`}
                  title="Find Store"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Flavor Detail Modal */}
      {activeModalFlavor && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] max-w-xl w-full p-5 sm:p-8 border-2 border-neutral-700 relative animate-in fade-in zoom-in-95 duration-300 shadow-[10px_10px_0px_#000] clip-notch max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalFlavor(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-[#080808] border border-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className={`px-2.5 py-0.5 text-white text-[9px] sm:text-[10px] font-black uppercase border border-black ${activeModalFlavor.badgeBg}`}>
                {activeModalFlavor.badge}
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#FF6B00]">HEAT: {activeModalFlavor.heat}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black uppercase font-display text-white mb-1 leading-none">
              {activeModalFlavor.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-[#FF6B00] font-bold uppercase tracking-wider mb-4 sm:mb-5">{activeModalFlavor.tagline}</p>

            <div className="flex justify-center my-3 sm:my-4 bg-neutral-950 p-4 sm:p-6 border border-neutral-800">
              <img src={activeModalFlavor.image} alt={activeModalFlavor.name} className="h-36 sm:h-44 object-contain drop-shadow-2xl" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3 sm:mb-4">{activeModalFlavor.description}</p>
            
            <div className="p-3 sm:p-4 bg-neutral-900 border border-neutral-800 mb-5 sm:mb-6">
              <span className="block text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase font-bold mb-1">Ingredients</span>
              <p className="text-[11px] sm:text-xs text-neutral-300">{activeModalFlavor.ingredients}</p>
            </div>

            <button
              onClick={() => {
                setActiveModalFlavor(null);
                onOpenStoreModal();
              }}
              className="w-full btn-brutal-orange py-3.5 sm:py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
            >
              <div>
                <span>LOCATE NEAREST PACK</span>
              </div>
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
