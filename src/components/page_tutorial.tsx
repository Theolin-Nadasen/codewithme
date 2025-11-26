'use client'

import { useEffect } from 'react'
import { createTutorial, isTutorialCompleted, type TutorialId } from '@/lib/tutorials'

interface PageTutorialProps {
    tutorialId: TutorialId
    delay?: number
}

export default function PageTutorial({ tutorialId, delay = 1000 }: PageTutorialProps) {
    useEffect(() => {
        // Check if tutorial has been completed
        if (isTutorialCompleted(tutorialId)) {
            return
        }

        // Wait for page to fully load and elements to be available
        const timer = setTimeout(() => {
            const tutorial = createTutorial(tutorialId)
            tutorial.drive()
        }, delay)

        return () => clearTimeout(timer)
    }, [tutorialId, delay])

    return null
}
