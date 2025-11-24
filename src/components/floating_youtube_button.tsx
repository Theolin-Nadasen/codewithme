'use client';

import { useState, useEffect, useRef } from 'react';
import { FaYoutube, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { fetchLatestVideos } from '@/app/actions/youtube';

interface Video {
    title: string;
    link: string;
    thumbnail: string;
}

export default function FloatingYoutubeButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close modal when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOpen = async () => {
        if (!isOpen && videos.length === 0) {
            setLoading(true);
            const latestVideos = await fetchLatestVideos();
            setVideos(latestVideos);
            setLoading(false);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2">
            {/* Modal/Popover */}
            {isOpen && (
                <div
                    ref={modalRef}
                    className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-4 w-80 mb-4 mr-12 animate-in slide-in-from-right-10 fade-in duration-200"
                >
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <FaYoutube className="text-red-500" /> Latest Videos
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <FaTimes />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        </div>
                    ) : videos.length > 0 ? (
                        <div className="space-y-4">
                            {videos.map((video, index) => (
                                <a
                                    key={index}
                                    href={video.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="relative rounded-lg overflow-hidden mb-2 border border-gray-700 group-hover:border-red-500 transition-colors">
                                        <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FaExternalLinkAlt className="text-white w-6 h-6" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 group-hover:text-white line-clamp-2 font-medium transition-colors">
                                        {video.title}
                                    </p>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-4">No videos found.</p>
                    )}

                    <div className="mt-4 pt-2 border-t border-gray-700 text-center">
                        <a href="https://www.youtube.com/@codewithme-theo" target="_blank" rel="noopener noreferrer" className="text-xs text-red-400 hover:text-red-300">
                            View Channel
                        </a>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={handleOpen}
                className={`bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'rotate-45 bg-gray-700 hover:bg-gray-600' : ''}`}
                title="Latest Videos"
            >
                {isOpen ? <FaTimes className="w-6 h-6" /> : <FaYoutube className="w-6 h-6" />}
            </button>
        </div>
    );
}
