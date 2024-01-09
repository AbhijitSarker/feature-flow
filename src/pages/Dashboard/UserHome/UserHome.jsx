import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import api from '../../../utils/handleApi';
import useApp from "../../../hooks/useApp";
import LogoTitle from "../../../components/LogoTitle/LogoTitle";
import useAdmin from "../../../hooks/useAdmin";
import AdminInfo from "../../../components/AdminInfo/AdminInfo";

// Fetch the image hosting token from environment variables
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const UserHome = () => {
    const [isAdmin, isLoading] = useAdmin()
    // Construct the image hosting URL using the token
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    // Fetch user data and app data
    const { refetch, data } = useApp()
    const { user } = useAuth();

    // State variables to manage form input and visibility
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [formVisible, setFormVisible] = useState(false);


    // Function to handle dropping an image into the designated area
    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Function to handle input changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            // Upload image to the hosting service
            const response = await fetch(img_hosting_url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const imgResponse = await response.json();
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);

                    // Update app data with the uploaded image URL
                    await api.patch('/app/659903d03770ee3a39f7d829', { title: title, description: description, logo: imgURL });
                    refetch()
                    // Handle success after posting to the /app endpoint
                    console.log('Image hosted and App data submitted successfully.');
                } else {
                    console.error('Image hosting failed:', imgResponse.error);
                }
            } else {
                console.error('Image hosting failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };


    // Function to toggle form visibility
    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };


    if (isAdmin === 'admin') {

        return (
            <div className="w-full m-4">
                <h3>Hi, {user?.displayName}, Welcome Back</h3>
                <p className="text-2xl font-semibold text-primary mt-5">Logo and Title</p>
                <LogoTitle></LogoTitle>

                <p className="text-2xl font-semibold text-primary mt-5">Description</p>
                <p className="text-gray-700 mb-10">{data?.appInfo[0].description}</p>


                {!formVisible ? (
                    <button
                        onClick={toggleFormVisibility}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit App Info
                    </button>
                ) : (<>
                    <button
                        onClick={toggleFormVisibility}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Hide Form
                    </button>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter title"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter description"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                                Image
                            </label>
                            <div
                                id="image"
                                className="border border-dashed border-gray-500 rounded-md p-4 cursor-pointer"
                                onDrop={handleImageDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-28 h-auto mb-2" />
                                ) : (
                                    <p className="text-gray-500">Drag & drop to upload an image</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </form>
                </>
                )}
            </div>

        );
    } else {
        return <AdminInfo></AdminInfo>
    }
};

export default UserHome;