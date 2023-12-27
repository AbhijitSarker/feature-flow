
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();


    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="bg-white text-primary relative font-baskerville">
            <div className="flex flex-col items-center justify-between  max-w-7xl xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pt-5  pb-20  lg:flex-row">
                    <div className="w-full mt-5 md:mt-20  relative z-10 max-w-2xl lg:mt-0 ">

                        <form onSubmit={handleSubmit(onSubmit)} className="flex border my-10 flex-col items-start justify-start pt-10 pr-5 pb-10 pl-5 md:px-10 bg-white shadow-2xl rounded-xl relative z-10">


                            <div className=' p-5 my-5 text-primary justify-center items-baseline flex text-4xl w-full border border-primary  rounded-lg transition duration-200  hover:shadow-2xl ease'><span className='text-sm'>Sign In With</span><FcGoogle /><span className='font-bold font-baskerville'>OOGLE</span></div>
                            <div className="h-[1px] w-full bg-gray-300 my-5"></div>

                            <div className="w-full mt-6 relative space-y-10">

                                <div className='w-full text-center text-3xl'>
                                    <p>Sign Up with email</p>
                                </div>

                                <div className="relative">
                                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                                    <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} type="text" placeholder="123@ex.com" className="focus:shadow-xl border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                                </div>

                                <div className="relative">
                                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
                                    <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password should have at least 6 characters' } })} type="password" placeholder="Password" className="focus:shadow-xl border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md" />
                                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                                </div>

                                <div>
                                    <p>Don't have an Account? <span><Link className='text-secondary' to={'/signup'} >Sign IN</Link></span></p>
                                </div>

                                <div className="relative">
                                    <input className="w-full h-16 mt-5 border border-primary text-secondary text-2xl font-semibold  rounded-lg transition duration-200 hover:bg-primary ease" type="submit" value={'Submit'} />
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;