import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioDto } from 'src/app/modelos/login-usuario.dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm: FormGroup = new FormGroup({});
  
  isSubmitted = false;
  usuario!: LoginUsuarioDto;

  constructor(private _snackBar: MatSnackBar,private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService, private toastrService: ToastrService, private router: Router) {
    
  }
  
  ngOnInit() {
    this.myForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.usuario = new LoginUsuarioDto(this.myForm.value.nombreUsuario,this.myForm.value.password);
    this.authService.login(this.usuario).subscribe(
      data=>{
        //console.log(data);
        if(!data.token) {
          console.log("error")
          this._snackBar.open("Credenciales incorrectas", "Cerrar", {
            panelClass: ['red-snackbar'],
          });
          /*this.toastrService.error(data.response.message, 'Fail',{
            timeOut: 3000, positionClass:'toast-top-center',
          });*/
        }   
         else{
          console.log(data)
          this.tokenService.setToken(data.token);
          this.router.navigate(['/']);
         }
      },
      err =>{
        console.log("error2")
        this._snackBar.open("Ha ocurrido un error", "Cerrar");
        /*this.toastrService.error(err.error.message, 'Fail',{
          timeOut: 3000, positionClass:'toast-top-center',
        });*/
      }

    )
  }

}
