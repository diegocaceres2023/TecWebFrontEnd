import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenService } from '../servicios/token.service';
import { AuthService } from '../servicios/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenDto } from '../modelos/token.dto';

@Injectable()
export class MateriaInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.tokenService.isLogged()){
      return next.handle(request);
    }

    let intReq = request;
    const token = this.tokenService.getToken();
    intReq = this.addToken(request, token);
    return next.handle(intReq).pipe(catchError((err:HttpErrorResponse)=>{
      if(err.status===401){
        const dto:TokenDto=new TokenDto(token);
        return this.authService.refresh(dto).pipe(concatMap((data:any)=>{
          console.log('refreshing...');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(request, data.token);
          return next.handle(intReq);
        }));
      }else{
        //this.tokenService.logout();
        return throwError(err);
      }
    }));
  }
  
  private addToken(request: HttpRequest<unknown>, token:string): HttpRequest<unknown> {
    return request.clone({headers: request.headers.set('Authorization','Bearer '+token)});
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: MateriaInterceptor, multi: true}]