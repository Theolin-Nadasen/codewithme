import { db } from "@/lib/db";
import Link from "next/link";

interface SlugParams{
    params : Promise<{
        slug : string
    }>
}

interface Article{
    id : number;
    title : string;
    content : string;
    created_at : Date
}

export default async function NewsArticle({params} : SlugParams){

    const slug = (await params).slug
    const result = db.query("SELECT * FROM articles WHERE ID = $1", [slug])
    
    const article : Article = (await result).rows[0]

    return(
        <div className="h-full">
            {article ?
                <div className="m-5 p-5 h-[80%] bg-black border border-green-300 rounded-2xl overflow-y-auto">
                    <h1 className="text-center font-extrabold text-3xl">{article.title}</h1>
                    <hr />
                    <p className="mt-20">{article.content}</p>
                </div>

                :

                <h1>failed to load</h1>
            }

            <Link href={'/news'}>
                <button className="m-5 bg-blue-300 text-black font-bold p-2 rounded-2xl cursor-pointer">Back</button>
            </Link>
        </div>
    )

}
