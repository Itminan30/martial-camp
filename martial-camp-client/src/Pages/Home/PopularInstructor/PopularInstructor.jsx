import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const PopularInstructor = () => {
    const axiosSecure = useAxiosSecure();
    const { data: instructors = [], refetch } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/instructors`);
            return res.data.slice(0,6);
        }
    });
    return (
        <div className='my-10'>
            <h2 className='text-center font-bold text-3xl my-8'>Popular Instructors</h2>
            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-5'>
                    {
                        instructors.map(instructor =>
                            <div key={instructor._id} className="card w-11/12 mx-auto md:w-96 bg-base-300 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{instructor.name}</h2>
                                    <p>{instructor.email}</p>
                                </div>
                                <figure><img src={instructor.photo} alt="Shoes" /></figure>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularInstructor;