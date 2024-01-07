import { toast } from 'react-toastify';

const verifyUser = (e) => {
    e.preventDefault();
    toast.error('You must login to to perform the action!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export default verifyUser;