import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-[1400px] mx-auto px-4 py-16">
        {/* Newsletter */}
        <div className="mb-12 p-8 rounded-2xl bg-elevated border border-border relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,229,160,0.05) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">
                Stay ahead of the curve
              </h3>
              <p className="text-sm text-muted-foreground">
                Get exclusive deals, new arrivals, and tech news delivered weekly.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
              />
              <button className="px-5 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={36} />
              <span className="font-display font-bold text-xl tracking-tight text-foreground">
                VoltEdge
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              Bangladesh&apos;s premium dark-theme tech retailer. Laptops, PCs, phones, and gadgets
              — built for enthusiasts.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-5">
              <div className="flex items-center gap-2">
                <Icon name="MapPinIcon" size={14} className="text-accent shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="PhoneIcon" size={14} className="text-accent shrink-0" />
                <span>+880 1700-VOLTEDGE</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MailIcon" size={14} className="text-accent shrink-0" />
                <span>support@voltedge.com.bd</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {['FacebookIcon', 'TwitterIcon', 'InstagramIcon', 'YoutubeIcon']?.map((icon) => (
                <button
                  key={icon}
                  className="p-2 rounded-lg bg-elevated border border-border text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
                  aria-label={icon?.replace('Icon', '')}
                >
                  <Icon name={icon} size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Shop
            </p>
            <ul className="space-y-2.5">
              {[
                'Laptops',
                'Desktop PCs',
                'Graphics Cards',
                'Monitors',
                'Smartphones',
                'Gadgets',
                'Networking',
                'Accessories',
              ]?.map((item) => (
                <li key={item}>
                  <Link
                    href="/category"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Tools & Services
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'PC Builder', href: '/pc-builder' },
                { label: '0% EMI Calculator', href: '/emi-calculator' },
                { label: 'Tech Trade-In', href: '/trade-in' },
                { label: 'Track Order', href: '/track-order' },
                { label: 'Warranty Check', href: '/warranty-check' },
              ]?.map((item) => (
                <li key={item?.label}>
                  <Link
                    href={item?.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Support
            </p>
            <ul className="space-y-2.5">
              {[
                'Return Policy',
                'Warranty Info',
                'Contact Us',
                'Privacy Policy',
                'Terms of Service',
                'FAQ',
              ]?.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-elevated border border-border">
              <p className="text-xs font-semibold text-foreground mb-2">Business Hours</p>
              <p className="text-xs text-muted-foreground">Sat–Thu: 10AM – 8PM</p>
              <p className="text-xs text-muted-foreground">Friday: 2PM – 8PM</p>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="py-6 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Accepted Payments
          </p>
          <div className="flex flex-wrap gap-3">
            {['Visa', 'Mastercard', 'bKash', 'Nagad', 'Rocket', 'DBBL', 'Dutch-Bangla', 'COD']?.map(
              (method) => (
                <span
                  key={method}
                  className="px-3 py-1.5 rounded-lg bg-elevated border border-border text-xs font-medium text-muted-foreground"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-muted-foreground">
            © 2026 VoltEdge. All rights reserved. Made in Bangladesh 🇧🇩
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
