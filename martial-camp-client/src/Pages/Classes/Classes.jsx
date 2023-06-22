import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import ClassCards from './ClassCards';
import useRole from '../../Hooks/useRole';

const Classes = () => {
    const { user } = useContext(AuthContext);
    const [role] = useRole();
    let value;
    if (role === "admin" || role === "instructor") {
        console.log(role);
        value = true;
    }
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allapproved`);
            return res.data;
        }
    });
    return (
        <div>
            <h2 className='text-center font-bold text-3xl my-5'>All Classes</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-6'>
                {
                    classes.map((item, index) => <ClassCards key={index} item={item} user={user} value={value}></ClassCards>
                    )
                }
            </div>
        </div>
    );
};

export default Classes;