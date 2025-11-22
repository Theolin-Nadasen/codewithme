'use client'

import React from "react"

type contentContainerProps = {
    children : React.ReactNode
}

export default function Content_Container({children} : contentContainerProps) {
    return (
        <div className="flex-grow h-full overflow-y-auto bg-[url(/wicked.svg)] bg-cover">
            {children}
        </div>
    )
}