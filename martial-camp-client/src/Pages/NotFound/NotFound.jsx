import { Link } from "react-router-dom";
import errorimg from "../../assets/images/error/notfound.jpg";

const NotFound = () => {
    return (
        <div className='flex flex-col items-center relative'>
            <img src={errorimg} className='w-full md:w-1/2  h-auto' alt="" />
            <Link className='flex justify-center' to="/">
                <button className="btn md:btn-wide btn-outline absolute bottom-5 md:bottom-20">Back To Homepage</button>
            </Link>
        </div>
    );
};

export default NotFound;