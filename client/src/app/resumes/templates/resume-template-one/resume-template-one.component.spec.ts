import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTemplateOneComponent } from './resume-template-one.component';

describe('ResumeTemplateOneComponent', () => {
  let component: ResumeTemplateOneComponent;
  let fixture: ComponentFixture<ResumeTemplateOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeTemplateOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeTemplateOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
