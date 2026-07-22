'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const BRANDS = ['ASUS', 'Lenovo', 'Dell', 'HP', 'Apple', 'MSI', 'Acer', 'Samsung'];
const PRICE_RANGES = [
  { label: 'Under ৳50,000', min: 0, max: 50000 },
  { label: '৳50,000 – ৳1,00,000', min: 50000, max: 100000 },
  { label: '৳1,00,000 – ৳2,00,000', min: 100000, max: 200000 },
  { label: 'Above ৳2,00,000', min: 200000, max: Infinity },
];
const RAM_OPTIONS = ['8GB', '16GB', '32GB', '64GB'];
const STORAGE_OPTIONS = ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'];

interface FilterSection {
  title: string;
  key: string;
  options: string[];
}

const FILTER_SECTIONS: FilterSection[] = [
  { title: 'Brand', key: 'brand', options: BRANDS },
  { title: 'RAM', key: 'ram', options: RAM_OPTIONS },
  { title: 'Storage', key: 'storage', options: STORAGE_OPTIONS },
];

export default function CategoryFilters() {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ brand: true, ram: true });

  const toggle = (key: string, val: string) => {
    setSelected((prev) => {
      const cur = prev[key] || [];
      return { ...prev, [key]: cur.includes(val) ? cur.filter((v) => v !== val) : [...cur, val] };
    });
  };

  const totalActive = Object.values(selected).flat().length + (priceRange !== null ? 1 : 0);

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <h2 className="font-display font-semibold text-foreground">Filters</h2>
        {totalActive > 0 && (
          <button
            onClick={() => { setSelected({}); setPriceRange(null); }}
            className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
          >
            Clear all ({totalActive})
          </button>
        )}
      </div>

      {/* Price */}
      <div className="bg-surface border border-border rounded-2xl p-4">
        <h3 className="font-display font-semibold text-sm text-foreground mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(priceRange === i ? null : i)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                priceRange === i
                  ? 'bg-accent/10 border border-accent/30 text-accent' :'text-muted-foreground hover:text-foreground hover:bg-elevated'
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${priceRange === i ? 'border-accent bg-accent' : 'border-border'}`}>
                {priceRange === i && <Icon name="CheckIcon" size={10} className="text-accent-foreground" />}
              </div>
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Other filter sections */}
      {FILTER_SECTIONS.map((section) => (
        <div key={section.key} className="bg-surface border border-border rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3.5"
            onClick={() => setExpanded((prev) => ({ ...prev, [section.key]: !prev[section.key] }))}
          >
            <span className="font-display font-semibold text-sm text-foreground">{section.title}</span>
            <Icon
              name={expanded[section.key] ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              size={16}
              className="text-muted-foreground"
            />
          </button>
          {expanded[section.key] && (
            <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
              {section.options.map((opt) => {
                const isSelected = (selected[section.key] || []).includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggle(section.key, opt)}
                    className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-left text-sm transition-all ${
                      isSelected ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-accent bg-accent' : 'border-border'}`}>
                      {isSelected && <Icon name="CheckIcon" size={10} className="text-accent-foreground" />}
                    </div>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}