import React from 'react';
import Comment from '../Comment/Comment';
import useComments from '../../hooks/useComments';

const Comments = ({ featureId }) => {
    // Using the useComments hook to fetch comments based on the featureId
    const { comments, isLoading, isError } = useComments(featureId);

    const foundComments = comments?.comments; // Extracting comments from the API response

    // Display loading spinner while comments are being fetched
    if (isLoading) {
        return <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    // Display an error message if there's an issue fetching comments
    if (isError) {
        return <p className='text-headingText' >Error fetching comments</p>;
    }

    return (
        <div className="w-full my-10">
            <h2 className="text-lg text-headingText font-semibold mb-4">Comments</h2>
            {foundComments && foundComments.length > 0 ? (
                foundComments.map((comment) => <Comment key={comment._id} comment={comment} featureId={featureId}></Comment>)
            ) : (
                <p className='text-headingText'>No comments available</p>
            )}
        </div>
    );
};

export default Comments;
