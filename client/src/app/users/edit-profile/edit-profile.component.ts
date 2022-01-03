import { VerifyOtpService } from '../../services/auth/verify-otp.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  otpSent: boolean = false;
  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  mobileVerify = new FormGroup({
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    otp: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _verifyOtp: VerifyOtpService
  ) {}

  ngOnInit(): void {
    this._auth.getProfile().subscribe(
      (res: any) => {
        this.user.patchValue({
          email: res.email,
          username: res.username,
        });
        this.mobileVerify.patchValue({
          mobile: res.mobile,
        });
      },
      (err) => console.error(err)
    );
  }

  editUser() {
    this._auth.editUser(this.user.value).subscribe(
      (res) => {
        this._router.navigate(['users/profile']);
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

  sendOtp() {
    // console.log(this.mobileVerify.value.mobile);

    this._verifyOtp.sendOtp(this.mobileVerify.value.mobile).subscribe(
      (res) => {
        // console.log(res);
        this.otpSent = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  verify() {
    // console.log(this.mobileVerify.value.otp);
    this._verifyOtp.verifyOtp(this.mobileVerify.value).subscribe(
      (res) => {
        // console.log(res);
        this._router.navigate(['/users/profile']);
        this._verifyOtp.verified = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
