import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiante } from '../interfaces/estudiante';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/estudiantes'

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  obtenerDatos(){
    return this.http.get<Estudiante[]>(this.url);
  }

  crear (estudiante: Estudiante) : Observable<Estudiante>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      })
    };
    return this.http.post<Estudiante>(this.url, estudiante, httpOptions)
  }

  /** DELETE: delete the hero from the server */
borrar(id: number): Observable<unknown> {
  const url = `${this.url}/${id}`; // DELETE api/heroes/42
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //Authorization: 'my-auth-token'
    })
  };
  return this.http.delete(url, httpOptions)
    .pipe();
}
}
