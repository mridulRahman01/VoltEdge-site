import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import HeroSection from '@/app/components/HeroSection';
import CategoryRail from '@/app/components/CategoryRail';
import FlashSaleStrip from '@/app/components/FlashSaleStrip';
import FeaturedGrid from '@/app/components/FeaturedGrid';
import ToolsBento from '@/app/components/ToolsBento';
import BestSellersSection from '@/app/components/BestSellersSection';
import TrustBar from '@/app/components/TrustBar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 sm:pt-16 pb-24 lg:pb-0">
        <HeroSection />
        <CategoryRail />
        <FlashSaleStrip />
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