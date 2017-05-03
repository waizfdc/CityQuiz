import { Component, OnInit } from '@angular/core';  
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
    console.log(this.authService.user);
  };
 
  logout() {
    this.authService.logout();
  }
}
