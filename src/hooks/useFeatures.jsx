import { useQuery } from '@tanstack/react-query';
import api from '../utils/handleApi';

const useFeatures = () => {
    const { refetch, data: features = [] } = useQuery({
        queryKey: ['feature'], // Unique query identifier
        queryFn: async () => {
            // Fetch cart data based on the user's email using axiosSecure
            const response = await api.get(`/feature`)
            return response.data;
        },
    })
    return [features, refetch];    // Returns the fetched cart data and a function to refetch it
};

export default useFeatures;