import React, { useState } from 'react';

const FeatureCard = () => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(0);
    const [status, setStatus] = useState('Pending');

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md my-4 border p-4">

            <div className='flex'>

                {/* title & description */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Feature Title</h2>
                    <p className="text-gray-600 mb-2">
                        Description of the feature goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>

                <div>

                    {/* status */}
                    <span
                        className={`text-sm float-right text-white rounded-full px-2 py-1 ${status === 'Pending'
                            ? 'bg-yellow-500'
                            : status === 'In Progress'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            }`}
                    >
                        {status}
                    </span>

                    {/* user */}
                    <div className="flex items-center mb-2">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Author"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-gray-700 font-semibold">John Doe</span>
                    </div>
                </div>
            </div>



            <div className="flex items-center justify-between">

                {/* like button */}
                <div className="flex items-center">
                    <button
                        onClick={handleLike}
                        className={`flex items-center text-gray-600 ${liked ? 'text-red-500' : ''}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18l-1.45-1.32C4.4 12.34 1 9.28 1 5.5 1 3.02 3.02 1 5.5 1c1.54 0 2.94.78 3.76 2.05C9.56 1.78 10.96 1 12.5 1 14.98 1 17 3.02 17 5.5c0 3.78-3.4 6.84-8.55 11.18L10 18z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Like
                    </button>
                    <span className="text-gray-600 ml-2">{likes}</span>
                </div>

                {/* comment count */}
                <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-1 text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 5a1 1 0 011-1h14a1 1 0 011 1v7a1 1 0 01-1 1h-4.42l-2.89 2.89a1 1 0 01-1.45-1.45L13.15 12H4V6h11v1a1 1 0 11-2 0V5H4v1.41l-1-1V5zm14 2V6H4v1h12zM4 14h8v-1h6v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-gray-600">{comments}</span>
                    </div>
                </div>

                {/* time */}
                <span className="text-gray-500 ml-2">• 2 hours ago</span>

                {/* comment input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="bg-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <button className="absolute right-0 top-0 mt-1 mr-2 focus:outline-none">
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
