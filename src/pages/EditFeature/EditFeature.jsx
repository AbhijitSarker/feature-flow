import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/handleApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditFeature = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams(); // Getting the 'id' parameter from the URL
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/feature/${id}`)
            .then((data) => {
                setTitle(data.data.feature.title);
                setDescription(data.data.feature.description);
            })
            .catch((error) => {
                console.error('Error fetching feature:', error);
            });
    }, [id]);

    const handleUpdateFeature = () => {

        api.patch(`/feature/${id}`, { title, description })
            .then((res) => {
                toast.success(' Feature Updated Successfully!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch((error) => {
                console.error('Error updating feature:', error);
            });
        navigate(`/feature/${id}`); // Redirect to the feature page after update

    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Edit Feature</h2>
            <form onSubmit={handleUpdateFeature}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                >
                    Update Feature
                </button>
            </form>
        </div>
    );
};

export default EditFeature;
