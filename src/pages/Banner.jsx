import { useContext } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { AuthContext } from "../providers/AuthProvider";

const Banner = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="flex flex-col md:flex-row justify-center items-center m-10">  
            <div className="md:w-1/2">
                <img src={"https://i.ibb.co/ZJmbMhV/banner.gif"} alt="" />
            </div>
            <div className="md:w-1/2">
                <div>
                    <h1 className="text-6xl font-bold font-serif italic my-6 text-red-500">Welcome </h1> 
                    <h2 className="text-4xl font-semibold mb-6">To Our Task Management Website.</h2>
                   <TypeAnimation
                    sequence={['Are you forgetting your tasks?', 1500, 'Cannot remember your tasks?', 1500, 'Let us help you remember your tasks!', 1500]}
                    style={{ fontSize: '2em', color: '#2b6cb0', fontWeight: 'bold' }}
                    repeat={Infinity}
                />  
                </div>
               
                <button className="btn bg-sky-500 text-white mt-10 hover:bg-sky-800 ">
                    {user?.email?
                    <Link to="/dashboard">Explore More</Link>
                    :
                    <Link to="/login">Explore More</Link>
                    }
                    </button>
            </div>
        </div>
    );
};

export default Banner;