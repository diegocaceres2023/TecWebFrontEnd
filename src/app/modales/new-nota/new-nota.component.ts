import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { Nota } from 'src/app/interfaces/nota';
import { NotaService } from 'src/app/servicios/nota.service';

@Component({
  selector: 'app-new-nota',
  templateUrl: './new-nota.component.html',
  styleUrls: ['./new-nota.component.scss']
})

export class NewNotaComponent {
  myForm: FormGroup = new FormGroup({});
  nuevo! : Nota;
  isSubmitted = false;
  idMateria! : number;
  idEstudiante! : number;
  
  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder, private notaService:NotaService,@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<NewNotaComponent>) {
    
  }

  ngOnInit() {
    this.idMateria = this.data.idMateria;
    this.idEstudiante = this.data.idEstudiante;
    this.myForm = this.fb.group({
      gestion: ['', Validators.required],
      evaluacion: ['', [Validators.required]],
      calificacion: ['', [Validators.required, Validators.max(100), Validators.min(0)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    //console.log('Valid?', form.valid); // true or false
    if(this.myForm.valid){
      let nota: Nota;
      nota = {
        carnet: this.idEstudiante,
        id_materia: this.idMateria,
        gestion: this.myForm.value.gestion,
        evaluacion: this.myForm.value.evaluacion,
        calificacion: this.myForm.value.calificacion}
     this.crearNota(nota)
    }
  }

  crearNota(nota:Nota){
    this.nuevo = nota;
    this.notaService
    .crear(nota)
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
    .subscribe(data=>
      this.dialogRef.close({ data: data })
    );//this.nuevo = data

    
  }
}
