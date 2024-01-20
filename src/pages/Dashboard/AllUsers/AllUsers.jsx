import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/handleApi";
import Swal from 'sweetalert2'
import useAdmin from "../../../hooks/useAdmin";
import AdminInfo from "../../../components/AdminInfo/AdminInfo";
import { Helmet } from "react-helmet-async";

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

    if (isAdmin === 'admin') {
        return (
            <div className="">
                <Helmet>
                    <title>Users | Feature Flow </title>
                </Helmet>
                <h2 className='text-4xl mb-16 font-semibold text-headingText'>Manage Users</h2>

                <div>
                    <table className="min-w-full text-headingText border-collapse block md:table">
                        <thead className="block md:table-header-group">
                            <tr className="border border-gray-700 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Name</th>
                                <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Email </th>
                                <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Role</th>
                                <th className="section-bg p-2 text-white font-bold md:border md:border-gray-700 text-left block md:table-cell">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="block md:table-row-group">
                            {
                                allUsers?.map(user => <tr key={user._id} className="section-bg border border-gray-700 md:border-none block md:table-row">
                                    <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>{user.name}</td>
                                    <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email </span>{user.email}</td>
                                    <td className="p-2 md:border md:border-gray-700 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Role</span>{user.role}</td>

                                    <td className="p-2 md:border md:border-gray-700 text-left flex flex-row justify-end  gap-4 ">
                                        {/* <span className="inline-block w-1/3 md:hidden font-bold">Action</span> */}
                                        <button type="button" onClick={() => makeAdmin(user._id)} className={`${user.role === 'admin' ? 'hidden' : ''} mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}>Make Admin</button>
                                        <button type="button" onClick={() => deleteUser(user._id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>

                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>

                </div >


            </div>
        );
    } else {
        return <AdminInfo></AdminInfo>
    }
};

export default AllUsers;