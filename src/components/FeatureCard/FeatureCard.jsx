import React, { useState } from 'react';
import { FaComment, FaHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const FeatureCard = () => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(0);
    const [status, setStatus] = useState('In Progress');

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    };

    return (
        <Link to={'/feature/1'}>
            <div className="bg-white font-baskerville text-primary rounded-lg shadow-md my-4 border p-4">

                <div className='flex flex-col md:flex-row justify-between'>

                    {/* title & description */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Feature Title</h2>
                        <p className="text-gray-600 mb-2"> Description of the feature goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                    </div>

                    <div className='flex flex-col  gap-4'>
                        {/* status */}
                        <div className={`text-white text-center rounded-xl px-4 py-2 ${status === 'Pending' ? 'bg-yellow-500' : status === 'In Progress' ? 'bg-blue-500' : 'bg-green-500'}`}>{status} </div>


                    </div>
                </div>



                <div className="flex items-center md:flex-row flex-col justify-between">

                    <div className='w-full flex justify-between items-center my-2'>

                        <div className='flex gap-5 items-center flex-col md:flex-row'>
                            <div className='flex flex-col items-center'>
                                {/* user */}
                                <div className="flex items-center ">
                                    <img src="https://via.placeholder.com/40" alt="Author" className="w-8 h-8 rounded-full mr-2" />


                                    <div className="flex flex-col ">
                                        <span className="text-gray-700 font-semibold">John Doe</span>
                                        <span className="text-gray-500"> 2 hours ago</span>

                                    </div>
                                </div>
                                <div className='flex gap-3'>
                                    {/* like button */}
                                    <div className="flex  text-xl items-center">
                                        <button onClick={handleLike} className={`flex items-center text-gray-600 ${liked ? 'text-red-500' : ''}`}>
                                            <FaHeart></FaHeart>
                                            <p className='ml-1'>Like</p>
                                        </button>
                                        <span className="text-gray-600 ml-2">{likes}</span>
                                    </div>

                                    {/* comment count */}
                                    <div className="flex items-center  text-xl text-gray-600">
                                        <div>
                                            <FaComment></FaComment>
                                        </div>
                                        <span className="text-gray-600 ml-1">{comments}</span>
                                    </div>
                                </div>
                            </div>

                        </div>



                        {/* time */}
                    </div>

                    {/* comment input */}
                    <div className="relative w-full">
                        <input type="text" placeholder="Add a comment..." className="w-full bg-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        <button className="absolute right-0 top-0 mt-1 mr-2 focus:outline-none">
                            Post
                        </button>
                    </div>
                </div>
            </div></Link>
    );
};

export default FeatureCard;
