'use client';

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";

export default function DashboardHeader({ user }: { user: any }) {
    const handleLogout = () => {
        signOut();
    };

    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
                
                {user && (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-neutral-600 hidden md:inline">
                            Welcome, {user.name}
                        </span>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={handleLogout}
                        >
                            <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}