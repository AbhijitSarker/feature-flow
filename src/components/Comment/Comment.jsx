import React from 'react';
import api from '../../utils/handleApi';
import useComments from '../../hooks/useComments';

const Comment = ({ comment, featureId }) => {
    const { refetch } = useComments(featureId)
    // console.log(comment)
    const handleDelete = (commentId) => {
        api.delete(`/comment/${commentId}/${featureId}`)
            .then(() => {
                refetch()
            })
    };

    return (
        <div className="flex items-start mb-4">
            <img
                src={comment.photoURL}
                alt={`${comment.name}'s avatar`}
                className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <button
                        onClick={() => handleDelete(comment._id)}
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