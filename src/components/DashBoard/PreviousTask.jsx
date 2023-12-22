import { useState, useEffect } from "react";

const PreviousTask = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tasks', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div>
            <h1>Previous Task</h1>
            {tasks.map(task =>
                <div key={task.id}>
                    <h1>Title : {task.title}</h1>
                    <p>{task.description}</p>
                    <p>{task.deadline}</p>
                    <p>{task.priority}</p>
                </div>
            )}
        </div>
    );
};

export default PreviousTask;
