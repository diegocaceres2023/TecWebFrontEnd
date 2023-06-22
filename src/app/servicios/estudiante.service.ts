import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiante } from '../interfaces/estudiante';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient, private refreshService: RefreshService) { }

  url = 'https://backend-final-production-3ac8.up.railway.app/estudiantes'

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
    return this.http.post<Estudiante>(this.url, estudiante, httpOptions).pipe(
      tap(() => {
        this.refreshService.refresh();
      })
    );
  }

  update(estudiante: Estudiante, id:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //Authorization: 'my-auth-token'
      })
    };
    const {celular, email} = estudiante;
    return this.http.put<Estudiante>(this.url + "/"+ id, {celular, email}, httpOptions)
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
