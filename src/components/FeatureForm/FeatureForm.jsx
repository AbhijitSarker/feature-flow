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
        <div className=' bg-white hover:shadow-xl shadow px-5 py-5  flex flex-col'>
            <div className='text-center text-2xl text-headingText font-medium  mb-5'>
                <h1>Request A Feature</h1>
            </div>
            <div className=' uppercase mt-10 md:mt-0'>
                <form onSubmit={handleSubmit}>
                    <div className=' font-medium space-y-5'>
                        <div>
                            <label className=' font-medium text-gray-600' htmlFor=""> Title</label>
                            <input
                                className="input-field-contact w-full focus:outline-none border focus:shadow-xl focus:border focus:border-gray-400 h-10 px-4 bg-white text-primary bg-opacity-5 "
                                id="title"
                                type="text"
                                placeholder="Short, descriptive title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className=' font-medium text-gray-600' htmlFor=""> Description</label>
                            <textarea
                                className="w-full h-20 px-4 border bg-white text-primary bg-opacity-5 focus:shadow-xl focus:outline-none focus:border focus:border-gray-400" id="description"
                                placeholder="Any additional details..."
                                rows="10"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>


                    </div>
                    <input className="w-full h-16 mt-5 bg-primary text-secondary text-2xl font-semibold  rounded-lg transition duration-200 hover:bg-gray-950 ease" type="submit" value={'Request A Feature'} />

                </form>
            </div>
        </div>
    );
};

export default FeatureForm;