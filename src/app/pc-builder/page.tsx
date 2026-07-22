'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import PCBuilderClient from '@/app/pc-builder/components/PCBuilderClient';
import LumiChatBot from '@/components/LumiChatBot';
import { PCBuilderSkeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function PCBuilderPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 sm:pt-16 pb-24">
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 py-4 sm:py-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Icon name="HomeIcon" size={14} />
                Home
              </Link>
              <Icon name="ChevronRightIcon" size={14} />
              <span className="text-foreground font-medium">PC Builder</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">PC Builder</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Build your dream PC with real-time compatibility checks & Lumi AI Guide</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="pulse-dot" />
                <span className="text-accent text-xs font-semibold font-display">Live Compatibility</span>
              </div>
            </div>
          </div>
        </div>
        {loading ? <PCBuilderSkeleton /> : <PCBuilderClient />}
      </main>
      <LumiChatBot />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}