import React, { useEffect, useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import api from '../../utils/handleApi';
import useAuth from '../../hooks/useAuth';
import useComments from '../../hooks/useComments';
import verifyUser from '../../utils/verifyUser';

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

    // Retrieving user information using useAuth hook
    const { user } = useAuth()
    const userEmail = user?.email
    const currentUserName = user?.displayName
    const photoURL = user?.photoURL


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
    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            try {
                // Adding a new comment using an API call and updating the comments state
                const response = await api.post(`/comment`, {
                    comment: newComment,
                    name: currentUserName,
                    featureId: _id,
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

        <div className="w-full mx-auto border my-10 bg-white rounded-md shadow-md overflow-hidden ">
            <div className="p-4">
                <Link to={`/feature/${_id}`}><h2 className="text-xl text-primary font-semibold hover:underline">{title}</h2></Link>
                <p className="text-gray-600">{description}</p>
            </div>

            {/* author info */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <img
                            src={userAvatar}
                            alt="Author"
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <div>
                            <span className="text-gray-700 font-semibold">{userName}</span>
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
            <div className="md:flex justify-between bg-gray-200 px-4 py-2">
                <div className='flex gap-3 my-2'>
                    {/* like button */}
                    <div className="flex items-center">
                        <button onClick={user ? handleLike : verifyUser} className={`flex text-3xl items-center text-gray-500 ${liked ? 'text-red-500' : ''}`}>
                            <FaHeart />
                            <p className='ml-2 text-xl'>{liked ? 'Unvote' : loading ? 'Voting' : 'Vote'}</p>
                        </button>
                        <span className="text-gray-600 ml-2 text-xl">{likesCount}</span>
                    </div>

                    {/* comment count */}
                    <div className="flex items-center text-3xl text-gray-500">
                        <FaComment></FaComment>
                        <span className="text-gray-600 text-xl ml-2">{comments.length}</span>
                    </div>
                </div>

                {/* comment input */}
                <form className="flex  ">
                    <input
                        className="rounded-l-lg w-40 md:w-max p-2 border-t border-b border-l text-primary border-gray-200 bg-white"
                        type="text"
                        required
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={user ? handleAddComment : verifyUser} className="px-3 rounded-r-lg bg-primary  text-white font-bold py-1 uppercase ">Comment</button>
                </form>

            </div>
        </div>

    );
};

export default FeatureCard;
