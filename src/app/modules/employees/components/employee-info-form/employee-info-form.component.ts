import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { EmployeesApiService } from "../../../../shared/services/api/employees.api.service";
import { BaseFormCvaComponent } from "../base-form-cva/base-form-cva.component";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { TranslateModule } from "@ngx-translate/core";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { Store } from "@ngrx/store";
import { EmployeeStateInterface } from "../../../../store/state/employeeState";
import { addEmployee, addEmployeeSuccess } from "../../../../store/employees/employees.actions";
import { AppState } from "../../../../store/state/state";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "cvgen-employee-info-form",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzGridModule,
    InputComponent,
  ],
  templateUrl: "./employee-info-form.component.html",
  styleUrl: "./employee-info-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoFormComponent extends BaseFormCvaComponent {
  constructor(
    fb: FormBuilder,
    private employeeApiService: EmployeesApiService,
    private store: Store<AppState>,
  ) {
    super(fb);
    this.baseForm.addControl("firstName", fb.control("", Validators.required));
  }

  public override onSubmit(): void {
    const newEmployee: EmployeeDtoInterface = this.baseForm.getRawValue();
    console.log(newEmployee);

    this.store.dispatch(addEmployee({ newEmployee }));

    // this.baseForm.reset();
  }
}
