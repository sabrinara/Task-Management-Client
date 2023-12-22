import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../components/Home";
import ErrorPage from "../layouts/ErrorPage";
import Login from "../pages/Login";
import DashBoard from "../components/DashBoard/DashBoard";
import Register from "../pages/Register";
import CreateTask from "../components/DashBoard/CreateTask";
import PreviousTask from "../components/DashBoard/PreviousTask";
import PrivateRoute from "./PrivateRoute";
import MyDetails from "../components/DashBoard/MyDetails";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path : "/dashboard",
                element : <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
            },
            {
                path : "/createtask",
                element : <PrivateRoute><CreateTask></CreateTask></PrivateRoute>,
            },
            {
                path : "/previoustask",
                element : <PrivateRoute><PreviousTask></PreviousTask></PrivateRoute>,
            },
            {
                path:"/mydetails",
                element : <PrivateRoute><MyDetails></MyDetails></PrivateRoute>
            }
        ]
    }
])
export default routes;