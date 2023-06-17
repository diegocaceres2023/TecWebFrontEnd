
import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { queue } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from './nav-item';
import { NewEstudianteComponent } from './modals/new-estudiante/new-estudiante.component';
import { NewMateriaComponent } from './modals/new-materia/new-materia.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'estudiantes-frontend';
  header:string = 'La Jatata'
  menu: NavItem [] = [
    /*{
      displayName: 'Inicio',
      iconName: 'home',
      route: '/home'
    }, */       
    {
      displayName: 'Materias',
      iconName: 'menu_book',
      children: [
        {
          displayName: 'Ver Materias',
          iconName: 'search',
          route: '/materias'
        },
        { 
          displayName: 'Nueva Materia',
          iconName: 'add_circle',
          route: 'materia'
        }
      ]
      //route: '/materias',
    },
    {
      displayName: 'Estudiantes',
      iconName: 'person',
      children: [
        {
          displayName: 'Ver Estudiantes',
          iconName: 'search',
          route: '/estudiantes'
        },
        { 
          displayName: 'Nuevo Estudiante',
          iconName: 'add_circle',
          route: 'estudiante'
        }
      ]
      //route: '/estudiantes',
    },
    {
      displayName: 'Inscripcion',
      iconName: 'folder',
      children: [
        {
          displayName: 'Nueva Inscripción',
          iconName: 'add_circle',
          route: '/inscribir'
        }
      ]
    },
    
    /*{
      displayName: 'Expedientes',
      iconName: 'description',          
      children: [
        {
          displayName: 'Mis Expedientes',
          iconName: 'how_to_reg',
          route: '/misexpedientes'
        },
        { 
          displayName: 'Todos',
          iconName: 'waves',
          route: '/todos'
        }
      ]
    },
    {
      displayName: 'Perfiles',
      iconName: 'group',
      children: [
          {
            displayName: 'Búsqueda Perfil',
            iconName: 'search',
            route: '/busquedaperfiles'
          }
        ]
      }*/
  ];
  mobileQuery: MediaQueryList;
  selectedIndex: number =-1;
  title = 'La-Jatata';
  message:any = null;
  private _mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private  dialog:  MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  /*showForm(){
    const ref =this.dialog.open(ReservaModalComponent)
  }*/
  changeTitle(title:string){
    this.header = title;
  }
  select(index: number) {
    this.selectedIndex = index; 
  }  

  isModal(route: string){
    return !route.includes("/") ;
  }
  openModal(name: string){
    if(name === "estudiante"){
      const dialogRef = this.dialog.open(NewEstudianteComponent, {
        width: '400px'
      });
    }
    else if(name === "materia"){
      const dialogRef = this.dialog.open(NewMateriaComponent, {
        width: '400px'
      });
    }
  }
  ngOnInit(): void {
    //this.requestPermission();
    //this.listen();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}
