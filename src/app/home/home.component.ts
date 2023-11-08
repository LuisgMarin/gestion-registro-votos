import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isNavbarCollapsed = true; // Variable para controlar el colap del menú
  userRole: string | null = null;
  admin: string | null = '1';
  jurado: string | null = '2';

  constructor(
    private userService: UserRoleService,
    private router: Router,
    ) {}

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  ngOnInit() {
    this.admin
    this.jurado
    this.userRole = this.userService.getRol();
  }
  logout() {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("rol");
    this.router.navigate(['/inicio-sesion']);
  }
}
