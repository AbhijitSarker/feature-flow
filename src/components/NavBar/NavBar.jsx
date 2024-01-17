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
        <nav className="bg-primary w-full shadow-lg">
            <div className='flex justify-center  gap-10 py-8 container mx-auto'>

                {/* <LogoTitle></LogoTitle> */}
                <div>
                    <h1 className='text-secondary  text-3xl md:text-4xl font-baskerville font-bold '>{data?.appInfo[0].title}</h1>
                </div>
                {/*for small device */}
                <ul className={`absolute z-10 w-full h-screen flex flex-col gap-10 justify-center items-center bg-secondary transform duration-500 ease-in-out ${open ? 'left-0 top-0' : '-top-[2000px]  left-0'} `}>
                    <Link to={'/'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                    <Link to={'/dashboard'} className='text-lg font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>

                </ul>



                <div className='flex text-secondary'>
                    <img className='w-10 h-10 rounded-md mr-3 ' src={data?.appInfo[0].logo} alt="" />
                </div>

                {/* for medium and large device */}
                <ul className='md:flex hidden items-center  space-x-5'>
                    <Link to={'/'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Home</Link>
                    <Link to={'/dashboard'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Dashboard</Link>
                    <Link to={'/signin'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Login</Link>
                    <Link to={'/request'} className='text-base font-lg font-sans text-white hover:text-secondary rounded-md px-1'>Get Started</Link>

                </ul>
                {/* <Link to={'/signup'}><button className='hidden md:flex hover:text-secondary   w-36 h-12 items-center justify-center rounded-lg font-bold text-xl text-white transition ease-in-out duration-200'>Login / Register</button></Link> */}
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

{/* <div className='hidden md:flex justify-center container mx-auto w-[700px] mt-5 text-secondary'>
    <p>{data?.appInfo[0].description}</p>
</div> */}