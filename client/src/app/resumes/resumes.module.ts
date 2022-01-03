import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumesRoutingModule } from './resumes-routing.module';
import { ResumesComponent } from './resumes.component';

import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumeTemplateComponent } from './templates/resume-template/resume-template.component';
import { ResumeTemplateOneComponent } from './templates/resume-template-one/resume-template-one.component';
import { ViewAllTemplatesComponent } from './view-all-templates/view-all-templates.component';

@NgModule({
  declarations: [
    ResumesComponent,
    ResumeFormComponent,
    ResumeTemplateComponent,
    ResumeTemplateOneComponent,
    ViewAllTemplatesComponent,
  ],
  imports: [CommonModule, ResumesRoutingModule, ReactiveFormsModule],
})
export class ResumesModule {}
