import React, { useState } from 'react';
import
Swal from 'sweetalert2'
import api from '../../utils/handleApi';
import useFeatures from '../../hooks/useFeatures';
import { Link } from 'react-router-dom';
import { IoCheckmarkDone } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

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
        <div>
            <table className="min-w-full text-headingText border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-gray-700 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Name</th>
                        <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Author </th>
                        <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Likes</th>
                        <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell"> Comments</th>
                        <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Status</th>
                        <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Actions</th>
                    </tr>
                </thead>

                <tbody className="block md:table-row-group">
                    {
                        currentItems?.map(feature => <tr key={feature._id} className="section-bg border border-gray-700 md:border-none block md:table-row">
                            <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"> <span className="inline-block w-1/3 md:hidden font-bold">Name</span>  <Link to={`/feature/${feature._id}`}>{feature.title.length > 40 ? `${feature.title.slice(0, 40)}.....` : feature.title}</Link></td>
                            <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>{feature.userName}</td>
                            <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">User Name</span>{feature.likes.length}</td>
                            <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email Address</span>{feature.comments.length}</td>
                            <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>{feature.status}</td>

                            <td className="p-2 md:border md:border-gray-700 text-left md:table-cell  ">
                                {/* <span className="inline-block w-1/3 md:hidden font-bold">Action</span> */}
                                <div className='flex bg-transparent rounded-md '>
                                    <div className='flex border border-gray-700 rounded-md'>
                                        <select
                                            value={selectedStatuses[feature._id] || ''}
                                            onChange={(e) => handleStatusChange(feature._id, e.target.value)}
                                            className=" appearance-none bg-transparent px-4 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="">Change Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="In-Progress">In-Progress</option>
                                            <option value="Completed">Completed</option>
                                            {/* Add options for different statuses */}
                                        </select>
                                        <button
                                            onClick={() => changeStatus(feature._id)}
                                            className=" bg-blue-500 hover:bg-blue-700 text-white p-2 rounded focus:outline-none focus:shadow-outline  focus:shadow-outline"
                                        >
                                            <IoCheckmarkDone />
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" onClick={() => deleteFeature(feature._id)} className="text-xl h-full bg-red-500 hover:bg-red-700 text-white py-1 ml-5 px-2 rounded focus:outline-none focus:shadow-outline"><FaRegTrashCan /></button>
                                    </div>
                                </div>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

            <div className='flex justify-center items-center gap-4 my-5'>
                <button className='text-sm hover:bg-secondary py-1 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer' onClick={prevPage} disabled={currentPage === 1} >Prev</button>
                <span className='text-headingText'>Page {currentPage} of {totalPages}</span>
                <button className='text-sm hover:bg-secondary py-1 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>

        </div >
    );
};

export default FeatureTable;
