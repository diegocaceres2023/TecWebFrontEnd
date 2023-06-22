import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Materia } from 'src/app/interfaces/materia';
import { NewMateriaComponent } from 'src/app/modals/new-materia/new-materia.component';
import { MateriaService } from 'src/app/servicios/materia.service';
import { RefreshService } from 'src/app/servicios/refresh.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html', 
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit{
  materias : Materia[] = [];
  isAdmin!: boolean;
  idUser!: number | null;

  constructor(private refreshService: RefreshService,private tokenService: TokenService, private materiaService: MateriaService,private router: Router,public dialog: MatDialog){

  }
  async ngOnInit(): Promise<void> {
    this.isAdmin = this.tokenService.isAdmin();
    if(!this.isAdmin){this.idUser = await this.tokenService.getIdUsuario()}
    
    if(this.isAdmin){
      this.obtenerDatos();
      this.refreshService.getRefreshObservable().subscribe(() => {
        this.obtenerDatos();
      });
    }
    else if(this.idUser){
      this.obtenerDatosEstudiante();
      /*this.refreshService.getRefreshObservable().subscribe(() => {
        this.obtenerDatosEstudiante();
      });*/
    }
  }

  obtenerDatos(){
    this.materiaService.obtenerDatos().subscribe(
      (data) => this.materias = data,
      error => console.log(error),
      () => console.log("FIN")
    )
  }

  obtenerDatosEstudiante(){
    this.materiaService.obtenerDatosEstudiante(this.idUser!).subscribe(
      (data) => this.materias = data,
      error => console.log(error),
      () => console.log("FIN")
    )
  }
  navigate(id:number) {
    this.router.navigate(['/notas', id]);
  }

  openDialog(){
    const dialogRef = this.dialog.open(NewMateriaComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.data != undefined){
        console.log(result.data) 
        this.materias.push(result.data)
      }
    });
  }
  navigatetoinscritos(id:number, nombre:string) 
  {
    this.router.navigate(['/inscritos', id, nombre]);
  }
}
