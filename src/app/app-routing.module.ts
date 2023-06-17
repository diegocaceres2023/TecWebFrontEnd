import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasComponent } from './paginas/materias/materias.component';
import { EstudiantesComponent } from './paginas/estudiantes/estudiantes.component';
import { NotasComponent } from './paginas/notas/notas.component';
import { InscribirComponent } from './paginas/inscribir/inscribir.component';
import { InscritosComponent } from './paginas/inscritos/inscritos.component';
import { NewEstudianteComponent } from './modals/new-estudiante/new-estudiante.component';
import { NewMateriaComponent } from './modals/new-materia/new-materia.component';

const routes: Routes = [{ path: 'materias', component: MateriasComponent }, 
          { path: 'materiaNueva', component: NewMateriaComponent },
          {path: 'estudiantes', component: EstudiantesComponent },
          {path: 'estudianteNuevo', component: NewEstudianteComponent},
          {path: 'notas/:id', component: NotasComponent },
          { path: 'inscribir', component: InscribirComponent },
          {path: 'inscritos/:sigla/:nombre', component: InscritosComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
