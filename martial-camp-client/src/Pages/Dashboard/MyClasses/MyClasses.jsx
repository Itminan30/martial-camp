import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import UpdateModal from './UpdateModal';

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myclass/${user.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-8'>All Classes</h1>
            <div>
                <div className="overflow-x-auto border rounded-lg">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Available Seat</th>
                                <th>Enrolled Students</th>
                                <th>price</th>
                                <th>Status</th>
                                <th>Feedback</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map(item => <tr key={item._id}>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.availableSeat}
                                    </td>
                                    <td>
                                        {item.enrolledCount}
                                    </td>
                                    <td>
                                        {item.price}
                                    </td>
                                    <td className={item.status === "pending" ? `text-gray-700  rounded-lg ` : item.status === "approve" ? `text-green-500 rounded-lg` : `text-red-500 rounded-lg`}>
                                        {item.status}
                                    </td>
                                    <td>
                                        {item.feedback || "No Update"}
                                    </td>
                                    <td>
                                        {/* <button className={`btn btn-accent btn-xs`}>Update Class</button> */}
                                        <UpdateModal refetch={refetch} item={item}></UpdateModal>
                                    </td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyClasses;