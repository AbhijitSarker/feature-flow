import { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCrossedBones } from "react-icons/gi";
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-primary w-full ">
            <div className='flex justify-between pt-10 h-48 mx-10 '>

                <h1 className='text-secondary text-4xl font-bold font-serif'>Feature Flow</h1>

                {/*for small device */}
                <ul className={`absolute w-full h-screen flex flex-col gap-10 justify-center items-center bg-secondary transform duration-500 ease-in-out ${open ? 'left-0 top-0' : '-top-[2000px]  left-0'} `}>
                    <li>hekki</li>
                    <li>hekki</li>
                </ul>

                {/* for medium and large device */}
                <ul className='md:flex hidden  space-x-5'>
                    <Link className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Homes</Link>
                    <Link className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>abouts</Link>
                </ul>



                <Link to={'/signin'}><button className='hidden md:flex hover:text-secondary font-serif w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Login / Register</button></Link>
                <div className='md:hidden z-20' onClick={() => setOpen(!open)}>
                    {
                        open ? <GiCrossedBones className='text-4xl text-primary' /> : <FaBarsStaggered className='text-4xl text-secondary' />
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
