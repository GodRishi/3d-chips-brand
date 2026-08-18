import React, { useState } from 'react';
import { X, MapPin, Search, CheckCircle2, Package, Info, Flame, Navigation } from 'lucide-react';

const MOCK_STORES = [
  {
    name: 'Whole Foods Market — Gourmet Aisle',
    address: '450 West 33rd St, New York, NY',
    distance: '0.6 mi away',
    stock: 'In Stock (24 left)',
    status: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    name: 'Target Express — Chips Dept.',
    address: '112 W 34th St, New York, NY',
    distance: '1.2 mi away',
    stock: 'High Demand (8 left)',
    status: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  },
  {
    name: '7-Eleven Flagship Store',
    address: '535 8th Ave, New York, NY',
    distance: '1.8 mi away',
    stock: 'Fresh Shipment',
    status: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    name: 'Gourmet Artisanal Market',
    address: '770 Broadway, New York, NY',
    distance: '2.5 mi away',
    stock: 'Low Stock',
    status: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  }
];

export default function StoreModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('locator');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="glass-panel max-w-2xl w-full rounded-2xl sm:rounded-3xl border border-neutral-700 overflow-hidden relative shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full glass-panel text-neutral-400 hover:text-white cursor-pointer z-20"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-5 sm:p-8 bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-b border-neutral-800 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-panel-orange text-[#FF6B00] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3">
            <Flame className="w-3 h-3 fill-[#FF6B00]" />
            Demo Store & Sample Hub
          </div>

          <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-white mb-2">
            CRUNCH LOCATOR & SAMPLES
          </h3>

          {/* Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 mt-4">
            <button
              onClick={() => setActiveTab('locator')}
              className={`px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'locator'
                  ? 'bg-gradient-to-r from-[#E85D04] to-[#C1121F] text-white shadow-lg'
                  : 'glass-panel text-neutral-400 hover:text-white'
              }`}
            >
              Store Finder
            </button>
            
            <button
              onClick={() => setActiveTab('sample')}
              className={`px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sample'
                  ? 'bg-gradient-to-r from-[#E85D04] to-[#C1121F] text-white shadow-lg'
                  : 'glass-panel text-neutral-400 hover:text-white'
              }`}
            >
              Free Sample Box
            </button>
          </div>
        </div>

        {/* Tab 1: Store Locator */}
        {activeTab === 'locator' && (
          <div className="p-5 sm:p-8 overflow-y-auto grow">
            {/* Search Input */}
            <div className="relative mb-5">
              <Search className="w-4 h-4 text-neutral-500 absolute top-1/2 left-3.5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="City or ZIP code (e.g. 10001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E85D04]"
              />
            </div>

            {/* Simulated Store List */}
            <div className="space-y-3 sm:space-y-4">
              {MOCK_STORES.map((store) => (
                <div
                  key={store.name}
                  className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-[#E85D04]/40 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#E85D04]/20 text-[#FF6B00] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm font-display uppercase tracking-wider mb-1">
                        {store.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-400 mb-2">{store.address}</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold border ${store.status}`}>
                        {store.stock}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start shrink-0 pt-2 sm:pt-0 border-t border-neutral-800/60 sm:border-0">
                    <span className="text-[10px] sm:text-xs font-mono text-neutral-400">{store.distance}</span>
                    <button
                      onClick={() => alert('Demo site: Opening maps directions simulation.')}
                      className="mt-1 px-3 py-1.5 rounded-lg glass-panel text-[10px] font-bold text-neutral-200 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Navigation className="w-3 h-3 text-[#FF6B00]" />
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-5 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5 text-[11px] sm:text-xs text-neutral-400">
              <Info className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>
                Portfolio demo site — no live inventory database attached.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Sample Box Form */}
        {activeTab === 'sample' && (
          <div className="p-5 sm:p-8 overflow-y-auto grow">
            {submitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold uppercase font-display text-white mb-2">
                  SAMPLE REQUEST RECEIVED!
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto mb-6">
                  (Portfolio Demo) Your sample order has been simulated. Thank you for testing the interactive demo!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl glass-panel text-xs font-bold text-neutral-300 hover:text-white cursor-pointer"
                >
                  Reset Form
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-3.5 sm:space-y-4"
              >
                <div>
                  <label className="block text-[10px] sm:text-xs font-mono uppercase text-neutral-400 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E85D04]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-mono uppercase text-neutral-400 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E85D04]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-mono uppercase text-neutral-400 mb-1">Preferred Flavor Sample</label>
                  <select
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E85D04]"
                  >
                    <option value="peri-peri">Peri Peri (Signature 10/10 Heat)</option>
                    <option value="tangy-masala">Tangy Masala</option>
                    <option value="sea-salt">Classic Sea Salt</option>
                    <option value="cheese-blast">Smokey Cheese Blast</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C1121F] text-white font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Request Free Sample Pack (Demo)</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
