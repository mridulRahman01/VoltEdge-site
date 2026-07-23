'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { PC_BUILDER_COMPONENTS, formatPrice } from '@/lib/mockData';

type SlotKey =
  | 'cpu'
  | 'motherboard'
  | 'ram'
  | 'storage'
  | 'gpu'
  | 'psu'
  | 'cooler'
  | 'case'
  | 'monitor'
  | 'fan'
  | 'ups'
  | 'software'
  | 'mouse'
  | 'keyboard'
  | 'headphone';

interface SelectedComponent {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  specs: Record<string, string | number>;
  brand: string;
}

type BuildState = Partial<Record<SlotKey, SelectedComponent>>;

interface SlotDef {
  key: SlotKey;
  label: string;
  icon: string;
  required: boolean;
}

const SECTIONED_SLOTS: { title: string; slots: SlotDef[] }[] = [
  {
    title: 'Core Components',
    slots: [
      { key: 'cpu', label: 'Processor', icon: 'CpuIcon', required: true },
      { key: 'motherboard', label: 'Motherboard', icon: 'CircuitBoardIcon', required: true },
      { key: 'ram', label: 'RAM', icon: 'MemoryStickIcon', required: true },
      { key: 'storage', label: 'Storage', icon: 'HardDriveIcon', required: true },
      { key: 'gpu', label: 'Graphics Card', icon: 'MonitorIcon', required: false },
      { key: 'psu', label: 'Power Supply', icon: 'ZapIcon', required: true },
      { key: 'cooler', label: 'CPU Cooler', icon: 'WindIcon', required: false },
      { key: 'case', label: 'Casing', icon: 'BoxIcon', required: true },
    ],
  },
  {
    title: 'Peripherals & Others',
    slots: [
      { key: 'monitor', label: 'Monitor', icon: 'MonitorIcon', required: false },
      { key: 'fan', label: 'Case Fan', icon: 'WindIcon', required: false },
      { key: 'ups', label: 'UPS', icon: 'ZapIcon', required: false },
      { key: 'software', label: 'Software', icon: 'ShieldCheckIcon', required: false },
    ],
  },
  {
    title: 'Accessories',
    slots: [
      { key: 'mouse', label: 'Mouse', icon: 'MouseIcon', required: false },
      { key: 'keyboard', label: 'Keyboard', icon: 'KeyboardIcon', required: false },
      { key: 'headphone', label: 'Headphone', icon: 'HeadphonesIcon', required: false },
    ],
  },
];

// Fallback items for extra slots
const MOCK_EXTRA_ITEMS: Record<string, SelectedComponent[]> = {
  monitor: [
    {
      id: 'mon-1',
      name: 'ASUS TUF Gaming VG279Q3A 27" 180Hz Monitor',
      price: 28500,
      image: '/assets/images/no_image.png',
      alt: 'Monitor',
      specs: { refreshRate: '180Hz', panel: 'Fast IPS' },
      brand: 'ASUS',
    },
    {
      id: 'mon-2',
      name: 'MSI G244F E2 23.8" 180Hz IPS Monitor',
      price: 19500,
      image: '/assets/images/no_image.png',
      alt: 'Monitor',
      specs: { refreshRate: '180Hz', panel: 'IPS' },
      brand: 'MSI',
    },
  ],
  fan: [
    {
      id: 'fan-1',
      name: 'Corsair LL120 RGB 120mm Dual Light Loop Fan',
      price: 3200,
      image: '/assets/images/no_image.png',
      alt: 'Fan',
      specs: { size: '120mm', rgb: 'ARGB' },
      brand: 'Corsair',
    },
  ],
  ups: [
    {
      id: 'ups-1',
      name: 'Apollo 1200VA Offline UPS with Surge Protection',
      price: 6800,
      image: '/assets/images/no_image.png',
      alt: 'UPS',
      specs: { capacity: '1200VA', backup: '15-20 Min' },
      brand: 'Apollo',
    },
  ],
  software: [
    {
      id: 'soft-1',
      name: 'Microsoft Windows 11 Home 64-Bit OEM',
      price: 14500,
      image: '/assets/images/no_image.png',
      alt: 'Windows 11',
      specs: { type: 'OS License' },
      brand: 'Microsoft',
    },
  ],
  mouse: [
    {
      id: 'mouse-1',
      name: 'Logitech G Pro X Superlight Wireless Gaming Mouse',
      price: 14200,
      image: '/assets/images/no_image.png',
      alt: 'Mouse',
      specs: { sensor: 'HERO 25K', weight: '63g' },
      brand: 'Logitech',
    },
    {
      id: 'mouse-2',
      name: 'Razer DeathAdder V3 Ergonomic Esports Mouse',
      price: 8500,
      image: '/assets/images/no_image.png',
      alt: 'Mouse',
      specs: { sensor: 'Focus Pro', weight: '59g' },
      brand: 'Razer',
    },
  ],
  keyboard: [
    {
      id: 'kb-1',
      name: 'Corsair K70 RGB PRO Mechanical Gaming Keyboard',
      price: 16500,
      image: '/assets/images/no_image.png',
      alt: 'Keyboard',
      specs: { switch: 'Cherry MX Red' },
      brand: 'Corsair',
    },
  ],
  headphone: [
    {
      id: 'hp-1',
      name: 'HyperX Cloud II Wireless Gaming Headset',
      price: 15500,
      image: '/assets/images/no_image.png',
      alt: 'Headset',
      specs: { surround: '7.1 Virtual', battery: '30 Hrs' },
      brand: 'HyperX',
    },
  ],
};

