import { useState } from 'react';

import { Link, Outlet } from 'react-router-dom';
import { FiShoppingCart, } from 'react-icons/fi';
import { GiCrossedBones, GiForkKnifeSpoon, GiWallet } from "react-icons/gi";
import { FaBook, FaHome, FaUsers } from "react-icons/fa";
import { FaBarsStaggered } from 'react-icons/fa6';

const Dashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling the sidebar

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen ">

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex justify-between items-center">
                <Link to={'/'}>
                    <h1 className='text-5xl font-bold text-primary'>Res2Ran</h1>
                </Link>
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
            <aside className={`bg-primary text-white w-full lg:w-80 h-screen ${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:min-h-screen p-3 md:p-6`} >
                {/* Sidebar content */}
                <h1 className="text-black text-7xl font-bold">Res2Ran</h1>
                {/* Sidebar links/menu */}
                <ul className="p-4 min-h-full">

                    <Link to='/dashboard'>   <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaHome /> <p>Admin Home</p> </div>  </Link>
                    <Link to='/dashboard/mycart'>      <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FiShoppingCart /> <p>My Cart</p> </div>  </Link>
                    <Link to='/dashboard/addItem'>     <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <GiForkKnifeSpoon /> <p>Add An Items</p> </div>  </Link>
                    <Link to='/dashboard/features'> <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaBook /> <p>Manage Items</p> </div>  </Link>
                    <Link to='/dashboard/users'>    <div className='flex items-center gap-2 text-2xl mb-4 rounded-md px-2 py-1 hover:bg-gray-800 hover:text-white '> <FaUsers /> <p>All Users</p> </div>  </Link>
                </ul>
            </aside>

            {/* Main content area */}
            <main className="flex-1 p-6 lg:p-10">
                {/* Main content */}
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default Dashboard;
