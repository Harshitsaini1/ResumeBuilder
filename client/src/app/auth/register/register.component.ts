import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this._auth.logoutUser();
      this._router.navigate(['/auth/register']);
    }
  }

  registerUser(registerUserData: any) {
    this._auth.registerUser(registerUserData).subscribe(
      (res) => {
        let token = JSON.parse(JSON.stringify(res));
        localStorage.setItem('token', token.token);
        this._router.navigate(['/users/profile']);
      },
      (err) => {
        if (err.error === 'Email already exists') {
          alert('Email already exists');
        } else {
          console.error(err);
        }
      }
    );
  }
}
