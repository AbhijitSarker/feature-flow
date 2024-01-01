import React, { useEffect, useState } from 'react';
import FeatureCard from '../../../components/FeatureCard/FeatureCard';
import FeatureNav from '../../../components/FeatureNav/FeatureNav';
import useFeatures from '../../../hooks/useFeatures';
import api from '../../../utils/handleApi';

const Home = () => {
    const [features] = useFeatures();
    const allFeatures = features.features;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeatures, setFilteredFeatures] = useState([]);
    const [sortBy, setSortBy] = useState('createdAt'); // Default sorting by date
    const [order, setOrder] = useState('asc'); // Default order ascending

    useEffect(() => {
        // Update filtered features when allFeatures changes
        setFilteredFeatures(allFeatures);
    }, [allFeatures]);

    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusFilter = (selectedStatus) => {
        setStatusFilter(selectedStatus);
        if (selectedStatus === 'all') {
            setFilteredFeatures(allFeatures); // Show all features if 'All' status is selected
        } else {
            const filteredByStatus = allFeatures.filter((feature) => feature.status === selectedStatus);
            setFilteredFeatures(filteredByStatus);
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (!searchTerm.trim()) {
            setFilteredFeatures(allFeatures); // If the search term is empty, display all features
        } else {
            const filteredList = allFeatures.filter(
                (feature) =>
                    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFeatures(filteredList);
        }
    };

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

    // Function to sort filtered features
    const sortFeatures = (featuresToSort, sortByField, sortOrder) => {
        try {
            // Apply sorting to the given features
            const sortedFeatures = featuresToSort.sort((a, b) => {
                switch (sortByField) {
                    case 'title':
                        return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                    case 'createdAt':
                        return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
                    case 'votes':
                        return sortOrder === 'asc' ? a.votes - b.votes : b.votes - a.votes;
                    case 'comments':
                        return sortOrder === 'asc' ? a.comments - b.comments : b.comments - a.comments;
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
    async function fetchAndSortFeatures(sortByField, sortOrder) {
        try {
            const response = await api.get(`/feature?sortBy=${sortByField}&order=${sortOrder}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok.');
            }

            const { data } = response; // Assuming the features are under 'data' property, update this accordingly
            // console.log(data.features)
            return data.features;
        } catch (error) {
            console.error('Error fetching and sorting features:', error);
            return []; // Return an empty array or handle the error as needed
        }
    }

    const displayFeatures = searchTerm.trim() ? filteredFeatures : allFeatures;

    return (
        <div>
            <FeatureNav
                handleSearch={handleSearch}
                handleStatusFilter={handleStatusFilter}

                handleSortByDateAsc={() => handleSort('createdAt', 'asc')}
                handleSortByDateDesc={() => handleSort('createdAt', 'desc')}
                handleSortByTitleAsc={() => handleSort('title', 'asc')}
                handleSortByTitleDesc={() => handleSort('title', 'desc')}
                handleSortByVoteAsc={() => handleSort('votes', 'asc')}
                handleSortByVoteDesc={() => handleSort('votes', 'desc')}
                handleSortBCommentsAsc={() => handleSort('comments', 'asc')}
                handleSortByCommentsDesc={() => handleSort('comments', 'desc')}
            />
            {displayFeatures && displayFeatures.length > 0 ? (
                <div>
                    {filteredFeatures?.map((feature) => (
                        <FeatureCard key={feature._id} feature={feature} />
                    ))}
                </div>
            ) : (
                <p>{searchTerm.trim() ? 'No features to show ' : 'No features available'}</p>
            )}
        </div>
    );
};

export default Home;
