import React from 'react';

const ProfileCard = () => {
    return (
        <div className="  w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white  hover:shadow-xl shadow">
                <img className="w-32 mx-auto  rounded-full -mt-20 border-8 border-white" src="https://avatars.githubusercontent.com/u/67946056?v=4" alt="" />
                <div className="text-center mt-2 text-3xl font-medium">Ajo Alex</div>
                <div className="text-center mt-2 font-light text-sm">@devpenzil</div>

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
            </div>
        </div>
    );
};

export default ProfileCard;