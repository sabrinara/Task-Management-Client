import { useContext } from "react";
import Logo from "../../assets/logo.png"
// import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from "../../providers/AuthProvider";

const CreateTask = () => {
    const { user } = useContext(AuthContext);

    console.log(user);
    const navigate = useNavigate();

    // const navigate = useNavigate();
    const handleCreateTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const priority = form.priority.value;
        const email = user?.email;
        const status = 'To-Do';
        const newTask = { title, deadline, description, priority, email, status };
        console.log(newTask);

        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Task Added Sucessfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool!',
                    })
                    navigate('/previoustask');
                }
            })

        form.reset();
    }

    return (
        <div>
            {/* <Helmet>
                <title>NEST-Add Services</title>
            </Helmet> */}
            <div className="hero  min-h-screen bg-base-200 mb-6" >
                <div className="hero-content flex-col ">
                    <div className="text-center mt-8 mb-4">
                        <h1 className=" text-cyan-800 text-5xl  font-bold">Add Task</h1>

                    </div>
                    <div className="card flex-shrink-0 w-full md:w-[100rem] max-w-xl shadow-2xl">
                        <a href="#" className="flex items-center justify-center mt-8">
                            <img className="w-10 h-10 " src={Logo} alt="logo" />
                            <h1 className="text-4xl "> <span className="text-4xl font-sans font-bold text-red-500">Task</span>Management</h1>
                        </a>

                        <form className="card-body" onSubmit={handleCreateTask} >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name='title' placeholder="Title" className="input input-bordered" required />

                            </div>
                           
                           
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input type="text" name='description' placeholder="Write Short Description" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                </label>
                                <input type="date" name='deadline' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Priority</span>
                                </label>
                                <select name="priority" className="select select-bordered w-full max-w-xs" required>
                                    <option disabled selected>Priority</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div className="form-control mt-4">
                                <button className="btn text-white font-semibold rounded bg-blue-500 hover:bg-blue-600 mt-4">Create Task</button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>




        </div>
    );
};

export default CreateTask;