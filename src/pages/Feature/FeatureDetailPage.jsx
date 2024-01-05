import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

const FeatureDetailPage = () => {
    const feature = {
        title: 'Sample Feature Title',
        description: 'Sample Feature Description',
        authorName: 'John Doe',
        authorAvatar: 'https://via.placeholder.com/50',
        time: '2 hours ago',
        likeCount: 10,
        commentCount: 5,
        status: 'In Progress',
    };

    const [comment, setComment] = useState('');

    const handleComment = () => {
        console.log('Comment submitted:', comment);
        setComment('');
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{feature.title}</h1>
                <p className="text-gray-600">{feature.description}</p>
            </div>

            <div className="flex items-center mb-4">
                <img src={feature.authorAvatar} alt="Author Avatar" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="text-gray-700 font-semibold">{feature.authorName}</p>
                    <p className="text-gray-500 text-sm">{feature.time}</p>
                </div>
            </div>

            <div className="flex items-center mb-4">
                <button className="flex items-center text-gray-600" onClick={() => console.log('Like clicked')}>
                    <FaHeart className="mr-1" />
                    <span className="text-sm">{feature.likeCount}</span>
                </button>
                <button className="flex items-center text-gray-600 ml-4" onClick={() => console.log('Comment clicked')}>
                    <FaComment className="mr-1" />
                    <span className="text-sm">{feature.commentCount}</span>
                </button>
            </div>

            <div className="mb-6">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                ></textarea>
                <button
                    onClick={handleComment}
                    className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Comment
                </button>
            </div>

            <div className="flex items-center">
                <p className="text-sm text-gray-500 mr-auto">{feature.status}</p>
                <button className="text-blue-500" onClick={() => console.log('Go back')}>
                    Go back
                </button>
                <button className="text-yellow-500 ml-4" onClick={() => console.log('Edit')}>
                    Edit
                </button>
                <button className="text-red-500 ml-4" onClick={() => console.log('Delete')}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FeatureDetailPage;
