import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Materia } from 'src/app/interfaces/materia';
import { MateriaService } from 'src/app/servicios/materia.service';

@Component({
  selector: 'app-new-materia',
  templateUrl: './new-materia.component.html',
  styleUrls: ['./new-materia.component.scss']
})
export class NewMateriaComponent implements OnInit{
  myForm: FormGroup = new FormGroup({});
  nuevo! : Materia;
  isSubmitted = false;
  
  constructor(private fb: FormBuilder, private materiaService:MateriaService,@Inject(MAT_DIALOG_DATA) public data: string,
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
    .subscribe();//this.nuevo = data

    this.dialogRef.close({ data: true })
  }
}
