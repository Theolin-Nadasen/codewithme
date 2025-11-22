'use client';

import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

interface ShareAndBackButtonProps {
    articleTitle: string;
    articleSlug: string;
    isAdmin: boolean; // Add isAdmin prop
}

const ShareAndBackButton: FC<ShareAndBackButtonProps> = ({ articleTitle, articleSlug, isAdmin }) => {
    const router = useRouter(); // Initialize useRouter

    const handleShareX = () => {
        const articleUrl = window.location.origin + `/news/${articleSlug}`;
        const shareText = encodeURIComponent(`Check out this news article: "${articleTitle}"`);
        const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(articleUrl)}`;
        window.open(shareUrl, '_blank');
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this article?")) {
            return;
        }

        try {
            const res = await fetch(`/api/news/${articleSlug}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to delete article.");
            }

            alert("Article deleted successfully!");
            router.push('/news'); // Redirect to news list after deletion
        } catch (error: any) {
            alert(`Error deleting article: ${error.message}`);
            console.error("Error deleting article:", error);
        }
    };

    return (
        <div className="flex justify-start items-center">
            <Link href={'/news'}>
                <button className="m-5 bg-blue-300 text-black font-bold p-2 rounded-2xl cursor-pointer">Back</button>
            </Link>
            <button
                onClick={handleShareX}
                className="m-5 bg-green-300 text-black font-bold p-2 rounded-2xl cursor-pointer flex items-center space-x-2"
            >
                <FaXTwitter className="w-5 h-5" />
                <span>Share</span>
            </button>
            {isAdmin && ( // Conditionally render delete button
                <button
                    onClick={handleDelete}
                    className="m-5 bg-red-500 text-white font-bold p-2 rounded-2xl cursor-pointer"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default ShareAndBackButton;