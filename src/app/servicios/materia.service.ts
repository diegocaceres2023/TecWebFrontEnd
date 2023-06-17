import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materia } from '../interfaces/materia';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/materias'
  obtenerDatos(){
    return this.http.get<Materia[]>(this.url);
  }

  crear (materia: Materia) : Observable<Materia>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      })
    };
    return this.http.post<Materia>(this.url, materia, httpOptions)
  }
}
