import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCvFormComponent } from './employee-cv-form.component';

describe('EmployeeCvFormComponent', () => {
  let component: EmployeeCvFormComponent;
  let fixture: ComponentFixture<EmployeeCvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCvFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeCvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
