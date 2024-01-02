import React, { useEffect, useState } from 'react';
import Comments from '../../components/Comments/Comments';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/handleApi';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';

const Feature = () => {

    const { user } = useAuth();
    const userName = user?.displayname;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState('');
    const [votes, setVotes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');


    const { id } = useParams(); // Getting the 'id' parameter from the URL
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/feature/${id}`)
            .then((data) => {
                setTitle(data.data.feature.title);
                setDescription(data.data.feature.description);
                setAuthor(data.data.feature.userName);
                setAuthorAvatar(data.data.feature.userAvatar);
                setVotes(data.data.feature.votes);
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
            });
    }, []);


    const handleVote = (type) => {
        if (type === 'upvote') {
            setVotes(votes + 1);
        } else {
            setVotes(votes - 1);
        }
    };
    const handleDeleteFeature = () => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/feature/${id}`)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error deleting feature:', error);
                    });
                Swal.fire({
                    title: "Deleted Successfully!",
                    icon: "success"
                });
            }
        });

    };

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            await api.post(`/comment`, {
                comment: newComment, name: userName, featureId: id
            }) // Assuming the endpoint to add a comment is '/comments/: id'
                .then((response) => {
                    //  the response returns the newly created comment
                    console.log(response.data);
                    const updatedComments = [...comments, response.data];
                    console.log(updatedComments)
                    setComments(updatedComments);
                    setNewComment('');
                })
                .catch((error) => {
                    console.error('Error adding comment:', error);
                    // Handle error (e.g., show an error message to the user)
                });
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className='flex justify-between'>
                <div className="flex items-center mb-4">
                    <img
                        src={authorAvatar}
                        alt="Author Avatar"
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <span className="font-semibold">{author}</span>
                </div>
                <div>
                    <Link to={'/'}>
                        <button className="block mt-2 py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"> Go Back </button>
                    </Link>
                    <button
                        onClick={handleDeleteFeature}
                        className="block mt-2 py-2 px-4 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600"
                    >
                        Delete Feature
                    </button>
                    <Link to={`/editfeature/${id}`}><button className="block mt-2 py-2 px-4 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600">
                        Edit Feature
                    </button></Link>
                </div>
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
            <Comments featureId={id}></Comments>
        </div>
    );
};

export default Feature;
