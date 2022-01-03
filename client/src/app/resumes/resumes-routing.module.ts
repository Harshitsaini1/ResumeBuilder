import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumesComponent } from './resumes.component';

import { ViewAllTemplatesComponent } from './view-all-templates/view-all-templates.component';
import { ResumeTemplateComponent } from './templates/resume-template/resume-template.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumeTemplateOneComponent } from './templates/resume-template-one/resume-template-one.component';

import { AuthGuard } from './../services/auth/auth.guard';
import { VerifyGuard } from '../services/auth/verify.guard';

const routes: Routes = [
  {
    path: '',
    component: ResumesComponent,
    children: [
      {
        path: 'resume',
        component: ResumeFormComponent,
        canActivate: [AuthGuard, VerifyGuard],
      },
      {
        path: 'template',
        component: ViewAllTemplatesComponent,
        canActivate: [AuthGuard, VerifyGuard],
      },
      {
        path: 'template-one',
        component: ResumeTemplateComponent,
        canActivate: [AuthGuard, VerifyGuard],
      },
      {
        path: 'template-two',
        component: ResumeTemplateOneComponent,
        canActivate: [AuthGuard, VerifyGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumesRoutingModule {}
