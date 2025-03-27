'use client';

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleSignIn = async () => {
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true
      });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <button 
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    >
      Continue with Google
    </button>
  );
}