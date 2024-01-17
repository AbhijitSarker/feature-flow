import React, { useEffect, useState } from 'react';
import FeatureCard from '../../../components/FeatureCard/FeatureCard';
import FeatureNav from '../../../components/FeatureNav/FeatureNav';
import useFeatures from '../../../hooks/useFeatures';
import api from '../../../utils/handleApi';
import ProfileCard from '../../../components/ProfileCard/ProfileCard';
import Hero from '../Hero/Hero';

const Home = () => {
    // Fetch features using custom hook
    const [features] = useFeatures();
    const allFeatures = features.features;

    // State variables to manage filtering and sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeatures, setFilteredFeatures] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by date
    const [order, setOrder] = useState('asc'); // Default order ascending

    // Update filtered features when allFeatures changes
    useEffect(() => {
        setFilteredFeatures(allFeatures);
    }, [allFeatures]);


    // Function to handle status filter
    const handleStatusFilter = (selectedStatus) => {
        // Filtering features based on status
        setStatusFilter(selectedStatus);
        if (selectedStatus === 'all') {
            // Show all features if 'All' status is selected
            setFilteredFeatures(allFeatures);
        } else {
            const filteredByStatus = allFeatures.filter((feature) => feature.status === selectedStatus);
            setFilteredFeatures(filteredByStatus);
        }
    };

    // Function to handle search
    const handleSearch = (searchTerm) => {
        // Searching through features based on the provided term
        setSearchTerm(searchTerm);
        if (!searchTerm.trim()) {
            // If the search term is empty, display all features
            setFilteredFeatures(allFeatures);
        } else {
            const filteredList = allFeatures.filter(
                (feature) =>
                    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFeatures(filteredList);
        }
    };

    // Function to sort filtered features
    const handleSort = async (sortByField, sortOrder) => {
        try {
            let sortedFeatures;
            if (searchTerm.trim()) {
                sortedFeatures = await fetchAndSortFeatures(sortByField, sortOrder, filteredFeatures);
            } else {
                sortedFeatures = sortFeatures(filteredFeatures, sortByField, sortOrder);
            }

            if (sortedFeatures && sortedFeatures.length > 0) {
                setSortBy(sortByField);
                setOrder(sortOrder);
                setFilteredFeatures(sortedFeatures);
            }
        } catch (error) {
            console.error('Error sorting features:', error);
        }
    };

    // Function to sort features based on the selected sorting options
    const sortFeatures = (featuresToSort, sortByField, sortOrder) => {
        try {
            // Apply sorting to the given features based on the selected field and order
            const sortedFeatures = featuresToSort.sort((a, b) => {
                // Sorting by different fields (title, createdAt, comments, likes)
                switch (sortByField) {
                    case 'title':
                        return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                    case 'createdAt':
                        return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);

                    case 'comments':
                        return sortOrder === 'asc' ? a.comments.length - b.comments.length : b.comments.length - a.comments.length;
                    case 'likes':
                        return sortOrder === 'asc' ? a.likes.length - b.likes.length : b.likes.length - a.likes.length;
                    default:
                        return 0; // No sorting
                }
            });

            return sortedFeatures;

        } catch (error) {
            console.error('Error sorting features:', error);
            return []; // Return an empty array or handle the error as needed
        }
    };


    // Function to fetch features and apply sorting
    const fetchAndSortFeatures = async (sortByField, sortOrder) => {
        try {
            const response = await api.get(`/feature?sortBy=${sortByField}&order=${sortOrder}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok.');
            }

            const { data } = response;

            return data.features;

        } catch (error) {
            console.error('Error fetching and sorting features:', error);
            return []; // Return an empty array or handle the error as needed
        }
    }
    // Display features based on the search term or filtered list
    const displayFeatures = searchTerm.trim() ? filteredFeatures : allFeatures;

    // Pagination state
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate indexes for pagination and display items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFeatures?.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages based on the features length and items per page
    const totalPages = Math.ceil(filteredFeatures?.length / itemsPerPage);

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


    return (
        <div>

            <div className='flex flex-col justify-between md:flex-row gap-10'>
                <div className='md:w-1/3'>

                    <ProfileCard></ProfileCard>
                    <FeatureNav
                        handleSearch={handleSearch}
                        handleStatusFilter={handleStatusFilter}

                        handleSortByDateAsc={() => handleSort('createdAt', 'asc')}
                        handleSortByDateDesc={() => handleSort('createdAt', 'desc')}
                        handleSortByTitleAsc={() => handleSort('title', 'asc')}
                        handleSortByTitleDesc={() => handleSort('title', 'desc')}
                        handleSortByVoteAsc={() => handleSort('likes', 'asc')}
                        handleSortByVoteDesc={() => handleSort('likes', 'desc')}
                        handleSortBCommentsAsc={() => handleSort('comments', 'asc')}
                        handleSortByCommentsDesc={() => handleSort('comments', 'desc')}
                    />
                </div>
                <div className='md:w-2/3'>
                    {displayFeatures && displayFeatures.length > 0 ? (
                        <div className='flex flex-col gap-16'>
                            {currentItems?.map((feature) => (
                                <FeatureCard key={feature._id} feature={feature} />
                            ))}
                        </div>
                    ) : (
                        <p>{searchTerm.trim() ? 'No features to show ' : 'No features available'}</p>
                    )}
                    {/* pagination buttons */}
                    <div className='   flex justify-center items-center gap-4 mt-4'>
                        <button className='text-sm hover:bg-secondary py-1 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer' onClick={prevPage} disabled={currentPage === 1} >Prev</button>
                        <span className='text-primary'>Page {currentPage} of {totalPages}</span>
                        <button className='text-sm hover:bg-secondary py-1 px-4 rounded-md hover:text-primary bg-primary text-white transform ease-in-out duration-300 cursor-pointer' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
