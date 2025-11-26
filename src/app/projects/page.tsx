import SimpleProjectCard from "@/components/simple_project_card"
import Github_Button from "@/components/github_button"
import Link from "next/link"
import { getAllProjects } from "@/actions/projects"
import PageTutorial from "@/components/page_tutorial"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    const projects = await getAllProjects()

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <PageTutorial tutorialId="projects" delay={1500} />
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center mb-12 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-400">
                        Community Projects
                    </h1>
                    <p className="text-gray-400 text-center max-w-2xl">
                        Discover amazing projects built by our community members. Share your own work by adding it to your profile!
                    </p>
                    <Link href={"https://github.com/Theolin-Nadasen"}>
                        <Github_Button />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map(project => (
                        <SimpleProjectCard
                            key={project.id}
                            className="project-card"
                            title={project.name}
                            creator={project.user?.name || 'Anonymous'}
                            creatorId={project.userId}
                            link={project.link}
                        />
                    ))}

                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-gray-800/30 rounded-2xl border border-gray-700/50 border-dashed">
                            <p className="text-gray-400 text-lg">No projects shared yet. Be the first!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}