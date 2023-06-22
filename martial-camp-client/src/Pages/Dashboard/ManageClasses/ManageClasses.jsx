import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import FeedbackModal from './FeedbackModal';

const ManageClasses = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enable: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allclass?email=${user.email}`);
            return res.data;
        }
    });

    const handleStatusChange = async (status, item) => {
        const res = await axiosSecure.patch(`/statuschange/${user.email}?status=${status}`, item);
        console.log(res);
        refetch();
    }

    return (
        <div>
            <h1 className='text-center font-bold text-3xl my-6'>Manage Classes</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Instructor</th>
                                <th>Available Seats</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map(items =>
                                    <tr key={items._id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-16 h-16">
                                                        <img src={items.photo} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{items.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {items.instructorName}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{items.instructorEmail}</span>
                                        </td>
                                        <td>{items.availableSeat}</td>
                                        <td>{items.price}</td>
                                        <td>{items.status}</td>
                                        {
                                            items.status === "approve" || items.status === "deny" ?
                                                <>
                                                    <th>
                                                        <button disabled className="btn btn-ghost btn-xs">Approve</button>
                                                    </th>
                                                    <th>
                                                        <button disabled className="btn btn-ghost btn-xs">Deny</button>
                                                    </th>
                                                </> :
                                                <>
                                                    <th>
                                                        <button onClick={() => { handleStatusChange("approve", items) }} className="btn btn-ghost btn-xs">Approve</button>
                                                    </th>
                                                    <th>
                                                        <button onClick={() => { handleStatusChange("deny", items) }} className="btn btn-ghost btn-xs">Deny</button>
                                                    </th>
                                                </>
                                        }

                                        <th>
                                            <FeedbackModal item={items}></FeedbackModal>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;