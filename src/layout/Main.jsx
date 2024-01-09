import { useState } from "react";
import Footer from "../components/Footer/Footer";

import { Outlet, useLocation } from 'react-router-dom';
import { GiCrossedBones } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import FeatureForm from "../components/FeatureForm/FeatureForm";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Navbar from "../components/NavBar/NavBar";
import { FaArrowLeft } from "react-icons/fa";


const Main = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div >

            <Navbar></Navbar>
            <div className="rounded  flex flex-col lg:flex-row mx-2 md:mx-14 p-3 bg-white shadow-md -mt-40 md:-mt-16">

                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex justify-between items-center">
                    <button onClick={toggleSidebar} className="text-gray-200 p-3 focus:outline-none" >
                        {isSidebarOpen ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-primary' />} </button>
                    <div className='text-primary text-2xl font-semibold flex items-center'>
                        <FaArrowLeft />
                        <span>Request Feature</span>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className={` rounded-md space-y-16   md:h-full text-primary w-full lg:w-1/3 ${isSidebarOpen ? 'block' : 'hidden'} lg:block  p-3 md:p-3`} >
                    {/* Sidebar content */}
                    <ProfileCard></ProfileCard>
                    {/* <h1 className='text-primary text-4xl text-center mb-5 font-bold  '>Feature Flow</h1> */}
                    <FeatureForm></FeatureForm>

                </aside>

                {/* Main content area */}
                <main className="flex-1 px-2 md:pl-5 md:pr-2">
                    {/* Main content */}
                    <Outlet></Outlet>

                </main>
            </div>
            <Footer></Footer>
        </div >
    );
};

export default Main;