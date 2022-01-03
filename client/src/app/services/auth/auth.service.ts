import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //For development

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  private _profileUrl = 'http://localhost:3000/api/profile';
  private _editUrl = 'http://localhost:3000/api/edit';
  private _forgotPassword = 'http://localhost:3000/api/forgot-password';
  private _resetPassword = 'http://localhost:3000/api/reset-password';
  private _googleUrl = 'http://localhost:3000/api/google';

  //For production

  // private _registerUrl = 'api/register';
  // private _loginUrl = 'api/login';
  // private _profileUrl = 'api/profile';
  // private _editUrl = 'api/edit';
  // private _forgotPassword = 'api/forgot-password';
  // private _resetPassword = 'api/reset-password';
  // private _googleUrl = 'api/google';

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _socialAuthService: SocialAuthService
  ) {}

  registerUser(user: any) {
    return this.http.post(this._registerUrl, user);
  }

  editUser(user: any) {
    return this.http.post(this._editUrl, user);
  }

  continueWithGoogle(token: any) {
    return this.http.post(this._googleUrl, token);
  }

  loginUser(user: any) {
    return this.http.post(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    // this._socialAuthService.signOut();
    this._router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getProfile() {
    return this.http.get(this._profileUrl);
  }

  forgotPassword(email: any) {
    return this.http.post(this._forgotPassword, email);
  }

  resetPassword(data: any) {
    return this.http.post(this._resetPassword, data);
  }
}
