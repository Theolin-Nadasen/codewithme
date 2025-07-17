import Projects_Card from "@/components/projects_card"

export default function ProjectsPage(){
    return(
        <div>
            <h1>Projects Page</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center space-y-5">

                <Projects_Card title="MY CARD" description="MY DESCRIPTION" image="next.svg"/>
                <Projects_Card title="MY CARD" description="MY DESCRIPTION" image="vercel.svg"/>
                <Projects_Card title="MY CARD" description="MY DESCRIPTION" image="globe.svg"/>

            </div>
        </div>
    )
}