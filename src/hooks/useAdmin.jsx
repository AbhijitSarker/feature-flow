import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import api from "../utils/handleApi";

const useAdmin = () => {
    const { user, loading } = useAuth();

    const { data: isAdmin, isLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !!user && loading, // Enabled the query when 'user' is truthy and not loading
        queryFn: async () => {
            const res = await api.get(`/user/email/${user?.email}`);
            return res.data.user.role;
        },
        // Passed 'user' as a dependency to re-run the query when 'user' changes
        deps: [user]
    });

    return [isAdmin, isLoading];
};

export default useAdmin;