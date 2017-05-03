import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';

import { LoaderService } from './shared/services/loader.service';
import { AuthService } from './shared/services/auth.service';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";

const firebaseConfig = {
        apiKey: "AIzaSyAYvVBJ83X_1eGNPumly6-zlhcOJQSQHJk",
        authDomain: "city-quiz-82854.firebaseapp.com",
        databaseURL: "https://city-quiz-82854.firebaseio.com",
        projectId: "city-quiz-82854",
        storageBucket: "city-quiz-82854.appspot.com",
        messagingSenderId: "2945288246"
      };

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  ],
  providers: [
    LoaderService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
