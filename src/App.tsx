import { useEffect, useState } from "react";
import Header from "./componentes/Header";
import TaskList from "./componentes/TaskList";
import TaskInput from "./componentes/TaskInput";
import Footer from "./componentes/Footer";
import TaskCounter from "./componentes/TaskCounter";

//Definimos el tipo Task para que coincida con el backend
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App(){
  //Estado para almacenar lista de tareas que vemos en pantalla
  const [tasks, setTasks] = useState<Task[]>([]);

  //se ejecuta al cargar por primera vez
  useEffect(()=>{
    //pedimos tareas al backend
    fetch("import.meta.env.https://task-manager-react-jt4f.onrender.com")
      .then((response) => response.json())
      .then((data)=>{
        setTasks(data); //guardamos las tareas del servidor en nuestro estado
      })
      .catch((error)=>{
        console.error("Error al obtener tareas: ", error);
      });
  }, []);

  const handleAddTask = (text: string) => {
    setTasks([...tasks, {id: Date.now(), title:text, completed:false}]);
  };

  //Funcion PUT, envia al BackEnd cambio de un tarea
  const handleToggleComplete = (id: number) => {
    //buscamos la tarea actual
    const taskToUpdate = tasks.find(t => t.id === id);
    if(!taskToUpdate) return;

    // llamada al backend
    fetch(`import.meta.env.https://task-manager-react-jt4f.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json",
      },
      //enviamos el estado invetido
      body: JSON.stringify({ completed: !taskToUpdate.completed}),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
          //actualizamos estado local
          setTasks(tasks.map((task) =>
            task.id === id ? updatedTask : task
          ));
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea: ", error);
      });
  };

  //Funcion ELIMINAR, borra la tarea del servidor y quita de la pantalla
  const handleDeleteTask = (id:number)=>{
  fetch(`import.meta.env.https://task-manager-react-jt4f.onrender.com/tasks/${id}`, {
    method: "DELETE",
  })
    .then((Response) => {
      if(Response.ok){
        setTasks(tasks.filter((task) => task.id !== id));
        console.log(`Tarea ${id} elimindada en el server`);
      }else{
        console.log("error al eliminar tarea en el server");
      }
    })
    .catch((error) => {
      console.error("error de red: ", error);
    });
  };

  //Funcion: POST, Crear tarea, recibe el texto, crea el obj
  const addTask = (taskText:string) =>{
      const newTask = {
        id:Date.now(),
        title: taskText,
        completed: false,
      };

      fetch("import.meta.env.https://task-manager-react-jt4f.onrender.com/tasks", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(newTask),
      })
        .then((response)=>response.json())
        .then((data)=>{
          console.log("Tarea creada en backend:", data);

          //agregamos la nueva tarea al estado para actualizar la pantalla
          setTasks([...tasks, data]);
        })
        .catch((error) =>{
          console.error("Error al crear tarea:", error);
        });
  };

  //ordenando las completadas al principio
  const sortedTasks = [...tasks].sort((a, b)=>{
    if(a.completed === b.completed) return 0;
    return a.completed ? 1:-1;
  });

  return(    
    <div className="container">
      {/* <div className="container"> */}
        <Header/>
        <TaskCounter tasks = {tasks} />
        <TaskInput onAddTask={addTask} />
        <TaskList 
          tasks={sortedTasks}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      {/* </div> */}
      <Footer />      
    </div>
  );
}

export default App;
