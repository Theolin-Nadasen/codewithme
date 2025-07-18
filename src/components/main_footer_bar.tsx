'use client'
export default function Main_Footer_bar(){
    return(
        <footer className="flex justify-center opacity-30 md:opacity-50 bg-gray-800 mt-5 py-5">
            <p className="mb-2">© {new Date().getFullYear()} Theolin Nadasen. All Rights Reserved.</p>
        </footer>
    )
}