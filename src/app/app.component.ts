import { Component, OnInit } from '@angular/core';
import {FirebaseService} from 'app/shared/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    // this.firebaseService.firebaseInit();
  }
}
