import React, { useEffect, useState } from 'react';
import FeatureNav from '../../../components/FeatureNav/FeatureNav';
import useFeatures from '../../../hooks/useFeatures';
import api from '../../../utils/handleApi';
import FeatureTable from '../../../components/FeatureTable/FeatureTable';
import useAdmin from '../../../hooks/useAdmin';
import AdminInfo from '../../../components/AdminInfo/AdminInfo';
import { Helmet } from 'react-helmet-async';

const Features = () => {
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

    const [isAdmin] = useAdmin()

    if (isAdmin === 'admin') {
        return (
            <div>
                <Helmet>
                    <title>Manage Features | Feature Flow </title>
                </Helmet>
                <h2 className='text-4xl font-semibold text-headingText'>Manage Features</h2>
                {/* FeatureNav component to handle search, status filter, and sorting */}
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
                {displayFeatures && displayFeatures.length > 0 ? (
                    <FeatureTable filteredFeatures={filteredFeatures}>
                    </FeatureTable>
                ) : (
                    <p>{searchTerm.trim() ? 'No features to show ' : 'No features available'}</p>
                )}
            </div>
        );
    } else {
        return <AdminInfo></AdminInfo>

    }
};

export default Features;
