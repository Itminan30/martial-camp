import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';

const ManageUsers = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enable: !loading,
        queryFn: async () => {
        const res = await axiosSecure.get(`/user?email=${user.email}`);
        return res.data;
    }});
    // const { data: users = [], refetch } = useQuery(['users'], async () => {
    //     const res = await fetch(`${import.meta.env.VITE_API_LINK}/user`,
    //         {
    //             headers: {
    //                 authorization: `bearer ${token}`
    //             }
    //         });
    //     return res.json();
    // }
    // );

    const handleRoleChange = (id, role) => {
        fetch(`${import.meta.env.VITE_API_LINK}/user/${id}?role=${role}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                }
            })
    }
    return (
        <div>
            <h1 className='text-center font-bold text-2xl my-12'>Manage User Page</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>User Role</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => <tr key={user._id}>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>{user.role}</td>
                                    <th>
                                        {
                                            user.role === "admin" || user.role === "instructor" ?
                                                <><button disabled className={`btn btn-ghost btn-xs`}>Make Admin</button></> :
                                                <><button onClick={() => { handleRoleChange(user._id, "admin") }} className={`btn btn-ghost btn-xs`}>Make Admin</button></>
                                        }
                                    </th>
                                    <th>
                                        {
                                            user.role === "admin" || user.role === "instructor" ?
                                                <><button disabled className={`btn btn-ghost btn-xs`}>Make Instructor</button></> :
                                                <><button onClick={() => { handleRoleChange(user._id, "instructor") }} className={`btn btn-ghost btn-xs`}>Make Instructor</button></>
                                        }
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;