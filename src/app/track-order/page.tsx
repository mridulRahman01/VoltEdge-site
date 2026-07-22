'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Icon from '@/components/ui/AppIcon';

const SAMPLE_ORDERS: Record<string, {
  orderId: string;
  customerName: string;
  items: string;
  total: number;
  courier: string;
  trackingNo: string;
  rider: string;
  riderPhone: string;
  currentStep: number;
  timeline: { title: string; desc: string; time: string; done: boolean }[];
}> = {
  'VE-2026-07842': {
    orderId: 'VE-2026-07842',
    customerName: 'Tanvir Ahmed',
    items: 'ASUS ROG Strix G16 Gaming Laptop',
    total: 185000,
    courier: 'Pathao Courier (Express Parcel)',
    trackingNo: 'PTH-9982410',
    rider: 'Rahat Hossain',
    riderPhone: '+880 1711-223344',
    currentStep: 3,
    timeline: [
      { title: 'Order Confirmed', desc: 'Order received at VoltEdge IDB Hub', time: 'Yesterday, 10:30 AM', done: true },
      { title: 'Quality Inspection & Packed', desc: 'Warranty sealed and serial verified', time: 'Yesterday, 02:15 PM', done: true },
      { title: 'Dispatched to Courier', desc: 'Handed over to Pathao Express Hub', time: 'Today, 09:00 AM', done: true },
      { title: 'Out for Delivery', desc: 'Rider is on the way to your address', time: 'Today, 01:30 PM', done: true },
      { title: 'Delivered', desc: 'Pending OTP verification', time: 'Estimated by 5:00 PM', done: false },
    ],
  },
  'VE-2026-9901': {
    orderId: 'VE-2026-9901',
    customerName: 'Sabbir Hossain',
    items: 'MSI RTX 4070 + Corsair 750W PSU',
    total: 97000,
    courier: 'Steadfast Courier',
    trackingNo: 'STD-55421',
    rider: 'Kawsar Mahmud',
    riderPhone: '+880 1819-887766',
    currentStep: 2,
    timeline: [
      { title: 'Order Confirmed', desc: 'Order received at VoltEdge Multiplan Hub', time: 'Today, 08:00 AM', done: true },
      { title: 'Quality Inspection & Packed', desc: 'Anti-static packing & warranty tag attached', time: 'Today, 11:45 AM', done: true },
      { title: 'Dispatched to Courier', desc: 'Awaiting courier pickup', time: 'Estimated 3:00 PM', done: false },
      { title: 'Out for Delivery', desc: 'Pending', time: 'Tomorrow', done: false },
      { title: 'Delivered', desc: 'Pending', time: 'Tomorrow', done: false },
    ],
  },
};

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<typeof SAMPLE_ORDERS[string] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (queryStr?: string) => {
    const q = (queryStr || query).trim().toUpperCase();
    if (!q) return;
    setSearched(true);
    setOrder(SAMPLE_ORDERS[q] || null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24 pb-20 max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Track Order</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Icon name="TruckIcon" size={22} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">Live Order Tracking</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Track your parcel in real-time across Pathao, Steadfast, and RedX couriers
              </p>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 max-w-3xl mb-8 shadow-md">
          <label className="block font-display font-semibold text-sm text-foreground mb-2">
            Enter Order ID or Mobile Number
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. VE-2026-07842 or VE-2026-9901"
              className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors uppercase font-mono"
            />
            <button
              onClick={() => handleTrack()}
              className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all flex items-center justify-center gap-2"
            >
              <Icon name="SearchIcon" size={16} />
              Track Order
            </button>
          </div>

          {/* Presets */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">Try Sample Orders:</span>
            {Object.keys(SAMPLE_ORDERS).map((id) => (
              <button
                key={id}
                onClick={() => {
                  setQuery(id);
                  handleTrack(id);
                }}
                className="px-2.5 py-1 rounded-lg bg-elevated border border-border text-[11px] text-accent font-mono hover:border-accent/40 transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Order Details */}
        {searched && (
          <div className="max-w-3xl mb-12 animate-fade-up">
            {order ? (
              <div className="bg-surface border border-accent/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <span className="text-xs text-accent font-bold uppercase tracking-wider">Order Status Timeline</span>
                    <h3 className="font-display font-bold text-xl text-foreground mt-0.5">{order.orderId}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{order.items}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-muted-foreground block">Courier Partner</span>
                    <span className="font-display font-bold text-sm text-foreground">{order.courier}</span>
                    <span className="text-xs font-mono text-accent block mt-0.5">Tracking #: {order.trackingNo}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  {order.timeline.map((step, idx) => (
                    <div key={step.title} className="relative flex items-start justify-between gap-4">
                      {/* Step Indicator Circle */}
                      <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 transition-colors ${
                        step.done
                          ? 'bg-accent border-accent shadow-[0_0_10px_var(--accent)]'
                          : 'bg-surface border-border'
                      }`} />

                      <div>
                        <h4 className={`font-display font-bold text-sm ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{step.desc}</p>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{step.time}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Agent Card */}
                {order.rider && (
                  <div className="p-4 bg-elevated border border-border rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                        <Icon name="UserIcon" size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Assigned Delivery Rider</p>
                        <p className="text-sm font-bold text-accent">{order.rider}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${order.riderPhone}`}
                      className="px-3.5 py-2 rounded-xl bg-accent text-accent-foreground font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Icon name="PhoneIcon" size={14} />
                      Call Rider
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-surface border border-danger/30 rounded-2xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto">
                  <Icon name="XCircleIcon" size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">Order Not Found</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  No matching tracking details found for &quot;{query}&quot;. Please verify your Order ID or call support at <strong className="text-accent">16793</strong>.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
