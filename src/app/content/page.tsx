import Link from "next/link"
import Course_Item_Book from "@/components/course_item_book"

export default function Content() {

    const playlists = [
        {
            title: "Learn Web Basics (HTML CSS JAVASCRIPT)",
            id: "PLJyFRzU1s7WMjVtgf_2l_GqdOmtDMILpD"
        },
        {
            title: "Learn React For Front End",
            id: "PLJyFRzU1s7WNTrNnKqZDRE6e0ADx8z13B"
        },
        {
            title: "Learn NodeJS For Back End",
            id: "PLJyFRzU1s7WMgNdCvOZOl_Or81989FM8b"
        },
        {
            title: "Learn NextJS Fullstack Framework",
            id: "PLJyFRzU1s7WPeCHzbnoA40ippYih4e-Dk"
        },
    ]

    return (
        <div className="flex flex-col md:flex-row justify-center gap-10">

            <div className="flex flex-col items-center mt-20">
                <h1 className="font-extrabold">Learn a Framework or Language</h1>

                <ul>
                    {playlists.map((item) => {
                        return (
                            <Link href={"/content/" + item.id + "/" + item.title} key={item.id}>
                                <li className="mt-5 max-w-[300] md:max-w-full">
                                    <Course_Item_Book text={item.title}></Course_Item_Book>
                                </li>
                            </Link>
                        )
                    })}
                </ul>

            </div>
            
            <div className="flex flex-col items-center mt-20">
                <h1 className="font-extrabold">Learn a Framework or Language</h1>

                <ul>
                    {playlists.map((item) => {
                        return (
                            <Link href={"/content/" + item.id + "/" + item.title} key={item.id}>
                                <li className="mt-5 max-w-[300] md:max-w-full">
                                    <Course_Item_Book text={item.title}></Course_Item_Book>
                                </li>
                            </Link>
                        )
                    })}
                </ul>

            </div>

        </div>
    )
}