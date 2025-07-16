'use client'
import { TypeAnimation } from "react-type-animation"

export default function Main_Hero_Section() {
    return (
        <>
            <div className="hidden md:flex h-86 bg-gray-800 opacity-70 flex-row items-center justify-around">

                <h1 className="text-5xl font-extrabold text-green-500">CODE WITH ME</h1>

                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'A developer building engaging digital worlds through websites',
                        1000, // wait 1s before replacing 
                        'A developer building engaging digital worlds through apps',
                        1000,
                        'A developer building engaging digital worlds through games',
                        1000,
                        'A developer building engaging digital worlds through digital content',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                />

            </div>

            <div className="flex md:hidden h-32 bg-gray-800 opacity-70 items-center justify-center">

                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'A developer building engaging digital worlds through websites',
                        1000, // wait 1s before replacing 
                        'A developer building engaging digital worlds through apps',
                        1000,
                        'A developer building engaging digital worlds through games',
                        1000,
                        'A developer building engaging digital worlds through digital content',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '1em', display: 'inline-block', padding: '50px' }}
                    repeat={Infinity}
                />

            </div>
        </>
    )
}