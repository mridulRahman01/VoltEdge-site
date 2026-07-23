'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const REVIEWS = [
  {
    id: 1,
    name: 'Tanvir Ahmed',
    city: 'Dhaka',
    rating: 5,
    date: 'Jan 15, 2026',
    title: 'Absolute beast for gaming',
    body: 'Bought this for competitive gaming and it absolutely destroys every title at max settings. The 240Hz display is buttery smooth. Thermals are well managed with the triple-fan setup. Build quality feels premium.',
    verified: true,
  },
  {
    id: 2,
    name: 'Sadia Islam',
    city: 'Chittagong',
    rating: 4,
    date: 'Jan 8, 2026',
    title: 'Great performance, runs hot under load',
    body: 'Performance is incredible for the price. Gaming at 1600p with max settings is flawless. Only complaint is it gets quite warm during extended sessions — recommend a cooling pad. Display colors are vivid and accurate.',
    verified: true,
  },
  {
    id: 3,
    name: 'Rakibul Hasan',
    city: 'Sylhet',
    rating: 5,
    date: 'Dec 28, 2025',
    title: 'Worth every taka',
    body: 'After comparing with Dell Alienware and Lenovo Legion, this ROG wins on value. The build quality is exceptional and ASUS service center in Sylhet was helpful. Delivery from VoltEdge was fast — arrived next day.',
    verified: false,
  },
];

const RATING_DIST = [
  { stars: 5, count: 89 },
  { stars: 4, count: 24 },
  { stars: 3, count: 8 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

export default function ProductReviews() {
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const totalReviews = RATING_DIST?.reduce((a, b) => a + b?.count, 0);

  return (
    <div id="reviews" className="mb-16">
      <h2 className="font-display font-bold text-xl text-foreground mb-6 tracking-tight">
        Customer Reviews
      </h2>
      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-surface border border-border rounded-2xl">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="font-display font-bold text-6xl text-accent">4.8</span>
            <div className="flex justify-center mt-1">
              {[1, 2, 3, 4, 5]?.map((s) => (
                <Icon key={s} name="StarIcon" size={16} className="text-warning" variant="solid" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{totalReviews} reviews</p>
          </div>
        </div>
        <div className="space-y-2">
          {RATING_DIST?.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-3">{stars}</span>
              <Icon name="StarIcon" size={12} className="text-warning shrink-0" variant="solid" />
              <div className="flex-1 h-2 bg-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning rounded-full"
                  style={{ width: `${(count / totalReviews) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Review list */}
      <div className="space-y-4 mb-6">
        {REVIEWS?.map((review) => (
          <div key={review?.id} className="p-5 bg-surface border border-border rounded-2xl">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elevated border border-border flex items-center justify-center font-display font-bold text-sm text-accent">
                  {review?.name?.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-sm text-foreground">
                      {review?.name}
                    </span>
                    {review?.verified && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {review?.city} · {review?.date}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0">
                {[1, 2, 3, 4, 5]?.map((s) => (
                  <Icon
                    key={s}
                    name="StarIcon"
                    size={14}
                    className={s <= review?.rating ? 'text-warning' : 'text-border'}
                    variant="solid"
                  />
                ))}
              </div>
            </div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-2">
              {review?.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{review?.body}</p>
          </div>
        ))}
      </div>
      {/* Write review */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-elevated border border-border text-foreground font-display font-semibold text-sm hover:border-accent/40 hover:text-accent transition-all"
        >
          <Icon name="EditIcon" size={16} />
          Write a Review
        </button>
      ) : (
        <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
          <h3 className="font-display font-semibold text-foreground">Write Your Review</h3>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5]?.map((s) => (
                <button
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(s)}
                  className="p-1"
                  aria-label={`Rate ${s} stars`}
                >
                  <Icon
                    name="StarIcon"
                    size={24}
                    className={
                      s <= (hoverRating || selectedRating) ? 'text-warning' : 'text-border'
                    }
                    variant="solid"
                  />
                </button>
              ))}
            </div>
          </div>
          <input
            type="text"
            placeholder="Review title"
            className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors"
          />
          <textarea
            rows={4}
            placeholder="Share your experience with this product..."
            className="w-full px-4 py-3 rounded-xl bg-elevated border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/60 transition-colors resize-none"
          />
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:glow-accent-sm transition-all">
              Submit Review
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 rounded-xl bg-elevated border border-border text-muted-foreground font-display font-semibold text-sm hover:text-foreground transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
