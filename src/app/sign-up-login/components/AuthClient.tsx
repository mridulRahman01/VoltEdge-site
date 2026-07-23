'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

type Mode = 'login' | 'register' | 'forgot';

export default function AuthClient() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(form.email, form.password);
        setSuccess('Signed in successfully! Redirecting...');
        setTimeout(() => router.push('/'), 1000);
      } else if (mode === 'register') {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        if (form.password.length < 6) {
          setError('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        await signUp(form.email, form.password, { fullName: form.name });
        setSuccess('Account created! Please check your email to verify your account.');
      } else if (mode === 'forgot') {
        // Supabase password reset
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.email, {
          redirectTo: `${window.location.origin}/auth/callback`,
        });
        if (resetError) throw resetError;
        setSuccess('Password reset link sent! Check your email.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-surface border-r border-border flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,229,160,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <AppLogo size={40} />
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">
              VoltEdge
            </span>
          </Link>

          <h2 className="font-display font-bold text-4xl xl:text-5xl text-foreground tracking-tight leading-tight mb-6">
            Bangladesh&apos;s
            <br />
            <span className="text-accent">Premium</span>
            <br />
            Tech Store.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
            Laptops, PC components, phones, and gadgets — built for enthusiasts who demand the best.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            {
              icon: 'ShieldCheckIcon',
              title: 'Official Warranty',
              desc: 'All products carry manufacturer warranty',
            },
            {
              icon: 'CreditCardIcon',
              title: '0% EMI Available',
              desc: 'Up to 24 months on all banks',
            },
            {
              icon: 'TruckIcon',
              title: 'Nationwide Delivery',
              desc: 'Fast delivery to all 64 districts',
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-elevated border border-border flex items-center justify-center shrink-0">
                <Icon name={item.icon} size={18} className="text-accent" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right auth panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <AppLogo size={32} />
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              VoltEdge
            </span>
          </div>

          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl text-foreground tracking-tight mb-2">
              {mode === 'login'
                ? 'Welcome back'
                : mode === 'register'
                  ? 'Create account'
                  : 'Reset password'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === 'login'
                ? 'Sign in to your VoltEdge account'
                : mode === 'register'
                  ? 'Join VoltEdge for exclusive deals and EMI access'
                  : 'Enter your email to receive a reset link'}
            </p>
          </div>

          {/* Error / Success messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 flex items-center gap-2">
              <Icon name="AlertTriangleIcon" size={16} className="text-danger shrink-0" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-accent/10 border border-accent/30 flex items-center gap-2">
              <Icon name="CheckIcon" size={16} className="text-accent shrink-0" />
              <p className="text-sm text-accent">{success}</p>
            </div>
          )}

          {/* Google OAuth */}
          {mode !== 'forgot' && (
            <>
              <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-sm hover:border-accent/40 transition-all mb-4">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Tanvir Ahmed"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="tanvir@example.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+880 1700-000000"
                  className="w-full px-4 py-3.5 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
            )}

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-accent hover:text-accent/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-4 py-3.5 pr-12 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    <Icon name={showPassword ? 'EyeOffIcon' : 'EyeIcon'} size={18} />
                  </button>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3.5 pr-12 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle confirm password visibility"
                  >
                    <Icon name={showConfirmPassword ? 'EyeOffIcon' : 'EyeIcon'} size={18} />
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-display font-bold text-sm transition-all flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:glow-accent-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon name="LoaderIcon" size={18} className="animate-spin" /> Processing...
                </>
              ) : mode === 'login' ? (
                'Sign In'
              ) : mode === 'register' ? (
                'Create Account'
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setMode('register');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Sign up free
                </button>
              </>
            ) : mode === 'register' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Remember your password?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Back to sign in
                </button>
              </>
            )}
          </div>

          {mode === 'register' && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link href="/" className="text-accent hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          )}

          {/* JWT info note */}
          <div className="mt-6 p-3 rounded-xl bg-elevated border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="LockIcon" size={14} className="text-accent" />
              <span className="text-xs font-semibold text-foreground">
                Secure JWT Authentication
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your session is secured with JWT tokens. Tokens are automatically refreshed and stored
              securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
