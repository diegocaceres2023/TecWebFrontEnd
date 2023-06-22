
import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { queue } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from './nav-item';
import { NewEstudianteComponent } from './modals/new-estudiante/new-estudiante.component';
import { NewMateriaComponent } from './modals/new-materia/new-materia.component';
import { TokenService } from './servicios/token.service';
import { RefreshService } from './servicios/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'estudiantes-frontend';
  header:string = '';
  idUsuario = -1;
  menu: NavItem [] = [
    /*{
      displayName: 'Inicio',
      iconName: 'home',
      route: '/home'
    }, */       
    {
      displayName: 'Materias',
      iconName: 'menu_book',
      acceso: 'estudiante',
      children: [
        {
          displayName: 'Ver Materias',
          iconName: 'search',
          route: '/materias'
        },
        { 
          displayName: 'Nueva Materia',
          iconName: 'add_circle',
          route: 'materia',
          acceso: 'admin'
        }
      ]
      //route: '/materias',
    },
    {
      displayName: 'Estudiantes',
      iconName: 'person',
      acceso: 'docente',
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
      acceso: 'admin',
      children: [
        {
          displayName: 'Nueva Inscripción',
          iconName: 'add_circle',
          route: '/inscribir'
        }
      ]
    },
    {
      displayName: 'Cerrar Sesión',
      iconName: 'logout',
      route: 'logout'
    }
  ];
  mobileQuery: MediaQueryList;
  selectedIndex: number =-1;
  title = 'La-Jatata';
  nombreUsuario! : string | null;
  message:any = null;
  private _mobileQueryListener: () => void;
  isLogin! : boolean;
  
  constructor(private refreshService: RefreshService,private tokenService:TokenService, changeDetectorRef: ChangeDetectorRef,private router: Router, media: MediaMatcher,private  dialog:  MatDialog) {
    this.getNombreUsuario()
    this.refreshService.getRefreshObservable().subscribe(() => {
      this.getNombreUsuario();
    });
    //this.tokenService.getIdUsuario();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isLogin= true;
        } else {
          this.isLogin= false;
        }
      }
    });
  }

  getNombreUsuario(){
    this.nombreUsuario = this.tokenService.getNombreUsuario();
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
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.router.navigate(['/estudiantes'])
        }
      });
    }
    else if(name === "materia"){
      const dialogRef = this.dialog.open(NewMateriaComponent, {
        width: '400px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.router.navigate(['/materias'])
        }
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
  logout(route: string){
    if(route === "logout"){
      this.tokenService.logout();
      this.router.navigate(["/login"]);
    }
  }

  toDisplay(acceso: string): boolean{
    let res = true;
    if(acceso === "admin" && !this.tokenService.isAdmin()){
      res = false;
    }
    if(acceso === "docente" && !this.tokenService.isAdmin()){
      res = false;
    }
    return res;
  }
}
