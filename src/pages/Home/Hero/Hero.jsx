import React from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../../components/LogoTitle/LogoTitle';
import useApp from '../../../hooks/useApp';
const Hero = () => {
    const { data } = useApp();

    return (
        <div className='hero-bg h-screen'>
            <div className='container mx-auto py-20 flex items-center flex-col gap-10 text-white text-center'>
                <div>
                    <LogoTitle></LogoTitle>
                </div>
                <div>
                    <h1 className='text-4xl md:text-7xl text-headingText font-semibold font-serif  leading-relaxed   md:w-[700px] lg:w-[900px]'>{data?.appInfo[0].description} </h1>
                </div>

                <div>
                    <p className='px-5 text-headingText md:w-[700px]'>This is a placeholder, just here to occupy the space before your finalized copy is ready. Once your content is complete, this text can be replaced with it.</p>
                </div>

                <div className='space-x-5 my-5'>
                    <Link to={'/request'}><button className='gradient-bg rounded-md py-2 px-8 '>Get Started</button></Link>
                    <Link to={'/about'}><button className='gradient-bg rounded-md py-2 px-8 '>About Us</button></Link>
                </div>


            </div>
        </div>

    );
};

export default Hero;