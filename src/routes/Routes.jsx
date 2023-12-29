import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Feature from "../pages/Feature/Feature";
import EditFeature from "../pages/EditFeature/EditFeature";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>
            },
            {
                path: "/feature/:id",
                element: <Feature></Feature>
            },
            {
                path: "/editfeature/:id",
                element: <EditFeature></EditFeature>
            },
        ]
    },
]);