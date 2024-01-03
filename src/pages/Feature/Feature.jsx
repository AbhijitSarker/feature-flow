import React, { useEffect, useState } from 'react';
import Comments from '../../components/Comments/Comments';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/handleApi';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';
import useComments from '../../hooks/useComments';
import { FaHeart } from 'react-icons/fa6';

const Feature = () => {
    const { user } = useAuth(); // Using the useAuth hook to get user information
    // Extracting the user's information 
    const currenUserName = user?.displayName;
    const photoURL = user?.photoURL
    const userEmail = user?.email

    const { id } = useParams(); // Getting the 'id' parameter from the URL using useParams
    const navigate = useNavigate(); // Getting the navigate function from useNavigate
    const { refetch, } = useComments(id); // Using the useComments custom hook to fetch comments
    // State variables to manage feature details, comments, and new comment input
    const [loading, setLoading] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const [feature, setFeature] = useState({})

    const { _id, title, description, userName, userAvatar, likes } = feature;


    // Fetching feature details on component mount
    useEffect(() => {
        setLoading(true)
        api.get(`/feature/${id}`)
            .then((data) => {
                setFeature(data.data.feature);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false);
            });
    }, []);

    // fetching comments
    useEffect(() => {
        setLoading(true)
        api.get(`/comment/?featureId=${id}`)
            .then((data) => {
                setComments(data.data.comments)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false);
            });
    }, []);


    //fetching likes
    useEffect(() => {
        // Set the initial likes count when the component mounts
        setLikesCount(likes?.length);

        // Check if the feature is liked by the current user and update state accordingly
        const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${userEmail}`)) || [];

        if (likedFeatures.includes(_id)) {
            setLiked(true);
        }
    }, [likes, _id, userEmail]);


    const handleLike = async () => {
        try {
            // Send a request to like/unlike the feature based on the current liked status
            const response = await api.put(`/feature/${_id}/like`, { email: userEmail });

            if (response.status === 200) {
                const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${userEmail}`)) || [];

                if (liked && likedFeatures.includes(_id)) {
                    setLikesCount(likesCount - 1);
                    const updatedLikedFeatures = likedFeatures.filter((id) => id !== _id);
                    localStorage.setItem(`likedFeatures_${userEmail}`, JSON.stringify(updatedLikedFeatures));
                } else {
                    setLikesCount(likesCount + 1);
                    localStorage.setItem(`likedFeatures_${userEmail}`, JSON.stringify([...likedFeatures, _id]));
                }
                setLiked(!liked);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };


    // Function to handle the deletion of a feature
    const handleDeleteFeature = () => {
        // Displaying a confirmation modal before deleting the feature
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Deleting the feature using an API call and navigating back to home on success
                api.delete(`/feature/${id}`)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error deleting feature:', error);
                    });

                // Displaying a success message after deleting the feature
                Swal.fire({
                    title: "Deleted Successfully!",
                    icon: "success"
                });
            }
        });

    };

    // Function to add a new comment to a feature
    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            try {
                // Adding a new comment using an API call and updating the comments state
                const response = await api.post(`/comment`, {
                    comment: newComment,
                    name: currenUserName,
                    featureId: id,
                    photoURL: photoURL
                });
                // Updating the comments state and refetching comments after adding a new comment
                const updatedComments = [...comments, response.data];
                setComments(updatedComments);
                refetch();
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);

            }
        }
    };

    if (loading) {
        return <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className='flex justify-between'>
                <div className="flex items-center mb-4">
                    <img
                        src={userAvatar}
                        alt="Author Avatar"
                        className="w-10 h-10 rounded-full mr-2"
                    />
                    <span className="font-semibold">{userName}</span>
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

                <div className="flex text-xl items-center">
                    <button onClick={handleLike} className={`flex items-center text-gray-600 ${liked ? 'text-red-500' : ''}`}>
                        <FaHeart />
                        <p className='ml-1'>{liked ? 'Unlike' : loading ? 'Liking' : 'Like'}</p>
                    </button>
                    <span className="text-gray-600 ml-2">{likesCount}</span>
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
