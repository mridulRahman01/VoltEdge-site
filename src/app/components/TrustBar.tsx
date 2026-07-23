import React from 'react';
import Icon from '@/components/ui/AppIcon';

const TRUST_ITEMS = [
  {
    icon: 'ShieldCheckIcon',
    title: 'Official Warranty',
    desc: 'Brand-authorized service centers across Bangladesh',
  },
  {
    icon: 'CreditCardIcon',
    title: '0% EMI Available',
    desc: 'Up to 24 months on all major banks & bKash',
  },
  {
    icon: 'TruckIcon',
    title: 'Nationwide Delivery',
    desc: 'Fast delivery to all 64 districts',
  },
  {
    icon: 'RefreshCwIcon',
    title: '7-Day Return',
    desc: 'No-questions-asked return policy',
  },
];

export default function TrustBar() {
  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border"
            >
              <div className="p-2.5 rounded-xl bg-elevated border border-border shrink-0">
                <Icon name={item.icon as 'ShieldCheckIcon'} size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
