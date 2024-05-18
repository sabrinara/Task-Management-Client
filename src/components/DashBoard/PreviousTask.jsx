import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';

const PreviousTask = () => {
  const { user } = useContext(AuthContext)
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

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // const handleUpdateStatus = async (taskId, newStatus) => {
  //   try {
  //     console.log('Updating status:', taskId, newStatus);
  //     const response = await axios.patch(`https://localhost:5000/tasks/${taskId}`, {
  //       status: newStatus,
  //     });
  //     console.log('Response:', response.data);
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //     throw error; // Rethrow the error so that it can be caught in the calling function
  //   }
  // };
  const handleUpdateStatus = async (taskId , newStatus) => {
    const response = await axios.patch(`https://task-backend-azure.vercel.app/tasks/${taskId}`, { status: newStatus });
   
}

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    console.log(taskId, newStatus);
    try {
      await handleUpdateStatus(taskId, newStatus);
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      // Consider adding a success alert here
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="task-dashboard">
      <div className="task-lists grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* To-Do List */}
        <div className="task-list bg-white border border-gray-300 p-4 rounded-lg" onDrop={(e) => handleDrop(e, 'To-Do')} onDragOver={handleDragOver}>
          <h3 className="text-blue-500 text-lg text-center font-semibold mb-4">To-Do</h3>
          {tasks.map((task) =>
            task.status === 'To-Do' ? (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className="task-item bg-gray-100 p-2 rounded-md mb-2"
              >
                <p>{task.title}</p>
              </div>
            ) : null
          )}
        </div>

        {/* Ongoing List */}
        <div className="task-list bg-white border border-gray-300 p-4 rounded-lg" onDrop={(e) => handleDrop(e, 'Ongoing')} onDragOver={handleDragOver}>
          <h3 className="text-blue-500 text-lg text-center font-semibold mb-4">Ongoing</h3>
          {tasks.map((task) =>
            task.status === 'Ongoing' ? (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className="task-item bg-gray-100 p-2 rounded-md mb-2"
              >
                <p>{task.title}</p>
              </div>
            ) : null
          )}
        </div>

        {/* Completed List */}
        <div className="task-list bg-white border border-gray-300 p-4 rounded-lg" onDrop={(e) => handleDrop(e, 'Completed')} onDragOver={handleDragOver}>
          <h3 className="text-blue-500 text-lg text-center font-semibold mb-4">Completed</h3>
          {tasks.map((task) =>
            task.status === 'Completed' ? (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                className="task-item bg-gray-100 p-2 rounded-md mb-2"
              >
                <p>{task.title}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousTask;
