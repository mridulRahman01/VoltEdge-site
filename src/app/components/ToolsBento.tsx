import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ToolsBento() {
  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl text-foreground tracking-tight mb-1">Power Tools</h2>
          <p className="text-sm text-muted-foreground">Build smarter, choose better</p>
        </div>

        {/* Bento grid: [PC Builder col-span-2][Laptop Finder][EMI Calculator] */}
        {/* Row 1: [col-1-2: PCBuilder cs-2] [col-3: LaptopFinder cs-1] */}
        {/* Row 2: [col-1-2: PCBuilder cs-2] [col-3: EMICalc cs-1] */}
        {/* Placed 3/3 cards ✓ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PC Builder — spans 2 rows */}
          <Link
            href="/pc-builder"
            className="md:row-span-2 relative bg-surface border border-border rounded-2xl p-8 overflow-hidden group hover:border-accent/40 hover:shadow-[0_0_24px_var(--accent-dim)] transition-all flex flex-col justify-between min-h-[280px]"
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
              style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
            />

            {/* SVG PC illustration */}
            <div className="relative z-10 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-elevated border border-border flex items-center justify-center group-hover:border-accent/40 transition-colors">
                <Icon name="CpuIcon" size={40} className="text-accent" />
              </div>
            </div>

            <div className="relative z-10">
              <span className="inline-block px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold font-display uppercase tracking-widest mb-3">
                Flagship Tool
              </span>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2 tracking-tight">PC Builder</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Build your dream PC with real-time compatibility checks, wattage calculator, and instant pricing. Save and share your build.
              </p>
              <div className="flex items-center gap-2 text-accent font-semibold text-sm font-display">
                Start Building
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Laptop Finder */}
          <Link
            href="/category"
            className="relative bg-surface border border-border rounded-2xl p-6 overflow-hidden group hover:border-accent/40 hover:shadow-[0_0_24px_var(--accent-dim)] transition-all flex items-center gap-5 min-h-[130px]"
          >
            <div className="w-14 h-14 rounded-xl bg-elevated border border-border flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
              <Icon name="LaptopIcon" size={28} className="text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">Laptop Finder</h3>
              <p className="text-sm text-muted-foreground">Answer 5 questions, get your perfect match</p>
            </div>
            <Icon name="ChevronRightIcon" size={20} className="ml-auto text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
          </Link>

          {/* EMI Calculator */}
          <div className="relative bg-surface border border-border rounded-2xl p-6 overflow-hidden group hover:border-accent/40 hover:shadow-[0_0_24px_var(--accent-dim)] transition-all flex items-center gap-5 min-h-[130px] cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-elevated border border-border flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
              <Icon name="CalculatorIcon" size={28} className="text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">EMI Calculator</h3>
              <p className="text-sm text-muted-foreground">0% EMI · 3 to 24 months · All banks</p>
            </div>
            <Icon name="ChevronRightIcon" size={20} className="ml-auto text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}