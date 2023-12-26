import { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../pages/Home/SideBar/SideBar";
import { Link, Outlet } from 'react-router-dom';
import { GiCrossedBones } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import Search from "../components/Search/Search";
import FeatureForm from "../components/FeatureForm/FeatureForm";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import FeatureNav from "../components/FeatureNav/FeatureNav";
import FeatureCard from "../components/FeatureCard/FeatureCard";

const Main = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div >
            <NavBar></NavBar>
            <div className="rounded  flex flex-col sticky top-20 lg:flex-row mx-2 md:mx-14 p-3 bg-white shadow-md -mt-10">

                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex justify-between items-center">
                    <button onClick={toggleSidebar} className="text-gray-200 p-3 focus:outline-none" >
                        {isSidebarOpen ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-primary' />} </button>
                </div>

                {/* Sidebar */}
                <aside className={`bg-background rounded-md space-y-8 md:sticky md:top-5 md:h-full text-primary w-full lg:w-80 ${isSidebarOpen ? 'block' : 'hidden'} lg:block  p-3 md:p-3`} >
                    {/* Sidebar content */}
                    <ProfileCard></ProfileCard>
                    {/* <h1 className='text-primary text-4xl text-center mb-5 font-bold font-serif'>Feature Flow</h1> */}
                    <FeatureForm></FeatureForm>

                </aside>

                {/* Main content area */}
                <main className="flex-1 px-2 md:pl-5 md:pr-2">
                    {/* Main content */}
                    <FeatureNav></FeatureNav>

                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                </main>
            </div>
        </div >
    );
};

export default Main;