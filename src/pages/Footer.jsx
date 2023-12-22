import { FaFacebook, FaInstagram, FaTwitter, } from "react-icons/fa";
import Logo from "../assets/logo.png";
const Footer = () => {
    return (
        <footer className="w-full p-12">
            <hr className="my-8 border-sky-400 lg:mx-24" />
            <div className="footer justify-center  md:justify-evenly ">
                <aside className="flex flex-col  items-center   ">
                    <div className="flex items-center">
                        <img className="w-10 h-10" src={Logo} alt="" />
                        <h1 className="text-4xl mx-2 font-serif font-semibold text-cyan-500 "> <span className=" font-sans font-bold text-red-500">Task </span>Management</h1>
                    </div>


                    <div className="flex gap-6 text-blue-500 m-6 justify-center ">
                        <a href="https://www.facebook.com/" ><FaFacebook className="md:w-6 md:h-6"></FaFacebook></a>
                        <a href="https://www.instagram.com/"><FaInstagram className="md:w-6 md:h-6"></FaInstagram></a>
                        <a href="https://twitter.com/"><FaTwitter className="md:w-6 md:h-6"></FaTwitter></a>
                    </div>
                </aside>

               
            </div>
            <hr className="my-8 border-sky-400 lg:mx-24 " />

            <p className="block text-center font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                © 2023,Task Management <br /> <small> @Sabrina Rashid</small>
            </p>
            <hr className="my-8 border-sky-400 lg:mx-24" />
        </footer >


    );
};

export default Footer;