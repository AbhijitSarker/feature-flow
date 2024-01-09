import React, { useState } from 'react';
import api from '../../utils/handleApi';
import useComments from '../../hooks/useComments';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const Comment = ({ comment, featureId }) => {
    // Fetch comments based on featureId using a custom hook
    const { refetch, } = useComments(featureId)

    // Fetching current user details using a custom hook
    const { user } = useAuth();
    const currentUserEmail = user?.email;

    const [isEditing, setIsEditing] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment.comment);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = () => {
        api.patch(`/comment/${comment._id}/${featureId}`, { comment: updatedComment })
            .then(() => {
                setIsEditing(false);
                refetch();
                toast.success('Successfully updated!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch((error) => {
                console.error('Error updating comment:', error);
            });
    };


    // Function to handle comment deletion
    const handleDelete = (commentId) => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Deleting the comment using an API call
                api.delete(`/comment/${commentId}/${featureId}`)
                    .then(() => {
                        // Refetch comments to update UI after deletion
                        refetch()
                    })
                    .catch((error) => {
                        console.error('Error deleting comment:', error);
                    });

                // Displaying a success message after deleting the feature
                toast.success('Successfully deleted!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        });

    };

    return (
        <div className="flex justify-between mb-4">
            <div className='flex'>
                <img
                    src={comment.photoURL}
                    alt={`${comment.name}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />

                <div>
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={updatedComment}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                className="text-gray-600 text-sm border-b border-gray-300 focus:outline-none"
                            />
                        ) : (
                            <p className="text-gray-600 text-sm">{comment.comment}</p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div className="">
                    {currentUserEmail === comment.email && (
                        <div className="flex items-center justify-between">
                            {isEditing ? (
                                <button
                                    onClick={handleUpdate}
                                    className="text-green-500 hover:text-green-700 focus:outline-none"
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="">
                    {
                        currentUserEmail === comment.email ?
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                            : <></>
                    }

                </div>
            </div>
        </div>
    );
};

export default Comment;