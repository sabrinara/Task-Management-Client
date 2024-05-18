import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const MyDetails = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetch(`https://task-backend-azure.vercel.app/tasks`)  
        .then(res => res.json())
        .then((data) => {
            const filteredTasks = data.filter(task => task.email === user?.email);
            setTasks(filteredTasks);
        })
        .catch(error => console.log(error));
    })

    const handleUpdate = (event, taskId) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const priority = form.priority.value;
        const email = user?.email;

        const newTask = { title, description, deadline, priority, email };

        fetch(`https://task-backend-azure.vercel.app/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Task updated successfully!', '', 'success');
                }
                form.reset();
            })
        document.getElementById("my_modal_5").close();
    };

    // const handleUpdateStatus = async (taskId , newStatus) => {
    //     const response = await axios.patch(`https://task-backend-azure.vercel.app/tasks/${taskId}`, { status: newStatus });
       
    // }

    const handleDelete = (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://task-backend-azure.vercel.app/tasks/${taskId}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remainingTasks = tasks.filter(task => task._id !== taskId);
                            setTasks(remainingTasks);
                        }
                    })
                    .catch(error => console.log(error));
            }
        })
    }

   
    return (
        <div>
            <h1 className="text-4xl font-bold  my-6">Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {tasks.map(task =>
                    <div key={task.id} >
                        <div className="card w-auto md:w-96  border-2 border-sky-500 ">
                            <div className="card-body ">
                                <h2 className="card-title text-center">Title : {task.title}</h2>
                                <p>Description : {task.description}</p>
                                <p >Deadline : {task.deadline}</p>
                                <p >Priority : {task.priority}</p>
                                <p >Status : {task.status}</p>
                                <div className=" ">
                                    <div className="flex items-center justify-center gap-6">
                                        <button className="btn bg-red-600 text-white hover:bg-red-500 mb-2 rounded" onClick={() => handleDelete(task._id)}>Delete</button>
                                       
                                        <button
                                            className="btn rounded mb-2 bg-blue-600 text-white hover:bg-blue-500"
                                            onClick={() => document.getElementById("my_modal_5").showModal()}
                                        >
                                            Update
                                        </button>
                                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                            <div className="modal-box">

                                                <div className="modal-action">
                                                    <form method="dialog" onSubmit={handleUpdate}>
                                                        <div className="flex gap-2 ">
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Title</span>
                                                                </label>
                                                                <input type="text" name="title" defaultValue={tasks.title} className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Deadline</span>
                                                                </label>
                                                                <input type="date" name="deadline" defaultValue={tasks.deadline} className="input input-bordered" />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">

                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Priority</span>
                                                                </label>
                                                                <select name="priority" className="select select-bordered w-full max-w-xs" required>
                                                                    <option defaultValue={tasks.priority}></option>
                                                                    <option>Low</option>
                                                                    <option>Medium</option>
                                                                    <option>High</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text"> Description</span>
                                                                </label>
                                                                <input type="text" name="description" defaultValue={tasks.description} className="input input-bordered" />
                                                            </div>
                                                        </div>

                                                        <button className="btn rounded mt-4 w-full  text-white bg-blue-400 hover:bg-blue-600">Update</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                    {/* <div className="flex  mt-0 gap-2">
                                        <button className={`btn rounded-md text-white font-medium shadow-md transition-colors ${task.status === 'To-Do'
                                            ? "bg-cyan-600"
                                            : "bg-green-500 hover:bg-green-600"
                                            }`} disabled={task.status === "To-Do"} onClick={() => handleUpdateStatus(task._id, "To-Do")}>To-Do</button>
                                        <button className={`btn rounded-md text-white font-medium shadow-md transition-colors ${task.status === 'Ongoing'
                                            ? "bg-cyan-600"
                                            : "bg-green-500 hover:bg-green-600"
                                            }`} disabled={task.status === "Ongoing"} onClick={() => handleUpdateStatus(task._id, "Ongoing")}>Ongoing</button>
                                        <button className={`btn rounded-md text-white font-medium shadow-md transition-colors ${task.status === 'Completed'
                                            ? "bg-cyan-600"
                                            : "bg-green-500 hover:bg-green-600"
                                            }`} disabled={task.status === "Completed"} onClick={() => handleUpdateStatus(task._id, "Completed")}>Completed</button>
                                    </div> */}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyDetails;
