import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable()
export class FirebaseService {

  fireInit = false;
  // Get a reference to the database service

  constructor() { }

  firebaseInit() {
    if(!this.fireInit) {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAYvVBJ83X_1eGNPumly6-zlhcOJQSQHJk",
        authDomain: "city-quiz-82854.firebaseapp.com",
        databaseURL: "https://city-quiz-82854.firebaseio.com",
        projectId: "city-quiz-82854",
        storageBucket: "city-quiz-82854.appspot.com",
        messagingSenderId: "2945288246"
      };
      firebase.initializeApp(config);
      this.fireInit = true;
    }
  }
}
