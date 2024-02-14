import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PROJECT_DATA } from "../../../../shared/constants/projects.const";
import { CV_DATA } from "../../../../shared/constants/cvs.const";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { TranslateModule } from "@ngx-translate/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../../../shared/enums/routes";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { Store } from "@ngrx/store";
import { EmployeeInterface } from "../../../../shared/interfaces/employee";
import { AppState } from "../../../../store/state/state";

@Component({
  selector: "cvgen-employee-cv-form",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InputComponent,
    SelectComponent,
    ProjectFormComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzMenuModule,
    NzDividerModule,
    NzIconModule,
    NzTabsModule,
    NzCollapseModule,
  ],
  templateUrl: "./employee-cv-form.component.html",
  styleUrl: "./employee-cv-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvFormComponent {
  @Input() public employeeId: number;
  @Input() public selectedEmployeeData: EmployeeInterface;
  @Input() public departmentData: BaseEntityInterface[];
  @Input() public specializationData: BaseEntityInterface[];
  @Input() public skillData: BaseEntityInterface[];

  public baseForm: FormGroup;

  //TODO move it up the hierachy, @Input()
  public cvData = CV_DATA;
  public projectsData = PROJECT_DATA;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.baseForm = this.fb.group({
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      specialization: ["", Validators.required],
      department: ["", Validators.required],
      skills: ["", Validators.required],
    });
  }

  public onSubmit() {
    console.log(this.baseForm.value);
  }
  public addCv() {}
  public onCancel() {
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
