import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Comment from '../Comment/Comment';
import api from '../../utils/handleApi'; // Import your API utility functions

const Comments = ({ featureId }) => {
    const { refetch, data: comments = [], isLoading, isError } = useQuery({
        queryKey: ['comment', featureId], // Unique query identifier
        queryFn: async () => {
            const response = await api.get(`/comment?featureId=${featureId}`)
            return response.data;
        },
    })
    const foundComments = comments?.comments;

    if (isLoading) {
        return <div class=" flex justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    if (isError) {
        return <p>Error fetching comments</p>;
    }

    return (
        <div className="w-full my-10">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            {foundComments && foundComments.length > 0 ? (
                foundComments.map((comment) => <Comment key={comment.id} comment={comment}></Comment>)
            ) : (
                <p>No comments available</p>
            )}
        </div>
    );
};

export default Comments;
