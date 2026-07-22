'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Icon from '@/components/ui/AppIcon';
import { formatPrice } from '@/lib/mockData';

const BANKS = [
  { name: 'BRAC Bank', card: 'Credit Card', maxMonths: 36, zeroEmi: true, fee: '0%' },
  { name: 'City Bank (AMEX)', card: 'Amex & Visa/Mastercard', maxMonths: 36, zeroEmi: true, fee: '0%' },
  { name: 'Eastern Bank (EBL)', card: 'Visa / Mastercard', maxMonths: 24, zeroEmi: true, fee: '0%' },
  { name: 'Dutch-Bangla Bank (DBBL)', card: 'Nexus & Credit Card', maxMonths: 24, zeroEmi: true, fee: '0%' },
  { name: 'Standard Chartered', card: 'Visa / Mastercard', maxMonths: 36, zeroEmi: true, fee: '0%' },
  { name: 'Mutual Trust Bank (MTB)', card: 'Credit Card', maxMonths: 24, zeroEmi: true, fee: '0%' },
  { name: 'Prime Bank', card: 'Credit Card', maxMonths: 24, zeroEmi: true, fee: '0%' },
  { name: 'United Commercial Bank (UCB)', card: 'Credit Card', maxMonths: 24, zeroEmi: true, fee: '0%' },
  { name: 'Dhaka Bank', card: 'Credit Card', maxMonths: 18, zeroEmi: true, fee: '0%' },
  { name: 'HSBC Bangladesh', card: 'Visa / Mastercard', maxMonths: 24, zeroEmi: true, fee: '0%' },
  { name: 'Southeast Bank', card: 'Credit Card', maxMonths: 12, zeroEmi: true, fee: '0%' },
  { name: 'City Bank (Visa/Master)', card: 'Credit Card', maxMonths: 24, zeroEmi: true, fee: '0%' },
];

const TENURES = [3, 6, 9, 12, 18, 24, 36];

const PRESETS = [
  { label: 'Gaming Laptop', amount: 185000 },
  { label: 'Graphics Card (RTX 4070)', amount: 75000 },
  { label: 'Budget Gaming PC', amount: 55000 },
  { label: '4K Monitor', amount: 38000 },
];

export default function EmiCalculatorPage() {
  const [amount, setAmount] = useState<number>(120000);
  const [tenure, setTenure] = useState<number>(12);
  const [selectedBank, setSelectedBank] = useState<string>('BRAC Bank');
  const [isZeroInterest, setIsZeroInterest] = useState<boolean>(true);
  const [interestRate, setInterestRate] = useState<number>(9);

  const bankObj = BANKS.find((b) => b.name === selectedBank) || BANKS[0];

  // Calculations
  const totalInterestRate = isZeroInterest ? 0 : (interestRate / 100) * (tenure / 12);
  const totalInterest = Math.round(amount * totalInterestRate);
  const totalPayable = amount + totalInterest;
  const monthlyEmi = Math.ceil(totalPayable / tenure);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 pb-20 max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">0% EMI Calculator</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Icon name="CalculatorIcon" size={22} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">0% EMI Calculator</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Calculate monthly installment plans across 30+ leading Bangladeshi banks
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setAmount(preset.amount)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  amount === preset.amount
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-surface border border-border text-foreground hover:bg-elevated'
                }`}
              >
                {preset.label} ({formatPrice(preset.amount)})
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Controls */}
          <div className="space-y-6 bg-surface border border-border rounded-2xl p-6 shadow-sm">
            {/* Purchase Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-display font-semibold text-sm text-foreground">Purchase Amount (BDT)</label>
                <div className="flex items-center gap-1 bg-elevated border border-border rounded-xl px-3 py-1.5">
                  <span className="text-xs text-muted-foreground font-bold">৳</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                    className="w-28 bg-transparent text-sm font-bold text-accent outline-none tabular-nums"
                  />
                </div>
              </div>
              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>৳ 10,000</span>
                <span>৳ 250,000</span>
                <span>৳ 500,000</span>
              </div>
            </div>

            {/* Tenure Selector */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground block mb-3">
                Select EMI Tenure (Months)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {TENURES.map((m) => {
                  const isAvailable = m <= bankObj.maxMonths;
                  return (
                    <button
                      key={m}
                      disabled={!isAvailable}
                      onClick={() => setTenure(m)}
                      className={`py-3 rounded-xl text-xs font-semibold font-display transition-all ${
                        tenure === m
                          ? 'bg-accent text-accent-foreground shadow-md'
                          : isAvailable
                          ? 'bg-elevated border border-border text-foreground hover:border-accent/40'
                          : 'bg-muted/30 text-muted-foreground border border-border/40 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {m} Months
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scheme Type Toggle */}
            <div className="p-4 bg-elevated/50 border border-border rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-semibold text-sm text-foreground">0% Interest Scheme</h4>
                  <p className="text-xs text-muted-foreground">Standard zero interest EMI on selected credit cards</p>
                </div>
                <button
                  onClick={() => setIsZeroInterest(!isZeroInterest)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    isZeroInterest ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isZeroInterest ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {!isZeroInterest && (
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Bank Interest Rate (% p.a.):</span>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-16 bg-surface border border-border rounded-lg px-2 py-1 text-xs text-foreground font-bold outline-none text-center"
                  />
                </div>
              )}
            </div>

            {/* Select Bank */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground block mb-3">
                Select Your Bank (Bangladesh)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BANKS.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBank(b.name);
                      if (tenure > b.maxMonths) setTenure(b.maxMonths);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedBank === b.name
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-card hover:bg-elevated'
                    }`}
                  >
                    <span className="font-display font-bold text-xs text-foreground">{b.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-1">Up to {b.maxMonths} Mo</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-surface border border-accent/40 rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

              <div className="border-b border-border pb-4">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Monthly Installment</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-accent tabular-nums">
                    {formatPrice(monthlyEmi)}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">/ month</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">Product Amount:</span>
                  <span className="font-semibold text-foreground tabular-nums">{formatPrice(amount)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">Selected Tenure:</span>
                  <span className="font-semibold text-foreground">{tenure} Months</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">Selected Bank:</span>
                  <span className="font-semibold text-foreground">{selectedBank}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">Interest Charge:</span>
                  <span className={`font-semibold ${isZeroInterest ? 'text-emerald-400' : 'text-foreground'}`}>
                    {isZeroInterest ? '0% (Zero Interest)' : formatPrice(totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-sm font-bold pt-2">
                  <span className="text-foreground">Total Payable Amount:</span>
                  <span className="text-accent tabular-nums">{formatPrice(totalPayable)}</span>
                </div>
              </div>

              <Link
                href="/category"
                className="w-full py-3.5 rounded-xl font-display font-semibold text-sm bg-accent text-accent-foreground hover:glow-accent-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Icon name="ShoppingCartIcon" size={18} />
                Browse Eligible Products
              </Link>
            </div>

            {/* Terms Info */}
            <div className="bg-elevated/40 border border-border rounded-xl p-4 text-xs text-muted-foreground space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                <Icon name="InfoIcon" size={14} className="text-accent" />
                EMI Guidelines in Bangladesh:
              </h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>0% Interest EMI is applicable on credit cards of participating banks.</li>
                <li>Minimum order amount of ৳ 10,000 is required for EMI facility.</li>
                <li>Standard bank processing fees may be charged by specific issuing banks.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
