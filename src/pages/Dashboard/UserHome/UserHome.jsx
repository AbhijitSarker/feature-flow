import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();

    return (
        <div className="w-full m-4">
            <h3>Hi, {user?.displayName}, Welcome Back</h3>
        </div>
    );
};

export default UserHome;