function getCompatibility(build: BuildState): { compatible: boolean; issues: string[] } {
  const issues: string[] = [];
  const { cpu, motherboard, ram, gpu, case: pcCase } = build;

  if (cpu && motherboard) {
    if ((cpu.specs.socket as string) !== (motherboard.specs.socket as string)) {
      issues.push(
        `CPU socket (${cpu.specs.socket}) ≠ Motherboard socket (${motherboard.specs.socket})`
      );
    }
  }
  if (cpu && ram) {
    if ((cpu.specs.ramType as string) !== (ram.specs.ramType as string)) {
      issues.push(`CPU supports ${cpu.specs.ramType} but RAM is ${ram.specs.ramType}`);
    }
  }
  if (motherboard && ram) {
    if ((motherboard.specs.ramType as string) !== (ram.specs.ramType as string)) {
      issues.push(
        `Motherboard supports ${motherboard.specs.ramType} but RAM is ${ram.specs.ramType}`
      );
    }
  }
  if (gpu && pcCase) {
    const gpuLen = gpu.specs.length as number;
    const maxLen = pcCase.specs.maxGpuLength as number;
    if (gpuLen > maxLen) {
      issues.push(`GPU length (${gpuLen}mm) exceeds case clearance (${maxLen}mm)`);
    }
  }

  return { compatible: issues.length === 0, issues };
}

function getTotalTdp(build: BuildState): number {
  const cpuTdp = (build.cpu?.specs?.tdp as number) || 0;
  const gpuTdp = (build.gpu?.specs?.tdp as number) || 0;
  return cpuTdp + gpuTdp + 80;
}

function getPsuWattage(build: BuildState): number {
  return (build.psu?.specs?.wattage as number) || 0;
}

