import { auth } from "~/server/auth";
import CreatorSidebar from "~/app/_components/CreateSidebar";
import Header from "~/app/Header";

export default async function CreatorDashboard() {
    const session = await auth();

    // Temporary stats data
    const statsData = {
        published: 0,
        drafts: 0,
        totalQuestions: 0,
    };

    if (!session) {
        return <div>Please log in to access the creator dashboard</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Header 
                title="Creator Dashboard"
                user={session.user}
            />
            
            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="flex flex-col md:flex-row gap-6">
                    <CreatorSidebar 
                        user={session.user} 
                        statsData={statsData}
                    />
                    <div className="flex-1 bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Welcome to your Creator Dashboard</h2>
                        <p>Start creating and managing your question banks here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}