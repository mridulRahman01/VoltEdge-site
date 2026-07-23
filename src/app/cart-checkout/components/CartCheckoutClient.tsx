'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { DISTRICTS, formatPrice, formatEmi } from '@/lib/mockData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/context/ToastContext';

type Step = 'cart' | 'address' | 'payment' | 'confirmed';

const STEPS = [
  { key: 'cart', label: 'Cart', icon: 'ShoppingCartIcon' },
  { key: 'address', label: 'Address', icon: 'MapPinIcon' },
  { key: 'payment', label: 'Payment', icon: 'CreditCardIcon' },
];

export default function CartCheckoutClient() {
  const { toast } = useToast();
  const { items, subtotal, deliveryFee, total, updateQty, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [showClearModal, setShowClearModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    district: '',
    area: '',
    street: '',
  });

  const handleConfirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
    toast.warning('Your shopping cart has been cleared.');
  };

  const handleRemoveSingleItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.info(`Removed "${name}" from cart.`);
  };

  if (step === 'confirmed') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckIcon" size={36} className="text-accent" />
        </div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-3 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground mb-2">
          Your order <span className="text-accent font-semibold">#VE-2026-07842</span> has been
          placed.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Expected delivery: 1–3 business days. You&apos;ll receive an SMS confirmation shortly.
        </p>
        <div className="p-5 bg-surface border border-border rounded-2xl mb-8 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-foreground font-medium">
              {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between font-display font-bold border-t border-border pt-3">
            <span className="text-foreground">Total Paid</span>
            <span className="text-accent tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 py-3 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-sm text-center hover:border-accent/40 transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            href="/track-order"
            className="flex-1 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all text-center"
          >
            Track Order
          </Link>
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
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? 'bg-accent/10 border-accent/40 text-accent font-semibold'
                    : isDone
                      ? 'bg-surface border-border text-foreground'
                      : 'bg-surface/50 border-border/50 text-muted-foreground'
                }`}
              >
                <Icon
                  name={s.icon as 'ShoppingCartIcon'}
                  size={16}
                  className={isActive ? 'text-accent' : isDone ? 'text-emerald-400' : ''}
                />
                <span className="text-xs font-display">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 sm:w-16 h-[2px] ${isDone ? 'bg-emerald-400/40' : 'bg-border/40'}`}
                />
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
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl text-foreground">
                  Your Cart ({items.length} item{items.length !== 1 ? 's' : ''})
                </h2>
                {items.length > 0 && (
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs font-semibold hover:bg-danger/20 transition-all flex items-center gap-1.5 touch-manipulation"
                  >
                    <Icon name="Trash2Icon" size={14} />
                    Clear Cart
                  </button>
                )}
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-surface border border-border rounded-2xl relative group hover:border-accent/30 transition-all"
                >
                  {/* Cross Icon Button to remove product */}
                  <button
                    onClick={() => handleRemoveSingleItem(item.id, item.name)}
                    className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors z-10 touch-manipulation"
                    title="Remove product"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Icon name="XIcon" size={18} />
                  </button>

                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-elevated shrink-0 relative">
                    <AppImage
                      src={item.image}
                      alt={item.alt || item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <Link
                      href={`/product/${item.id}`}
                      className="font-display font-semibold text-sm text-foreground line-clamp-2 hover:text-accent transition-colors block mb-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mb-3">{item.brand}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-0 bg-elevated border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                          aria-label="Decrease"
                        >
                          <Icon name="MinusIcon" size={14} />
                        </button>
                        <span className="px-3 py-2 font-display font-semibold text-sm text-foreground min-w-[36px] text-center tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                          aria-label="Increase"
                        >
                          <Icon name="PlusIcon" size={14} />
                        </button>
                      </div>
                      <span className="font-display font-bold text-base text-accent tabular-nums">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-16 bg-surface border border-border rounded-3xl p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent">
                    <Icon name="ShoppingCartIcon" size={32} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    Your Shopping Cart is Empty
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Looks like you haven&apos;t added any tech components or laptops to your cart
                    yet.
                  </p>

                  <Link
                    href="/category"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all"
                  >
                    Browse All Products
                    <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* STEP: Address */}
          {step === 'address' && (
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-6">
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="Mridul Rahman"
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="01700000000"
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    District *
                  </label>
                  <select
                    value={address.district}
                    onChange={(e) => setAddress({ ...address, district: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm focus:border-accent outline-none transition-colors"
                  >
                    <option value="">Select District</option>
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Area / Thana *
                  </label>
                  <input
                    type="text"
                    value={address.area}
                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    placeholder="Dhanmondi, Mirpur, etc."
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
                    Street Address / House / Road *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="House 12, Road 4, Block B"
                    className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground text-sm focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('payment')}
                disabled={!address.name || !address.phone || !address.district}
                className="mt-6 w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm disabled:opacity-50 hover:glow-accent-sm transition-all"
              >
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* STEP: Payment */}
          {step === 'payment' && (
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-6">
                Select Payment Method
              </h2>
              <div className="space-y-3 mb-6">
                {[
                  {
                    id: 'cod',
                    label: 'Cash on Delivery',
                    desc: 'Pay cash when product is delivered to your address.',
                    icon: 'TruckIcon',
                  },
                  {
                    id: 'bkash',
                    label: 'bKash / Nagad Direct Pay',
                    desc: 'Pay instantly via Mobile Banking gateway.',
                    icon: 'ZapIcon',
                  },
                  {
                    id: 'card',
                    label: 'Credit / Debit Card (SSLCommerz)',
                    desc: 'Visa, Mastercard, AMEX with 0% EMI option.',
                    icon: 'CreditCardIcon',
                  },
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === m.id
                        ? 'bg-accent/10 border-accent text-foreground'
                        : 'bg-surface border-border text-muted-foreground hover:border-accent/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="mt-1 accent-accent"
                    />
                    <div>
                      <div className="flex items-center gap-2 font-display font-semibold text-sm text-foreground">
                        <Icon name={m.icon as 'TruckIcon'} size={16} className="text-accent" />
                        {m.label}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={() => setStep('confirmed')}
                className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all flex items-center justify-center gap-2"
              >
                <Icon name="LockIcon" size={16} />
                Place Order ({formatPrice(total)})
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Order Summary */}
        {items.length > 0 && (
          <div className="bg-surface border border-border rounded-3xl p-6 space-y-5 sticky top-20 shadow-md">
            <h3 className="font-display font-bold text-lg text-foreground pb-4 border-b border-border">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                <span className="font-medium text-foreground tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium text-foreground">
                  {deliveryFee === 0 ? (
                    <span className="text-accent font-semibold">FREE (Above ৳50k)</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Estimated Delivery</span>
                <span>1–3 Business Days</span>
              </div>
            </div>

            {/* EMI snippet */}
            <div className="p-3 bg-elevated rounded-xl border border-border text-xs flex items-center justify-between">
              <span className="text-muted-foreground">0% EMI Available</span>
              <span className="font-bold text-accent">{formatEmi(subtotal)}</span>
            </div>

            <div className="border-t border-border pt-4 flex justify-between items-baseline">
              <span className="font-display font-bold text-base text-foreground">Total</span>
              <span className="font-display font-black text-2xl text-accent tabular-nums">
                {formatPrice(total)}
              </span>
            </div>

            {step === 'cart' && (
              <button
                onClick={() => setStep('address')}
                className="w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Interactive Confirmation Modal for Clear Cart */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-surface border border-danger/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowClearModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors"
              aria-label="Close modal"
            >
              <Icon name="XIcon" size={18} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center text-danger shrink-0">
                <Icon name="AlertTriangleIcon" size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  Clear Entire Cart?
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Are you sure you want to remove all {items.length} item
                  {items.length !== 1 ? 's' : ''} from your shopping cart?
                </p>
              </div>
            </div>

            <div className="p-3 bg-elevated border border-border rounded-xl text-xs text-muted-foreground flex items-center gap-2">
              <Icon name="InfoIcon" size={16} className="text-amber-400 shrink-0" />
              <span>This will empty your cart items. You will need to add them again.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 py-3 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-xs hover:bg-surface transition-all touch-manipulation min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearCart}
                className="flex-1 py-3 rounded-xl bg-danger text-white font-display font-semibold text-xs hover:bg-danger/90 transition-all shadow-md touch-manipulation min-h-[44px] flex items-center justify-center gap-1.5"
              >
                <Icon name="Trash2Icon" size={14} />
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
