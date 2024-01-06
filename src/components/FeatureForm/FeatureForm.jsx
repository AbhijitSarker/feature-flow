import React, { useState } from 'react';
import api from '../../utils/handleApi';
import useFeatures from '../../hooks/useFeatures';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import verifyUser from '../../utils/verifyUser';

const FeatureForm = () => {
    const [, refetch] = useFeatures(); // Fetch features using a custom hook
    const [title, setTitle] = useState(''); // State for feature title
    const [description, setDescription] = useState(''); // State for feature description
    const [loading, setLoading] = useState(false); // State to track loading

    // Fetching user details using a custom hook
    const { user } = useAuth();
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userAvatar = user?.photoURL || 'https://avatar.iran.liara.run/public/46';



    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true when submitting
        try {
            // Make an API call to create a new feature request
            await api.post('/feature', {
                title,
                description,
                userName,
                userEmail,
                userAvatar
            });
            // Show success toast upon successful feature request
            toast.success('Feature Request Successful!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // Refetch features and reset form fields
            refetch();
            setTitle('');
            setDescription('');
        } catch (error) {
            toast.error('Failed to request the feature!');
        } finally {
            setLoading(false); // Reset loading state after submission completes
        }
    };

    return (
        <div className=' bg-white border shadow-xl    px-5 py-5  flex flex-col'>
            <div className='text-center text-4xl text-primary font-medium mt-4 mb-8'>
                <h1>Request A Feature</h1>
            </div>
            <div className=' uppercase mt-10 md:mt-0'>
                <form>
                    <div className=' font-medium space-y-10'>

                        <div className="relative">
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Title</p>
                            <input
                                id="title"
                                type="text"
                                required
                                placeholder="Short, descriptive title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className=" focus:shadow-xl border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                        </div>
                        <div className="relative">
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Description</p>
                            <textarea
                                className=" focus:shadow-xl border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                                placeholder="Any additional details..."
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="5"></textarea>
                        </div>

                    </div>

                    <button
                        onClick={user ? handleSubmit : verifyUser}
                        disabled={loading} // Disable button based on loading state
                        className={`w-full h-16 mt-10 border border-primary text-secondary text-2xl font-semibold rounded-lg transition duration-200 hover:bg-primary ease ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >Request A Feature
                    </button>

                </form>
                <ToastContainer />
            </div>

        </div>
    );
};

export default FeatureForm;