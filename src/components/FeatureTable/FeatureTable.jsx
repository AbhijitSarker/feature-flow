import React, { useState } from 'react';
import Swal from 'sweetalert2'
import api from '../../utils/handleApi';
import useFeatures from '../../hooks/useFeatures';
import { Link } from 'react-router-dom';

const FeatureTable = ({ filteredFeatures }) => {
    // Pagination state
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate indexes for pagination and display items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFeatures?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredFeatures?.length / itemsPerPage);     // Calculate the total number of pages based on the cart length and items per page

    // Functions to navigate to the next 
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Functions to navigate to the previous pages
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [selectedStatuses, setSelectedStatuses] = React.useState({}); // State to manage selected statuses
    const [, refetch] = useFeatures();

    const deleteFeature = (userId) => {

        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/feature/${userId}`);
                refetch()
                Swal.fire({
                    title: "Successful!",
                });
            }
        });

    };

    const changeStatus = async (featureId) => {
        try {
            const selectedStatus = selectedStatuses[featureId];
            if (!selectedStatus) {
                Swal.fire({
                    title: 'Please select a status!',
                    icon: 'warning',
                });
                return;
            }

            Swal.fire({
                title: 'Are you sure?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await api.patch(`/feature/${featureId}`, { status: selectedStatus });

                    if (response.status === 200) {
                        refetch();
                        setSelectedStatuses({ ...selectedStatuses, [featureId]: '' });

                        Swal.fire({
                            title: 'Successful!',
                            icon: 'success',
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error changing status:', error);
        }
    };
    const handleStatusChange = (featureId, status) => {
        setSelectedStatuses((prevState) => ({
            ...prevState,
            [featureId]: status,
        }));
    };
    return (
        <div className="text-primary   bg-gray-200 flex flex-col">

            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Name</th>
                            <th className="text-left p-3 px-5">Author</th>
                            <th className="text-left p-3 px-5">Likes </th>
                            <th className="text-left p-3 px-5"> Comments</th>
                            <th className="text-left p-3 px-5">Status</th>
                            <th>Actions</th>
                        </tr>
                        {
                            currentItems?.map(feature => <tr key={feature._id} className="border-b hover:bg-orange-100">
                                <Link to={`/feature/${feature._id}`}><td className="p-3 px-5 hover:underline">{feature.title.length > 40 ? `${feature.title.slice(0, 40)}.....` : feature.title}</td></Link>
                                <td className="p-3 px-5">{feature.userName}</td>
                                <td className=" p-3 px-5">{feature.likes.length}</td>
                                <td className=" p-3 px-5"> {feature.comments.length}</td>
                                <td className="p-3 px-5"> {feature.status}</td>
                                <td className="p-3 px-5 flex gap-4 justify-end">
                                    <select
                                        value={selectedStatuses[feature._id] || ''}
                                        onChange={(e) => handleStatusChange(feature._id, e.target.value)}
                                        className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In-Progress">In-Progress</option>
                                        <option value="Completed">Completed</option>
                                        {/* Add options for different statuses */}
                                    </select>
                                    <button
                                        onClick={() => changeStatus(feature._id)}
                                        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline  focus:shadow-outline"
                                    >
                                        Change Status
                                    </button>
                                    <button type="button" onClick={() => deleteFeature(feature._id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
            <div className='   flex justify-center items-center gap-4 my-5'>
                <button className='text-sm hover:bg-secondary py-1 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer' onClick={prevPage} disabled={currentPage === 1} >Prev</button>
                <span className='text-primary'>Page {currentPage} of {totalPages}</span>
                <button className='text-sm hover:bg-secondary py-1 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default FeatureTable;