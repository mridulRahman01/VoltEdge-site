'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/AppIcon';

const THEMES: { value: Theme; label: string; icon: string; desc: string }[] = [
  { value: 'dark', label: 'Dark', icon: 'MoonIcon', desc: 'Near-black premium' },
  { value: 'light', label: 'Light', icon: 'SunIcon', desc: 'Clean & bright' },
  { value: 'default', label: 'System', icon: 'PaletteIcon', desc: 'Follows OS setting' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = THEMES.find(t => t.value === theme) || THEMES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors"
        aria-label="Change theme"
        title="Change theme"
      >
        <Icon name={current.icon} size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-up">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Theme</p>
          </div>
          {THEMES.map((t) => (
            <button
              key={t.value}
              onClick={() => { setTheme(t.value); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-elevated transition-colors ${
                theme === t.value ? 'text-accent' : 'text-foreground'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === t.value ? 'bg-accent/10 border border-accent/30' : 'bg-elevated border border-border'
              }`}>
                <Icon name={t.icon} size={16} className={theme === t.value ? 'text-accent' : 'text-muted-foreground'} />
              </div>
              <div>
                <p className="text-sm font-medium font-display">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              {theme === t.value && (
                <Icon name="CheckIcon" size={14} className="ml-auto text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
