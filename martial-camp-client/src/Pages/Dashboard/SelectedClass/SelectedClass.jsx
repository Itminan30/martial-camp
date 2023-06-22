import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const SelectedClass = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enable: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/getfromcart/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/deletefromcart/${id}`);
        console.log(res);
        refetch();
    }

    const handleBuy = async (id, item) => {
        const res = await axiosSecure.patch(`/buyfromcart/${id}`, item);
        console.log(res);
        refetch();
        navigate("/enrolledclass")
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-6'>My Selected Class</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    classes.map(item =>
                        <div key={item._id} className="card card-compact w-96 m-3 bg-base-100 shadow-xl">
                            <figure><img src={item.photo} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Class Name: {item.name}</h2>
                                <p>Price: ${item.price}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => {handleDelete(item._id)}} className="btn btn-error">Delete</button>
                                    <button onClick={() => {handleBuy(item._id, item)}} className="btn btn-accent">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SelectedClass;