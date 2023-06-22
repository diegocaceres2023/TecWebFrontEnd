import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private http: HttpClient) { }

  url = 'https://backend-final-production-3ac8.up.railway.app/notas'
  obtenerDatos(idMateria:string){
    let url = this.url + "/materia/" + idMateria;
    return this.http.get<Nota[]>(url);
  }
  obtenerDatosEstudiante(idMateria: number,idEstudiante: number){
    return this.http.get<Nota[]>(this.url + "/estudiante/" + idMateria + "/" + idEstudiante);
  }
  crear (nota: Nota) : Observable<Nota>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      })
    };
    return this.http.post<Nota>(this.url, nota, httpOptions)
  }
}
