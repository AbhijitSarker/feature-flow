import { useState } from "react";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import FeatureNav from "../../../components/FeatureNav/FeatureNav";
import useFeatures from "../../../hooks/useFeatures";

const Home = () => {
    const [features] = useFeatures();
    const allFeatures = features.features;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeatures, setFilteredFeatures] = useState([]);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (!searchTerm.trim()) {
            setFilteredFeatures([]); // Clear filtered results if the search term is empty
        } else {
            const filteredList = allFeatures.filter(
                (feature) =>
                    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFeatures(filteredList); // Set the filtered results based on the search term
        }
    };

    const displayFeatures = searchTerm.trim() ? filteredFeatures : allFeatures;

    return (
        <div>
            <FeatureNav handleSearch={handleSearch} />
            {displayFeatures && displayFeatures.length > 0 ? (
                <div>
                    {displayFeatures.map((feature) => (
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

