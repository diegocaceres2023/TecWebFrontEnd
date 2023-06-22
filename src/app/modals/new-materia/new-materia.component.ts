import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Materia } from 'src/app/interfaces/materia';
import { MateriaService } from 'src/app/servicios/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-materia',
  templateUrl: './new-materia.component.html',
  styleUrls: ['./new-materia.component.scss']
})
export class NewMateriaComponent implements OnInit{
  myForm: FormGroup = new FormGroup({});
  nuevo! : Materia;
  isSubmitted = false;
  
  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder, private materiaService:MateriaService,@Inject(MAT_DIALOG_DATA) public data: string,
  private dialogRef: MatDialogRef<NewMateriaComponent>) {
    
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      sigla: ['', Validators.required],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    //console.log('Valid?', form.valid); // true or false
    if(this.myForm.valid){
      let materia: Materia;
      materia = {
        sigla: this.myForm.value.sigla,
        nombre: this.myForm.value.nombre,
        descripcion: this.myForm.value.descripcion}
     this.crearMateria(materia)
    }
  }

  crearMateria(materia:Materia){
    this.nuevo = materia;
    this.materiaService
    .crear(materia)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('An error occurred:', error);
        this._snackBar.open("Ha ocurrido un problema. Verifique que la sigla no sea repetida", "Cerrar", {
          panelClass: ['red-snackbar'],
        });
        return throwError('Something went wrong; please try again later.'); // Optional: Rethrow the error or return a custom error message
      })
    )
    .subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Se ha guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close({ data: true })
    }
    );//this.nuevo = data

    
  }
}
