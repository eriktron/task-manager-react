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

//---RUTA DE API

//verificar que el servidor responde
app.get("/", (req: Request, res: Response)=>{
    res.send("Backend is Working");
});

//retorna lista completa de tareas
app.get("/tasks", async (req: any, res: any)=>{
    try{
        const tasks = await prisma.task.findMany();
        res.json(tasks);        
    } catch (error) {
        console.error("error en GET / tasks: ", error);
        res.status(500).json({message: "error al obtener tareas"});
    }
});

//POST Recibe tarea y añade a la lista
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