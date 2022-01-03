import { Router } from '@angular/router';
import { ResumeService } from './../../services/resume/resume.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css'],
})
export class ResumeFormComponent implements OnInit {
  resumeForm = new FormGroup({
    fullname: new FormControl(''),
    position: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    skills: new FormControl(''),
    profile: new FormControl(''),
    linkedin: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    languages: new FormControl(''),
    objective: new FormControl(''),
    experience: new FormArray([new FormControl('')]),
    project: new FormArray([new FormControl('')]),
    certification: new FormArray([new FormControl('')]),
    education: new FormArray([new FormControl('')]),
  });

  constructor(private _resumeService: ResumeService, private _router: Router) {}

  ngOnInit(): void {
    this._resumeService.getResumeData().subscribe(
      (res: any) => {
        const exp = res?.experience;
        for (let i = 0; i < exp?.length - 1; i++) {
          this.onAddExperience();
        }

        const pro = res?.project;
        for (let i = 0; i < pro?.length - 1; i++) {
          this.onAddProject();
        }

        const cer = res?.certification;
        for (let i = 0; i < cer?.length - 1; i++) {
          this.onAddCertifiction();
        }

        const edu = res?.education;
        for (let i = 0; i < edu?.length - 1; i++) {
          this.onAddEducation();
        }

        this.resumeForm.patchValue({
          fullname: res?.fullname,
          position: res?.position,
          email: res?.email,
          mobile: res?.mobile,
          address: res?.address,
          skills: res?.skills,
          profile: res?.profile,
          linkedin: res?.linkedin,
          facebook: res?.facebook,
          instagram: res?.instagram,
          languages: res?.languages,
          objective: res?.objective,
          experience: res?.experience,
          project: res?.project,
          certification: res?.certification,
          education: res?.education,
        });
      },
      (err) => console.error(err)
    );
  }

  get experienceControls() {
    return (<FormArray>this.resumeForm.get('experience')).controls;
  }

  get projectControls() {
    return (<FormArray>this.resumeForm.get('project')).controls;
  }

  get certificationControls() {
    return (<FormArray>this.resumeForm.get('certification')).controls;
  }

  get educationControls() {
    return (<FormArray>this.resumeForm.get('education')).controls;
  }

  onAddExperience() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('experience')).push(control);
  }

  onAddProject() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('project')).push(control);
  }

  onAddCertifiction() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('certification')).push(control);
  }

  onAddEducation() {
    const control = new FormControl('');
    (<FormArray>this.resumeForm.get('education')).push(control);
  }

  onRemoveExperience() {
    (<FormArray>this.resumeForm.get('experience')).removeAt(
      this.experienceControls.length - 1
    );
  }

  onRemoveProject() {
    (<FormArray>this.resumeForm.get('project')).removeAt(
      this.projectControls.length - 1
    );
  }

  onRemoveCertification() {
    (<FormArray>this.resumeForm.get('certification')).removeAt(
      this.certificationControls.length - 1
    );
  }

  onRemoveEducation() {
    (<FormArray>this.resumeForm.get('education')).removeAt(
      this.educationControls.length - 1
    );
  }

  generateResume() {
    // console.log(this.resumeForm.value);
    this._resumeService.setResumeData(this.resumeForm.value).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['resumes/template']);
      },
      (err) => console.error(err)
    );
  }
}
