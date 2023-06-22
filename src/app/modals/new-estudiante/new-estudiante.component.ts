import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { Estudiante } from 'src/app/interfaces/estudiante';

import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-estudiante',
  templateUrl: './new-estudiante.component.html',
  styleUrls: ['./new-estudiante.component.scss']
})
export class NewEstudianteComponent {
  myForm: FormGroup = new FormGroup({});
  nuevo! : Estudiante;
  isSubmitted = false;

  isEdit = false;
  
  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder, private estudianteService:EstudianteService,@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<NewEstudianteComponent>) {
    
  }
  
  ngOnInit() {
    
    if(this.data){
      this.isEdit = true;
    }
    //console.log(this.data.estudiante.celular)
    if(this.isEdit){
      this.myForm = this.fb.group({
        nombre: [{value: this.data.estudiante.nombre_completo, disabled: true}, Validators.required,],
        celular: [this.data.estudiante.celular , [Validators.required]],
        email: [this.data.estudiante.email,[Validators.required, Validators.email]],
        fecha: [{value: this.data.estudiante.fecha_nacimiento, disabled: true}, [Validators.required]]
      });
    }
    else{
      this.myForm = this.fb.group({
        nombre: ['', Validators.required],
        celular: ['', [Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        fecha: ['', [Validators.required]]
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    //console.log('Valid?', form.valid); // true or false
    if(this.myForm.valid){
      
      
    if(this.isEdit){
      let estudiante: Estudiante;
      estudiante = {
        nombre_completo: this.myForm.value.nombre,
        email: this.myForm.value.email,
        celular: this.myForm.value.celular}
      this.updateEstudiante(estudiante);
    }
    else{
      const currentDate = new Date(this.myForm.value.fecha);
      let date = formatDate(currentDate,'yyyy-MM-dd',"en-US"); // Replace this with your desired date source
      let estudiante: Estudiante;
      estudiante = {
        nombre_completo: this.myForm.value.nombre,
        email: this.myForm.value.email,
        celular: this.myForm.value.celular,
        fecha_nacimiento: date}
     this.crearMateria(estudiante)
    }
    }
  }

  crearMateria(estudiante:Estudiante){
    this.nuevo = estudiante;
    this.estudianteService
    .crear(estudiante)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('An error occurred:', error);
        this._snackBar.open("Ha ocurrido un problema.", "Cerrar", {
          panelClass: ['red-snackbar'],
        });
        return throwError('Something went wrong; please try again later.'); // Optional: Rethrow the error or return a custom error message
      })
    )
    .subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: 'Se ha guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
    );//this.nuevo = data

    this.dialogRef.close({ data: true })
  }

  updateEstudiante(estudiante:Estudiante){
    this.estudianteService
    .update(estudiante, this.data.estudiante.carnet)
    .subscribe(
      data =>{
        this.dialogRef.close({ data: true })
      },
      err =>{
        this._snackBar.open("Ha ocurrido un error", "Cerrar", {
          panelClass: ['red-snackbar'],
        });
      }

    );//this.nuevo = data

    
  }
}
