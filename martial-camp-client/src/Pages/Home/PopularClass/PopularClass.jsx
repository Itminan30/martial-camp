import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const PopularClass = () => {
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/popularclass`);
            return res.data.slice(0,6);
        }
    });
    return (
        <div className='my-10'>
            <h2 className='text-center font-bold text-3xl my-8'>Popular Classes</h2>
            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-5'>
                    {
                        classes.map(item =>
                            <div key={item._id} className="card w-11/12 mx-auto md:w-96 bg-base-300 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Class Name: {item.name}</h2>
                                    <p>Enrolled Students: {item.enrolledCount}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                                <figure><img src={item.photo} alt="Shoes" /></figure>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularClass;