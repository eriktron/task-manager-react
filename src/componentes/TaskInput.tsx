import { useState } from "react";
import "../styles/TaskInput.css"

type TaskInputProps = {
  onAddTask: (text: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddTask(text.trim());
    setText("");
  };

  return (
    <div className="task-input">
      <input
        className="task-input-field"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Escribe tu nueva tarea"
      />
      <button 
        className="task-input-button"
        onClick={handleSubmit}>Agregar Tarea</button>
    </div>
  );
}

export default TaskInput;