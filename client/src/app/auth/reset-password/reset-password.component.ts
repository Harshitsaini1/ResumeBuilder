import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  id: String | null | undefined;
  token: String | null | undefined;
  constructor(
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  resetPassword(data: any) {
    data['id'] = this.id;
    data['token'] = this.token;
    this._authService.resetPassword(data).subscribe(
      (res) => {
        alert('Password Changed...');
        this._router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
