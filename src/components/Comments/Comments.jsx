import React from 'react';
import Comment from '../Comment/Comment';

const Comments = () => {
    const comments = [
        {
            id: 1,
            avatar: 'https://via.placeholder.com/50',
            author: 'John Doe',
            content: 'This is the first comment.',
        },
        {
            id: 2,
            avatar: 'https://via.placeholder.com/50',
            author: 'Jane Smith',
            content: 'Another comment here.',
        },
    ];

    return (
        <div className="w-full my-10">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment}></Comment>
            ))}
        </div>
    );
};

export default Comments;
