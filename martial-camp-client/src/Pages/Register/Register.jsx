import React, { useContext, useRef, useState } from 'react';
import { useForm } from "react-hook-form"
import authImg from "../../assets/images/authentication/auth.jpg";
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [regError, setRegError] = useState("");
    const { createUser, updateUser, signWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        const { name, email, photo, password } = data
        const user = {
            name,
            email,
            photo,
        };

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                updateUser(name, photo)
                    .then(() => {
                        fetch(`${import.meta.env.VITE_API_LINK}/user`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(user)
                        })
                        navigate("/");
                    })
                    .catch(error => {
                        console.log(error);
                        setRegError(error.message);
                    })
            })
    }

    const googleSignIn = () => {
        signWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                const user = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    photo: loggedUser.photoURL
                }

                fetch(`${import.meta.env.VITE_API_LINK}/user`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setRegError(error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200 my-4 md:my-10">
            <div className="hero-content grid grid-cols-1 gap-14 lg:grid-cols-2">
                <div className="">
                    <img src={authImg} alt="" />
                </div>
                <div className="card w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold mb-2">Register!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    {...register("name", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.name && <span className='text-error p-1 text-sm'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="URL"
                                    name="photo"
                                    className="input input-bordered"
                                    {...register("photo", { required: true })}
                                />
                                {errors.photo && <span className='text-error p-1 text-sm'>Photo Url is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className='text-error p-1 text-sm'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    {...register("password", {
                                        required: true,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                                        minLength: 6
                                    })}
                                />
                                {errors.password?.type === "required" && <span className='text-error p-1 text-sm'>Password is required</span>}
                                {errors.password?.type === "minLength" && <span className='text-error p-1 text-sm'>Password must be 6 characters</span>}
                                {errors.password?.type === "pattern" && <span className='text-error p-1 text-sm'>Password must have a capital letter and a special character</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="confirmPassword"
                                    className="input input-bordered"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: value =>
                                            value === password.current || "The passwords do not match"
                                    })}
                                />
                                {errors.confirmPassword && <span className='text-error p-1 text-sm'>{errors.confirmPassword.message}</span>}
                                <span className="label-text-alt p-1 text-error">{regError}</span>
                            </div>
                            <div className="form-control mt-1 p-1">
                                <small>Already have an account!? <Link className="text-[#799eb0] font-bold" to="/login">Login</Link></small>
                            </div>
                            <div className="form-control mt-5">
                                <input className="btn bg-[#799eb0]" value="Register" type="submit" />
                            </div>
                            <div className="divider">OR</div>
                            <button onClick={googleSignIn} className="btn w-full bg-[#799eb0]">Login with Google</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;