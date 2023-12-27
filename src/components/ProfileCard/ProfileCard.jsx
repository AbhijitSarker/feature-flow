import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ProfileCard = () => {
    const { logout, user } = useAuth();
    const handleLogout = () => {
        confirmAlert({
            title: 'Confirm Logout',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                        logout()
                    },
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };


    return (
        <div className="font-baskerville  border shadow-xl w-full flex flex-row justify-center items-center">
            <div className="card w-full mx-auto bg-white  hover:shadow-xl shadow">
                <img className="w-32 mx-auto  rounded-full -mt-20 border-8 border-white" src={user ? user.photoURL : `https://avatars.githubusercontent.com/u/67946056?v=4`} alt="" />
                {
                    user ? <div className="text-center mt-2 text-3xl font-medium">{user.displayName}</div>

                        : <div className="text-center mt-2 text-3xl font-medium">Your Name</div>
                }

                <div className="text-center mt-2 font-light text-sm">Email: {user?.email}</div>

                <hr className="mt-8" />
                <div className="flex p-4">
                    <div className="w-1/2 text-center">
                        <span className="font-bold">1.8 k</span> Followers
                    </div>
                    <div className="w-0 border border-gray-300">

                    </div>
                    <div className="w-1/2 text-center">
                        <span className="font-bold">2.0 k</span> Following
                    </div>
                </div>
                <hr className="mb-8" />

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