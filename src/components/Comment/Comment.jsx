import React from 'react';
import api from '../../utils/handleApi';
import useComments from '../../hooks/useComments';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'

const Comment = ({ comment, featureId }) => {
    // Fetch comments based on featureId using a custom hook
    const { refetch, } = useComments(featureId)

    // Fetching current user details using a custom hook
    const { user } = useAuth();
    const currentUserEmail = user?.email;

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
                Swal.fire({
                    title: "Deleted Successfully!",
                    icon: "success"
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
                    <p className="text-gray-600 text-sm">{comment.comment}</p>
                </div>
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
    );
};

export default Comment;