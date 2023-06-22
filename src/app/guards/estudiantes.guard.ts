import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './../servicios/token.service';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesGuard implements CanActivate {
  realRol!: string;

  constructor(
    private tokenService: TokenService, 
    private router: Router
  ) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = next.data['expectedRol'];
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'estudiante';
    if(!this.tokenService.isLogged()){
      this.router.navigate(['/login']);
      return false;
    }
    if(/*!this.tokenService.isLogged() || */expectedRol.indexOf(this.realRol) < 0){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}