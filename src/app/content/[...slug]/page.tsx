import Youtube_Playlist from "@/components/youtube_playlist"
import { Descriptions } from "./descriptions";
import Course_Description_card from "@/components/course_description_card";
import Link from "next/link";

type descriptionKey = keyof typeof Descriptions;

function isDescriptionKey(key: string): key is descriptionKey {
    return key in Descriptions;
}

interface MySlug {
    params: Promise<{
        slug: string[]
    }>
};

export default async function Watch_Video_Page({ params }: MySlug) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const title = slug[1].replaceAll("%20", " ");
    const listID = slug[0];
    const descriptionID = slug[2];

    const fullListURL = "https://www.youtube.com/playlist?list=" + listID;

    let description = "Description not found"

    if (isDescriptionKey(descriptionID)) {
        description = Descriptions[descriptionID]
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/content" className="inline-flex items-center text-gray-400 hover:text-green-400 transition-colors mb-4">
                        ← Back to Learning Paths
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-green-400">
                        {title}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20">
                            <Youtube_Playlist listID={listID} />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <Course_Description_card title={title} description={description} videoURL={fullListURL} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}