import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const FeatureNav = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(event.target.value); // Pass search term to parent component
    };

    const [openSort, setOpenSort] = useState(false);

    const toggleSort = () => {
        setOpenSort(!openSort);
    };
    const [openFilter, setOpenFilter] = useState(false);

    const toggleFilter = () => {
        setOpenFilter(!openFilter);
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
                        <div className="relative" x-data="{ open: false }">
                            <button onClick={toggleFilter} className="focus:outline-none hover:text-gray-300">
                                Filter By
                                <svg
                                    className={`inline ml-1 h-4 w-4 transition-transform duration-200 transform ${openFilter ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-.7.3z"
                                    />
                                </svg>
                            </button>
                            <div className={`absolute top-full left-0 bg-white rounded-md shadow-md p-2 mt-1 transition-all duration-300 ${openFilter ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <li className=" block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                                    Option1
                                </li>
                                <li className=" block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                                    Option2
                                </li>
                                <li className=" block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                                    Option3
                                </li>
                            </div>
                        </div>

                        <div className="relative" x-data="{ open: false }">
                            <button onClick={toggleSort} className="focus:outline-none hover:text-gray-300">
                                Sort By
                                <svg
                                    className={`inline ml-1 h-4 w-4 transition-transform duration-200 transform ${openSort ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-.7.3z"
                                    />
                                </svg>
                            </button>
                            <div className={`absolute top-full left-0 bg-white rounded-md shadow-md p-2 mt-1 transition-all duration-300 ${openSort ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <li href="#" className=" block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                                    Option1
                                </li>
                                <li href="#" className=" block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                                    Option2
                                </li>
                                <li href="#" className=" block px-4 py-2 hover:bg-gray-200 transition-colors duration-300">
                                    Option3
                                </li>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default FeatureNav;