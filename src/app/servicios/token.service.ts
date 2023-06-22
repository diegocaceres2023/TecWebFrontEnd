import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from 'rxjs';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient: HttpClient, private refreshService: RefreshService) { }

  isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }
  
  setToken(token: string):void{
    localStorage.setItem('token',token)
    
    this.refreshService.refresh();
    
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  getNombreUsuario(){
    if(!this.isLogged()){
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.nombreUsuario;
    const nombre: string = nombreUsuario.match(/^[a-zA-Z]+/)?.[0];
    //console.log(valuesJson)
    return this.capitalizeFirstLetter(nombre) ;

  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  async getIdUsuario(){
    let res = -1;
    if(!this.isLogged()){
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const idUsuario = valuesJson.id;

    const data = await this.httpClient.get<any>("https://backend-final-production-3ac8.up.railway.app/usuario/" + idUsuario).toPromise();
    res = data.estudiante.carnet;
    console.log(res);
    return res;

    /*await this.httpClient.get<any>("https://backend-final-production-3ac8.up.railway.app/usuario/" + idUsuario)
    .subscribe(data =>{
      res = data.estudiante.carnet;
      console.log( res);
    });
    
    return */
  }

  isAdmin():boolean{
    if(!this.isLogged()){
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    if(roles.indexOf('admin') < 0){
      return false;
    }
    return true;
  }
  logout(): void{
    localStorage.clear()
  }
  
}
