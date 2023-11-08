import { HttpClient } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';
import { AuthenticationService } from '../services/authentication.service';
import swal from 'sweetalert2'


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

	active: string = "login";
  usuario: string = "";
  contrasena: string = "";

  onLogin() {
    console.log(this.usuario, this.contrasena);
		this.authService.request(
		    "POST",
		    "/login",
		    {
            usuario: this.usuario,
		        contrasena: this.contrasena,

		    }).then(
		    response => {
		        this.authService.setAuthToken(response.data.token, response.data.rol);
            this.router.navigate(['/home']);
            console.log(response.data);
          }).catch(
		    error => {
          swal.fire({
            title: 'Usuario o contraseña incorrecto',
            timer: 2000
          })
          console.error("Error en la solicitud:", error);
		      this.authService.setAuthToken(null, "0");
		    }
		);
	}
}
