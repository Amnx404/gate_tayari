import Link from "next/link";
import { auth } from "~/server/auth";
import GoogleSignInButton from "~/app/_components/GoogleSignInButton";


export default async function SignIn() {
  const session = await auth();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 max-w-md">
        <h1 className="text-4xl font-bold text-gray-900">
          Brackets
        </h1>
        <h2 className="text-2xl text-gray-700">
          Log in
        </h2>
        
        <div className="w-full space-y-4">
          <GoogleSignInButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Continue with Email
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Signup</Link>
        </p>
      </div>
    </main>
  );
}