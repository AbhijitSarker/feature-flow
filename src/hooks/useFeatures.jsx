import { useQuery } from '@tanstack/react-query';
import api from '../utils/handleApi';
import useAuth from '../hooks/useAuth';

const useFeatures = () => {
    const { user, loading } = useAuth();  // Fetches user authentication details and loading state

    const { refetch, data: features = [], isLoading } = useQuery({
        queryKey: ['feature'], // Unique query identifier
        // enabled: !loading, // Determines if the query is enabled based on loading state
        queryFn: async () => {
            // Fetch cart data based on the user's email using axiosSecure
            const response = await api.get(`/feature`)
            return response.data;
        },
    })
    return [features, refetch, isLoading];    // Returns the fetched cart data and a function to refetch it

};

export default useFeatures;