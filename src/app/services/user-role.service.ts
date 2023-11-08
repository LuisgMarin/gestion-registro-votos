import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  constructor(
  ) {}

  getRol(): string | null {
    return window.localStorage.getItem("rol");
  }
}
