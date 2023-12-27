import { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../pages/Home/SideBar/SideBar";
import { Link, Outlet, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    const noFeatureNav = location.pathname.includes('signin') || location.pathname.includes('signup')
    return (
        <div >
            <nav className="bg-gray-900 w-full ">
                <div className='flex justify-between pt-10 h-48 mx-10 '>

                    <h1 className='text-secondary text-4xl font-bold font-baskerville'></h1>

                    <ul className='md:flex hidden  space-x-5'>
                        <Link className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Homes</Link>
                        <Link className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>abouts</Link>
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
                <aside className={`bg-background rounded-md space-y-8  md:h-full text-primary w-full lg:w-1/3 ${isSidebarOpen ? 'block' : 'hidden'} lg:block  p-3 md:p-3`} >
                    {/* Sidebar content */}
                    <ProfileCard></ProfileCard>
                    {/* <h1 className='text-primary text-4xl text-center mb-5 font-bold font-baskerville'>Feature Flow</h1> */}
                    <FeatureForm></FeatureForm>

                </aside>

                {/* Main content area */}
                <main className="flex-1 px-2 md:pl-5 md:pr-2">
                    {/* Main content */}
                    {
                        noFeatureNav || <FeatureNav></FeatureNav>
                    }

                    <Outlet></Outlet>

                </main>
            </div>
        </div >
    );
};

export default Main;