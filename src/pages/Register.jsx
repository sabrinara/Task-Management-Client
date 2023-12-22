import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvider";
// import HelmetKiller from "../../pages/Shared/HelmetKiller/HelmetKIller";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";



const Register = () => {

    const { createUser,  handleUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate();



    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const image = form.get('image');
        const email = form.get('email');
        const password = form.get('password');


        try {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters or longer');
            } else if (!/[A-Z]/.test(password)) {
                throw new Error('Password must contain at least one uppercase letter.');
            } else if (!/^(?=.*[A-Z])(?=.*\W).*$/g.test(password)) {
                throw new Error('Password must contain at least one special character.');
            } else if (!/[0-9]/.test(password)) {
                throw new Error('A numerical value is required.');
            }

            await createUser(email, password);
            await handleUpdateProfile(name, image);
          
            const userInfo = {
                name: name,
                email: email,
                image: image,
    
            }
            axios.post('https://task-backend-azure.vercel.app', userInfo)
                .then(res => {
                    console.log(res);
                    if(res.data?.insertedId) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Task Added Sucessfully!',
                            icon: 'success',
                            confirmButtonText: 'Cool!',
                        })  
                        navigate('/');
                    }
                })
               .catch(error => {
                   Swal.fire({
                       title: 'Error',
                       text: error.message,
                       icon: 'error',
                       confirmButtonText: 'Cool!',
                   })
               })
        
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Cool!',
            })
        }
    }
    
    return (
        <div >
            {/* <HelmetKiller pagename="Register"></HelmetKiller> */}
            <div className="hero min-h-screen bg-base-200 mb-8" >
                <div className="hero-content flex-col ">
                    <div className="text-center mt-8 mb-4">
                        <h1 className="text-5xl font-bold text-cyan-600">Register!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full md:w-[100rem] max-w-xl shadow-2xl">
                        <a href="#" className="flex items-center justify-center mt-8">
                            <img className="w-10 h-10 " src={Logo} alt="logo" />
                            <h1 className="text-4xl text-cyan-600 "> <span className="text-4xl font-sans font-bold text-red-500">Task </span> Management</h1>
                        </a>
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Write Your Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <input type="text" name="image" placeholder="PhotoUrl" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Write Your Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Write Your Password" className="input input-bordered mb-3" required />

                            </div>
                            <div className="form-control mt-1">
                                <button className="p-3  bg-sky-200 text-sky-800 font-extrabold  rounded-md">Register</button>
                            </div>

                        </form>

                        <div className="flex flex-col items-center justify-center mb-6">
                            <p className="text-[15px]">Already have an account? Please<Link to="/login"><button className="p-1 text-blue-700 font-bold">Login</button></Link></p>
                            <div className="divider ">Or, Continue With</div>
                           <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>

    );
};

export default Register;