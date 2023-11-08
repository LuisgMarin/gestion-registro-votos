import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
    private userRolService: UserRoleService,

  ) {
    axios.defaults.baseURL = 'http://localhost:8088';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null, rol: string): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
      window.localStorage.setItem("rol", rol);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }


  request(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
        headers = {"Authorization": "Bearer " + this.getAuthToken()};
    }

    return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    });
}

/*
  login(nombreUsuario: string, password: string) {
    // Hacer la solicitud de inicio de sesión al servidor
    let bodyData = {
      nombreUsuario: nombreUsuario,
      password: password,
    };

    this.http.post('http://localhost:8080/iniciar-sesion', bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);

        if (resultData.sesionIniciada == false) {
          alert('Credenciales incorrectas');
        } else if (resultData.sesionIniciada == true) {
          // Autenticación exitosa
          this.isAuthenticated.next(true);
          this.userRole.next(resultData.rol);
          this.router.navigateByUrl('home');
          localStorage.setItem("ses sion", "true");
          localStorage.setItem("rol", resultData.rol)
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        // Manejar errores de la solicitud, por ejemplo, mostrar un mensaje de error
        console.error('Error al iniciar sesión:', error);
        alert(
          'Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.'
        );
      }
    );
  }

  logout() {
   // Cambiar el estado de autenticación a false
   this.isAuthenticated.next(false);

   // Borrar la información del usuario del localStorage
   localStorage.removeItem('session');
   localStorage.removeItem('rol');
   this.router.navigateByUrl('inicio-sesion');
  }

  isUserLogged() {
    return this.isAuthenticated.asObservable();
  }
  getUserRole() {
    return this.userRole.asObservable();
  }
  obtenerSession(): boolean {
    const sessionData = localStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : false;
  }
  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }
*/
}
