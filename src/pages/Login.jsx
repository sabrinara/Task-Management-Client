import { useContext } from "react";
import { Link,  useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
// import HelmetKiller from "../../pages/Shared/HelmetKiller/HelmetKIller";


const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if(user){
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
                console.log(error.message);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool!',
                })
            });
        
    }
    
    return (
        <div>
            {/* <HelmetKiller pagename = "Login"></HelmetKiller> */}
            <div className="hero  min-h-screen bg-base-200 mb-6" >
                <div className="hero-content flex-col ">
                    <div className="text-center mt-8 mb-4">
                        <h1 className=" text-cyan-600 text-5xl  font-bold">Login!</h1>

                    </div>
                    <div className="card flex-shrink-0 w-full md:w-[100rem] max-w-xl shadow-2xl">
                    <a href="#" className="flex items-center justify-center mt-8">
                            <img className="w-10 h-10 " src={Logo} alt="logo" />
                            <h1 className="text-4xl text-cyan-600 "> <span className="text-4xl font-sans font-bold text-red-500">Task </span> Management</h1>
                        </a>

                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                                
                            </div>
                            <div className="form-control mt-4">
                                <button className="p-3 bg-sky-200 text-sky-800 font-extrabold  rounded-md">Login</button>
                            </div>

                        </form>

                        <div className="flex flex-col items-center justify-center mb-6">
                            <p className="text-[15px]">New in the Website? Please<Link to="/register"><button className="p-1 text-blue-700 font-bold">Register</button></Link></p>
                        
                            <div className="divider ">Or, Continue With</div>
                           <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;