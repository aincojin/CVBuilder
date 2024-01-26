import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeePageComponent } from './edit-employee-page.component';

describe('EditEmployeePageComponent', () => {
  let component: EditEmployeePageComponent;
  let fixture: ComponentFixture<EditEmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
