import React, { useEffect, useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import api from '../../utils/handleApi';
import useAuth from '../../hooks/useAuth';
import useComments from '../../hooks/useComments';

const FeatureCard = ({ feature }) => {
    const { title, description, _id, userAvatar, userName, likes } = feature;
    const { refetch, } = useComments(_id); // Using the useComments custom hook to fetch comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [status, setStatus] = useState('In Progress');
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth()
    const userEmail = user?.email
    const currentUserName = user?.displayName
    const photoURL = user?.photoURL


    // fetching comments
    useEffect(() => {
        setLoading(true)
        api.get(`/comment/?featureId=${_id}`)
            .then((data) => {
                setComments(data.data.comments)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false);
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

    useEffect(() => {
        // Set the initial likes count when the component mounts
        setLikesCount(likes.length);

        // Check if the feature is liked by the current user and update state accordingly
        const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${userEmail}`)) || [];

        if (likedFeatures.includes(_id)) {
            setLiked(true);
        }
    }, [likes, _id, userEmail]);


    const handleLike = async () => {
        try {
            // Send a request to like/unlike the feature based on the current liked status
            const response = await api.put(`/feature/${_id}/like`, { email: userEmail }); // Replace with your API endpoint

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


    return (
        <div className="bg-white   text-primary rounded-lg shadow-md my-4 border p-4">

            <Link to={`/feature/${_id}`}>
                <div className='flex flex-col md:flex-row justify-between'>

                    {/* title & description */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{title}</h2>
                        <p className="text-gray-600 mb-2"> {description}</p>
                    </div>

                    <div className='flex flex-col  gap-4'>
                        {/* status */}
                        <div className={`text-white text-center rounded-xl px-4 py-2 ${status === 'Pending' ? 'bg-yellow-500' : status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'}`}>{status} </div>


                    </div>
                </div>

            </Link>


            <div className="flex items-center md:flex-row flex-col justify-between">
                <div className='w-full flex justify-between items-center my-2'>
                    <div className='flex gap-5 items-center flex-col md:flex-row'>
                        <div className='flex flex-col items-center'>
                            {/* user */}
                            <div className="flex items-center ">
                                <img src={userAvatar || 'https://avatar.iran.liara.run/public/46'} alt="Author" className="w-8 h-8 rounded-full mr-2" />


                                <div className="flex flex-col ">
                                    <span className="text-gray-700 font-semibold">{userName || "John Doe"}</span>
                                    <span className="text-gray-500"> 2 hours ago</span>

                                </div>
                            </div>
                            <div className='flex gap-3'>
                                {/* like button */}


                                <div className="flex text-xl items-center">
                                    <button onClick={handleLike} className={`flex items-center text-gray-600 ${liked ? 'text-red-500' : ''}`}>
                                        <FaHeart />
                                        <p className='ml-1'>{liked ? 'Unlike' : loading ? 'Liking' : 'Like'}</p>
                                    </button>
                                    <span className="text-gray-600 ml-2">{likesCount}</span>
                                </div>

                                {/* comment count */}
                                <div className="flex items-center  text-xl text-gray-600">
                                    <div>
                                        <FaComment></FaComment>
                                    </div>
                                    <span className="text-gray-600 ml-1">{comments.length}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* comment input */}
                <div className="m-4 flex">
                    <input
                        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-primary border-gray-200 bg-white focus:border"
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment} className="px-8 rounded-r-lg bg-primary  text-white font-bold p-4 uppercase border-t border-b border-r border-primary">Comment</button>
                </div>

            </div>
        </div>
    );
};

export default FeatureCard;
