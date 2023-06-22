import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UpdateModal = ({ item, refetch }) => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        data.status = "pending";
        data.price = parseInt(data.price);
        data.availableSeat = parseInt(data.availableSeat);
        console.log(data);
        const res = await axiosSecure.patch(`/updateclass/${item._id}`, data);
        console.log(res);
        setShowModal(false);
        refetch();
    }


    return (
        <div>
            <button
                className="btn bg-zinc-400 btn-xs"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Update Class
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-3/4 md:w-1/3 my-6 mx-auto max-w-4xl">
                            <div className="border-0 bg-slate-400 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                                <h2 className='text-center font-semibold mt-3 text-xl text-neutral-100'>Update {item.name}</h2>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-2">
                                        <div>
                                            <label className="block text-black text-sm font-semibold mb-1">
                                                Price
                                            </label>
                                            <input
                                                defaultValue={item?.price}
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                                name='price'
                                                {...register("price", { required: true, })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-black text-sm font-semibold mb-1">
                                                Available Seats
                                            </label>
                                            <input
                                                defaultValue={item?.availableSeat}
                                                min={item.enrolledCount}
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                                name='availableSeat'
                                                {...register("availableSeat", { required: true, })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-black text-sm font-semibold mb-1">
                                                Photo Url
                                            </label>
                                            <input
                                                defaultValue={item?.photo}
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                                name='photo'
                                                {...register("photo", { required: true, })}
                                            />
                                        </div>
                                        <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <input
                                                className="font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="Submit"
                                                defaultValue="Update"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default UpdateModal;