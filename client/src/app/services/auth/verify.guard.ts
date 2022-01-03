import { VerifyOtpService } from './verify-otp.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VerifyGuard implements CanActivate {
  constructor(private _otpService: VerifyOtpService, private _router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._otpService.checkForVerification()) {
      return true;
    } else {
      return this._otpService.checkFromBack().pipe(
        map((res: any) => {
          console.log(res);
          if (res.message === true) {
            // return true;
            // console.log('HEre');
            this._otpService.verified = true;
            return true;
          } else {
            return this._router.createUrlTree(['/users', 'profile']);
          }
        }),
        catchError((err) => {
          // console.log(err);
          return this._router.navigate(['/users', 'profile']);
        })
      );
      // return this._otpService().subscribe(
      //   (res: any) => {
      //     console.log(res);
      //     if (res.message === true) {
      //       // return true;
      //       // console.log('HEre');
      //       this._otpService.verified = true;
      //     }
      //   },
      //   (err) => {
      //     console.log(err);
      //     this._otpService.verified = false;
      //   }
      // );

      // if (this._otpService.checkForVerification()) {
      //   return true;
      // }
      // this._router.navigate(['/users/profile']);
      // return false;
    }
  }
}
