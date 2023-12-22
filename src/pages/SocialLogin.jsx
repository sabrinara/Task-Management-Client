import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleGoogleRegister = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user)
               if(result.user){
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')
               }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Login Failed',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }
    return (
        <div>
            <button
                type="button"
                onClick={handleGoogleRegister}
                className="btn bg-sky-200 text-sky-800 font-extrabold rounded-md flex justify-center items-center p-2 px-20 lg:px-52 "
            >
                Google
                <FcGoogle className="w-8 h-8" />
            </button>
        </div>
    );
};

export default SocialLogin;