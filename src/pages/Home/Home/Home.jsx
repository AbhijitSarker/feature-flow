import { useEffect, useState } from "react";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import FeatureNav from "../../../components/FeatureNav/FeatureNav";
import api from "../../../utils/handleApi";

const Home = () => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch todos when the component mounts
        setLoading(true); // Set loading to true before fetching todos

        //get request to load todos
        api.get('/feature')
            .then((data) => {
                console.log(data.data.features);
                setFeatures(data.data.features); // Update todo state with fetched todos
                setLoading(false); // Set loading to false after fetching todos
            })
            .catch((error) => {
                console.error('Error fetching todo:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, [features]);
    console.log(features);
    return (
        <div className="">

            <FeatureNav></FeatureNav>

            <div>
                {
                    features.map((feature) => <FeatureCard key={feature._id} feature={feature}></FeatureCard>)
                }
            </div>
        </div>
    );
};

export default Home;