import { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossedBones } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import LogoTitle from '../LogoTitle/LogoTitle';
import useApp from '../../hooks/useApp';
import { RxAvatar } from "react-icons/rx";
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2'

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth()
    const { data } = useApp();


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

                toast.success('Successfully Logged Out!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        });
    };
    return (
        <nav className="section-bg w-full shadow-xl border-b border-b-gray-800">
            <div className='flex justify-between  gap-10 py-3 md:py-5 container mx-auto'>

                <LogoTitle></LogoTitle>

                {/*for small device */}
                <ul className={`absolute z-10 w-full h-screen flex flex-col gap-10 justify-center items-center bg-black transform duration-500 ease-in-out ${open ? 'left-0 top-0' : '-top-[2000px]  left-0'} `}>
                    <Link to={'/'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                    <Link to={'/about'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>About</Link>
                    <Link to={'/dashboard'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>
                    <Link to={'/request'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Get Started</Link>
                    {
                        user ?
                            <button onClick={handleLogout} className=' hover:text-secondary   w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Logout</button>
                            :
                            <Link to={'/signin'}><button className=' hover:text-secondary   w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Login</button></Link>
                    }
                </ul>


                {/* for medium and large device */}
                <ul className='md:flex hidden items-center  space-x-5'>
                    <Link to={'/'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                    <Link to={'/about'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>About</Link>
                    <Link to={'/dashboard'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>
                    <Link to={'/request'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Get Started</Link>
                </ul>

                {
                    user ?
                        <button onClick={handleLogout} className='hidden md:flex hover:text-secondary   w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Logout</button>
                        :
                        <Link to={'/signin'}><button className='hidden md:flex hover:text-secondary   w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Login</button></Link>
                }
                <div className='md:hidden z-20' onClick={() => setOpen(!open)}>
                    {
                        open ? <GiCrossedBones className='text-4xl text-secondary' /> : <FaBarsStaggered className='text-4xl text-secondary' />
                    }
                </div>
            </div>
            <ToastContainer />

        </nav>
    );
};

export default NavBar;

{/* <div className='hidden md:flex justify-center container mx-auto w-[700px] mt-5 text-secondary'>
    <p>{data?.appInfo[0].description}</p>
</div> */}