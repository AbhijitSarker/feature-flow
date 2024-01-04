import { useState } from "react";
import Footer from "../components/Footer/Footer";

import { Link, Outlet, useLocation } from 'react-router-dom';
import { GiCrossedBones } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";

import FeatureForm from "../components/FeatureForm/FeatureForm";
import ProfileCard from "../components/ProfileCard/ProfileCard";


const Main = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const location = useLocation();

    const noFeatureNav = location.pathname.includes('signin') || location.pathname.includes('signup')
    return (
        <div >
            <nav className="bg-primary w-full ">
                <div className='flex justify-between pt-10 h-48 mx-10 '>

                    <h1 className='text-secondary text-4xl font-bold  '></h1>

                    <ul className='md:flex hidden  space-x-5'>
                        <Link className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                        <Link to={'/dashboard'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>
                    </ul>

                </div>
            </nav>

            <div className="rounded  flex flex-col lg:flex-row mx-2 md:mx-14 p-3 bg-white shadow-md -mt-24">

                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex justify-between items-center">
                    <button onClick={toggleSidebar} className="text-gray-200 p-3 focus:outline-none" >
                        {isSidebarOpen ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-primary' />} </button>
                </div>

                {/* Sidebar */}
                <aside className={` rounded-md space-y-16  md:sticky md:top-28 md:h-full text-primary w-full lg:w-1/3 ${isSidebarOpen ? 'block' : 'hidden'} lg:block  p-3 md:p-3`} >
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