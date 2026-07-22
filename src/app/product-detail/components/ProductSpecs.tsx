import React from 'react';

const SPECS = [
  { group: 'Processor', rows: [
    ['Model', 'Intel Core i9-14900HX'],
    ['Cores / Threads', '24 Cores / 32 Threads'],
    ['Base / Boost Clock', '2.2GHz / 5.8GHz'],
    ['Cache', '36MB Intel Smart Cache'],
  ]},
  { group: 'Display', rows: [
    ['Size', '16" QHD (2560×1600)'],
    ['Refresh Rate', '240Hz'],
    ['Panel Type', 'IPS-level, 3ms Response'],
    ['Color Gamut', '100% DCI-P3'],
  ]},
  { group: 'Graphics', rows: [
    ['GPU', 'NVIDIA GeForce RTX 4070 Laptop'],
    ['VRAM', '8GB GDDR6'],
    ['TGP', '140W'],
  ]},
  { group: 'Memory & Storage', rows: [
    ['RAM', '16GB DDR5-4800 (2× SODIMM)'],
    ['Storage', '1TB NVMe PCIe Gen4 SSD'],
    ['Expandable', 'Up to 64GB RAM, 2× M.2 slots'],
  ]},
  { group: 'Connectivity', rows: [
    ['Wi-Fi', 'Wi-Fi 6E (802.11ax)'],
    ['Bluetooth', '5.3'],
    ['USB', '1× USB4 Type-C, 3× USB-A 3.2, 1× USB-C 3.2'],
    ['Ports', 'HDMI 2.1, 2× Thunderbolt 4, 3.5mm combo'],
  ]},
  { group: 'Battery', rows: [
    ['Capacity', '90Wh'],
    ['Adapter', '240W GaN'],
    ['Life', 'Up to 8 hours (web browsing)'],
  ]},
];

export default function ProductSpecs() {
  return (
    <div className="mb-16">
      <h2 className="font-display font-bold text-xl text-foreground mb-6 tracking-tight">Full Specifications</h2>
      <div className="space-y-4">
        {SPECS?.map((group) => (
          <div key={group?.group} className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 bg-elevated border-b border-border">
              <h3 className="font-display font-semibold text-sm text-foreground">{group?.group}</h3>
            </div>
            <div className="divide-y divide-border">
              {group?.rows?.map(([label, value]) => (
                <div key={label} className="flex items-start px-5 py-3 gap-4">
                  <span className="text-sm text-muted-foreground w-40 shrink-0">{label}</span>
                  <span className="text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}