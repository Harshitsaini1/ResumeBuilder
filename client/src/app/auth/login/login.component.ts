import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._router.navigate(['users/profile']);
    }
  }

  loginUser(loginUserData: any) {
    this._auth.loginUser(loginUserData).subscribe(
      (res) => {
        let token = JSON.parse(JSON.stringify(res));
        localStorage.setItem('token', token.token);
        this._router.navigate(['users/profile']);
      },
      (err) => {
        if (err.error === 'Invalid email') {
          alert('User not exists');
        } else if (err.error === 'Invalid password') {
          alert('Password Incorrect');
        } else {
          console.error(err);
        }
      }
    );
  }

  continueWithGoogle() {
    this._socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        this._auth.continueWithGoogle({ token: data.idToken }).subscribe(
          (res) => {
            let token = JSON.parse(JSON.stringify(res));
            localStorage.setItem('token', token.token);
            if (token.firstTime) {
              alert('Set yout password first');
              this._router.navigate(['users/edit']);
              return;
            }
            this._router.navigate(['users/profile']);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  }
}
