import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriasComponent } from './paginas/materias/materias.component';
import { EstudiantesComponent } from './paginas/estudiantes/estudiantes.component';
import { NotasComponent } from './paginas/notas/notas.component';
import { InscribirComponent } from './paginas/inscribir/inscribir.component';
import { InscritosComponent } from './paginas/inscritos/inscritos.component';
import { NewEstudianteComponent } from './modals/new-estudiante/new-estudiante.component';
import { NewMateriaComponent } from './modals/new-materia/new-materia.component';
import { LoginComponent } from './paginas/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { EstudiantesGuard } from './guards/estudiantes.guard';
import { HomeComponent } from './paginas/home/home.component';

const routes: Routes = [ 
          {path: '', redirectTo:'home',pathMatch: 'full' },     
          {path: 'home', component: HomeComponent,canActivate:[EstudiantesGuard],data:{expectedRol:['admin','estudiante','docente']} },
          { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
          { path: 'materias', component: MateriasComponent,canActivate:[EstudiantesGuard],data:{expectedRol:['admin','estudiante','docente']} }, 
          { path: 'materiaNueva', component: NewMateriaComponent ,canActivate:[EstudiantesGuard],data:{expectedRol:['admin']}},
          {path: 'estudiantes', component: EstudiantesComponent, canActivate:[EstudiantesGuard], data:{expectedRol:['admin','docente']} },//estudiante, docente
          {path: 'estudianteNuevo', component: NewEstudianteComponent,canActivate:[EstudiantesGuard],data:{expectedRol:['admin']}},
          {path: 'notas/:id', component: NotasComponent ,canActivate:[EstudiantesGuard],data:{expectedRol:['admin','estudiante','docente']}},
          { path: 'inscribir', component: InscribirComponent,canActivate:[EstudiantesGuard],data:{expectedRol:['admin','estudiante']} },
          {path: 'inscritos/:sigla/:nombre', component: InscritosComponent,canActivate:[EstudiantesGuard], data:{expectedRol:['admin','estudiante','docente']} },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
