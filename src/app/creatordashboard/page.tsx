import { auth } from "~/server/auth";
import CreatorSidebar from "~/app/_components/CreateSidebar";
import Header from "~/app/Header";
import QuestionBanksList from "../_components/QuestionBankList";
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
                    <QuestionBanksList />
                </div>
            </div>
        </div>
    );
}