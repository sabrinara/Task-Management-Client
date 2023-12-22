
import { NavLink } from "react-router-dom";
import MyDetails from "./MyDetails";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineTask } from "react-icons/md";
const DashBoard = () => {
  
    return (
        <div className="flex">
           <div className="w-1/3 md:1/5">
             <div className="drawer md:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="py-2 px-2 rounded-md ml-5 bg-sky-600 text-white hover:bg-sky-800 drawer-button md:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-40 md:w-60 min-h-full bg-sky-200 text-cyan-950">
                        {/* Sidebar content here */}
                        <li><NavLink to="/createtask" className="text-lg text-semibold "> <IoCreateOutline></IoCreateOutline>Create Task</NavLink></li>
                        <li><NavLink to="/previoustask" className="text-lg text-semibold "> <MdOutlineTask />Previous Task</NavLink></li>
                      
                    </ul>
                </div>
            </div> 
           </div>
           <div className="w-2/3 md:4/5">
            <MyDetails></MyDetails>
           </div>
           
            
        </div>
    );
};

export default DashBoard;