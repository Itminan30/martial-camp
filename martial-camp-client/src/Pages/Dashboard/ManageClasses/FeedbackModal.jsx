import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';

const FeedbackModal = ({ item, refetch }) => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
    } = useForm();

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        setShowModal(false);
        const res = await axiosSecure.patch(`/statuschange/${user.email}?feedback=${data.feedback}`, item);
        console.log(res);
    }

    return (
        <div>
            <button
                className="btn bg-zinc-400 btn-xs"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Feedback
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-3/4 md:w-1/3 my-6 mx-auto max-w-4xl">
                            <div className="border-0 bg-slate-400 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                                <h2 className='text-center font-semibold mt-3 text-xl text-neutral-100'>Give Feedback</h2>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-2">
                                        <div>
                                            <label className="block text-black text-sm font-semibold mb-1">
                                                Feedback
                                            </label>
                                            <input
                                                defaultValue={item?.feedback}
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                                name='price'
                                                {...register("feedback", { required: true, })}
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

export default FeedbackModal;