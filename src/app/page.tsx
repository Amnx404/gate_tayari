import Link from "next/link";
import { auth } from "~/server/auth";
import { Button } from "~/components/ui/button";
import GoogleSignInButton from "~/app/_components/GoogleSignInButton";


export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 max-w-md">
        <h1 className="text-4xl font-bold text-gray-900">
          Brackets
        </h1>
        <h2 className="text-2xl text-gray-700">
          Hello and welcome to Brackets!
          Click here to get started.
        </h2>
        <div className="flex gap-4">
          <Link href="/signup">
            <Button variant="default">
              Get Started
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="secondary">
              Login
            </Button>
          </Link>
        </div>
        
      </div>
    </main>
  );
}