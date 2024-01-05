import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Swal from 'sweetalert2'

const ProfileCard = () => {
    // Destructuring 'logout' function and 'user' object from useAuth hook
    const { logout, user } = useAuth();

    // Initializing useNavigate for programmatic navigation
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate(`/`); // Redirect to the feature page after update

                Swal.fire({
                    title: "Logout Successful!",
                    icon: "success"
                });
            }
        });
    };


    return (
        <div className="   border shadow-xl w-full flex flex-row justify-center items-center">
            <div className="card w-full mx-auto bg-white  hover:shadow-xl shadow">
                <img className="w-32 mx-auto  rounded-full -mt-20 border-8 border-white" src={user ? user.photoURL : `https://avatar.iran.liara.run/public/46`} alt="" />
                {
                    user ? <div className="text-center mt-2 text-3xl font-medium">{user.displayName}</div>

                        : <div className="text-center mt-2 text-3xl font-medium">Your Name</div>
                }

                <div className="text-center mt-2 font-light text-sm">Email: {user?.email}</div>

                {
                    user ?
                        <div onClick={handleLogout} className=" mt-5 py-3 m-5  border text-center text-primary hover:text-secondary text-2xl font-semibold  rounded-lg transition duration-200 hover:bg-primary ease">Logout</div>
                        :
                        <Link to={'/signin'}>
                            <div className=" mt-5 py-3 m-5  border text-center text-primary hover:text-secondary text-2xl font-semibold  rounded-lg transition duration-200 hover:bg-primary ease">Sign Up | Sign IN</div>
                        </Link>


                }


            </div>
        </div>
    );
};

export default ProfileCard;