'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'default';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('voltedge-theme') as Theme | null;
    if (stored && ['dark', 'light', 'default'].includes(stored)) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'theme-default');
    if (t === 'dark') {
      root.classList.add('dark');
    } else if (t === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('theme-default');
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('voltedge-theme', t);
    applyTheme(t);
  };

  if (!mounted) return <>{children}</>;

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
