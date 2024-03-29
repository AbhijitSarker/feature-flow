import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../utils/handleApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from "react-icons/fa";

const EditFeature = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
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

    const handleUpdateFeature = (e) => {
        e.preventDefault();
        setLoading(true)
        api.patch(`/feature/${id}`, { title, description })
            .then((res) => {
                toast.success(' Feature Updated Successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error updating feature:', error);
                setLoading(false)
            });
        // navigate(`/feature/${id}`); // Redirect to the feature page after update

    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <Helmet>
                <title>Edit Feature | Feature Flow </title>
            </Helmet>
            <Link to={`/feature/${id}`}><button className="block mt-2 mb-4 py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"><FaArrowLeft /></button></Link>
            <div>
                <h2 className="text-3xl font-semibold mb-2">Edit Feature</h2>
            </div>
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
                    {loading ? 'Updating' : 'Update'}     Feature
                </button>
            </form>
        </div >
    );
};

export default EditFeature;
