import { auth } from "~/server/auth";
import Link from "next/link";
import DashboardHeader from "../_components/DashboardHeader"; 

export default async function Home() {
    const session = await auth();

    return (
        <div className="min-h-screen">
            <DashboardHeader user={session?.user} />

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)] p-4">
                <div className="mb-4">
                    {session ? <>{session.user.name}</> : <>{'not logged in'}</>}
                </div>
                
                <div className="flex flex-col gap-4">
                    <Link 
                        href="/creatordashboard" 
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Creator Dashboard
                    </Link>
                    <Link 
                        href="/learnerdashboard" 
                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Learner Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}