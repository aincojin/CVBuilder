import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { TranslateModule } from "@ngx-translate/core";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { Store } from "@ngrx/store";
import { NzFormModule } from "ng-zorro-antd/form";
import { addEmployee, updateEmployee } from "../../../../store/employees/employees.actions";
import { AppState } from "../../../../store/state/state";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../../../shared/enums/routes";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { SelectComponent } from "../../../../shared/components/select/select.component";

@Component({
  selector: "cvgen-employee-info-form",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    InputComponent,
    SelectComponent,
  ],
  templateUrl: "./employee-info-form.component.html",
  styleUrl: "./employee-info-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoFormComponent {
  @Input() public employeeId: number;
  @Input() public selectedEmployeeData: EmployeeInterface;
  @Input() public departmentData: BaseEntityInterface[];
  @Input() public specializationData: BaseEntityInterface[];

  @Output() submitInfoForm: EventEmitter<EmployeeDtoInterface> =
    new EventEmitter<EmployeeDtoInterface>();

  @Output() updateInfoForm: EventEmitter<[EmployeeDtoInterface, number]> = new EventEmitter<
    [EmployeeDtoInterface, number]
  >();

  public baseForm: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  ngOnInit(): void {
    this.baseForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      specialization: ["", Validators.required],
      department: ["", Validators.required],
    });
  }

  public onSubmit(): void {
    const { department, specialization, ...employeeModified } = this.baseForm.getRawValue();
    const newEmployee: EmployeeDtoInterface = {
      ...employeeModified,
      department: department.toString(),
      specialization: specialization.toString(),
    };
    // console.log(newEmployee);

    if (this.employeeId) {
      this.submitInfoForm.emit(newEmployee);
    } else {
      this.submitInfoForm.emit(newEmployee);
    }
    this.baseForm.reset();
    // this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }

  public onCancel() {
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
