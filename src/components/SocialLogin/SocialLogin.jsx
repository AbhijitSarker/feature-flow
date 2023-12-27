import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { googleSignIn, user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                navigate(from, { replace: true });
            })
    };
    console.log(user)
    return (
        <div onClick={handleGoogleSignIn} className=' p-5 my-5 text-primary justify-center items-baseline flex text-4xl w-full border border-primary  rounded-lg transition duration-200  hover:shadow-2xl ease'>
            <span className='text-sm'>Sign In With</span><FcGoogle /><span className='font-bold font-baskerville'>OOGLE</span>
        </div>
    );
};

export default SocialLogin;