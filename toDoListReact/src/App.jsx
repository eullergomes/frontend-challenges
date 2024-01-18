import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Taskdetails from './components/TaskDetails';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid' //random id
import { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTask] = useState([]);

  const handleTaskClick= (taskId) => {
    const newTaks = tasks.map((task) => {
      if (task.id === taskId) return {...task, completed: !task.completed}
    
      return task;
    })

    setTask(newTaks);
  }

  const handleTaskAddtion = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(), //randam id
        completed: false
      }
    ];
    setTask(newTasks)
  };

  const hundleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)

    setTask(newTasks)
  }

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTask handleTaskAddtion={handleTaskAddtion} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  hundleTaskDeletion={hundleTaskDeletion}
                />
              </>
            }
          />
          <Route
            path='/:taskTitle'
            element={<Taskdetails/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
