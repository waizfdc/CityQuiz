import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo = "../../assets/img/logo.png";

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  loginPressed() {
    this.authService.openLogin();
  }

  logoPressed() {
    // this.authService.logout();
  }

  logoutPressed() {
    this.authService.logout();
  }

  userClicked() {
    // this.authService.increaseScore();
    // console.log(this.authService.isWrittenUser(this.authService.user));
    // this.authService.getUserData(this.authService.user);
  }

}