export default function PCBuilderClient() {
  const [build, setBuild] = useState<BuildState>({});
  const [activeModal, setActiveModal] = useState<SlotKey | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);
  const [hideUnconfigured, setHideUnconfigured] = useState(false);

  const totalPrice = Object.values(build).reduce((sum, c) => sum + (c?.price || 0), 0);
  const totalTdp = getTotalTdp(build);
  const psuWattage = getPsuWattage(build);
  const wattagePercent =
    psuWattage > 0 ? Math.min(100, Math.round((totalTdp / psuWattage) * 100)) : 0;
  const wattageStatus = wattagePercent > 90 ? 'danger' : wattagePercent > 75 ? 'warning' : 'ok';
  const { compatible, issues } = getCompatibility(build);
  const filledCount = Object.keys(build).length;

  const handleSelect = (slot: SlotKey, component: SelectedComponent) => {
    setBuild((prev) => ({ ...prev, [slot]: component }));
    setActiveModal(null);
  };

  const handleRemove = (slot: SlotKey) => {
    setBuild((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  };

  const handleAllClear = () => {
    if (confirm('Are you sure you want to clear all selected components?')) {
      setBuild({});
    }
  };

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const getSlotComponents = (slot: SlotKey): SelectedComponent[] => {
    const map: Record<string, SelectedComponent[]> = {
      cpu: PC_BUILDER_COMPONENTS.cpu as SelectedComponent[],
      motherboard: PC_BUILDER_COMPONENTS.motherboard as SelectedComponent[],
      ram: PC_BUILDER_COMPONENTS.ram as SelectedComponent[],
      gpu: PC_BUILDER_COMPONENTS.gpu as SelectedComponent[],
      storage: PC_BUILDER_COMPONENTS.storage as SelectedComponent[],
      psu: PC_BUILDER_COMPONENTS.psu as SelectedComponent[],
      case: PC_BUILDER_COMPONENTS.case as SelectedComponent[],
      cooler: PC_BUILDER_COMPONENTS.cooler as SelectedComponent[],
    };
    return map[slot] || MOCK_EXTRA_ITEMS[slot] || [];
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Top Header Bar inside Builder Container (TECHLAND style) */}
      <div className="bg-surface border border-border rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground">
            PC Builder - Build Your Own PC
          </h1>
          <label className="inline-flex items-center gap-2 text-xs text-muted-foreground mt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={hideUnconfigured}
              onChange={(e) => setHideUnconfigured(e.target.checked)}
              className="accent-accent w-3.5 h-3.5 rounded"
            />
            Hide Unconfigured Components
          </label>
        </div>

        {/* Quick Action Buttons (Add to Cart, Save, PDF, All Clear) + Total Box */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => alert('Build added to cart!')}
              disabled={filledCount === 0}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-xs flex items-center gap-1.5 hover:glow-accent-sm transition-all disabled:opacity-40 min-h-[38px]"
              title="Add to Cart"
            >
              <Icon name="ShoppingCartIcon" size={14} />
              <span className="text-[11px] sm:text-xs">Add to Cart</span>
            </button>
            <button
              onClick={handleSave}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-xs flex items-center gap-1.5 hover:border-accent/40 transition-all min-h-[38px]"
              title="Save Build"
            >
              <Icon name="SaveIcon" size={14} className={savedMsg ? 'text-accent' : ''} />
              <span className="text-[11px] sm:text-xs">{savedMsg ? 'Saved!' : 'Save'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-xs flex items-center gap-1.5 hover:border-accent/40 transition-all min-h-[38px]"
              title="Download PDF Quotation"
            >
              <Icon name="PrinterIcon" size={14} />
              <span className="text-[11px] sm:text-xs">PDF</span>
            </button>
            <button
              onClick={handleAllClear}
              disabled={filledCount === 0}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-danger/10 border border-danger/30 text-danger font-display font-semibold text-xs flex items-center gap-1.5 hover:bg-danger/20 transition-all disabled:opacity-40 min-h-[38px]"
              title="Clear All"
            >
              <Icon name="Trash2Icon" size={14} />
              <span className="text-[11px] sm:text-xs">Clear</span>
            </button>
          </div>

          {/* Price & Items Counter Box */}
          <div className="bg-elevated border border-accent/40 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-right">
            <span className="font-display font-bold text-sm sm:text-lg text-accent tabular-nums block leading-tight">
              {formatPrice(totalPrice)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              {filledCount} Items
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Left: Categorized Component Sections */}
        <div className="space-y-6">
          {SECTIONED_SLOTS.map((section) => {
            const visibleSlots = section.slots.filter((s) => !hideUnconfigured || build[s.key]);
            if (visibleSlots.length === 0) return null;

            return (
              <div key={section.title} className="space-y-2">
                {/* Section Header Bar */}
                <div className="bg-elevated border-b border-border px-4 py-2.5 rounded-xl font-display font-bold text-sm text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {section.title}
                </div>

                {/* Slots in Section */}
                <div className="space-y-2">
                  {visibleSlots.map((slot) => {
                    const selected = build[slot.key];
                    return (
                      <div
                        key={slot.key}
                        className={`bg-surface border rounded-2xl overflow-hidden transition-all ${
                          selected ? 'border-accent/30 bg-accent/5' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                          {/* Slot icon */}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              selected
                                ? 'bg-accent/10 border border-accent/30'
                                : 'bg-elevated border border-border'
                            }`}
                          >
                            <Icon
                              name={slot.icon as 'CpuIcon'}
                              size={20}
                              className={selected ? 'text-accent' : 'text-muted-foreground'}
                            />
                          </div>

                          {/* Slot info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-foreground">
                                {slot.label}
                              </span>
                              {slot.required && (
                                <span className="px-1.5 py-0.2 rounded bg-danger/20 text-danger text-[9px] font-bold">
                                  Required
                                </span>
                              )}
                            </div>
                            {selected ? (
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-elevated shrink-0">
                                  <AppImage
                                    src={selected.image}
                                    alt={selected.alt}
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-display font-semibold text-xs sm:text-sm text-foreground line-clamp-1">
                                    {selected.name}
                                  </p>
                                  <p className="text-xs text-accent font-bold tabular-nums">
                                    {formatPrice(selected.price)}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">Select {slot.label}</p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            {selected && (
                              <button
                                onClick={() => handleRemove(slot.key)}
                                className="p-1.5 rounded-lg bg-elevated border border-border text-muted-foreground hover:text-danger hover:border-danger/30 transition-colors"
                                aria-label="Remove component"
                              >
                                <Icon name="XIcon" size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => setActiveModal(slot.key)}
                              className={`px-3.5 py-2 rounded-xl font-display font-semibold text-xs transition-all ${
                                selected
                                  ? 'bg-elevated border border-border text-muted-foreground hover:text-foreground'
                                  : 'bg-accent text-accent-foreground hover:glow-accent-sm'
                              }`}
                            >
                              {selected ? 'Change' : 'Choose'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Sticky Summary */}
        <div className="lg:sticky lg:top-24 space-y-4">
          {/* SVG Case Illustration */}
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center">
            <div className="relative w-32 h-44 mb-4">
              <svg
                viewBox="0 0 128 176"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect
                  x="8"
                  y="8"
                  width="112"
                  height="160"
                  rx="8"
                  stroke="var(--border)"
                  strokeWidth="2"
                  fill="var(--elevated)"
                />
                <rect
                  x="16"
                  y="20"
                  width="32"
                  height="20"
                  rx="3"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  fill="var(--background)"
                />
                <circle
                  cx="112"
                  cy="28"
                  r="6"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  fill={filledCount >= 6 ? 'var(--accent)' : 'var(--background)'}
                />
                {[0, 1, 2].map((i) => (
                  <rect
                    key={i}
                    x="16"
                    y={50 + i * 18}
                    width="32"
                    height="12"
                    rx="2"
                    stroke="var(--border)"
                    strokeWidth="1"
                    fill={i === 0 && build.storage ? 'var(--accent)' : 'var(--background)'}
                    opacity={i === 0 && build.storage ? 1 : 0.4}
                  />
                ))}
                <rect
                  x="56"
                  y="20"
                  width="60"
                  height="100"
                  rx="4"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  fill={build.motherboard ? 'rgba(0,229,160,0.05)' : 'var(--background)'}
                  strokeDasharray={build.motherboard ? '0' : '4 2'}
                />
                {build.cpu && (
                  <rect
                    x="64"
                    y="28"
                    width="24"
                    height="24"
                    rx="2"
                    fill="var(--accent)"
                    opacity="0.6"
                  />
                )}
                {build.gpu && (
                  <rect
                    x="58"
                    y="62"
                    width="50"
                    height="16"
                    rx="2"
                    fill="var(--accent)"
                    opacity="0.5"
                  />
                )}
                {build.ram && (
                  <>
                    <rect
                      x="92"
                      y="28"
                      width="6"
                      height="30"
                      rx="1"
                      fill="var(--accent)"
                      opacity="0.7"
                    />
                    <rect
                      x="101"
                      y="28"
                      width="6"
                      height="30"
                      rx="1"
                      fill="var(--accent)"
                      opacity="0.7"
                    />
                  </>
                )}
                {build.psu && (
                  <rect
                    x="16"
                    y="130"
                    width="96"
                    height="30"
                    rx="3"
                    fill="var(--accent)"
                    opacity="0.3"
                  />
                )}
                {build.cooler && (
                  <circle
                    cx="76"
                    cy="40"
                    r="10"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                  />
                )}
                {filledCount >= 6 && (
                  <rect
                    x="8"
                    y="8"
                    width="112"
                    height="160"
                    rx="8"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    fill="none"
                  />
                )}
              </svg>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-sm">
                {filledCount}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{filledCount}/15 components selected</p>
          </div>

          {/* Wattage Meter */}
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-foreground">Power Draw</h3>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  wattageStatus === 'danger'
                    ? 'bg-danger/20 text-danger'
                    : wattageStatus === 'warning'
                      ? 'bg-warning/20 text-warning'
                      : 'bg-accent/10 text-accent'
                }`}
              >
                {wattageStatus === 'ok'
                  ? 'Good'
                  : wattageStatus === 'warning'
                    ? 'High'
                    : 'Overload!'}
              </span>
            </div>
            <div className="wattage-track">
              <div
                className="wattage-fill"
                style={{
                  width: `${wattagePercent}%`,
                  background:
                    wattageStatus === 'danger'
                      ? 'var(--danger)'
                      : wattageStatus === 'warning'
                        ? 'var(--warning)'
                        : 'var(--accent)',
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Est. draw:{' '}
                <span className="text-foreground font-medium tabular-nums">{totalTdp}W</span>
              </span>
              <span>
                PSU:{' '}
                <span className="text-foreground font-medium tabular-nums">
                  {psuWattage > 0 ? `${psuWattage}W` : '—'}
                </span>
              </span>
              <span className="font-medium tabular-nums">{wattagePercent}%</span>
            </div>
          </div>

          {/* Compatibility */}
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Icon
                name={compatible ? 'CheckCircleIcon' : 'AlertCircleIcon'}
                size={18}
                className={compatible ? 'text-accent' : 'text-danger'}
              />
              <h3 className="font-display font-semibold text-sm text-foreground">Compatibility</h3>
              <span
                className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${compatible ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger'}`}
              >
                {compatible ? 'All Good' : `${issues.length} Issue${issues.length > 1 ? 's' : ''}`}
              </span>
            </div>
            {issues.length > 0 ? (
              <ul className="space-y-1.5">
                {issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-danger">
                    <Icon name="XCircleIcon" size={12} className="shrink-0 mt-0.5" />
                    {issue}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">
                All selected components are compatible.
              </p>
            )}
          </div>

          {/* Game FPS Benchmark */}
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-1.5">
                <Icon name="GamepadIcon" size={16} className="text-accent" />
                Est. Gaming FPS
              </h3>
              <span className="text-[10px] bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                Live Calc
              </span>
            </div>

            {build.cpu || build.gpu ? (
              <div className="space-y-2">
                {[
                  {
                    game: 'Valorant',
                    fps: Math.round(
                      (build.gpu?.price || 20000) / 400 + (build.cpu?.price || 15000) / 300
                    ),
                    res: '1080p Ultra',
                  },
                  {
                    game: 'PUBG PC',
                    fps: Math.round(
                      (build.gpu?.price || 20000) / 600 + (build.cpu?.price || 15000) / 500
                    ),
                    res: '1080p High',
                  },
                  {
                    game: 'GTA V',
                    fps: Math.round(
                      (build.gpu?.price || 20000) / 500 + (build.cpu?.price || 15000) / 450
                    ),
                    res: '1080p Very High',
                  },
                  {
                    game: 'Cyberpunk 2077',
                    fps: Math.round(
                      (build.gpu?.price || 20000) / 1100 + (build.cpu?.price || 15000) / 900
                    ),
                    res: '1080p High',
                  },
                ].map((g) => (
                  <div
                    key={g.game}
                    className="flex items-center justify-between text-xs p-2 bg-elevated rounded-xl border border-border"
                  >
                    <div>
                      <span className="font-semibold text-foreground">{g.game}</span>
                      <span className="text-[10px] text-muted-foreground block">{g.res}</span>
                    </div>
                    <span className="font-display font-bold text-accent tabular-nums">
                      ~{g.fps} FPS
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Select CPU & GPU to see FPS benchmarks.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Component Picker Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl overflow-hidden max-h-[80vh] flex flex-col animate-slide-up sm:animate-fade-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Choose Component</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-elevated text-muted-foreground"
              >
                <Icon name="XIcon" size={18} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
              {getSlotComponents(activeModal).map((component) => (
                <button
                  key={component.id}
                  onClick={() => handleSelect(activeModal, component)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                    build[activeModal]?.id === component.id
                      ? 'border-accent/50 bg-accent/5'
                      : 'border-border bg-elevated hover:border-accent/30'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface shrink-0">
                    <AppImage
                      src={component.image}
                      alt={component.alt}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-foreground mb-1 line-clamp-1">
                      {component.name}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(component.specs)
                        .slice(0, 3)
                        .map(([k, v]) => (
                          <span
                            key={k}
                            className="px-2 py-0.5 rounded-md bg-surface border border-border text-[10px] text-muted-foreground"
                          >
                            {String(v)}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-base text-accent tabular-nums">
                      {formatPrice(component.price)}
                    </p>
                    {build[activeModal]?.id === component.id && (
                      <span className="text-[10px] text-accent">Selected</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
