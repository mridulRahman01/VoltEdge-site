'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Icon from '@/components/ui/AppIcon';
import { formatPrice } from '@/lib/mockData';

const CATEGORIES = [
  { id: 'laptop', name: 'Laptop / MacBook', icon: 'LaptopIcon', baseVal: 45000 },
  { id: 'gpu', name: 'Graphics Card (GPU)', icon: 'MonitorIcon', baseVal: 22000 },
  { id: 'cpu', name: 'Processor (CPU)', icon: 'CpuIcon', baseVal: 12000 },
  { id: 'phone', name: 'Smartphone / Tablet', icon: 'SmartphoneIcon', baseVal: 28000 },
];

const CONDITIONS = [
  { id: 'excellent', label: 'Like New (95%+)', mult: 1.0, desc: 'Flawless condition, original box, zero scratches' },
  { id: 'good', label: 'Good (80%+)', mult: 0.82, desc: 'Minor cosmetic marks, 100% functional' },
  { id: 'fair', label: 'Fair (60%+)', mult: 0.65, desc: 'Visible wear/dents, works properly' },
];

export default function TradeInPage() {
  const [category, setCategory] = useState('laptop');
  const [condition, setCondition] = useState('excellent');
  const [ageMonths, setAgeMonths] = useState(12);
  const [brand, setBrand] = useState('ASUS');
  const [claimedVoucher, setClaimedVoucher] = useState(false);

  const catObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
  const condObj = CONDITIONS.find((c) => c.id === condition) || CONDITIONS[0];

  // Valuation formula
  const ageDepreciation = Math.max(0.4, 1 - (ageMonths / 48) * 0.5);
  const estimatedValue = Math.round(catObj.baseVal * condObj.mult * ageDepreciation);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 pb-20 max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Tech Trade-In & Exchange</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Icon name="RefreshCwIcon" size={22} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">Old Tech Trade-In & Exchange</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Exchange your old laptop, GPU, or smartphone for instant store credit towards a new purchase
              </p>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Left Form */}
          <div className="space-y-6 bg-surface border border-border rounded-2xl p-6 shadow-sm">
            {/* Step 1: Select Category */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground block mb-3">
                1. Select Item Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                      category === cat.id
                        ? 'border-accent bg-accent/10 text-accent font-semibold shadow-sm'
                        : 'border-border bg-card text-foreground hover:bg-elevated'
                    }`}
                  >
                    <Icon name={cat.icon as 'LaptopIcon'} size={24} />
                    <span className="text-xs font-display">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Brand & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-display font-semibold text-sm text-foreground block mb-2">Brand / Manufacturer</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. ASUS, Lenovo, MSI, Gigabyte"
                  className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-display font-semibold text-sm text-foreground block mb-2">Device Age ({ageMonths} Months)</label>
                <input
                  type="range"
                  min={3}
                  max={48}
                  step={3}
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer mt-3"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>3 Months</span>
                  <span>2 Years</span>
                  <span>4+ Years</span>
                </div>
              </div>
            </div>

            {/* Step 3: Condition */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground block mb-3">
                3. Select Item Condition
              </label>
              <div className="space-y-2">
                {CONDITIONS.map((cond) => (
                  <label
                    key={cond.id}
                    onClick={() => setCondition(cond.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      condition === cond.id
                        ? 'border-accent/50 bg-accent/5'
                        : 'border-border bg-card hover:bg-elevated'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="condition"
                        checked={condition === cond.id}
                        onChange={() => setCondition(cond.id)}
                        className="accent-accent w-4 h-4"
                      />
                      <div>
                        <p className="font-display font-semibold text-sm text-foreground">{cond.label}</p>
                        <p className="text-xs text-muted-foreground">{cond.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="bg-surface border border-accent/40 rounded-2xl p-6 shadow-xl space-y-6 lg:sticky lg:top-24">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Estimated Trade-In Credit</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-accent tabular-nums">
                  {formatPrice(estimatedValue)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Instant discount voucher towards your next VoltEdge order</p>
            </div>

            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Selected Item:</span>
                <span className="font-semibold text-foreground">{catObj.name} ({brand})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Estimated Age:</span>
                <span className="font-semibold text-foreground">{ageMonths} Months</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Condition Tier:</span>
                <span className="font-semibold text-foreground">{condObj.label}</span>
              </div>
            </div>

            {claimedVoucher ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
                <span className="text-xs text-emerald-400 font-bold block">✓ Voucher Code Claimed!</span>
                <code className="text-sm font-mono font-bold text-accent px-3 py-1 bg-surface border border-border rounded-lg inline-block">
                  TRADEIN-{estimatedValue}
                </code>
                <p className="text-[10px] text-muted-foreground">Use this code at checkout to apply your trade-in credit.</p>
              </div>
            ) : (
              <button
                onClick={() => setClaimedVoucher(true)}
                className="w-full py-3.5 rounded-xl font-display font-semibold text-sm bg-accent text-accent-foreground hover:glow-accent-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Icon name="TagIcon" size={18} />
                Claim Trade-In Voucher
              </button>
            )}

            <div className="p-4 bg-elevated/40 border border-border rounded-xl text-[11px] text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">How Trade-In Works:</p>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>Claim your voucher code above.</li>
                <li>Place your new order online or bring your old device to any of our 12 stores in BD.</li>
                <li>Our tech team inspects the device and deducts the credit instantly!</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
