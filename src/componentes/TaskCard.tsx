//@ts-ignore
import "../styles/TaskCard.css";

type TaskCardProps = {
    title: string;
    completed: boolean;
    /* deleteMode: boolean;
    isSelected: boolean;
    onToggleSelect: () => void; */
    onDeleteTask: () => void;
    onToggleComplete: () => void;
};
function TaskCard(props: TaskCardProps){
    return(
        <li
            className={`task-card ${props.completed ? "completed" : ""}`}
            /* onClick={props.onToggleComplete} */
        >
        <span className="task-card-text">{props.title}</span>
        <div  className="task-card-buttons">
            <button
                className="btn-complete"
                onClick={props.onToggleComplete}
                title="Completar"                 
            >
                ✔
            </button>
            <button
                className="btn-delete"
                onClick={(e) =>{
                    e.stopPropagation();
                    props.onDeleteTask();
                    /* props.onToggleComplete */
                }}
                title="Eliminar"                 
            >
                ✖
            </button>
        </div>
            {/* {props.deleteMode && (
                <input 
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={props.onToggleSelect}
                    onClick={(e) => e.stopPropagation()}
                />
            )}
            {props.text} */}
        </li>
    );
}

export default TaskCard;