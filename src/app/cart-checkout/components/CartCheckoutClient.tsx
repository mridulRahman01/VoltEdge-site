'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { CART_ITEMS_MOCK, DISTRICTS, formatPrice, formatEmi } from '@/lib/mockData';

type Step = 'cart' | 'address' | 'payment' | 'confirmed';

const STEPS = [
  { key: 'cart', label: 'Cart', icon: 'ShoppingCartIcon' },
  { key: 'address', label: 'Address', icon: 'MapPinIcon' },
  { key: 'payment', label: 'Payment', icon: 'CreditCardIcon' },
];

export default function CartCheckoutClient() {
  const [step, setStep] = useState<Step>('cart');
  const [items, setItems] = useState(CART_ITEMS_MOCK.map((i) => ({ ...i, qty: 1 })));
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [address, setAddress] = useState({ name: '', phone: '', district: '', area: '', street: '' });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = subtotal > 50000 ? 0 : 120;
  const total = subtotal + deliveryFee;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (step === 'confirmed') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckIcon" size={36} className="text-accent" />
        </div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-3 tracking-tight">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Your order <span className="text-accent font-semibold">#VE-2026-07842</span> has been placed.</p>
        <p className="text-sm text-muted-foreground mb-8">Expected delivery: 1–3 business days. You&apos;ll receive an SMS confirmation shortly.</p>
        <div className="p-5 bg-surface border border-border rounded-2xl mb-8 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-foreground font-medium">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-display font-bold border-t border-border pt-3">
            <span className="text-foreground">Total Paid</span>
            <span className="text-accent tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/" className="flex-1 py-3 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-sm text-center hover:border-accent/40 transition-all">
            Continue Shopping
          </Link>
          <button className="flex-1 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all">
            Track Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => {
          const stepKeys: Step[] = ['cart', 'address', 'payment'];
          const currentIdx = stepKeys.indexOf(step);
          const isActive = s.key === step;
          const isDone = stepKeys.indexOf(s.key as Step) < currentIdx;
          return (
            <React.Fragment key={s.key}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'bg-accent/10 border border-accent/30' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all ${
                  isDone ? 'bg-accent text-accent-foreground' : isActive ? 'bg-accent text-accent-foreground' : 'bg-elevated border border-border text-muted-foreground'
                }`}>
                  {isDone ? <Icon name="CheckIcon" size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-medium font-display ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px mx-1 ${stepKeys.indexOf(s.key as Step) < currentIdx ? 'bg-accent' : 'bg-border'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* Left Panel */}
        <div>
          {/* STEP: Cart */}
          {step === 'cart' && (
            <div className="space-y-3">
              <h2 className="font-display font-bold text-xl text-foreground mb-4">Your Cart ({items.length} items)</h2>
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-surface border border-border rounded-2xl">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-elevated shrink-0">
                    <AppImage src={item.image} alt={item.alt} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href="/product-detail" className="font-display font-semibold text-sm text-foreground line-clamp-2 hover:text-accent transition-colors block mb-1">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mb-3">{item.brand}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-0 bg-elevated border border-border rounded-xl overflow-hidden">
                        <button onClick={() => updateQty(item.id, -1)} className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease">
                          <Icon name="MinusIcon" size={14} />
                        </button>
                        <span className="px-3 py-2 font-display font-semibold text-sm text-foreground min-w-[36px] text-center tabular-nums">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase">
                          <Icon name="PlusIcon" size={14} />
                        </button>
                      </div>
                      <span className="font-display font-bold text-base text-accent tabular-nums">{formatPrice(item.price * item.qty)}</span>
                      <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-danger transition-colors" aria-label="Remove item">
                        <Icon name="Trash2Icon" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="ShoppingCartIcon" size={48} className="text-border mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link href="/category" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all">
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* STEP: Address */}
          {step === 'address' && (
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-6">Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', placeholder: 'Tanvir Ahmed', type: 'text' },
                  { label: 'Phone Number', key: 'phone', placeholder: '+880 1700-000000', type: 'tel' },
                  { label: 'Area / Thana', key: 'area', placeholder: 'Gulshan, Dhanmondi...', type: 'text' },
                  { label: 'Street Address', key: 'street', placeholder: 'House no, Road no...', type: 'text' },
                ].map((field) => (
                  <div key={field.key} className={field.key === 'street' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={address[field.key as keyof typeof address]}
                      onChange={(e) => setAddress((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">District</label>
                  <select
                    value={address.district}
                    onChange={(e) => setAddress((prev) => ({ ...prev, district: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors appearance-none"
                  >
                    <option value="">Select District</option>
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery options */}
              <div className="mt-6">
                <h3 className="font-display font-semibold text-sm text-foreground mb-3">Delivery Method</h3>
                <div className="space-y-2">
                  {[
                    { id: 'standard', label: 'Standard Delivery', desc: '3–5 business days', price: 0, condition: 'Free on orders above ৳50,000' },
                    { id: 'express', label: 'Express Delivery', desc: '1–2 business days', price: 250 },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-2xl cursor-pointer hover:border-accent/30 transition-all">
                      <input type="radio" name="delivery" defaultChecked={opt.id === 'standard'} className="accent-accent w-4 h-4" />
                      <div className="flex-1">
                        <p className="font-display font-semibold text-sm text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}{opt.condition ? ` · ${opt.condition}` : ''}</p>
                      </div>
                      <span className="font-display font-bold text-sm text-accent">{opt.price === 0 ? 'Free' : formatPrice(opt.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP: Payment */}
          {step === 'payment' && (
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-6">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: 'BanknoteIcon' },
                  { id: 'bkash', label: 'bKash', desc: 'Mobile banking payment', icon: 'SmartphoneIcon' },
                  { id: 'card', label: 'Debit / Credit Card', desc: 'Visa, Mastercard, AMEX', icon: 'CreditCardIcon' },
                  { id: 'emi', label: '0% EMI', desc: 'Up to 24 months on major banks', icon: 'CalendarIcon' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === method.id ? 'border-accent/50 bg-accent/5' : 'border-border bg-surface hover:border-accent/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-accent w-4 h-4"
                    />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'bg-accent/10 border border-accent/30' : 'bg-elevated border border-border'}`}>
                      <Icon name={method.icon as 'CreditCardIcon'} size={18} className={paymentMethod === method.id ? 'text-accent' : 'text-muted-foreground'} />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <Icon name="CheckCircleIcon" size={18} className="text-accent ml-auto" />
                    )}
                  </label>
                ))}
              </div>
              {paymentMethod === 'bkash' && (
                <div className="mt-4 p-4 bg-surface border border-border rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-3">Enter your bKash number</p>
                  <input type="tel" placeholder="+880 1700-000000" className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-semibold text-foreground">Order Summary</h3>
            {/* Mini item list */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-elevated shrink-0">
                    <AppImage src={item.image} alt={item.alt} width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <p className="flex-1 text-xs text-muted-foreground line-clamp-1">{item.name}</p>
                  <span className="text-xs font-medium text-foreground tabular-nums shrink-0">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className={deliveryFee === 0 ? 'text-accent text-sm' : 'text-foreground text-sm tabular-nums'}>
                  {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between font-display font-bold border-t border-border pt-2">
                <span className="text-foreground">Total</span>
                <span className="text-accent tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{formatEmi(total)}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            {step === 'cart' && (
              <button
                onClick={() => setStep('address')}
                disabled={items.length === 0}
                className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm hover:glow-accent-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Proceed to Address
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            )}
            {step === 'address' && (
              <button
                onClick={() => setStep('payment')}
                className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm hover:glow-accent-sm transition-all flex items-center justify-center gap-2"
              >
                Continue to Payment
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            )}
            {step === 'payment' && (
              <button
                onClick={() => setStep('confirmed')}
                className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm hover:glow-accent-sm transition-all flex items-center justify-center gap-2"
              >
                Place Order · {formatPrice(total)}
                <Icon name="CheckIcon" size={16} />
              </button>
            )}
            {step !== 'cart' && (
              <button
                onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}
                className="w-full py-3 rounded-xl bg-elevated border border-border text-muted-foreground font-display font-semibold text-sm hover:text-foreground transition-all flex items-center justify-center gap-2"
              >
                <Icon name="ArrowLeftIcon" size={16} />
                Back
              </button>
            )}
          </div>

          {/* Trust mini */}
          <div className="flex flex-col gap-2">
            {[
              { icon: 'ShieldCheckIcon', text: 'Secure checkout — SSL encrypted' },
              { icon: 'TruckIcon', text: 'Delivery across all 64 districts' },
              { icon: 'RefreshCwIcon', text: '7-day return policy' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name={item.icon as 'ShieldCheckIcon'} size={14} className="text-accent shrink-0" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}