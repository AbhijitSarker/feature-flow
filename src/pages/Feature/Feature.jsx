import React, { useState } from 'react';

const Feature = () => {
    const [votes, setVotes] = useState(10);
    const [comments, setComments] = useState([
        { text: 'Great feature!', author: 'User1' },
        { text: 'Nice work!', author: 'User2' },
        { text: 'Looking forward to using this!', author: 'User3' },
    ]);
    const [newComment, setNewComment] = useState('');
    const [title, setTitle] = useState('New Feature');
    const [description, setDescription] = useState(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus turpis ut felis elementum, vitae euismod tortor ultrices.'
    );

    const handleVote = (type) => {
        if (type === 'upvote') {
            setVotes(votes + 1);
        } else {
            setVotes(votes - 1);
        }
    };
    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const updatedComments = [
                ...comments,
                { text: newComment, author: 'User' },
            ];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-4">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Author Avatar"
                    className="w-10 h-10 rounded-full mr-2"
                />
                <span className="font-semibold">Author Name</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-600">
                    <button
                        onClick={() => handleVote('upvote')}
                        className="flex items-center space-x-1 text-gray-600 hover:text-green-500 focus:outline-none"
                    >
                        Upvote
                    </button>
                    <span>{votes}</span>
                    <button
                        onClick={() => handleVote('downvote')}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 focus:outline-none"
                    >
                        Downvote
                    </button>
                </div>
                {/* Comments count */}
                <div className="flex items-center space-x-1 text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        {/* SVG path for the comment icon */}
                    </svg>
                    <span>{comments.length}</span>
                </div>
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Add a comment"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    onClick={handleAddComment}
                    className="block mt-2 py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                >
                    Comment
                </button>
            </div>

        </div>
    );
};

export default Feature;
