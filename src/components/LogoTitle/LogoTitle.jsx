import React from 'react';
import useApp from '../../hooks/useApp';
import { Link } from 'react-router-dom';

const LogoTitle = () => {
    const { data } = useApp();
    return (
        <Link>
            <div className='flex text-secondary'>
                <img className='w-10 h-10 rounded-md mr-3 ' src={data?.appInfo[0].logo} alt="" />
                <h1 className=' text-3xl md:text-4xl font-bold'>{data?.appInfo[0].title}</h1>
            </div>
        </Link>
    );
};

export default LogoTitle;