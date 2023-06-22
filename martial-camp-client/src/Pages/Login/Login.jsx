import { useForm } from "react-hook-form"
import authImg from "../../assets/images/authentication/auth.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [logError, setLogError] = useState('');
    const { signIn, signWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                if (from) {
                    navigate(from, { replace: true });
                }
                else {
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
                setLogError(error.message);
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

                if (from) {
                    navigate(from, { replace: true });
                }
                else {
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
                setLogError(error.message);
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
                        <h1 className="text-3xl font-bold mb-2">Login!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    {...register("password", { required: true, })}
                                />
                                {errors.password?.type === "required" && <span className='text-error p-1 text-sm'>Password is required</span>}
                                <span className="label-text-alt p-1 text-error">{logError}</span>
                            </div>
                            <div className="form-control mt-1 p-1">
                                <small>New to Martial Camp!? <Link className="text-[#799eb0] font-bold" to="/register">Register</Link></small>
                            </div>
                            <div className="form-control mt-5">
                                <input className="btn bg-[#799eb0]" value="Login" type="submit" />
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={googleSignIn} className="btn bg-[#799eb0]">Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;