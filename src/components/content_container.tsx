'use client'

import React from "react"

type contentContainerProps = {
    children : React.ReactNode
}

export default function Content_Container({children} : contentContainerProps) {
    return (
        <div className="flex-grow bg-[url(/wicked.svg)] bg-cover">
            {children}
        </div>
    )
}