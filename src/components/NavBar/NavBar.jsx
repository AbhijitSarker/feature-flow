import { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossedBones } from "react-icons/gi";
import { Link } from 'react-router-dom';
import LogoTitle from '../LogoTitle/LogoTitle';
import useApp from '../../hooks/useApp';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { data } = useApp();
    return (
        <nav className="bg-gray-900 w-full h-60">
            <div className='flex justify-between  pt-5  mx-2 md:mx-10 '>

                <LogoTitle></LogoTitle>
                {/*for small device */}
                <ul className={`absolute z-10 w-full h-screen flex flex-col gap-10 justify-center items-center bg-secondary transform duration-500 ease-in-out ${open ? 'left-0 top-0' : '-top-[2000px]  left-0'} `}>
                    <Link to={'/'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                    <Link to={'/dashboard'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>

                </ul>

                {/* for medium and large device */}
                <ul className='md:flex hidden  space-x-5'>
                    <Link to={'/'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                    <Link to={'/dashboard'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>
                </ul>


                <div></div>
                {/* <Link to={'/signup'}><button className='hidden md:flex hover:text-secondary   w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Login / Register</button></Link> */}
                <div className='md:hidden z-20' onClick={() => setOpen(!open)}>
                    {
                        open ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-secondary' />
                    }
                </div>
            </div>
            <div className='hidden md:flex justify-center container mx-auto w-[700px] mt-5 text-secondary'>
                <p>{data?.appInfo[0].description}</p>
            </div>
        </nav>
    );
};

export default NavBar;
