'use client'

import React from "react"
import Main_Footer_bar from "./main_footer_bar"

type contentContainerProps = {
    children: React.ReactNode
}

export default function Content_Container({ children }: contentContainerProps) {
    return (
        <div className="flex-grow h-full overflow-y-auto bg-[url(/wicked.svg)] bg-cover flex flex-col">
            <main className="flex-grow">
                {children}
            </main>
            <Main_Footer_bar />
        </div>
    )
}