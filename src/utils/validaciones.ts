// src/utils/validaciones.js
 
export function esCorreoValido(correo: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(correo)
}
interface Tarea{
    completada: boolean;
    [key: string]: any;
}
 
export function contarTareasPendientes(tareas: Tarea[]): number {
  return tareas.filter((t) => !t.completada).length
}
