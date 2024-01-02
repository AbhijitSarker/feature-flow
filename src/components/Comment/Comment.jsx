import React from 'react';

const Comment = ({ comment }) => {
    const handleDelete = (commentId) => {
        // Handle comment deletion here
        console.log(`Deleting comment with ID: ${commentId}`);
    };
    return (
        <div className="flex items-start mb-4">
            <img
                src={comment.photoURL}
                alt={`${comment.author}'s avatar`}
                className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{comment.author}</p>
                    <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                        Delete
                    </button>
                </div>
                <p className="text-gray-600 text-sm">{comment.comment}</p>
            </div>
        </div>
    );
};

export default Comment;