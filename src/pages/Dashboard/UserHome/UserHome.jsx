import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import api from '../../../utils/handleApi';
import useApp from "../../../hooks/useApp";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const UserHome = () => {
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const { refetch, data } = useApp()
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [formVisible, setFormVisible] = useState(false);


    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(img_hosting_url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const imgResponse = await response.json();
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);

                    // Assuming api.post is an async function that handles API requests
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

        // Remaining form submission logic, assuming it's not dependent on the image hosting
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Image:', image);
    };


    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    };

    return (
        <div className="w-full m-4">
            <h3>Hi, {user?.displayName}, Welcome Back</h3>


            <h2 className="text-2xl font-bold mb-4">{data?.appInfo[0].title}</h2>
            <p className="text-gray-700 mb-4">{data?.appInfo[0].description}</p>
            <img src={data?.appInfo[0].logo} alt="App Logo" className="w-28 mb-2" />


            <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Create Form with Image Input</h2>
                {!formVisible ? (
                    <button
                        onClick={toggleFormVisibility}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Show Form
                    </button>
                ) : (<>
                    <button
                        onClick={toggleFormVisibility}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Show Form
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
        </div>
    );
};

export default UserHome;