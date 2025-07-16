import Youtube_Playlist from "@/components/youtube_playlist"

interface MySlug {
    params: {
        slug: string[]
    }
}

export default function Watch_Video_Page({ params }: MySlug) {
    return (
        <div className="flex flex-col gap-20 justify-center items-center mt-20">
            <Youtube_Playlist listID={params.slug[0]} />

            <h1>{params.slug[1].replaceAll("%20", " ")}</h1>
        </div>
    )
}