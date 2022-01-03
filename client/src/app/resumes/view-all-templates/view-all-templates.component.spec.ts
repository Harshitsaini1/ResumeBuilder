import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTemplatesComponent } from './view-all-templates.component';

describe('ViewAllTemplatesComponent', () => {
  let component: ViewAllTemplatesComponent;
  let fixture: ComponentFixture<ViewAllTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
