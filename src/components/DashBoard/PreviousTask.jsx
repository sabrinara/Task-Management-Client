// PreviousTask.js
import  { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Alerts from '../../pages/Alerts';

const PreviousTask = () => {
 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
        Alerts.error('Error fetching tasks');
      }
    };

    fetchUserTasks();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = [...tasks];
    const [removed] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, removed);

    updateTaskOrder(newTasks);
  };

  const updateTaskOrder = async (newTasks) => {
    try {
      await axios.put('http://localhost:5000/tasks', newTasks);
      setTasks(newTasks);
    } catch (error) {
      console.error(error);
      Alerts.error('Error updating task order');
    }

  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      Alerts.info('Task deleted successfully');
    } catch (error) {
      console.error(error);
      Alerts.error('Error deleting task');
    }
  };

  return (
    <div className="task-dashboard">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-lists grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* To-Do List */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="task-list bg-white border border-gray-300 p-4 rounded-lg">
                <h3 className="text-blue-500 text-lg font-semibold mb-4">To-Do</h3>
                {tasks.map((task, index) => (
                  task.priority === 'todo' && (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="task-item bg-gray-100 p-2 rounded-md mb-2"
                        >
                          <p>{task.title}</p>
                          <button onClick={() => deleteTask(task._id)} className="text-red-500 ml-2">
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  )
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Ongoing List */}
          <Droppable droppableId="ongoing">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="task-list bg-white border border-gray-300 p-4 rounded-lg">
                <h3 className="text-blue-500 text-lg font-semibold mb-4">Ongoing</h3>
                {tasks.map((task, index) => (
                  task.priority === 'ongoing' && (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="task-item bg-gray-100 p-2 rounded-md mb-2"
                        >
                          <p>{task.title}</p>
                          <button onClick={() => deleteTask(task._id)} className="text-red-500 ml-2">
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  )
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Completed List */}
          <Droppable droppableId="completed">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="task-list bg-white border border-gray-300 p-4 rounded-lg">
                <h3 className="text-blue-500 text-lg font-semibold mb-4">Completed</h3>
                {tasks.map((task, index) => (
                  task.priority === 'completed' && (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="task-item bg-gray-100 p-2 rounded-md mb-2"
                        >
                          <p>{task.title}</p>
                          <button onClick={() => deleteTask(task._id)} className="text-red-500 ml-2">
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  )
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

     
    </div>
  );
};

export default PreviousTask;
