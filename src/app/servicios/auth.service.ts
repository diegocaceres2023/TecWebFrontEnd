import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsuarioDto } from '../modelos/login-usuario.dto';
import { Observable, tap } from 'rxjs';
import { NuevoUsuarioDto } from '../modelos/nuevo-usuario.dto';
import { TokenDto } from '../modelos/token.dto';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = "https://backend-final-production-3ac8.up.railway.app/auth/"
  constructor(private httpClient: HttpClient) { }

  login(dto: LoginUsuarioDto): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'login', dto)
  }

  registro(dto:NuevoUsuarioDto): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuevo', dto);
  }

  refresh(dto:TokenDto): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'refresh', dto);
  }
}
