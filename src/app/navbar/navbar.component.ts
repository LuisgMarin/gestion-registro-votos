import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarCollapsed = true; // Variable para controlar el colapso del menú

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Cambia el estado de colapso
  }

}
