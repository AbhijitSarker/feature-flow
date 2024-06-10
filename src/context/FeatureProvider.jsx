import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/handleApi';

// Creating a context to manage feature state
export const FeatureContext = createContext();

const FeatureProvider = ({ children }) => {
    const [features, setFeature] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch features when the component mounts
        setLoading(true); // Set loading to true before fetching features

        //get request to load features
        api.get('/feature')
            .then((data) => {
                setFeature(data.data.features); // Update feature state with fetched features
                setLoading(false); // Set loading to false after fetching features
            })
            .catch((error) => {
                console.error('Error fetching Features:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    const updateFeatures = () => {
        // Function to manually update feature
        setLoading(true); // Set loading to true before fetching features
        api.get('/feature')
            .then((data) => {
                setFeature(data.data.features); // Update feature state with fetched features
                setLoading(false); // Set loading to false after fetching features
            })
            .catch((error) => {
                console.error('Error fetching feature:', error);
                setLoading(false); // Set loading to false in case of error
            });
    };

    return (
        <FeatureContext.Provider value={{ features, loading, updateFeatures }}>
            {children}
        </FeatureContext.Provider>
    );
};

export { FeatureProvider };