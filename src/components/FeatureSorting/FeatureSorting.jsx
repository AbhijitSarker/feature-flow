import React, { useState, useEffect } from 'react';

const FeatureSorting = () => {
    const [sortBy, setSortBy] = useState('createdAt'); // Default sort by date
    const [order, setOrder] = useState('asc'); // Default sorting order
    const [sortedFeatures, setSortedFeatures] = useState([]);

    const fetchAndSortFeatures = async () => {
        try {
            const response = await fetch(`/api/features?sortBy=${sortBy}&order=${order}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const { features } = await response.json();
            setSortedFeatures(features);
        } catch (error) {
            console.error('Error fetching and sorting features:', error);
            setSortedFeatures([]); // Return an empty array or handle the error as needed
        }
    };

    // Fetch features on initial render and when sortBy or order change
    useEffect(() => {
        fetchAndSortFeatures();
    }, [sortBy, order]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    return (
        <div>
            <select value={sortBy} onChange={handleSortChange}>
                <option value="createdAt">Sort by Date (Default)</option>
                <option value="vote">Sort by Vote</option>
                <option value="comments">Sort by Comments</option>
            </select>
            <select value={order} onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <button onClick={fetchAndSortFeatures}>Sort Features</button>

            {/* Display sorted features */}
            <div>
                {sortedFeatures.map((feature, index) => (
                    <div key={index}>{/* Render your feature component here */}</div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSorting;
