import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormCvaComponent } from './base-form-cva.component';

describe('BaseFormCvaComponent', () => {
  let component: BaseFormCvaComponent;
  let fixture: ComponentFixture<BaseFormCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormCvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseFormCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
