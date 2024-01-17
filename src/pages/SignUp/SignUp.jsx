import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import api from '../../utils/handleApi';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const navigate = useNavigate();

    const password = React.useRef({});
    password.current = watch('password', '');

    const onSubmit = (data) => {

        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name)
                    .then(result => {
                        api.post('/user', { name: data.name, email: data.email, password: data.password })
                        navigate('/')
                        toast.success('User registered Successfully!', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    })
            })
    };

    return (
        <div className="hero-bg min-h-screen text-primary relative  ">
            <Helmet>
                <title>Sign UP | Feature Flow </title>
            </Helmet>
            <div className='container mx-auto'>
                <div className=' flex flex-col-reverse md:flex-row'>

                    <div className='md:w-1/2'>
                        <div className=' flex flex-col justify-center h-full  gap-10 md:px-20' >
                            <SocialLogin></SocialLogin>

                            <h1 className='text-5xl text-white'>Lorem ipsum dolor sit amet.</h1>
                            <p className=' text-headingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur illo, nihil voluptas iusto accusantium doloremque. Hic tempore tempora ea ad voluptatibus corrupti rem exercitationem autem aliquid at accusantium ut repellat impedit ullam, qui iure illo vel, placeat obcaecati! Cupiditate.</p>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex flex-col justify-center items-center w-full lg:flex-row">
                        <div className="w-full relative max-w-xl lg:mt-0 ">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex text-headingText section-bg my-10 border border-gray-700 flex-col items-start max-w-xl justify-start pt-10 pr-5 pb-10 pl-5 md:px-10  shadow-2xl rounded-xl relative">

                                <div className="w-full mt-6 relative space-y-10">

                                    <div className='w-full text-center text-3xl'>
                                        <p>Sign Up with email</p>
                                    </div>
                                    <div className="relative">
                                        <p className="section-bg pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-headingText absolute">Name</p>
                                        <input {...register('name', { required: 'Name is required' })} type="text" placeholder="John" className=" focus:shadow-xl border placeholder-gray-500 focus:outline-none focus:border-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-transparent border-gray-700 rounded-md" />
                                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                                    </div>

                                    <div className="relative">
                                        <p className="section-bg pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-headingText absolute">Email</p>
                                        <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} type="text" placeholder="123@ex.com" className="focus:shadow-xl border placeholder-gray-500 focus:outline-none focus:border-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-transparent border-gray-700 rounded-md" />
                                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                                    </div>

                                    <div className="relative">
                                        <p className="section-bg pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-headingText absolute">Password</p>
                                        <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password should have at least 6 characters' } })} type="password" placeholder="Password" className="focus:shadow-xl border placeholder-gray-500 focus:outline-none focus:border-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-transparent border-gray-700 rounded-md" />
                                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                                    </div>

                                    <div className="relative">
                                        <p className="section-bg pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-headingText absolute">Confirm Password</p>
                                        <input {...register('confirmPassword', {
                                            validate: (value) => value === password.current || 'Passwords must match',
                                        })} type="password" placeholder="Confirm Password" className="focus:shadow-xl border placeholder-gray-500 focus:outline-none focus:border-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-transparent border-gray-700 rounded-md" />
                                        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                                    </div>

                                    <div>
                                        <p>Already have an Account? <span><Link className='text-secondary' to={'/signin'}>Sign IN</Link></span></p>
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
        </div >
    );
};

export default SignUp;