import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../services/user-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
