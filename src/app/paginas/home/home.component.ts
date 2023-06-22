import { Component } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nombre : string | null;
  
  constructor(private tokenService:TokenService) { 
    this.nombre = this.tokenService.getNombreUsuario();
  }

  ngOnInit(): void {
    
  }


}
