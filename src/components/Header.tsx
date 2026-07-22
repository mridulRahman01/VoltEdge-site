'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { useAuth } from '@/contexts/AuthContext';

const NAV_LINKS = [
  { label: 'Laptops', href: '/category' },
  { label: 'PC & Server', href: '/category' },
  { label: 'Gaming', href: '/category' },
  { label: 'Monitors', href: '/category' },
  { label: 'Phones', href: '/category' },
  { label: 'Offers', href: '/category' },
];

const MOBILE_CATEGORIES = [
  { label: 'Laptop', subcategories: ['Brand Laptop', 'Gaming Laptop', 'Business Laptop', '2-in-1 Laptop'] },
  { label: 'PC and Server', subcategories: ['Desktop PC', 'Brand Desktop', 'All In One PC', 'Mini PC', 'Workstation PC'] },
  { label: 'Gaming', subcategories: ['Gaming Laptop', 'Gaming Desktop', 'Gaming Chair', 'Gaming Monitor', 'Gaming Headset'] },
  { label: 'Monitor', subcategories: ['Gaming Monitor', 'Professional Monitor', '4K Monitor', 'Curved Monitor'] },
  { label: 'TV', subcategories: ['Smart TV', 'OLED TV', 'QLED TV', '4K TV'] },
  { label: 'Tablet', subcategories: ['Android Tablet', 'iPad', 'Windows Tablet'] },
  { label: 'Mobile Phone', subcategories: ['Samsung', 'iPhone', 'Xiaomi', 'OnePlus'] },
  { label: 'Gadget', subcategories: ['Smartwatch', 'TWS Earbuds', 'Action Camera', 'Drone'] },
  { label: 'Printer', subcategories: ['Laser Printer', 'Inkjet Printer', 'Multifunction'] },
  { label: 'Camera', subcategories: ['DSLR', 'Mirrorless', 'Action Camera', 'Webcam'] },
  { label: 'Security', subcategories: ['IP Camera', 'DVR/NVR', 'Access Control'] },
  { label: 'Network', subcategories: ['Router', 'Switch', 'Access Point', 'Modem'] },
  { label: 'Sound', subcategories: ['Headphone', 'Speaker', 'Microphone', 'Soundbar'] },
  { label: 'Office Items', subcategories: ['UPS', 'Projector', 'Whiteboard', 'Shredder'] },
  { label: 'Accessories', subcategories: ['Keyboard', 'Mouse', 'Webcam', 'USB Hub'] },
  { label: 'Software', subcategories: ['Windows', 'Office', 'Antivirus', 'Adobe'] },
  { label: 'Appliances', subcategories: ['AC', 'Refrigerator', 'Washing Machine', 'Microwave'] },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(2);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('PC and Server');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
    } catch {}
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-surface/95 backdrop-blur-md border-b border-border shadow-lg' : 'bg-surface border-b border-border'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 touch-manipulation">
            <AppLogo size={28} />
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-foreground hidden sm:block">
              VoltEdge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-elevated"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pc-builder"
              className="px-3 py-2 text-sm font-medium text-accent hover:text-accent transition-colors rounded-lg hover:bg-accent/10 flex items-center gap-1"
            >
              <Icon name="CpuIcon" size={14} />
              PC Builder
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 min-h-[44px] rounded-xl bg-elevated border border-border text-muted-foreground hover:text-foreground transition-colors text-sm touch-manipulation"
              aria-label="Open search"
            >
              <Icon name="SearchIcon" size={16} />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden lg:inline text-xs bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
            </button>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              {loading ? (
                <div className="w-9 h-9 rounded-xl bg-elevated animate-pulse" />
              ) : user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 min-w-[44px] min-h-[44px] rounded-xl text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors touch-manipulation"
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">
                      {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>
              ) : (
                <Link href="/sign-up-login" className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors touch-manipulation" aria-label="Account">
                  <Icon name="UserIcon" size={20} />
                </Link>
              )}

              {userMenuOpen && user && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-up">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground truncate">{user.user_metadata?.full_name || 'My Account'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Link href="/" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 min-h-[48px] text-sm text-foreground hover:bg-elevated transition-colors touch-manipulation">
                      <Icon name="UserIcon" size={16} className="text-muted-foreground" />
                      My Profile
                    </Link>
                    <Link href="/" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 min-h-[48px] text-sm text-foreground hover:bg-elevated transition-colors touch-manipulation">
                      <Icon name="PackageIcon" size={16} className="text-muted-foreground" />
                      My Orders
                    </Link>
                    <Link href="/" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 min-h-[48px] text-sm text-foreground hover:bg-elevated transition-colors touch-manipulation">
                      <Icon name="HeartIcon" size={16} className="text-muted-foreground" />
                      Wishlist
                    </Link>
                    <div className="border-t border-border mt-1 pt-1">
                      <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 min-h-[48px] text-sm text-danger hover:bg-elevated transition-colors touch-manipulation">
                        <Icon name="LogOutIcon" size={16} className="text-danger" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors relative touch-manipulation" aria-label="Wishlist">
              <Icon name="HeartIcon" size={20} />
            </button>

            <Link href="/cart-checkout" className="relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors touch-manipulation" aria-label="Cart">
              <Icon name="ShoppingCartIcon" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center font-display">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Icon name="MenuIcon" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Search */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl animate-fade-up">
            <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-border">
              <Icon name="SearchIcon" size={20} className="text-muted-foreground shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="flex-1 bg-transparent text-foreground text-base sm:text-lg placeholder:text-muted-foreground outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-elevated text-muted-foreground touch-manipulation">
                <Icon name="XIcon" size={18} />
              </button>
            </div>
            <div className="p-3 sm:p-4 max-h-[60vh] overflow-y-auto">
              {searchQuery ? (
                <div className="space-y-1">
                  {['ASUS ROG Strix G16', 'AMD Ryzen 9 7950X', 'RTX 4090', 'Samsung Galaxy S24', 'Corsair DDR5 RAM']
                    .filter(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((result) => (
                    <Link key={result} href="/product-detail" onClick={() => setSearchOpen(false)} className="flex items-center gap-3 p-3 min-h-[48px] rounded-xl hover:bg-elevated transition-colors group touch-manipulation">
                      <Icon name="PackageIcon" size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      <span className="text-foreground text-sm">{result}</span>
                      <Icon name="ArrowRightIcon" size={14} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                  {['ASUS ROG Strix G16', 'AMD Ryzen 9 7950X', 'RTX 4090', 'Samsung Galaxy S24', 'Corsair DDR5 RAM']
                    .filter(n => n.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-8">
                      <Icon name="SearchIcon" size={32} className="text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">No results for &quot;{searchQuery}&quot;</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['RTX 4090', 'Gaming Laptop', 'iPhone 15', 'Ryzen 9', 'Samsung Monitor', 'DDR5 RAM'].map((tag) => (
                      <button key={tag} onClick={() => setSearchQuery(tag)} className="px-3 py-2 min-h-[40px] rounded-full bg-elevated border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors touch-manipulation">
                        {tag}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Categories</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Laptops', 'GPUs', 'Monitors', 'Phones', 'RAM', 'Storage'].map((cat) => (
                      <Link key={cat} href="/category" onClick={() => setSearchOpen(false)} className="flex items-center gap-2 p-2.5 min-h-[44px] rounded-xl bg-elevated hover:bg-elevated/80 border border-border hover:border-accent/30 transition-colors text-sm text-foreground touch-manipulation">
                        <Icon name="ChevronRightIcon" size={14} className="text-accent" />
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-border hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-elevated rounded border border-border">↵</kbd> Select</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-elevated rounded border border-border">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-elevated rounded border border-border">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] flex">
          <div
            className="w-[80vw] max-w-sm bg-background flex flex-col overflow-y-auto animate-slide-left"
            style={{ maxHeight: '100dvh', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-elevated border-b border-border">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-surface touch-manipulation">
                <Icon name="HomeIcon" size={22} className="text-foreground" />
              </Link>
              <span className="font-display font-bold text-foreground">VoltEdge</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-surface text-foreground touch-manipulation" aria-label="Close menu">
                <Icon name="XIcon" size={22} />
              </button>
            </div>

            {/* User info in mobile menu */}
            {user && (
              <div className="px-4 py-3 bg-elevated/50 border-b border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-accent">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user.user_metadata?.full_name || 'My Account'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Category List */}
            <div className="flex-1">
              {MOBILE_CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 min-h-[52px] text-left border-b border-border/50 hover:bg-elevated transition-colors touch-manipulation"
                    onClick={() => setExpandedCategory(expandedCategory === cat.label ? null : cat.label)}
                    aria-expanded={expandedCategory === cat.label}
                  >
                    <span className={`font-medium text-base ${expandedCategory === cat.label ? 'text-accent font-semibold' : 'text-foreground'}`}>
                      {cat.label}
                    </span>
                    <Icon name={expandedCategory === cat.label ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={18} className="text-muted-foreground shrink-0" />
                  </button>
                  {expandedCategory === cat.label && (
                    <div className="bg-elevated/50">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href="/category"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-6 py-3.5 min-h-[48px] border-b border-border/30 text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors touch-manipulation"
                        >
                          <span className="text-sm">{sub}</span>
                          <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="p-4 border-t border-border space-y-2">
              {user ? (
                <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-xl bg-danger/10 border border-danger/30 text-danger font-semibold text-sm touch-manipulation">
                  <Icon name="LogOutIcon" size={16} />
                  Sign Out
                </button>
              ) : (
                <Link href="/sign-up-login" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-xl bg-accent text-accent-foreground font-semibold text-sm touch-manipulation">
                  <Icon name="LogInIcon" size={16} />
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
          {/* Backdrop */}
          <div className="flex-1 bg-background/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}