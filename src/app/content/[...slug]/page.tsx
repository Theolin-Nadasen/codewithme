import Youtube_Playlist from "@/components/youtube_playlist"
import { Descriptions } from "./descriptions";
import Course_Description_card from "@/components/course_description_card";

type descriptionKey = keyof typeof Descriptions;

function isDescriptionKey(key : string) : key is descriptionKey {
    return key in Descriptions;
}

interface MySlug {
    params: {
        slug: string[]
    }
};

export default async function Watch_Video_Page({ params }: MySlug) {
    const title = await params.slug[1].replaceAll("%20", " ");
    const listID = await params.slug[0];
    const descriptionID = await params.slug[2];

    const fullListURL = "https://www.youtube.com/playlist?list=" + listID;
    
    let description = "Description not found"

    if (isDescriptionKey(descriptionID)){
        description = Descriptions[descriptionID]
    }

    return (
        <div className="flex flex-col md:flex-row gap-20 justify-center items-center mt-20">
            <Youtube_Playlist listID={listID} />

            <Course_Description_card title={title} description={description} videoURL={fullListURL}/>

        </div>
    )
}