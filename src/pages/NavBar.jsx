import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Logo from "../assets/logo.png";



const NavBar = ({ toggleTheme }) => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => {
                console.error(error);
            });
    }

    const navLinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>

            {user?.email ?
                <>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>

                </>
                :
                <>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                </>
            }

        </>
    );
 

    return (
        <div className=" " >
            <div className="navbar  p-4  md:flex md:justify-between">
                <div className="navbar-start ">
                    <div className="dropdown md:hidden">
                        <label tabIndex={0} className="btn btn-outline btn-info md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 md:hidden">
                            {navLinks}
                        </ul>
                    </div>
                    <div className=" hidden md:flex md:justify-center ">
                        <ul className="menu menu-horizontal  px-1 gap-6">
                            {navLinks}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center ">
                    <img className="w-8 h-8 md:w-12 md:h-12 md:ml-16 mr-2 mx-auto" src={Logo} alt="" />
                    <Link to="/" className="normal-case text-cyan-600 font-serif text-2xl md:text-4xl"> <span className="text-red-600">Task </span>Management</Link>
                </div>
                <div className="navbar-end ">
                {
                            user?.email ?

                                <div className="dropdown dropdown-end ml-1">
                                    <label tabIndex={0} className="w-8 md:w-10 avatar">
                                        <div className="  md:w-10 rounded-full ">
                                            <img src={user.photoURL} />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded w-32  bg-cyan-900 text-white">
                                        <li>
                                            <a className="justify-between hover:bg-cyan-900 hover:text-white  focus:text-white ">
                                                {user.displayName}
                                            </a>
                                        </li>
                                      
                                        <li ><a onClick={handleLogOut} className="hover:bg-cyan-900 hover:text-white  focus:text-white" >Logout</a></li>
                                    </ul>
                                </div>

                                :
                                <Link to="/login" className="btn btn-ghost hover:bg-cyan-900 hover:text-white  focus:text-white">Login</Link>

                        }
                </div>
                <label className="swap swap-rotate md:pl-2">

                    <input type="checkbox" onChange={toggleTheme} />

                    <svg className="swap-on fill-current w-6 h-6 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                    {/* moon icon */}
                    <svg className="swap-off fill-current w-6 h-6 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label>
            </div>
            <div className="w-full h-[1px] bg-cyan-300 my-2"></div>

        </div>
    );
};

export default NavBar;