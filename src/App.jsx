import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DesktopHeroScrubber from './components/DesktopHeroScrubber';
import MobileHeroScrubber from './components/MobileHeroScrubber';
import FlavorSpotlight from './components/FlavorSpotlight';
import WhyCrunch from './components/WhyCrunch';
import IngredientsStrip from './components/IngredientsStrip';
import ProductRange from './components/ProductRange';
import SocialProof from './components/SocialProof';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';
import StoreModal from './components/StoreModal';
import Watermark from './components/Watermark';

export default function App() {
  const [storeModalOpen, setStoreModalOpen] = useState(false);

  const handleOpenStoreModal = () => {
    setStoreModalOpen(true);
  };

  const handleCloseStoreModal = () => {
    setStoreModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] font-sans selection:bg-[#E85D04] selection:text-white">
      {/* Glassmorphic Navigation */}
      <Navbar onOpenStoreModal={handleOpenStoreModal} />

      {/* Main Content Sections */}
      <main>
        {/* PC Widescreen Hero Section (Desktop Users) */}
        <div className="hidden md:block">
          <DesktopHeroScrubber onOpenStoreModal={handleOpenStoreModal} />
        </div>

        {/* Mobile Dedicated Hero Section (Mobile Phone Users) */}
        <div className="block md:hidden">
          <MobileHeroScrubber onOpenStoreModal={handleOpenStoreModal} />
        </div>

        {/* Ingredients Continuous Ticker */}
        <IngredientsStrip />

        {/* Flagship Flavor Spotlight */}
        <FlavorSpotlight onOpenStoreModal={handleOpenStoreModal} />

        {/* Why Choose Crunch Differentiators */}
        <WhyCrunch />

        {/* Product Flavor Range & Quick View */}
        <ProductRange onOpenStoreModal={handleOpenStoreModal} />

        {/* Social Proof & Customer Reviews */}
        <SocialProof />

        {/* High-Contrast Fiery CTA Band */}
        <CtaBand onOpenStoreModal={handleOpenStoreModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Creator Watermark Badge */}
      <Watermark />

      {/* Interactive Store Finder & Sample Modal */}
      <StoreModal isOpen={storeModalOpen} onClose={handleCloseStoreModal} />
    </div>
  );
}
