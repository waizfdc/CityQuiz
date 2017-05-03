import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import {Http, Response } from '@angular/http';
import * as firebase from "firebase";
import {IUser} from '../model/iUser';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthService {
  
  user: IUser;
  isAuth = false;
  componentHidden = true;
  score = 0;
  userObj;
  avatar = 'https://pp.userapi.com/c7008/v7008442/20db5/gGrGvI6hFWw.jpg';

  constructor(public af: AngularFire, private http: Http) {
    this.af.auth.subscribe(
      user => this._changeState(user),
      error => console.trace(error)
    );

  }

   private _changeState(user: any = null) {
    if(user) {
        // console.log("change state login");
        this.isAuth = true;
        this.user = this._getUserInfo(user);
        this.isWrittenUser(this.user);
    }
    else {
      // console.log("change state logout");
      this.isAuth = false;
      this.user = undefined;
      this.score = 0;
    }
  }

    private _getUserInfo(user: any): IUser {
      // console.log('getuser info');
    if(!user) {
      return undefined;
    }
    let data = user.auth.providerData[0];
    this.avatar = data.photoURL;
    return {
      uid: user.uid,
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      score: this.score,
      provider: data.providerId
    };
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
    this.closeLogin();
    console.log(this.user);
  }
  
  logout() {
    this.af.auth.logout();
    // console.log("logged out ", this.user);
  }

  isLogged(): boolean {
    return this.isAuth;
  }

  openLogin() {
    this.componentHidden = false;
    // console.log(this.user);
  }

  closeLogin() {
    this.componentHidden = true;
  }

  writeUserData(user: IUser) {
      // console.log("write user data");
    firebase.database().ref('users/' + user.uid).set({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      score: this.score   
    });
  }

  isWrittenUser(user: IUser) {
      // console.log("is written user");
    // this.af.database.object('users/'+user.uid).$ref.transaction(currentValue => {
    //   if (currentValue === null) {
    //     // no such user in db
    //     this.writeUserData(this.user);
    //     return;
    //   } else {
    //     // user exists
    //     this.syncScore(this.user);
    //   }
    // });
    this.userObj = this.af.database.object('users/'+user.uid , { preserveSnapshot: true }).take(1);
    this.userObj.subscribe(data => {
      // console.log(data);
      if(data.exists()) {
        // console.log("user updated");
        this.syncScore(this.user);
      } else {
        this.writeUserData(user);
        // console.log("user created");
      }
    }, error => console.log(error));
  }

  syncScore(user: IUser) {
      // console.log("sync score");
    const usersUrl = 'https://city-quiz-82854.firebaseio.com/users/';

    this.http.get(usersUrl+user.uid+'.json')
      .map(data => {
        this.score += data.json().score;
        // console.log('sync==> ', this.score, data.json().score);
      })
      .catch(error => error)
      .subscribe(data => this.writeScore(), error => console.log(error));
  }

  increaseScore() {
    this.score++;
    // console.log("increase", this.user, this.score, this.isAuth);
    this.writeScore();
    
  }

  writeScore() {
    if (this.isAuth) {
      this.userObj = this.af.database.object('users/'+this.user.uid);
      this.userObj.update({score: this.score});
      // firebase.database().ref('users/'+this.user.uid+'/score').set(this.score);
    }
  }
}
