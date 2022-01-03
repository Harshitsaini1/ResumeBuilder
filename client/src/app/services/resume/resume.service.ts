import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  //For development

  private _resumeUrl = 'http://localhost:3000/api/resume';
  private _templateUrl = 'http://localhost:3000/api/template';

  //For production

  // private _resumeUrl = 'api/resume';
  // private _templateUrl = 'api/template';

  resumeData: any;
  constructor(private http: HttpClient) {}

  setResumeData(data: any) {
    // this.resumeData = data;
    return this.http.post(this._resumeUrl, data);
  }

  getResumeData() {
    return this.http.get(this._templateUrl);
  }
}
