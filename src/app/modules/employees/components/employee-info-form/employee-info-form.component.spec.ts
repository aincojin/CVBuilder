import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoFormComponent } from './employee-info-form.component';

describe('EmployeeInfoFormComponent', () => {
  let component: EmployeeInfoFormComponent;
  let fixture: ComponentFixture<EmployeeInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
