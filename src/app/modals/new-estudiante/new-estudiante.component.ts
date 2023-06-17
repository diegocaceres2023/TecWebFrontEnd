import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { Estudiante } from 'src/app/interfaces/estudiante';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-estudiante',
  templateUrl: './new-estudiante.component.html',
  styleUrls: ['./new-estudiante.component.scss']
})
export class NewEstudianteComponent {
  myForm: FormGroup = new FormGroup({});
  nuevo! : Estudiante;
  isSubmitted = false;
  
  constructor(private fb: FormBuilder, private estudianteService:EstudianteService,@Inject(MAT_DIALOG_DATA) public data: string,
  private dialogRef: MatDialogRef<NewEstudianteComponent>) {
    
  }
  
  ngOnInit() {
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      celular: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    //console.log('Valid?', form.valid); // true or false
    if(this.myForm.valid){
      
      const currentDate = new Date(this.myForm.value.fecha);
      let date = formatDate(currentDate,'yyyy-MM-dd',"en-US"); // Replace this with your desired date source
      let estudiante: Estudiante;
      estudiante = {
        nombre_completo: this.myForm.value.nombre,
        celular: this.myForm.value.celular,
        fecha_nacimiento: date}
     this.crearMateria(estudiante)
    }
  }

  crearMateria(estudiante:Estudiante){
    this.nuevo = estudiante;
    this.estudianteService
    .crear(estudiante)
    .subscribe();//this.nuevo = data

    this.dialogRef.close({ data: true })
  }
}
