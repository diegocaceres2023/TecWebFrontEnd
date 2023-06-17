import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/notas'
  obtenerDatos(idMateria:string){
    let url = this.url + "/materia/" + idMateria;
    return this.http.get<Nota[]>(url);
  }

  enviarDatos(){

  }
}
