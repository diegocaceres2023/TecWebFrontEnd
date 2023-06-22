import { Component } from '@angular/core';
import { Nota } from 'src/app/interfaces/nota';
import { NotaService } from 'src/app/servicios/nota.service';

import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { NewNotaComponent } from 'src/app/modales/new-nota/new-nota.component';
import { RefreshService } from 'src/app/servicios/refresh.service';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent {
  notas : Nota[] = [];
  id: string | null ='';
  displayedColumns: string[] = [ /*'nombre', */'evaluacion', 'nota','gestion'];
  estudiantes : Estudiante[] = []
  isAdmin!: boolean;
  idUser!: number | null;
  idEstudiante!: number | null;

  constructor(private refreshService: RefreshService,private  dialog:  MatDialog, private estudianteService:EstudianteService, private tokenService: TokenService,private notasService: NotaService,private route: ActivatedRoute){
    
  }
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      // You can now use the personId in your component
      console.log(this.id);
    });
    this.isAdmin = this.tokenService.isAdmin();
    if(!this.isAdmin){this.idUser = await this.tokenService.getIdUsuario()}
    
    if(this.isAdmin){
      this.obtenerEstudiantes();
      this.refreshService.getRefreshObservable().subscribe(() => {
        this.obtenerDatosEstudiante();
      });
      /*this.notasService.obtenerDatos(this.id!).subscribe(
        (data) => this.notas = data,
        error => console.log(error),
        () => console.log("FIN")
      )*/
    }
    else if(this.idUser){
      this.initializeDisplayedColumns()
      this.notasService.obtenerDatosEstudiante(parseInt(this.id!), this.idUser).subscribe(
        (data) => this.notas = data,
        error => console.log(error),
        () => console.log("FIN")
      )
    }
  }
  obtenerEstudiantes(){
    this.estudianteService.obtenerDatos().subscribe(
      (data) => this.estudiantes = data,
      error => console.log(error),
      () => console.log("FIN")
    )
  }
  initializeDisplayedColumns(): void {
      const index = this.displayedColumns.indexOf('nombre');
      if (index > -1) {
        this.displayedColumns.splice(index, 1);
      }
  }
  handleSelectChange(event: any) {
    //const selectedValue = event.value;
    this.idEstudiante = event;
    this.obtenerDatosEstudiante()
    console.log('Event:', event);
  }

  obtenerDatosEstudiante(){
    this.notasService.obtenerDatosEstudiante(parseInt(this.id!), this.idEstudiante!).subscribe(
      (data) => {
        console.log(data);
        this.notas = data},
      error => console.log(error),
      () => console.log("FIN")
    )
  }

  openModal(){
   
    const dialogRef = this.dialog.open(NewNotaComponent, {
      width: '400px',
      data: {
        idMateria: this.id,
        idEstudiante: this.idEstudiante
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
          console.log(result.data) 
          this.notas.push(result.data)
      }
    });
  }
}
