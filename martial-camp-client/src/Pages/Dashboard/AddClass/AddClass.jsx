
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "react-query";

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        data.status = "pending";
        data.feedback = "";
        data.enrolledCount = 0;
        data.availableSeat = parseInt(data.availableSeat);
        data.price = parseInt(data.price);
        console.log(data);
        const res = await axiosSecure.post(`/addclass`, data);
        console.log(res);
    }
    return (
        <div className="w-11/12 my-12 md:w-2/3">
            <div>
                <div className="card w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold mb-2 text-center">Add Class</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    name="name"
                                    className="input input-bordered"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <span className='text-error p-1 text-sm'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Image</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Image"
                                    name="photo"
                                    className="input input-bordered"
                                    {...register("photo", { required: true, })}
                                />
                                {errors.photo?.type === "required" && <span className='text-error p-1 text-sm'>Photo is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Instructor"
                                    value={user.displayName}
                                    readOnly
                                    name="instructorName"
                                    className="input input-bordered"
                                    {...register("instructorName", { required: true, })}
                                />
                                {errors.instructorName?.type === "required" && <span className='text-error p-1 text-sm'>Instructor's name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Instructor"
                                    value={user.email}
                                    readOnly
                                    name="instructorEmail"
                                    className="input input-bordered"
                                    {...register("instructorEmail", { required: true, })}
                                />
                                {errors.instructorEmail?.type === "required" && <span className='text-error p-1 text-sm'>Instructor's email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Available Seat</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="available Seat"
                                    name="availableSeat"
                                    className="input input-bordered"
                                    {...register("availableSeat", { required: true, })}
                                />
                                {errors.availableSeat?.type === "required" && <span className='text-error p-1 text-sm'>Numbers of seat is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    className="input input-bordered"
                                    {...register("price", { required: true, })}
                                />
                                {errors.price?.type === "required" && <span className='text-error p-1 text-sm'>Class price is required</span>}
                            </div>

                            <div className="form-control mt-5">
                                <input className="btn bg-[#799eb0]" value="Add Class" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClass;