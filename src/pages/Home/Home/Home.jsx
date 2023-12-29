import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import FeatureNav from "../../../components/FeatureNav/FeatureNav";
import useFeatures from "../../../hooks/useFeatures";

const Home = () => {
    const [features] = useFeatures();
    const allFeatures = features.features;
    return (
        <div className="">

            <FeatureNav></FeatureNav>
            {allFeatures && allFeatures.length > 0 ? (
                <div>
                    {allFeatures.map((feature) => (
                        <FeatureCard key={feature._id} feature={feature} />
                    ))}
                </div>
            ) : (
                <p>No features available.</p>
            )}
        </div>
    );
};

export default Home;