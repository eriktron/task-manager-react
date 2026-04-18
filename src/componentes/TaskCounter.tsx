type Task = {
    id: number;
    title: string;
    completed: boolean;
};

type TaskCounterProps = {
    tasks: Task[];
};

function TaskCounter({tasks}: TaskCounterProps){
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return(
        <div className="task-counter">
            <span>Total: {total}</span>
            <span>Completadas: {completed}</span>
            <span>Pendientes: {pending}</span>
        </div>
    );
}

export default TaskCounter;