import Link from "next/link"

interface Iparams{
    title : string
    description : string
    link? : string
}

export default function Homepage_Cards({title, description, link} : Iparams){


    return(
        <div className="bg-gray-700 w-[60%] md:w-[40%] text-center rounded-2xl border-2 border-green-300 shadow-md shadow-green-300">
            <h1 className="font-extrabold my-2">{title}</h1>
            <hr className="w-[80%] mx-auto"/>
            <p className="my-2">{description}</p>

            {link ?
            <Link href={link}>
                <button className="m-2 py-2 px-5 border-2 border-black rounded-2xl bg-gray-800 hover:bg-gray-900 cursor-pointer">view</button>
            </Link>

            :

            null
            }
        </div>
    )
}