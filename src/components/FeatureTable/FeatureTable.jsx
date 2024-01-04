import React from 'react';
import Swal from 'sweetalert2'
import api from '../../utils/handleApi';

const FeatureTable = ({ filteredFeatures }) => {
    console.log(filteredFeatures)
    const deleteFeature = (userId) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete!"
            }).then((result) => {
                if (result.isConfirmed) {
                    api.delete(`/feature/${userId}`);

                    Swal.fire({
                        title: "Successful!",
                    });
                }
            });

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    return (
        <div class="text-gray-900 bg-gray-200 ">

            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-white shadow-md rounded mb-4">
                    <tbody>
                        <tr class="border-b">
                            <th class="text-left p-3 px-5">Name</th>
                            <th class="text-left p-3 px-5">Author</th>
                            <th class="text-left p-3 px-5">Likes </th>
                            <th class="text-left p-3 px-5"> Comments</th>
                            <th class="text-left p-3 px-5">Status</th>
                            <th>Actions</th>
                        </tr>
                        {
                            filteredFeatures?.map(feature => <tr class="border-b hover:bg-orange-100">
                                <td class="p-3 px-5">{feature.title}</td>
                                <td class="p-3 px-5">{feature.userName}</td>
                                <td class=" p-3 px-5">{feature.likes.length}</td>
                                <td class=" p-3 px-5"> {feature.comments.length}</td>
                                <td class="p-3 px-5"> {feature.status}</td>
                                <td class="p-3 px-5 flex justify-end">
                                    <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                    <button type="button" onClick={() => deleteFeature(feature._id)} class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeatureTable;