import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const MyDetails = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('https://task-backend-azure.vercel.app/tasks', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const handleUpdate = (taskId) => {
        
        console.log(`Open update form for task with ID: ${taskId}`);
    };

    const handleDelete = (taskId) => {
        fetch(`https://task-backend-azure.vercel.app/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                    Swal.fire('Task deleted successfully!', '', 'success');
                } else {
                    Swal.fire('Failed to delete task', '', 'error');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>All Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {tasks.map(task =>
                    <div key={task.id} >
                        <div className="card w-96 h-72  border-2 border-sky-500 ">
                            <div className="card-body items-center">
                                <h2 className="card-title text-center">Title : {task.title}</h2>
                                <p>Description : {task.description}</p>
                                <p className="text-left">Deadline : {task.deadline}</p>
                                <p className="text-left">Priority : {task.priority}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => handleUpdate(task.id)}>Update</button>
                                    <button className="btn btn-ghost" onClick={() => handleDelete(task.id)}>Delete</button>
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
