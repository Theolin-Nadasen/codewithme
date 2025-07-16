import Link from "next/link"
import Course_Item_Book from "@/components/course_item_book"

export default function Content() {

    const playlists = [
        {
            title: "learn NextJS fullstack framework",
            id: "PLJyFRzU1s7WPeCHzbnoA40ippYih4e-Dk"
        },
    ]

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="font-extrabold">Learn a Framework or Language</h1>

            <ul>
                {playlists.map((item) => {
                    return (
                        <Link href={"/content/" + item.id + "/" + item.title} key={item.id}>
                            <li className="mt-5">
                                <Course_Item_Book text={item.title}></Course_Item_Book>
                            </li>
                        </Link>
                    )
                })}
            </ul>

        </div>
    )
}