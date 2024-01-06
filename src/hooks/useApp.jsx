import { useQuery } from '@tanstack/react-query';
import api from '../utils/handleApi'; // Importing the API utility

// Custom hook to fetch app info
const useApp = () => {
    // Destructuring the useQuery hook to fetch app info
    const { refetch, data, isLoading, isError } = useQuery({
        queryKey: ['app'], // Unique query identifier for caching
        queryFn: async () => {
            try {
                // Fetch app info from the API based on the featureId
                const response = await api.get(`/app`);
                return response.data; // Returning the fetched app info
            } catch (error) {
                throw new Error('Error fetching app info'); // Throw an error if fetching fails
            }
        },
    });

    // Return refetch function, app info, loading state, and error state
    return { refetch, data, isLoading, isError };
};

export default useApp;
