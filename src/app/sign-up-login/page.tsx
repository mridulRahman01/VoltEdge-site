import React from 'react';
import AuthClient from '@/app/sign-up-login/components/AuthClient';

export const metadata = {
  title: 'Sign In — VoltEdge',
  description: 'Sign in or create your VoltEdge account to track orders, save wishlists, and access EMI options.',
};

export default function SignUpLoginPage() {
  return <AuthClient />;
}