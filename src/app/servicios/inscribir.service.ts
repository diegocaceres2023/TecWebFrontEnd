import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscrito } from '../interfaces/inscrito';
import { Inscribir } from '../interfaces/inscribir';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscribirService {

  
  constructor(private http: HttpClient) { }
    @Injectable({
      providedIn: 'root'
    })

    /*url = 'assets/inscripciones.json'
    obtenerDatos(){
      return this.http.get<Inscrito[]>(this.url);
    }*/
    url = 'http://localhost:3000/inscripciones'
    obtenerDatos(idMateria:string){
      let url = this.url + "/materia/" + idMateria;
      return this.http.get<Inscrito[]>(url);
    }
  
    crear(inscrito: Inscribir) : Observable<Inscribir>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          //Authorization: 'my-auth-token'
        })
      };
      console.log("Entro")
      return this.http.post<Inscribir>(this.url, inscrito, httpOptions)
    }
}