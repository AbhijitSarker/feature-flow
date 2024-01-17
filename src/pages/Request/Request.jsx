import React from 'react';
import FeatureForm from '../../components/FeatureForm/FeatureForm';

const Request = () => {
    return (
        <div className=' flex flex-col items-center hero-bg min-h-screen'>
            <div className='container mx-auto flex flex-col md:flex-row py-20'>
                <div className='md:w-1/2 flex flex-col justify-center gap-10 px-20' >
                    <h1 className='text-5xl text-white'>Lorem ipsum dolor sit amet.</h1>
                    <p className=' text-headingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur illo, nihil voluptas iusto accusantium doloremque. Hic tempore tempora ea ad voluptatibus corrupti rem exercitationem autem aliquid at accusantium ut repellat impedit ullam, qui iure illo vel, placeat obcaecati! Cupiditate.</p>
                </div>
                <div className='mx-auto'>
                    <FeatureForm></FeatureForm>

                </div>
            </div>
        </div>
    );
};

export default Request;