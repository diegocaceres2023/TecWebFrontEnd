import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, startWith, throwError } from 'rxjs';
import { Estudiante } from 'src/app/interfaces/estudiante';
import { Inscribir } from 'src/app/interfaces/inscribir';
import { Materia } from 'src/app/interfaces/materia';
import { EstudianteService } from 'src/app/servicios/estudiante.service';
import { InscribirService } from 'src/app/servicios/inscribir.service';
import { MateriaService } from 'src/app/servicios/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscribir',
  templateUrl: './inscribir.component.html',
  styleUrls: ['./inscribir.component.scss']
})

export class InscribirComponent implements OnInit{
  myForm: FormGroup = new FormGroup({});
  estudiantes : Estudiante[] = [];
  materias: Materia[] =[];
  isSubmitted = false;
  notNumber = false;
  materiasFiltro!: Observable<Materia[]>;
  estudiantesFiltro!: Observable<Estudiante[]>;
  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder,private inscribirService: InscribirService,private estudianteService: EstudianteService, private materiaService: MateriaService){
    
  }
  private _filterEst(value: string): Estudiante[] {
    console.log(value);
    let filterValue ="";
    if(isNaN(Number(value))){
      filterValue = value.toLowerCase();
    }
    else{
      filterValue = this.displayFn(Number(value))
    }
    //let nombre : string = this.displayFn(value)
    

    return this.estudiantes.filter(est => est.nombre_completo.toLowerCase().includes(filterValue));
  }

  private _filterMat(value: string): Materia[] {
    console.log(value);
    let filterValue ="";
    if(isNaN(Number(value))){
      filterValue = value.toLowerCase();
    }
    else{
      filterValue = this.displayFn(Number(value))
    }
    //let nombre : string = this.displayFn(value)
    

    return this.materias.filter(mat => mat.nombre.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.initForm()
    this.obtenerEstudiantes()
    this.obtenerMaterias()
  }
  
  initFiltro(){
    this.estudiantesFiltro = this.myForm.get('carnet')!.valueChanges.pipe(
      startWith(''),
      map(est => (est ? this._filterEst(est) : this.estudiantes.slice())),
    );
  }

  initFiltroMat(){
    this.materiasFiltro = this.myForm.get('id_materia')!.valueChanges.pipe(
      startWith(''),
      map(mat => (mat ? this._filterMat(mat) : this.materias.slice())),
    );
  }

  displayFn(value: number) {
    return this.estudiantes.find(_ => _.carnet === value)?.nombre_completo!;
  }

  displayMat(value: number) {
    return this.materias.find(_ => _.id === value)?.nombre!;
  }

  initForm(){
    this.myForm = this.fb.group({
      carnet: ['', Validators.required],
      id_materia: ['', [Validators.required]],
      fecha_inscripcion: ['', [Validators.required]]
    });
  }
  obtenerEstudiantes(){
    this.estudianteService.obtenerDatos().subscribe(data=>{
      this.estudiantes = data;
      this.initFiltro();
    })
  }

  obtenerMaterias(){
    this.materiaService.obtenerDatos().subscribe(data=>{
      this.materias = data;
      this.initFiltroMat();
    })
  }
  isNotNumber(value: string){
    return isNaN(Number(value))
  }
  onSubmit() {
    this.isSubmitted = true;
    if(this.isNotNumber(this.myForm.value.carnet) || this.isNotNumber(this.myForm.value.id_materia)){
      this.notNumber = true;
    }
    //console.log('Valid?', form.valid); // true or falseisNaN(Number(value))
    else if(this.myForm.valid){
      
      const currentDate = new Date();
      let date = formatDate(currentDate,'yyyy-MM-dd',"en-US"); // Replace this with your desired date source
      let inscripcion: Inscribir;
      inscripcion = {
        carnet: this.myForm.value.carnet,
        id_materia: this.myForm.value.id_materia,
        fecha_inscripcion: date}
      //console.log(inscripcion)
     this.inscribirService.crear(inscripcion)
     .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('An error occurred:', error);
        this._snackBar.open("Error. Verifique que el estudiante no se encuentra ya inscrito a la materia", "Cerrar", {
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
       console.log(data)})
     this.notNumber = false;
    }
  }
  //carnet
  //id_materia
  //fecha_inscripcion
}