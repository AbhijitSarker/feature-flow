import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const FeatureNav = ({ handleSearch, handleStatusFilter, handleSortByDateAsc, handleSortByDateDesc, handleSortByTitleAsc, handleSortByTitleDesc, handleSortByVoteAsc, handleSortByVoteDesc, handleSortBCommentsAsc, handleSortByCommentsDesc }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(event.target.value); // Pass search term to parent component
    };

    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleStatusChange = (event) => {
        const status = event.target.value;
        setSelectedStatus(status);
        handleStatusFilter(status);
    };

    return (

        <nav className="border border-gray-500 text-primary bg-gray-200 z-20 sticky top-5  mt-4 rounded-md">
            <div className="space-y-2 px-4">

                <div className="relative pt-4 ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className=" w-full rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button className="absolute  top-4 right-2 mt-2 focus:outline-none">
                        <FaMagnifyingGlass></FaMagnifyingGlass>
                    </button>
                </div>
                <div className="flex flex-col pb-2">
                    <div className="flex justify-around space-x-4">

                        {/* filter */}
                        <div className="dropdown inline-block relative">
                            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                <span>Sort By</span>
                            </button>

                            <ul className="dropdown-content absolute hidden text-gray-700 pt-1">

                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Date</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Newest</a></li>
                                        <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Oldest</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Title</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Ascending</a></li>

                                        <li><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Descending</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Vote</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Highest</a></li>

                                        <li><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Lowest</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Comments</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Highest</a></li>
                                        <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Lowest</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>


                        <div className="flex justify-around space-x-4">
                            <select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                className="px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary rounded-md"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="in-progress">In Progress</option>
                                {/* Add more status options as needed */}
                            </select>
                        </div>

                        <div className="dropdown inline-block relative">
                            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                <span>Sort By</span>
                            </button>

                            <ul className="dropdown-content absolute hidden text-gray-700 pt-1">

                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Date</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByDateDesc} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Newest</li>
                                        <li onClick={handleSortByDateAsc} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Oldest</li>

                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Title</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByTitleAsc} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Ascending</li>

                                        <li onClick={handleSortByTitleDesc} className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Descending</li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Likes</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortByVoteDesc} className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Highest</li>
                                        <li onClick={handleSortByVoteAsc} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Lowest</li>

                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Comments</a>
                                    <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                                        <li onClick={handleSortBCommentsAsc} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Highest</li>
                                        <li onClick={handleSortByCommentsDesc} className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Lowest</li>

                                    </ul>
                                </li>
                            </ul>
                        </div>


                    </div>

                </div >
            </div >
        </nav >
    );
};

export default FeatureNav;