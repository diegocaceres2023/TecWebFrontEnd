import { Estudiante } from "./estudiante";
import { Materia } from "./materia";

export interface Nota {
    carnet: number;
    id_materia: number;
    evaluacion:string;
    calificacion: number;
    //fecha: Date;
    gestion: string;
    materia?: Materia;
    estudiante?: Estudiante;
}
