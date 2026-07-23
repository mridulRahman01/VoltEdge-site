import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import MobileUtilityStrip from '@/app/components/MobileUtilityStrip';
import HeroSection from '@/app/components/HeroSection';
import CategoryRail from '@/app/components/CategoryRail';
import FlashSaleStrip from '@/app/components/FlashSaleStrip';
import BrandGrid from '@/app/components/BrandGrid';
import FeaturedGrid from '@/app/components/FeaturedGrid';
import ToolsBento from '@/app/components/ToolsBento';
import BestSellersSection from '@/app/components/BestSellersSection';
import TrustBar from '@/app/components/TrustBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MobileUtilityStrip />
      <main className="pb-[calc(84px+env(safe-area-inset-bottom))] lg:pb-0 space-y-4 sm:space-y-8">
        <HeroSection />
        <CategoryRail />
        <FlashSaleStrip />
        <BrandGrid />
        <FeaturedGrid />
        <ToolsBento />
        <BestSellersSection />
        <TrustBar />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
