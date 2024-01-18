import Task from "./Task";
import React from "react"

const Tasks = ({tasks, handleTaskClick, hundleTaskDeletion}) => {
    return (
        <>
            {tasks.map((task) => (
                <Task 
                    key={task.title}
                    task={task}
                    handleTaskClick={handleTaskClick}
                    hundleTaskDeletion={hundleTaskDeletion}
                />)
                )
            }
        </>
    )   
}

export default Tasks;