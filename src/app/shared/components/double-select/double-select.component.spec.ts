import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSelectComponent } from './double-select.component';

describe('DoubleSelectComponent', () => {
  let component: DoubleSelectComponent;
  let fixture: ComponentFixture<DoubleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoubleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
