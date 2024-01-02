import { useQuery } from '@tanstack/react-query';
import api from '../utils/handleApi'; // Importing the API utility

// Custom hook to fetch comments based on a featureId
const useComments = (featureId) => {
    // Destructuring the useQuery hook to fetch comments data
    const { refetch, data: comments = [], isLoading, isError } = useQuery({
        queryKey: ['comment', featureId], // Unique query identifier for caching
        queryFn: async () => {
            try {
                // Fetch comments data from the API based on the featureId
                const response = await api.get(`/comment?featureId=${featureId}`);
                return response.data; // Returning the fetched comments data
            } catch (error) {
                throw new Error('Error fetching comments'); // Throw an error if fetching fails
            }
        },
    });

    // Return refetch function, comments data, loading state, and error state
    return { refetch, comments, isLoading, isError };
};

export default useComments;
