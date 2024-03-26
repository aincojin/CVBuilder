import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { TranslateModule } from "@ngx-translate/core";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { NzFormModule } from "ng-zorro-antd/form";
import { ActivatedRoute, Router } from "@angular/router";
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
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  @Input() public selectedEmployeeData: EmployeeInterface;
  @Input() public departmentData: BaseEntityInterface[];
  @Input() public specializationData: BaseEntityInterface[];
  @Input() public formInvalid: boolean;

  public baseForm: FormGroup;

  @Output() submitInfoForm: EventEmitter<EmployeeDtoInterface> =
    new EventEmitter<EmployeeDtoInterface>();

  public ngOnInit(): void {
    this.baseForm = this.fb.group({
      // firstName: ["", Validators.required],
      // lastName: ["", Validators.required],
      // email: ["", [Validators.required, Validators.email]],
      // specialization: ["", Validators.required],
      // department: ["", Validators.required],
      firstName: ["ttt", Validators.required],
      lastName: ["ttt", Validators.required],
      email: ["ttt@gmail.com", [Validators.required, Validators.email]],
      specialization: ["spec1", Validators.required],
      department: ["dept1", Validators.required],
    });
    if (this.selectedEmployeeData) {
      this.updateForm();
    }
  }
  public ngDoCheck() {
    if (this.formInvalid) {
      this.baseForm.markAllAsTouched();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedEmployeeData"] && changes["selectedEmployeeData"].currentValue) {
      if (this.baseForm) {
        this.updateForm();
      }
    }
  }

  private updateForm(): void {
    console.log(this.selectedEmployeeData);
    this.baseForm.patchValue({
      firstName: this.selectedEmployeeData.firstName,
      lastName: this.selectedEmployeeData.lastName,
      email: this.selectedEmployeeData.email,
      specialization: this.selectedEmployeeData.specialization,
      department: this.selectedEmployeeData.department,
    });
  }
}
