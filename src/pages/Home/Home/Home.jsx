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
    const [sortBy, setSortBy] = useState('date'); // Default sorting by date
    const [order, setOrder] = useState('asc'); // Default order ascending

    useEffect(() => {
        // Update filtered features when allFeatures changes
        setFilteredFeatures(allFeatures);
    }, [allFeatures]);

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
            const sortedFeatures = await fetchAndSortFeatures(sortByField, sortOrder);
            console.log(sortedFeatures)
            if (sortedFeatures && sortedFeatures.length > 0) {

                setSortBy(sortByField);
                setOrder(sortOrder);
                console.log(sortedFeatures);
                setFilteredFeatures(sortedFeatures);
                console.log(filteredFeatures)
            }

        } catch (error) {
            console.error('Error sorting features:', error);
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
                handleSortByDate={() => handleSort('date', 'desc')}
                handleSortAlphabetically={() => handleSort('title', 'asc')}
                handleSortByVoteCount={() => handleSort('votes', 'desc')}
            />
            {/* <button onClick={() => handleSort('title', 'asc')}>order</button> */}
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
