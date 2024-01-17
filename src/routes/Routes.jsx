import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Feature from "../pages/Feature/Feature";
import EditFeature from "../pages/EditFeature/EditFeature";
import Dashboard from "../layout/Dashboard/Dashboard";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Features from "../pages/Dashboard/Features/Features";
import Request from "../pages/Request/Request";

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
                path: "/request",
                element: <Request></Request>
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
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            //user routes
            {
                path: '',
                element: <UserHome></UserHome>
            },
            {
                path: 'features',
                element: <Features></Features>
            },
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },

        ]
    }
]);