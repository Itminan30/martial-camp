import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SelectedClass from "../Pages/Dashboard/SelectedClass/SelectedClass";
import EnrolledClass from "../Pages/Dashboard/EnrolledClass/EnrolledClass";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/instructors",
                element: <Instructors></Instructors>
            },
            {
                path: "/classes",
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "manageuser",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "manageclass",
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: "selectedclass",
                element: <SelectedClass></SelectedClass>
            },
            {
                path: "enrolledclass",
                element: <EnrolledClass></EnrolledClass>
            },
            {
                path: "addclass",
                element: <AddClass></AddClass>
            },
            {
                path: "myclass",
                element: <MyClasses></MyClasses>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
]);

export default router;