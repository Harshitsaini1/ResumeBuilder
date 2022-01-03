import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  successMessage: any;
  errorMessage: any;
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}
  forgotPassword(email: any) {
    this._authService.forgotPassword(email).subscribe(
      (res: any) => {
        // console.log(JSON.parse(JSON.stringify(res)).message);
        this.successMessage = res.message;
      },
      (err) => {
        // console.error(err.error.message);
        this.errorMessage = err.error.message;
      }
    );
  }
}
