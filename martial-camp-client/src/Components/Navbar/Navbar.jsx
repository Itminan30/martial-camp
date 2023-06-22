import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import logo from "../../assets/images/logo/logo.png"
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';
import { AttentionSeeker } from 'react-awesome-reveal';

const Navbar = () => {

    // const user = {
    //     displayName: "Itminan",
    //     photoURL: "https://images.unsplash.com/photo-1530695440407-21fef47230b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    // }
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme(theme === "dark" ? 'light' : 'dark');
    }

    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme])

    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const navList = <>
        <li className='font-semibold'><Link to="/">Home</Link></li>
        <li className='font-semibold'><Link to="/instructors">Instructor</Link></li>
        <li className='font-semibold'><Link to="/classes">Classes</Link></li>
        <li>
            <label className="swap swap-rotate">
                <input onClick={toggleTheme} type="checkbox" />
                <div className="swap-on text-xl"><MdLightMode></MdLightMode></div>
                <div className="swap-off text-xl"><MdOutlineLightMode></MdOutlineLightMode></div>
            </label>
        </li>
        {
            user && <>
                <li className='font-semibold'><Link to={`/dashboard`}>Dashboard</Link></li>
            </>
        }
    </>

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate(location.pathname);
                console.log("User logged out");
            })
    }

    return (
        <div className=''>
            <div className="navbar bg-[#F8F6F4] mt-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
                            {navList}
                        </ul>
                    </div>
                    <div className='grid grid-cols-2 items-center'>
                        <Link className='w-10 flex-0 md:w-24' to="/">
                            <img className='w-full' src={logo} alt="" />
                        </Link>
                        <AttentionSeeker effect='tada'>
                            <p className='text-md md:text-2xl font-bold'>
                                <span>Martial</span> Camp
                            </p>
                        </AttentionSeeker>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navList}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ?
                        <div className="dropdown dropdown-end">
                            <div className="tooltip tooltip-bottom" data-tip={user ? user?.displayName : "No User"}>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </label>
                            </div>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w- z-10">
                                <li><Link to={`/dashboard`}>Dashboard</Link></li>
                                <li onClick={handleLogout}><Link>Logout</Link></li>
                            </ul>
                        </div>
                        :
                        <Link className='btn' to="/login">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;