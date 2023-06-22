import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import logo from "../assets/images/logo/logo.png"

const Dashboard = () => {
    const [role] = useRole();
    // console.log(role);
    let list
    if (role === "admin") {
        list = <>
            <li><Link to="/dashboard/manageuser">Manage Users</Link></li>
            <li><Link to="/dashboard/manageclass">Manage Classes</Link></li>
        </>
    }
    else if (role === "student") {
        list = <>
            <li><Link to="/dashboard/selectedclass">Selected Class</Link></li>
            <li><Link to="/dashboard/enrolledclass">Enrolled Class</Link></li>
        </>
    }
    else if (role === "instructor") {
        list = <>
            <li><Link to="/dashboard/addclass">Add Class</Link></li>
            <li><Link to="/dashboard/myclass">My Classes</Link></li>
        </>
    }
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <div className='w-36 mx-auto'>
                            <Link to="/"><img src={logo} alt="" /></Link>
                            <h2 className='font-bold my-5'>{role} Dashboard</h2>
                        </div>
                        {list}
                        <div className="divider"></div>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/classes">Classes</Link></li>
                        <li><Link to="/instructors">Instructors</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;