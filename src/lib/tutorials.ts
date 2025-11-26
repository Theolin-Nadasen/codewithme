import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export type TutorialId = 'learn' | 'profile' | 'projects';

const TUTORIAL_STORAGE_KEY = 'codewithme_tutorials_completed';

// Check if a tutorial has been completed
export function isTutorialCompleted(tutorialId: TutorialId): boolean {
    if (typeof window === 'undefined') return true;

    try {
        const completed = localStorage.getItem(TUTORIAL_STORAGE_KEY);
        if (!completed) return false;

        const completedTutorials: TutorialId[] = JSON.parse(completed);
        return completedTutorials.includes(tutorialId);
    } catch {
        return false;
    }
}

// Mark a tutorial as completed
export function markTutorialCompleted(tutorialId: TutorialId): void {
    if (typeof window === 'undefined') return;

    try {
        const completed = localStorage.getItem(TUTORIAL_STORAGE_KEY);
        const completedTutorials: TutorialId[] = completed ? JSON.parse(completed) : [];

        if (!completedTutorials.includes(tutorialId)) {
            completedTutorials.push(tutorialId);
            localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(completedTutorials));
        }
    } catch (error) {
        console.error('Failed to save tutorial completion:', error);
    }
}

// Tutorial configurations
export const tutorials = {
    learn: {
        steps: [
            {
                element: '#code-editor',
                popover: {
                    title: 'Code Editor',
                    description: 'Write your code here. You can use HTML, CSS, and JavaScript to create interactive projects.',
                    side: 'bottom' as const,
                    align: 'start' as const,
                }
            },
            {
                element: '#run-button',
                popover: {
                    title: 'Run Your Code',
                    description: 'Click this button to execute your code and see the results in the preview window.',
                    side: 'left' as const,
                    align: 'start' as const,
                }
            },
            {
                element: '#preview-window',
                popover: {
                    title: 'Live Preview',
                    description: 'Your code output will appear here. See your creations come to life in real-time!',
                    side: 'top' as const,
                    align: 'start' as const,
                }
            }
        ]
    },
    profile: {
        steps: [
            {
                element: '#project-manager',
                popover: {
                    title: 'Your Projects',
                    description: 'Share your GitHub projects with the community! Add your project links here.',
                    side: 'bottom' as const,
                    align: 'start' as const,
                }
            },
            {
                element: '#add-project-button',
                popover: {
                    title: 'Add a Project',
                    description: 'Click here to add a new GitHub project. You can add multiple projects based on your role.',
                    side: 'left' as const,
                    align: 'start' as const,
                }
            }
        ]
    },
    projects: {
        steps: [
            {
                popover: {
                    title: 'Community Projects',
                    description: 'Welcome to the community projects page! Here you can discover amazing projects built by other members.',
                }
            },
            {
                element: '.project-card',
                popover: {
                    title: 'Project Cards',
                    description: 'Each card shows a project shared by a community member. Click on a project to view it on GitHub.',
                    side: 'top' as const,
                    align: 'start' as const,
                }
            },
            {
                popover: {
                    title: 'Share Your Projects',
                    description: 'Want to share your own projects? Go to your profile page and add your GitHub project links!',
                }
            }
        ]
    }
};

// Create and configure driver instance
export function createTutorial(tutorialId: TutorialId) {
    const config = tutorials[tutorialId];

    return driver({
        showProgress: true,
        showButtons: ['next', 'previous', 'close'],
        steps: config.steps,
        onDestroyed: () => {
            markTutorialCompleted(tutorialId);
        },
        onCloseClick: () => {
            markTutorialCompleted(tutorialId);
        }
    });
}
