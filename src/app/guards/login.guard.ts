import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../servicios/token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class LoginGuard implements CanActivate{
  constructor(private tokenService: TokenService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state:RouterStateSnapshot) : boolean{
    if( this.tokenService.isLogged()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
