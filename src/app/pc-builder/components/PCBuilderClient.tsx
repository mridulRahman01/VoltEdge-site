'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { PC_BUILDER_COMPONENTS, formatPrice } from '@/lib/mockData';

type SlotKey = 'cpu' | 'motherboard' | 'ram' | 'gpu' | 'storage' | 'psu' | 'case' | 'cooler';

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

const SLOTS: { key: SlotKey; label: string; icon: string; required: boolean }[] = [
  { key: 'cpu', label: 'Processor (CPU)', icon: 'CpuIcon', required: true },
  { key: 'motherboard', label: 'Motherboard', icon: 'CircuitBoardIcon', required: true },
  { key: 'ram', label: 'Memory (RAM)', icon: 'MemoryStickIcon', required: true },
  { key: 'gpu', label: 'Graphics Card (GPU)', icon: 'MonitorIcon', required: true },
  { key: 'storage', label: 'Storage', icon: 'HardDriveIcon', required: true },
  { key: 'psu', label: 'Power Supply (PSU)', icon: 'ZapIcon', required: true },
  { key: 'case', label: 'PC Case', icon: 'BoxIcon', required: true },
  { key: 'cooler', label: 'CPU Cooler', icon: 'WindIcon', required: false },
];

function getCompatibility(build: BuildState): { compatible: boolean; issues: string[] } {
  const issues: string[] = [];
  const { cpu, motherboard, ram, gpu, psu, case: pcCase } = build;

  if (cpu && motherboard) {
    if ((cpu.specs.socket as string) !== (motherboard.specs.socket as string)) {
      issues.push(`CPU socket (${cpu.specs.socket}) ≠ Motherboard socket (${motherboard.specs.socket})`);
    }
  }
  if (cpu && ram) {
    if ((cpu.specs.ramType as string) !== (ram.specs.ramType as string)) {
      issues.push(`CPU supports ${cpu.specs.ramType} but RAM is ${ram.specs.ramType}`);
    }
  }
  if (motherboard && ram) {
    if ((motherboard.specs.ramType as string) !== (ram.specs.ramType as string)) {
      issues.push(`Motherboard supports ${motherboard.specs.ramType} but RAM is ${ram.specs.ramType}`);
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

  const totalPrice = Object.values(build).reduce((sum, c) => sum + (c?.price || 0), 0);
  const totalTdp = getTotalTdp(build);
  const psuWattage = getPsuWattage(build);
  const wattagePercent = psuWattage > 0 ? Math.min(100, Math.round((totalTdp / psuWattage) * 100)) : 0;
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

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const getSlotComponents = (slot: SlotKey) => {
    const map: Record<SlotKey, SelectedComponent[]> = {
      cpu: PC_BUILDER_COMPONENTS.cpu as SelectedComponent[],
      motherboard: PC_BUILDER_COMPONENTS.motherboard as SelectedComponent[],
      ram: PC_BUILDER_COMPONENTS.ram as SelectedComponent[],
      gpu: PC_BUILDER_COMPONENTS.gpu as SelectedComponent[],
      storage: PC_BUILDER_COMPONENTS.storage as SelectedComponent[],
      psu: PC_BUILDER_COMPONENTS.psu as SelectedComponent[],
      case: PC_BUILDER_COMPONENTS.case as SelectedComponent[],
      cooler: PC_BUILDER_COMPONENTS.cooler as SelectedComponent[],
    };
    return map[slot] || [];
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Left: Component Slots */}
        <div className="space-y-3">
          {SLOTS.map((slot) => {
            const selected = build[slot.key];
            return (
              <div
                key={slot.key}
                className={`bg-surface border rounded-2xl overflow-hidden transition-all ${
                  selected ? 'border-accent/30' : 'border-border'
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Slot icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    selected ? 'bg-accent/10 border border-accent/30' : 'bg-elevated border border-border'
                  }`}>
                    <Icon name={slot.icon as 'CpuIcon'} size={20} className={selected ? 'text-accent' : 'text-muted-foreground'} />
                  </div>

                  {/* Slot info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{slot.label}</span>
                      {!slot.required && (
                        <span className="px-1.5 py-0.5 rounded-full bg-elevated border border-border text-[10px] text-muted-foreground">Optional</span>
                      )}
                    </div>
                    {selected ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-elevated shrink-0">
                          <AppImage src={selected.image} alt={selected.alt} width={32} height={32} className="object-cover w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-sm text-foreground line-clamp-1">{selected.name}</p>
                          <p className="text-xs text-accent font-medium tabular-nums">{formatPrice(selected.price)}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Click to select {slot.label.split(' ')[0]}</p>
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
                      className={`px-4 py-2 rounded-xl font-display font-semibold text-xs transition-all ${
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

        {/* Right: Sticky Summary */}
        <div className="lg:sticky lg:top-24 space-y-4">
          {/* SVG Case Illustration */}
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-center">
            <div className="relative w-32 h-44 mb-4">
              {/* Case outline */}
              <svg viewBox="0 0 128 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect x="8" y="8" width="112" height="160" rx="8" stroke="var(--border)" strokeWidth="2" fill="var(--elevated)" />
                <rect x="16" y="20" width="32" height="20" rx="3" stroke="var(--border)" strokeWidth="1.5" fill="var(--background)" />
                {/* Power button */}
                <circle cx="112" cy="28" r="6" stroke="var(--border)" strokeWidth="1.5" fill={filledCount >= 6 ? 'var(--accent)' : 'var(--background)'} />
                {/* Drive bays */}
                {[0,1,2].map((i) => (
                  <rect key={i} x="16" y={50 + i * 18} width="32" height="12" rx="2"
                    stroke="var(--border)" strokeWidth="1"
                    fill={i === 0 && build.storage ? 'var(--accent)' : 'var(--background)'}
                    opacity={i === 0 && build.storage ? 1 : 0.4}
                  />
                ))}
                {/* Motherboard area */}
                <rect x="56" y="20" width="60" height="100" rx="4" stroke="var(--border)" strokeWidth="1.5"
                  fill={build.motherboard ? 'rgba(0,229,160,0.05)' : 'var(--background)'}
                  strokeDasharray={build.motherboard ? '0' : '4 2'}
                />
                {/* CPU */}
                {build.cpu && (
                  <rect x="64" y="28" width="24" height="24" rx="2" fill="var(--accent)" opacity="0.6" />
                )}
                {/* GPU */}
                {build.gpu && (
                  <rect x="58" y="62" width="50" height="16" rx="2" fill="var(--accent)" opacity="0.5" />
                )}
                {/* RAM sticks */}
                {build.ram && (
                  <>
                    <rect x="92" y="28" width="6" height="30" rx="1" fill="var(--accent)" opacity="0.7" />
                    <rect x="101" y="28" width="6" height="30" rx="1" fill="var(--accent)" opacity="0.7" />
                  </>
                )}
                {/* PSU */}
                {build.psu && (
                  <rect x="16" y="130" width="96" height="30" rx="3" fill="var(--accent)" opacity="0.3" />
                )}
                {/* Cooler fan */}
                {build.cooler && (
                  <circle cx="76" cy="40" r="10" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.6" />
                )}
                {/* Glow effect when complete */}
                {filledCount >= 6 && (
                  <rect x="8" y="8" width="112" height="160" rx="8" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
                )}
              </svg>
              {/* Component count badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-sm">
                {filledCount}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{filledCount}/8 components selected</p>
          </div>

          {/* Wattage Meter */}
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-foreground">Power Draw</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                wattageStatus === 'danger' ? 'bg-danger/20 text-danger' :
                wattageStatus === 'warning'? 'bg-warning/20 text-warning' : 'bg-accent/10 text-accent'
              }`}>
                {wattageStatus === 'ok' ? 'Good' : wattageStatus === 'warning' ? 'High' : 'Overload!'}
              </span>
            </div>
            <div className="wattage-track">
              <div
                className="wattage-fill"
                style={{
                  width: `${wattagePercent}%`,
                  background: wattageStatus === 'danger' ? 'var(--danger)' : wattageStatus === 'warning' ? 'var(--warning)' : 'var(--accent)',
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Est. draw: <span className="text-foreground font-medium tabular-nums">{totalTdp}W</span></span>
              <span>PSU: <span className="text-foreground font-medium tabular-nums">{psuWattage > 0 ? `${psuWattage}W` : '—'}</span></span>
              <span className="font-medium tabular-nums">{wattagePercent}%</span>
            </div>
            {wattageStatus !== 'ok' && psuWattage > 0 && (
              <p className="text-xs text-warning flex items-center gap-1.5">
                <Icon name="AlertTriangleIcon" size={12} />
                {wattageStatus === 'danger' ? 'PSU overloaded — upgrade recommended' : 'Approaching PSU limit — consider upgrading'}
              </p>
            )}
          </div>

          {/* Compatibility */}
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Icon name={compatible ? 'CheckCircleIcon' : 'AlertCircleIcon'} size={18} className={compatible ? 'text-accent' : 'text-danger'} />
              <h3 className="font-display font-semibold text-sm text-foreground">Compatibility</h3>
              <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${compatible ? 'bg-accent/10 text-accent' : 'bg-danger/10 text-danger'}`}>
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
            ) : filledCount > 0 ? (
              <p className="text-xs text-muted-foreground">All selected components are compatible.</p>
            ) : (
              <p className="text-xs text-muted-foreground">Select components to check compatibility.</p>
            )}
          </div>

          {/* Price + Actions */}
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Build Price</span>
              <span className="font-display font-bold text-2xl text-accent tabular-nums">{formatPrice(totalPrice)}</span>
            </div>
            {totalPrice > 0 && (
              <p className="text-xs text-muted-foreground">EMI from {formatPrice(Math.ceil(totalPrice / 12))}/mo × 12</p>
            )}
            <button
              disabled={filledCount === 0}
              className="w-full py-3.5 rounded-xl font-display font-semibold text-sm bg-accent text-accent-foreground hover:glow-accent-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="ShoppingCartIcon" size={16} />
              Add Build to Cart
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSave}
                className="py-2.5 rounded-xl font-display font-semibold text-xs bg-elevated border border-border text-foreground hover:border-accent/40 transition-all flex items-center justify-center gap-1.5"
              >
                <Icon name="SaveIcon" size={14} className={savedMsg ? 'text-accent' : ''} />
                {savedMsg ? 'Saved!' : 'Save Build'}
              </button>
              <button className="py-2.5 rounded-xl font-display font-semibold text-xs bg-elevated border border-border text-foreground hover:border-accent/40 transition-all flex items-center justify-center gap-1.5">
                <Icon name="Share2Icon" size={14} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Picker Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}
        >
          <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl overflow-hidden max-h-[80vh] flex flex-col animate-slide-up sm:animate-fade-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">
                Choose {SLOTS.find((s) => s.key === activeModal)?.label}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-lg hover:bg-elevated text-muted-foreground">
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
                      ? 'border-accent/50 bg-accent/5' :'border-border bg-elevated hover:border-accent/30'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface shrink-0">
                    <AppImage src={component.image} alt={component.alt} width={56} height={56} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-foreground mb-1 line-clamp-1">{component.name}</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(component.specs).slice(0, 3).map(([k, v]) => (
                        <span key={k} className="px-2 py-0.5 rounded-md bg-surface border border-border text-[10px] text-muted-foreground">
                          {String(v)}{k === 'tdp' ? 'W' : k === 'wattage' ? 'W' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-base text-accent tabular-nums">{formatPrice(component.price)}</p>
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