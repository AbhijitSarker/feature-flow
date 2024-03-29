import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GiCrossedBones } from "react-icons/gi";
import { FaBook, FaHome, FaUsers } from "react-icons/fa";
import { FaBarsStaggered } from 'react-icons/fa6';
import LogoTitle from '../../components/LogoTitle/LogoTitle';

import useAdmin from '../../hooks/useAdmin';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen ">
            <Helmet>
                <title>Dashboard | Feature Flow </title>
            </Helmet>
            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex justify-between items-center">

                <LogoTitle></LogoTitle>

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
            <aside className={`bg-[#002233] text-white w-full lg:w-96 h-screen ${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:min-h-screen p-3 md:p-6`} >
                {/* Sidebar content */}
                <LogoTitle></LogoTitle>
                {/* Sidebar links/menu */}
                {
                    isAdmin === 'admin' ?
                        <ul className="p-4 min-h-full">

                            <Link to='/dashboard'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaHome /> <p>Admin Home</p> </div>  </Link>
                            <Link to='/dashboard/features'> <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaBook /> <p>Manage Features</p> </div>  </Link>
                            <Link to='/dashboard/users'>    <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaUsers /> <p>All Users</p> </div>  </Link>
                        </ul>
                        :
                        <></>
                }
            </aside>

            {/* Main content area */}
            <main className="flex-1 p-6 section-bg lg:p-10">
                {/* Main content */}
                <Outlet></Outlet>
            </main>

        </div>
    );
};

export default Dashboard;
