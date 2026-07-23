'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import Icon from '@/components/ui/AppIcon';

const SAMPLE_SERIALS: Record<
  string,
  {
    product: string;
    serial: string;
    distributor: string;
    purchaseDate: string;
    expiryDate: string;
    status: 'Active' | 'Expired';
    warrantyMonths: number;
    remainingDays: number;
  }
> = {
  'SN-ASUS-98741': {
    product: 'ASUS ROG Strix G16 Gaming Laptop',
    serial: 'SN-ASUS-98741',
    distributor: 'Global Brand Pvt. Ltd (Official ASUS BD Distributor)',
    purchaseDate: '15 Jan 2025',
    expiryDate: '15 Jan 2027',
    status: 'Active',
    warrantyMonths: 24,
    remainingDays: 540,
  },
  'SN-MSI-4070-99': {
    product: 'MSI GeForce RTX 4070 Gaming X Trio 12G',
    serial: 'SN-MSI-4070-99',
    distributor: 'UCC Bangladesh (Official MSI Component Partner)',
    purchaseDate: '10 Aug 2024',
    expiryDate: '10 Aug 2027',
    status: 'Active',
    warrantyMonths: 36,
    remainingDays: 748,
  },
  'SN-CORSAIR-750': {
    product: 'Corsair RM750e 750W 80 Gold PSU',
    serial: 'SN-CORSAIR-750',
    distributor: 'Computer Source BD',
    purchaseDate: '01 Mar 2022',
    expiryDate: '01 Mar 2025',
    status: 'Expired',
    warrantyMonths: 36,
    remainingDays: 0,
  },
};

const SERVICE_CENTERS = [
  {
    city: 'Dhaka - IDB Bhaban',
    address: 'Shop #402, 4th Floor, IDB Bhaban, Agargaon',
    phone: '+880 1700-112233',
    hours: '10 AM - 8 PM (Sat-Thu)',
  },
  {
    city: 'Dhaka - Multiplan',
    address: 'Level 6, Multiplan Center, Elephant Road',
    phone: '+880 1700-445566',
    hours: '10 AM - 8 PM (Sat-Thu)',
  },
  {
    city: 'Chittagong',
    address: 'Agrabad Commercial Area, Hotel Agrabad Bldg',
    phone: '+880 1800-778899',
    hours: '10 AM - 8 PM (Sat-Thu)',
  },
  {
    city: 'Sylhet',
    address: 'Zindabazar Commercial Complex, 3rd Floor',
    phone: '+880 1900-334455',
    hours: '10 AM - 8 PM (Sat-Thu)',
  },
];

export default function WarrantyCheckPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<(typeof SAMPLE_SERIALS)[string] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleCheck = (queryStr?: string) => {
    const query = (queryStr || searchQuery).trim().toUpperCase();
    if (!query) return;
    setSearched(true);
    const found = SAMPLE_SERIALS[query] || null;
    setResult(found);
  };

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
          <span className="text-foreground font-medium">Warranty & Serial Verifier</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Icon name="ShieldCheckIcon" size={22} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Official Warranty Verifier
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Verify genuine product authenticity and check active warranty status across
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 max-w-3xl mb-8 shadow-md">
          <label className="block font-display font-semibold text-sm text-foreground mb-2">
            Enter Product Serial Number or Invoice ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. SN-ASUS-98741 or SN-MSI-4070-99"
                className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors uppercase font-mono"
              />
            </div>
            <button
              onClick={() => handleCheck()}
              className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all flex items-center justify-center gap-2"
            >
              <Icon name="SearchIcon" size={16} />
              Verify Warranty
            </button>
          </div>

          {/* Presets */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">Try Sample Serials:</span>
            {Object.keys(SAMPLE_SERIALS).map((sn) => (
              <button
                key={sn}
                onClick={() => {
                  setSearchQuery(sn);
                  handleCheck(sn);
                }}
                className="px-2.5 py-1 rounded-lg bg-elevated border border-border text-[11px] text-accent font-mono hover:border-accent/40 transition-colors"
              >
                {sn}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {searched && (
          <div className="max-w-3xl mb-12 animate-fade-up">
            {result ? (
              <div className="bg-surface border border-accent/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold inline-flex items-center gap-1.5 mb-2">
                      <Icon name="CheckCircleIcon" size={14} />
                      100% Genuine BD Authorized Product
                    </span>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      {result.product}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      Serial: {result.serial}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-xl font-display font-bold text-xs self-start sm:self-auto ${
                      result.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-danger/20 text-danger border border-danger/40'
                    }`}
                  >
                    Warranty {result.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-elevated rounded-xl border border-border">
                    <span className="text-muted-foreground block mb-1">Purchase Date</span>
                    <span className="font-bold text-foreground">{result.purchaseDate}</span>
                  </div>
                  <div className="p-3 bg-elevated rounded-xl border border-border">
                    <span className="text-muted-foreground block mb-1">Expiration Date</span>
                    <span className="font-bold text-foreground">{result.expiryDate}</span>
                  </div>
                  <div className="p-3 bg-elevated rounded-xl border border-border">
                    <span className="text-muted-foreground block mb-1">Coverage Duration</span>
                    <span className="font-bold text-foreground">
                      {result.warrantyMonths} Months
                    </span>
                  </div>
                  <div className="p-3 bg-elevated rounded-xl border border-border">
                    <span className="text-muted-foreground block mb-1">Remaining Time</span>
                    <span className="font-bold text-accent">{result.remainingDays} Days Left</span>
                  </div>
                </div>

                <div className="p-4 bg-elevated/60 rounded-xl border border-border text-xs space-y-1">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <Icon name="BuildingIcon" size={14} className="text-accent" />
                    Authorized Distributor:
                  </p>
                  <p className="text-muted-foreground">{result.distributor}</p>
                </div>
              </div>
            ) : (
              <div className="bg-surface border border-danger/30 rounded-2xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto">
                  <Icon name="XCircleIcon" size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Serial Number Not Found
                </h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  No matching record found for &quot;{searchQuery}&quot;. Please double check your
                  invoice or contact VoltEdge support hotline at{' '}
                  <strong className="text-accent">16793</strong> for assistance.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Service Centers */}
        <div>
          <h2 className="font-display font-bold text-xl text-foreground mb-4">
            Authorized Service Centers in Bangladesh
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_CENTERS.map((sc) => (
              <div
                key={sc.city}
                className="p-4 bg-surface border border-border rounded-xl space-y-2 text-xs"
              >
                <h4 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Icon name="MapPinIcon" size={14} className="text-accent" />
                  {sc.city}
                </h4>
                <p className="text-muted-foreground leading-relaxed">{sc.address}</p>
                <p className="text-accent font-semibold">{sc.phone}</p>
                <p className="text-[11px] text-muted-foreground">{sc.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
