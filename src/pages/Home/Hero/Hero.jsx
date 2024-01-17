import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import LogoTitle from '../../../components/LogoTitle/LogoTitle';

const Hero = () => {
    return (
        <div className='hero-bg h-screen'>
            <div className='sticky top-0 z-10'>
                <NavBar></NavBar>
            </div>
            <div className='container scale-75 translate-x-4  mx-auto flex items-center mt-10 flex-col gap-10 text-white text-center'>
                <div>
                    <LogoTitle></LogoTitle>
                </div>
                <div>
                    <h1 className='text-4xl md:text-7xl font-semibold font-serif  leading-relaxed   md:w-[700px] lg:w-[900px]'>Empowering Ideas, Engaging Conversations, Evolving Features.  </h1>
                </div>

                <div>
                    <p className='px-5 md:w-[700px]'>This is a placeholder, just here to occupy the space before your finalized copy is ready. Once your content is complete, this text can be replaced with it.</p>
                </div>

                <div className='space-x-5 my-5'>
                    <Link><button className='gradient-bg rounded-md py-2 px-8 '>Get Started</button></Link>
                    <Link><button className='gradient-bg rounded-md py-2 px-8 '>About Us</button></Link>
                </div>


            </div>
        </div>

    );
};

export default Hero;