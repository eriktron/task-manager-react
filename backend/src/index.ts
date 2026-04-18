import express, { response } from "express";
import type{Request, Response} from "express";
import cors from "cors";

require ("dotenv").config();


//importamos prisma cliente
const {PrismaClient} = require("@prisma/client");
const {PrismaPg} = require("@prisma/adapter-pg");

//creamos el adaptador usando la URL de conexion
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

//creamos la instancia de Prisma
const prisma = new PrismaClient({adapter});

//---CONFIGURACION INICIAL
//Configuracion inicial / cors permite conectar con el frontend
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

//Middleware  de express, que parsea solicitudes http de body a JSON
app.use(express.json());

//---DEFINICION DE DATOS:
//Def de estructura para TypeScript
type Task = {
    id: number;
    title: string;
    completed: boolean;
};

//8 eliminamos la lista falsa
//base de datos temporal
/* let tasks: Task[] = [
    {id: 1, title: "Study Express", completed: false},
    {id: 2, title: "Buid backend", completed: true}
    
]; */

//---RUTA DE API

//verificar que el servidor responde
app.get("/", (req: Request, res: Response)=>{
    res.send("Backend is Working");
});

//retonr lista completa de tareas
/* app.get("/tasks", (req: Request, res:Response)=>{
    res.json(tasks);
}); */
//actualizando
app.get("/tasks", async (req: any, res: any)=>{
    try{
        const tasks = await prisma.task.findMany();
        res.json(tasks);        
    } catch (error) {
        console.error("error en GET / tasks: ", error);
        res.status(500).json({message: "error al obtener tareas"});
    }
});

//POST Recibe tarea y anañade a la lista
/* app.post("/tasks", (req: any, res: any)=>{
    console.log("POST /tasks fue llamado");
    console.log("Datos recibidos: ", req.body);

    //Extraemos los datos del body
    const {id, title, completed}= req.body as Task;
    const newTask: Task = {id, title, completed};
    tasks.push(newTask);    //guardamos en el array
    console.log("Lista actualizada", tasks);
    res.json(newTask);
});  */

//actualizando el post
app.post("/tasks", async (req: any, res: any)=>{
    try {
        const newTask = await prisma.task.create({
            data: {
                title: req.body.title,
                completed: false,
            },
        });
        res.json(newTask);
    } catch (error) {
        console.error("error en POST /tasks: ", error);
        res.status(500).json({message: "error al crear tarea"});
    }
})

//DELETE Elimina tarea especifica, usando el id
/* app.delete("/tasks/:id" , (req: Request, res: Response) =>{
    //convertimos el id de la URL, a numero
    const idParam = parseInt(req.params.id as string, 10);
    
    //si no es numero -> Error
    if(isNaN(idParam)){
        return res.status(400).json({ message: "ID invalido"});
    }

    //Verificar si existe
    const taskExists = tasks.find(t => t.id === idParam);   
    if(!taskExists){
        return res.status(404).json({message: "tarea no encontrada"});
    }

    //Sobreescribimos el array, la tarea que queremos eliminar
    tasks =  tasks.filter(task => task.id !== idParam);

    res.json({message: "tarea eliminada", id: idParam});
}); */

//actualizando delete
app.delete("/tasks/:id", async(req: any, res: any)=>{
    try {
        const taskId = Number(req.params.id);
        await prisma.task.delete({
            where: {id: taskId},
        });
        res.json({message: "Deleted"});
    } catch (error) {
        console.error("Error en DELETE", error);
        res.status(500).json({message: "error al eliminar tarea"});        
    }
});

//PUT Actualiza el estado de una tarea
/* app.put("/tasks/:id", (req: Request, res:Response) => {
    //convertimos el ide de la URL a numero
    const idParam = parseInt(req.params.id as string, 10);

    //si no es numero -> error
    if(isNaN(idParam)){
        return res.status(400).json({message: "ID invalido"});
    }
    //buscamos la tarea
    const taskToUpdate = tasks.find(t => t.id === idParam);

    //si no existe, salimos
    if(!taskToUpdate){
        return res.status(404).json({message: "Tarea no encontrada"});
    }

    //tomar el valor completado o alternar
    const { completed } = req.body;

    // creamos la tarea actualizada, manteniendo id y titulo
    const updatedTasks: Task = {
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        completed: typeof completed === "boolean" ? completed: !taskToUpdate.completed
    }

    //actualizamos el array usando el indice
    const taskIndex = tasks.findIndex(t => t.id === idParam);
    tasks[taskIndex] = updatedTasks;
    
    console.log(`Tarea ${idParam} actualizada`);
    res.json(updatedTasks);
}); */

//actualizando PUT
app.put("/tasks/:id", async (req: any, res: any) =>{
    try {
        const taskId = Number(req.params.id);
        const updatedTasks = await prisma.task.update({
            where: {id: taskId},
            data:{
                completed: req.body.completed,
            },
        });
        res.json(updatedTasks);
    } catch (error) {
        console.error("error en PUT", error);
        res.status(500).json({message: "error al actualizar tarea"});
    }
});

//---INICIO DEL SERVIDOR
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});


/* test en consola windows: 
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"id\":3,\"title\":\"new Task\",\"completed\":false}"
 */
