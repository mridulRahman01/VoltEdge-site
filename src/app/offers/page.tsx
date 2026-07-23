'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Icon from '@/components/ui/AppIcon';

interface OfferBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  endsIn: string;
  category: 'Laptops' | 'Components' | 'Monitors' | 'Networking' | 'Gaming' | 'Accessories';
  color: string;
  badge: string;
}

const OFFERS: OfferBanner[] = [
  {
    id: '1',
    title: 'SUMMER SALE 2026',
    subtitle: 'Up to 50% OFF on Selected Gaming Laptops & Accessories',
    tag: 'Laptops',
    endsIn: '31 JUL 2026 11:47 AM',
    category: 'Laptops',
    color: 'from-amber-500/20 to-red-600/20 border-amber-500/40',
    badge: 'UP TO 50% OFF',
  },
  {
    id: '2',
    title: 'WORLD CUP DOUBLE DHAMAKA',
    subtitle: 'Buy Custom PC & Get Free Jersey + Gaming Monitor Gift',
    tag: 'Components',
    endsIn: '28 JUL 2026 12:00 AM',
    category: 'Components',
    color: 'from-blue-600/20 to-emerald-500/20 border-blue-500/40',
    badge: 'FREE GIFT',
  },
  {
    id: '3',
    title: 'WORLD CUP MEGA DEAL',
    subtitle: 'Free EA FC 26 PC Game Key with ASUS ROG GPUs',
    tag: 'Gaming',
    endsIn: '30 JUL 2026 06:00 PM',
    category: 'Gaming',
    color: 'from-purple-600/20 to-indigo-600/20 border-purple-500/40',
    badge: 'FREE GAME KEY',
  },
  {
    id: '4',
    title: 'ASUS LAPTOP BUY & WIN',
    subtitle: 'Win Official World Cup Jersey with Every ASUS Gaming Laptop',
    tag: 'Laptops',
    endsIn: '31 JUL 2026 09:30 PM',
    category: 'Laptops',
    color: 'from-cyan-600/20 to-blue-600/20 border-cyan-500/40',
    badge: 'BUY & WIN',
  },
  {
    id: '5',
    title: 'TP-LINK 1 GOAL NETWORK',
    subtitle: 'Free T-Shirt & Cap on TP-Link WiFi 6 Router Purchases',
    tag: 'Networking',
    endsIn: '31 JUL 2026 11:59 PM',
    category: 'Networking',
    color: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/40',
    badge: 'FREE GIFTS',
  },
  {
    id: '6',
    title: 'LEXAR BUY & WIN REWARDS',
    subtitle: 'Get Up to ৳ 6,000 Cashback on Lexar NVMe SSDs & RAM',
    tag: 'Components',
    endsIn: '31 JUL 2026 11:59 PM',
    category: 'Components',
    color: 'from-sky-600/20 to-blue-700/20 border-sky-500/40',
    badge: '৳ 6,000 CASHBACK',
  },
  {
    id: '7',
    title: 'LOGITECH G GAME ON',
    subtitle: 'Guaranteed Gift & Voucher with Logitech G Racing Wheels & Mice',
    tag: 'Accessories',
    endsIn: '30 JUL 2026 08:00 PM',
    category: 'Accessories',
    color: 'from-blue-500/20 to-cyan-400/20 border-blue-400/40',
    badge: 'GUARANTEED GIFT',
  },
  {
    id: '8',
    title: 'MSI MONITOR DHAMAKA',
    subtitle: 'Free Steam Wallet Code ($20) with MSI 180Hz Gaming Monitors',
    tag: 'Monitors',
    endsIn: '30 JUL 2026 03:55 PM',
    category: 'Monitors',
    color: 'from-red-600/20 to-rose-700/20 border-red-500/40',
    badge: '$20 STEAM CODE',
  },
  {
    id: '9',
    title: 'ASUS JULY MEGA OFFER',
    subtitle: 'Special Bundle Savings on ASUS Vivobook & TUF Laptops',
    tag: 'Laptops',
    endsIn: '30 JUL 2026 04:12 PM',
    category: 'Laptops',
    color: 'from-indigo-600/20 to-purple-700/20 border-indigo-500/40',
    badge: 'BUNDLE OFFER',
  },
  {
    id: '10',
    title: 'DAHUA ROUTER GIFT OFFER',
    subtitle: 'Free Dahua Branded Mug & T-Shirt with Dahua Routers',
    tag: 'Networking',
    endsIn: '31 JUL 2026 11:19 AM',
    category: 'Networking',
    color: 'from-amber-600/20 to-orange-600/20 border-amber-500/40',
    badge: 'FREE MERCH',
  },
  {
    id: '11',
    title: 'KOORUI DOUBLE DHAMAKA',
    subtitle: 'Free Jersey & HDMI 2.1 Cable with Koorui 27" Curved Monitors',
    tag: 'Monitors',
    endsIn: '30 JUL 2026 10:00 PM',
    category: 'Monitors',
    color: 'from-violet-600/20 to-purple-600/20 border-violet-500/40',
    badge: 'FREE CABLE & JERSEY',
  },
  {
    id: '12',
    title: 'FLASH SALE — SHOP NOW',
    subtitle: 'Hourly Lightning Deals on Top Tech & Computer Components',
    tag: 'Gaming',
    endsIn: 'LIVE NOW',
    category: 'Gaming',
    color: 'from-red-600/30 to-amber-500/30 border-red-500/50',
    badge: '⚡ FLASH SALE',
  },
];

const CATEGORY_TABS = [
  'All Offers',
  'Laptops',
  'Components',
  'Monitors',
  'Networking',
  'Gaming',
  'Accessories',
];

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState('All Offers');

  const filteredOffers =
    activeTab === 'All Offers' ? OFFERS : OFFERS.filter((o) => o.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 pb-20 max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Offers & Mega Deals</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-3 h-3 rounded-full bg-accent animate-ping" />
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Active Deals & Offers
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Exclusive promotional campaigns, bundles, cashbacks, and free gift offers in
              Bangladesh
            </p>
          </div>

          <Link
            href="/category"
            className="px-4 py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs flex items-center gap-2 self-start md:self-auto hover:glow-accent-sm transition-all"
          >
            Browse All Sale Products
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 pb-3 mb-8 overflow-x-auto no-scrollbar border-b border-border">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-display transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-surface border border-border text-muted-foreground hover:text-foreground hover:bg-elevated'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Offers Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <Link
              key={offer.id}
              href="/category"
              className={`group relative bg-gradient-to-br ${offer.color} bg-surface border rounded-3xl p-6 overflow-hidden flex flex-col justify-between min-h-[220px] transition-all hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Top Row: Badge + Countdown Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface/90 border border-border text-accent font-display font-bold text-xs uppercase tracking-wider shadow-sm">
                    {offer.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-white font-bold flex items-center gap-1 border border-white/10">
                    <Icon name="ClockIcon" size={12} className="text-amber-400" />
                    ENDS IN : {offer.endsIn}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-white group-hover:text-accent transition-colors leading-tight mb-2">
                  {offer.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{offer.subtitle}</p>
              </div>

              {/* Bottom Row CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-accent group-hover:underline flex items-center gap-1.5">
                  View Campaign Products
                  <Icon
                    name="ArrowRightIcon"
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-surface/60 text-muted-foreground">
                  {offer.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
