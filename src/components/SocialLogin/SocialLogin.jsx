import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import api from '../../utils/handleApi';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((res) => {
                const loggedInUser = res.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL: loggedInUser.photoURL };

                api.post('/user', saveUser);
                navigate(from, { replace: true });
            })
    };

    return (
        <div onClick={handleGoogleSignIn} className=' p-5 my-5 text-primary justify-center items-baseline flex text-4xl w-full border border-primary  rounded-lg transition duration-200  hover:shadow-2xl ease'>
            <span className='text-sm'>Sign In With</span><FcGoogle /><span className='font-bold font-baskerville'>OOGLE</span>
        </div>
    );
};

export default SocialLogin;