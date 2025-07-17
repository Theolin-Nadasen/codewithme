import Projects_Card from "@/components/projects_card"


export default function ProjectsPage(){
    
    const Projects = [
        {
            title : "Stone Programming Language",
            description : "An interpreted programming language built in C",
            image : "/icons/code.svg",
            link : "https://github.com/Theolin-Nadasen/stone"
        }
    ];
    
    return(
        <div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center space-y-5">

                {Projects.map(item => {
                    return (
                        <Projects_Card key={item.title} title={item.title} description={item.description} image={item.image} link={item.link}/>
                    )
                })}

            </div>

        </div>
    )
}