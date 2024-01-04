import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/handleApi";

const AllUsers = () => {

    //tanstack query to query to get all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await api.get('/user');
            return response.data;
        },
    });
    const allUsers = users.users

    return (
        <div class="text-gray-900 bg-gray-200">
            <div class="p-4 flex">
                <h1 class="text-3xl">
                    Users
                </h1>
            </div>
            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr class="border-b">
                            <th class="text-left p-3 px-5">Name</th>
                            <th class="text-left p-3 px-5">Email</th>
                            <th class="text-left p-3 px-5">Role</th>
                            <th></th>
                        </tr>
                        {
                            allUsers?.map(user => <tr class="border-b hover:bg-orange-100">
                                <td class="p-3 px-5">{user.name}</td>
                                <td class="p-3 px-5">{user.email}</td>
                                <td class="p-3 px-5">
                                    <select value={user.role} class="bg-transparent">
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td class="p-3 px-5 flex justify-end"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;