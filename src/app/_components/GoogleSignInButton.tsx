'use client';

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button 
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    >
      Continue with Google
    </button>
  );
}