import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materia } from '../interfaces/materia';
import { Observable, tap } from 'rxjs';
import { RefreshService } from './refresh.service';
@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient,private refreshService: RefreshService) { }

  url = 'https://backend-final-production-3ac8.up.railway.app/materias'
  obtenerDatos(){
    return this.http.get<Materia[]>(this.url);
  }

  obtenerDatosEstudiante(idEstudiante: number){
    return this.http.get<Materia[]>(this.url + "/estudiante/" + idEstudiante);
  }
  crear (materia: Materia) : Observable<Materia>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      })
    };
    return this.http.post<Materia>(this.url, materia, httpOptions).pipe(
      tap(() => {
        this.refreshService.refresh();
      })
    );
  }
}
