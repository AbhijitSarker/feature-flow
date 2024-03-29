import React, { useEffect, useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import api from '../../utils/handleApi';
import useAuth from '../../hooks/useAuth';
import useComments from '../../hooks/useComments';
import verifyUser from '../../utils/verifyUser';
import { toast } from 'react-toastify';

const FeatureCard = ({ feature }) => {
    // Destructuring feature properties
    const { title, description, _id, userAvatar, userName, likes, createdAt, status } = feature;

    // Formatting date and time from createdAt property
    const date = new Date(createdAt);
    const formattedTime = date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    const formattedDateTime = `${formattedTime}, ${formattedDate}`;


    // State variables to manage comments, new comment input, likes, and loading status
    const { refetch, } = useComments(_id); // Using the useComments custom hook to fetch comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);

    // Retrieving user information using useAuth hook
    const { user } = useAuth()
    const userEmail = user?.email
    const currentUserName = user?.displayName
    const photoURL = user?.photoURL || 'https://avatar.iran.liara.run/public/46'


    // Fetching comments on component mount
    useEffect(() => {
        api.get(`/comment/?featureId=${_id}`)
            .then((data) => {
                setComments(data.data.comments)
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
            });
    }, []);

    // Function to add a new comment to a feature
    const handleAddComment = async (e) => {
        e.preventDefault();
        setLoadingComment(true);
        if (newComment.trim() !== '') {
            try {
                // Adding a new comment using an API call and updating the comments state
                const response = await api.post(`/comment`, {
                    comment: newComment,
                    email: userEmail,
                    name: currentUserName,
                    featureId: _id,
                    photoURL: photoURL
                });
                // Updating the comments state and refetching comments after adding a new comment
                const updatedComments = [...comments, response.data];
                setComments(updatedComments);
                refetch();
                setNewComment('');
                setLoadingComment(false)
                toast.success('Comment Added!', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error('Error adding comment:', error);
                setLoadingComment(false)
            }
        }
    };

    // Fetching comments count
    useEffect(() => {
        // Set the initial likes count when the component mounts
        setLikesCount(likes.length);

        // Check if the feature is liked by the current user and update state accordingly
        const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${userEmail}`)) || [];

        if (likedFeatures.includes(_id)) {
            setLiked(true);
        }
    }, [likes, _id, userEmail]);


    // Handling like functionality for a feature
    const handleLike = async () => {
        try {
            setLoading(true);
            // Send a request to like/unlike the feature based on the current liked status
            const response = await api.put(`/feature/${_id}/like`, { email: userEmail });

            if (response.status === 200) {
                // Retrieve liked features for the current user from localStorage or initialize as an empty array
                const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${userEmail}`)) || [];

                if (liked && likedFeatures.includes(_id)) {
                    // If the feature is already liked and found in the user's liked features, remove the like
                    setLikesCount(likesCount - 1);
                    // Remove the feature ID from liked features array
                    const updatedLikedFeatures = likedFeatures.filter((id) => id !== _id);
                    // Update the liked features in localStorage
                    localStorage.setItem(`likedFeatures_${userEmail}`, JSON.stringify(updatedLikedFeatures));
                } else {
                    // If the feature is not liked or not found in the user's liked features, add the like
                    setLikesCount(likesCount + 1);
                    // Add the feature ID to liked features array in localStorage
                    localStorage.setItem(`likedFeatures_${userEmail}`, JSON.stringify([...likedFeatures, _id]));
                }
                setLoading(false);
                setLiked(!liked); // Update the liked state to toggle between liking and unliking
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };


    return (

        <div className="w-full section-bg rounded border border-gray-900 shadow-xl shadow-black flex flex-col justify-between overflow-hidden ">
            <div className="p-8">
                <Link to={`/feature/${_id}`}><h2 className="text-xl mb-4 text-gray-300 font-semibold hover:underline">{title}</h2></Link>
                <p className="text-gray-400 text-base">{description}</p>
            </div>

            <div>
                {/* author info */}
                <div className="p-4 border-t border-gray-800 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <img
                                src={userAvatar}
                                alt="Author"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <div>
                                <span className="text-gray-400 font-semibold">{userName}</span>
                                <span className="text-gray-500 block">{formattedDateTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* status */}
                    <div className="flex items-center">
                        <div className={`text-white text-center rounded-xl px-4 py-2 ${status === 'Pending' ? 'bg-yellow-500' : status === 'In-Progress' ? 'bg-blue-500' : 'bg-green-500'}`}>{status} </div>
                    </div>
                </div>


                {/* voting and counts */}
                <div className="md:flex justify-between section-bg px-4 py-2">
                    <div className='flex gap-3 my-2'>
                        {/* like button */}
                        <div className="flex items-center">
                            <button onClick={user ? handleLike : verifyUser} className={`flex text-3xl items-center text-gray-500 ${liked ? 'text-secondary' : ''}`}>
                                <FaHeart />
                                <p className='ml-2 text-xl'>{liked ? 'Unvote' : loading ? 'Voting' : 'Vote'}</p>
                            </button>
                            <span className="text-gray-200 ml-2 text-xl">{likesCount}</span>
                        </div>

                        {/* comment count */}
                        <div className="flex items-center text-3xl text-gray-500">
                            <FaComment></FaComment>
                            <span className="text-gray-200 text-xl ml-2">{comments.length}</span>
                        </div>
                    </div>

                    {/* comment input */}
                    <div className="flex  items-center max-w-md bg-transparent border border-gray-600 rounded">
                        <div className="w-full">
                            <input type="text"
                                className="w-full px-4 bg-transparent text-white focus:outline-none"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            />
                        </div>
                        <div className='h-full'>
                            <button onClick={user ? handleAddComment : verifyUser} type="submit" className="flex items-center h-full gradient-bg justify-center px-2  py-2 text-white rounded-r"
                            > {loadingComment ? 'adding' : 'Comment'}</button>
                        </div>
                    </div>


                </div>

            </div>
        </div>

    );
};

export default FeatureCard;
