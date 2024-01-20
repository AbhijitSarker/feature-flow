import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';

const FeatureNav = ({ handleSearch, handleStatusFilter, handleSortByDateAsc, handleSortByDateDesc, handleSortByTitleAsc, handleSortByTitleDesc, handleSortByVoteAsc, handleSortByVoteDesc, handleSortBCommentsAsc, handleSortByCommentsDesc }) => {

    const { logout, user } = useAuth();

    // State to manage search term
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search input
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(event.target.value); // Pass search term to parent component
    };

    // State to manage selected status filter
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Function to handle changes in the status filter
    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);
        handleStatusFilter(status);
    };

    return (
        <div>
            <div className='flex flex-row items-center text-headingText container mx-auto justify-between py-1 md:py-5'>
                <div className='flex items-center'>
                    <img className="w-10 h-10 mx-auto mr-5 rounded-full border-2 border-white" src={user?.photoURL ? user?.photoURL : `https://avatar.iran.liara.run/public/46`} alt="" />
                    {
                        user ? <div className="text-center mt-2 hidden md:block text-3xl font-medium">{user.displayName}</div>

                            : <div className="text-center mt-2 hidden md:block text-3xl font-medium">Your Name</div>
                    }                </div>

                <div>
                    <div className="relative  border text-headingText border-gray-700 rounded-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            className=" w-full rounded-md px-3 py-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button className="absolute   right-2 mt-2 focus:outline-none">
                            <FaMagnifyingGlass></FaMagnifyingGlass>
                        </button>
                    </div>
                </div>


                <div>
                    <div className="flex flex-col md:flex-row mx-2 gap-2 justify-around ">
                        {/* sorting  */}
                        <div className="dropdown inline-block  text-headingText  relative">
                            <button className="section-bg border border-gray-700 w-full text-headingText font-semibold py-2 px-4 rounded inline-flex items-center">
                                <span>Sort By</span>
                            </button>

                            <ul className="dropdown-content absolute hidden  pt-1">

                                <li className="dropdown">
                                    <a className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Date</a>
                                    <ul className="dropdown-content absolute hidden  pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByDateDesc} className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Newest</li>
                                        <li onClick={handleSortByDateAsc} className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Oldest</li>

                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap">Title</a>
                                    <ul className="dropdown-content absolute hidden  pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByTitleAsc} className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Ascending</li>

                                        <li onClick={handleSortByTitleDesc} className="rounded-b bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap">Descending</li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Likes</a>
                                    <ul className="dropdown-content absolute hidden  pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByVoteDesc} className="rounded-b bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Highest</li>
                                        <li onClick={handleSortByVoteAsc} className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Lowest</li>

                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Comments</a>
                                    <ul className="dropdown-content absolute hidden  pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByCommentsDesc} className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >highest</li>
                                        <li onClick={handleSortBCommentsAsc} className="bg-gray-900 hover:bg-gray-500 hover:text-gray-900 py-2 px-4 block whitespace-no-wrap" >Lowest</li>

                                    </ul>
                                </li>
                            </ul>
                        </div>

                        {/* filter */}
                        <div className="flex text-headingText justify-around space-x-4">
                            <select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                className="px-3 py-1 bg-transparent border border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 rounded-md"
                            >
                                <option className='bg-gray-900 ' value="all">All Statuses</option>
                                <option className='bg-gray-900 ' value="Pending">Pending</option>
                                <option className='bg-gray-900 ' value="Completed">Completed</option>
                                <option className='bg-gray-900 ' value="In-Progress">In Progress</option>
                                {/* Add more status options as needed */}
                            </select>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default FeatureNav;
