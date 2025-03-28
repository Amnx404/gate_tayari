'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backUrl?: string;
  user?: any;
}

export default function Header({ title, showBackButton, backUrl, user }: HeaderProps) {
  const pathname = usePathname();
  
  const handleLogout = () => {
    signOut();
  };
  
  const isHomePage = pathname === '/';
  const isCreatorFlow = pathname.startsWith('/creatordashboard');
  
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">Brackets</h1>
          </Link>
          <span className="ml-2 text-sm text-neutral-500">
            {title || (isCreatorFlow ? "Creator Portal" : "Educational Platform")}
          </span>
        </div>
        
        <div className="hidden sm:flex space-x-4">
          {isHomePage && (
            <>
              <Button variant="outline" size="sm">About</Button>
              <Button variant="outline" size="sm">Help</Button>
              <Button variant="default" size="sm" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            </>
          )}
          
          {showBackButton && (
            <Button variant="outline" size="sm" asChild>
              <Link href={backUrl || "/"}>
                <span className="flex items-center">
                  ← Back
                </span>
              </Link>
            </Button>
          )}
          
          {user && !isHomePage && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600 hidden md:inline">
                Welcome, {user.name}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleLogout}>
                <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </Button>
            </div>
          )}
        </div>
        
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}