import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { UserRoleService } from './services/user-role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  userRole: string | null = null;

  title = 'gestion-registro-votos';

  constructor(public authService: AuthenticationService, private userService: UserRoleService) {  }

  ngOnInit() {
    this.userRole = this.userService.getRol();

  }
}
