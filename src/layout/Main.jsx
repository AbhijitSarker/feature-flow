import { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../pages/Home/SideBar/SideBar";
import { Link, Outlet } from 'react-router-dom';
import { GiCrossedBones } from "react-icons/gi";
import { FaBarsStaggered } from "react-icons/fa6";
import Search from "../components/Search/Search";

const Main = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div >
            <NavBar></NavBar>
            <div className="rounded flex flex-col  lg:flex-row h-full mx-10 p-3 bg-white shadow-md -mt-10">

                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex justify-between items-center">
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-200 p-3 focus:outline-none"
                    >
                        {isSidebarOpen ? (
                            <GiCrossedBones className='text-4xl text-primary' />
                        ) : (
                            <FaBarsStaggered className='text-4xl text-primary' />
                        )}

                    </button>
                </div>

                {/* Sidebar */}
                <aside className={`bg-gray-300 text-black w-full lg:w-80 h-screen ${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:min-h-screen p-3 md:p-6`} >
                    {/* Sidebar content */}
                    <Search></Search>


                </aside>

                {/* Main content area */}
                <main className="flex-1 p-6 lg:p-10">
                    {/* Main content */}
                    <Outlet></Outlet>
                </main>
            </div>

        </div >
    );
};

export default Main;