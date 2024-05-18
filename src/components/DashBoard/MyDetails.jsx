import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";


const MyDetails = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
      fetch(`https://task-backend-azure.vercel.app/tasks`)  
        .then(res => res.json())
        .then((data) => {
            const filteredTasks = data.filter(task => task.email === user?.email);
            setTasks(filteredTasks);
        })
        .catch(error => console.log(error));
    }, [user]);

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const priority = form.priority.value;
        const email = user?.email;

        const updatedTask = { title, description, deadline, priority, email };

        fetch(`https://task-backend-azure.vercel.app/tasks/${currentTask._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Task updated successfully!', '', 'success');
                    setTasks(prevTasks => prevTasks.map(task => 
                        task._id === currentTask._id ? { ...task, ...updatedTask } : task
                    ));
                    setCurrentTask(null);
                    form.reset();
                }
            })
            .catch(error => console.log(error));
        document.getElementById("my_modal_5").close();
    };

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
    };

    return (
        <div>
            <h1 className="text-4xl font-bold my-6">Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tasks.map(task =>
                    <div key={task._id} >
                        <div className="card w-auto md:w-80 border-2 border-sky-500">
                            <div className="card-body">
                                <h2 className="card-title text-center">Title : {task.title}</h2>
                                <p>Description : {task.description}</p>
                                <p>Deadline : {task.deadline}</p>
                                <p>Priority : {task.priority}</p>
                                <p>Status : {task.status}</p>
                                <div className="flex items-center justify-center gap-6">
                                    <button className="btn bg-red-600 text-white hover:bg-red-500 mb-2 rounded" onClick={() => handleDelete(task._id)}>Delete</button>
                                    <button
                                        className="btn rounded mb-2 bg-blue-600 text-white hover:bg-blue-500"
                                        onClick={() => {
                                            setCurrentTask(task);
                                            document.getElementById("my_modal_5").showModal();
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {currentTask && (
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_5").close()}>✕</button>
                        <form onSubmit={handleUpdate}>
                            <div className="flex gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" name="title" defaultValue={currentTask.title} className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Deadline</span>
                                    </label>
                                    <input type="date" name="deadline" defaultValue={currentTask.deadline} className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Priority</span>
                                    </label>
                                    <select name="priority" className="select select-bordered w-full max-w-xs" defaultValue={currentTask.priority} required>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input type="text" name="description" defaultValue={currentTask.description} className="input input-bordered" required />
                                </div>
                            </div>
                            <button className="btn rounded mt-4 w-full text-white bg-blue-400 hover:bg-blue-600">Update</button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyDetails;
