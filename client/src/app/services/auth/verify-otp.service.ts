import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyOtpService {
  //For Development

  private _sendOtpUrl = 'http://localhost:3000/api/send-otp';
  private _verifyOtpUrl = 'http://localhost:3000/api/verify-otp';
  private _checkOtpBack = 'http://localhost:3000/api/check-otp-back';

  //For Production

  // private _sendOtpUrl = 'api/send-otp';
  // private _verifyOtpUrl = 'api/verify-otp';
  // private _checkOtpBack = 'api/check-otp-back';

  verified: boolean = false;

  constructor(private http: HttpClient) {}

  sendOtp(mobile: any) {
    // console.log(mobile, 'service');

    return this.http.post(this._sendOtpUrl, { mobile });
  }

  verifyOtp(data: any) {
    return this.http.post(this._verifyOtpUrl, { data });
  }

  checkForVerification() {
    return this.verified;
  }

  checkFromBack() {
    return this.http.get(this._checkOtpBack);
  }
}
