import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const EnrolledClass = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enable: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolledclass/${user.email}`);
            return res.data;
        }
    });
    return (
        <div>
            <h2 className='text-center font-bold text-3xl my-6'>
                My Enrolled Class
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    classes.map(item =>
                        <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={item.photo} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Class Name: {item.name}</h2>
                                <p>Instructor: {item.instructorEmail}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default EnrolledClass;