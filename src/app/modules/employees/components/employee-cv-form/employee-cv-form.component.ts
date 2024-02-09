import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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
import { Observable } from "rxjs";
import {
  selectSpecializations,
  selectDepartments,
  selectSkills,
} from "../../../../store/shared/shared.reducers";
import {
  fetchDepartments,
  fetchSkills,
  fetchSpecializations,
} from "../../../../store/shared/shared.actions";

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
  public baseForm: FormGroup;
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);

  //TODO move it up the hierachy, implement @Input()
  public cvData = CV_DATA;
  public projectsData = PROJECT_DATA;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) {
    this.baseForm = this.fb.group({
      lastName: ["", Validators.required],
      // TODO expand email validation
      email: ["", [Validators.required, Validators.email]],
      specialization: ["", Validators.required],
      department: ["", Validators.required],
      skills: ["", Validators.required],
    });
  }
  public ngOnInit(): void {
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
  }
  public onSubmit() {
    console.log(this.baseForm.value);
  }

  public onCancel() {
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
