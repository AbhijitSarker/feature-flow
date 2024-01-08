import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/handleApi";
import Swal from 'sweetalert2'
import useAdmin from "../../../hooks/useAdmin";
import AdminInfo from "../../../components/AdminInfo/AdminInfo";

const AllUsers = () => {

    //tanstack query to query to get all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            // Making an API call to retrieve user data
            const response = await api.get('/user');
            return response.data;
        },
    });

    // Extracting users from the fetched data
    const allUsers = users.users

    // Function to promote a user to admin
    const makeAdmin = (userId) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Make Admin!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Making a PATCH request to update user role to 'admin'
                    api.patch(`/user/${userId}`, { role: 'admin' });
                    // Triggering a data refetch after updating the user
                    refetch()

                    Swal.fire({
                        title: "Successful!",
                    });
                }
            });

        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    // Function to delete a user
    const deleteUser = async (userId) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Making a DELETE request to delete the user
                    api.delete(`/user/${userId}`);
                    // Triggering a data refetch after deleting the user
                    refetch()

                    Swal.fire({
                        title: "Successful!",
                    });
                }
            });

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const [isAdmin] = useAdmin()

    if (isAdmin === 'user') {
        return <AdminInfo></AdminInfo>
    }

    return (
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex">
                <h1 className="text-3xl">
                    Users
                </h1>
            </div>
            <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr className="border-b">
                            <th className="text-left p-3 px-5">Name</th>
                            <th className="text-left p-3 px-5">Email</th>
                            <th className="text-left p-3 px-5">Role</th>
                            <th>Actions</th>
                        </tr>
                        {
                            allUsers?.map(user => <tr key={user._id} className="border-b hover:bg-orange-100">
                                <td className="p-3 px-5">{user.name}</td>
                                <td className="p-3 px-5">{user.email}</td>
                                <td className="p-3 px-5">{user.role} </td>
                                <td className="p-3 px-5 flex justify-end">
                                    <button type="button" onClick={() => makeAdmin(user._id)} className={`${user.role === 'admin' ? 'hidden' : ''} mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}>Make Admin</button>
                                    <button type="button" onClick={() => deleteUser(user._id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;