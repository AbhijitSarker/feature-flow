import React, { useEffect, useState } from 'react';
import Comments from '../../components/Comments/Comments';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/handleApi';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';
import useComments from '../../hooks/useComments';
import { FaComment, FaHeart } from 'react-icons/fa6';

const Feature = () => {
    const { user } = useAuth(); // Using the useAuth hook to get user information
    // Extracting the user's information 
    const currenUserName = user?.displayName;
    const photoURL = user?.photoURL
    const currentUserEmail = user?.email


    const { id } = useParams(); // Getting the 'id' parameter from the URL using useParams
    const navigate = useNavigate(); // Getting the navigate function from useNavigate
    const { refetch, } = useComments(id); // Using the useComments custom hook to fetch comments

    // State variables to manage feature details, comments, and new comment input
    const [loading, setLoading] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [loadingComment, setLoadingComment] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const [feature, setFeature] = useState({})

    const { _id, title, description, userName, userAvatar, likes, createdAt, userEmail } = feature;

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
        const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${currentUserEmail}`)) || [];

        if (likedFeatures.includes(_id)) {
            setLiked(true);
        }
    }, [likes, _id, currentUserEmail]);


    const handleLike = async () => {
        try {
            setLoadingLike(true);
            // Send a request to like/unlike the feature based on the current liked status
            const response = await api.put(`/feature/${_id}/like`, { email: currentUserEmail });

            if (response.status === 200) {
                const likedFeatures = JSON.parse(localStorage.getItem(`likedFeatures_${currentUserEmail}`)) || [];

                if (liked && likedFeatures.includes(_id)) {
                    setLikesCount(likesCount - 1);
                    const updatedLikedFeatures = likedFeatures.filter((id) => id !== _id);
                    localStorage.setItem(`likedFeatures_${currentUserEmail}`, JSON.stringify(updatedLikedFeatures));
                } else {
                    setLikesCount(likesCount + 1);
                    localStorage.setItem(`likedFeatures_${currentUserEmail}`, JSON.stringify([...likedFeatures, _id]));
                }
                setLiked(!liked);
                setLoadingLike(false);
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
                setLoadingComment(true);
                // Adding a new comment using an API call and updating the comments state
                const response = await api.post(`/comment`, {
                    comment: newComment,
                    name: currenUserName,
                    email: currentUserEmail,
                    featureId: id,
                    photoURL: photoURL
                });
                // Updating the comments state and refetching comments after adding a new comment
                const updatedComments = [...comments, response.data];
                setComments(updatedComments);
                refetch();
                setLoadingComment(false)
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
                setLoadingComment(false)
            }
        }
    };

    if (loading) {
        return <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        <div>

            <div className='flex justify-between items-center my-5'>
                <Link to={'/'}>
                    <button className="block mt-2 py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"> Go Back </button>
                </Link>
                {
                    currentUserEmail === userEmail ?
                        <div className='flex items-center gap-5'>
                            <button
                                onClick={handleDeleteFeature}
                                className="block py-2 px-4 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <Link to={`/editfeature/${id}`}><button className=" hover:bg-secondary py-2 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer">
                                Edit
                            </button></Link>
                        </div>
                        : <></>
                }
            </div>

            <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center pt-2 mb-4">
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

                <h2 className="text-lg text-primary font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>



                <div className="md:flex justify-between border-t border-b px-4 py-2">
                    <div className='flex gap-3 my-2'>
                        {/* like button */}
                        <div className="flex items-center">
                            <button onClick={handleLike} className={`flex text-3xl items-center text-gray-500 ${liked ? 'text-red-500' : ''}`}>
                                <FaHeart />
                                <p className='ml-2 text-xl'>{liked ? 'Unvote' : loadingLike ? 'Voting' : 'Vote'}</p>
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
                    <div className="flex  ">
                        <input
                            className="rounded-l-lg w-40 md:w-max p-2 border-t border-b border-l text-primary border-gray-200 bg-white"
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleAddComment} className="px-3 rounded-r-lg bg-primary  text-white font-bold py-1 uppercase ">{loadingComment ? '....' : 'Comment'}</button>
                    </div>

                </div>


                <Comments featureId={id}></Comments>
            </div>
        </div>
    );
};

export default Feature;
