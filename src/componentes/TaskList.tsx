import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    /* deleteMode: boolean; */
    /* selected: number[]; */
    /* onToggleSelect: (index: number) => void; */
    onDeleteTask: (index: number) => void;
    onToggleComplete:(index: number) => void;
}

function TaskList({tasks, /* deleteMode, selected, onToggleSelect, */onDeleteTask, onToggleComplete}: TaskListProps){
    /*const tasks = [
        "Cantar en la calle",
        "Hacer ejercicio",
        "Salir de Fiesta"
    ];*/
    
    if(tasks.length === 0) return <EmptyState />

    return(
        <ul className="task-list">
            {tasks.map((task, index) => (
                <TaskCard 
                    key={index} 
                    title={task.title}
                    completed={task.completed}
                    /* deleteMode={deleteMode}
                    isSelected={selected.includes(index)}
                    onToggleSelect={() => onToggleSelect(index)} */
                    onDeleteTask={()=>onDeleteTask(task.id)}
                    onToggleComplete={() => onToggleComplete(task.id)}
                />
            ))}            
            
        </ul>

    );
}

export default TaskList