import { Component } from '@angular/core';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { Estudiante } from 'src/app/interfaces/estudiante';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ConfirmarComponent } from 'src/app/modals/confirmar/confirmar.component';
import { NewEstudianteComponent } from 'src/app/modals/new-estudiante/new-estudiante.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshService } from 'src/app/servicios/refresh.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent {
  data =  new MatTableDataSource<Estudiante>();
  estudiantes : Estudiante[] = []
  displayedColumns: string[] = [ 'nombre', 'celular', 'fecha', 'edit','delete'/*,'notas'*/];

  constructor(private refreshService: RefreshService, private _snackBar: MatSnackBar,private estudianteService: EstudianteService, public dialog: MatDialog){
    
  }
  openDialog(estudiante:Estudiante): void {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.borrarEstudiante(estudiante)
      }
    });
   
  }
  ngOnInit(): void {
    this.obtenerEstudiantes();
    this.refreshService.getRefreshObservable().subscribe(() => {
      this.obtenerEstudiantes();
    });
  }

  obtenerEstudiantes(){
    this.estudianteService.obtenerDatos().subscribe(
      (data) => this.estudiantes = data,
      error => console.log(error),
      () => console.log("FIN")
    )
  }

  crearEstudiante(estudiante:Estudiante){
    this.estudianteService
    .crear(estudiante)
    .subscribe(data => this.estudiantes.push(data));
  }

  borrarEstudiante(estudiante:Estudiante){
    this.estudianteService
    .borrar(estudiante.carnet!)
    .subscribe(() => {
      this.estudiantes = this.estudiantes.filter(est => est.carnet !== estudiante.carnet);
    }, error => {
      this._snackBar.open("Ha ocurrido un problema. El estudiante está inscrito en materias", "Cerrar", {
        panelClass: ['red-snackbar'],
      });
    });
  }

  openNewForm(){
    const dialogRef = this.dialog.open(NewEstudianteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result.data != undefined){
        this.estudiantes.push(result.data)
        let cloned = this.estudiantes.slice()
        // Or in ECMAScript 2015 (ES6): // let cloned = [...dataSource]
        this.estudiantes = cloned
        console.log(result.data)
      }
    });
  }

  openOnEdit(est: Estudiante){
      const dialogRef = this.dialog.open(NewEstudianteComponent, {
        width: '400px',
        data: {estudiante: est}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          
        }
      });
  }
}
