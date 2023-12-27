import React, { useState } from 'react';
import { FaPhoneVolume } from 'react-icons/fa6';

const FeatureForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission
        console.log('Title:', title);
        console.log('Description:', description);
    };
    return (
        <div className=' bg-white border shadow-xl font-baskerville  px-5 py-5  flex flex-col'>
            <div className='text-center text-4xl text-primary font-medium mt-4 mb-8'>
                <h1>Request A Feature</h1>
            </div>
            <div className=' uppercase mt-10 md:mt-0'>
                <form onSubmit={handleSubmit}>
                    <div className=' font-medium space-y-10'>

                        <div className="relative">
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Title</p>
                            <input
                                id="title"
                                type="text"
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="5"></textarea>
                        </div>

                    </div>
                    <input className="w-full h-16 mt-10 border border-primary text-secondary text-2xl font-semibold  rounded-lg transition duration-200 hover:bg-primary ease" type="submit" value={'Request A Feature'} />

                </form>
            </div>
        </div>
    );
};

export default FeatureForm;