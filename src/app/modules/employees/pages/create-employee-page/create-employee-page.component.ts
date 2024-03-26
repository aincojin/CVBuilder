import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, inject } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzButtonModule } from "ng-zorro-antd/button";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectDepartments,
  selectResponsibilities,
  selectSkills,
  selectSpecializations,
  selectTeamRoles,
} from "../../../../store/core/core.reducers";
import {
  addToBreadcrumbs,
  fetchDepartments,
  fetchResponsibilities,
  fetchSkills,
  fetchSpecializations,
  fetchTeamRoles,
  popFromBreadcrumbs,
  setPageTitles,
} from "../../../../store/core/core.actions";
import { addEmployee } from "../../../../store/employees/employees.actions";
import { Paths } from "../../../../shared/enums/routes";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../store/state/state";
import { CvFormInterface } from "../../../../shared/interfaces/cv";
import { addNewCv, resetNewCvs } from "../../../../store/cvs/cvs.actions";
import { selectNewCvList } from "../../../../store/cvs/cvs.reducers";
import { EmployeesService } from "../../services/employees.service";
import { fetchProjects } from "../../../../store/projects/projects.actions";
import { ProjectInterface } from "../../../../shared/interfaces/project";
import { selectProjectList } from "../../../../store/projects/projects.reducers";

@Component({
  selector: "cvgen-create-employee-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EmployeeInfoFormComponent,
    EmployeeCvFormComponent,
    NzTabsModule,
    NzButtonModule,
  ],
  templateUrl: "./create-employee-page.component.html",
  styleUrl: "./create-employee-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeePageComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);
  private readonly employeesService = inject(EmployeesService);

  public cvData$: Observable<CvFormInterface[]> = this.store.select(selectNewCvList);
  public projectData$: Observable<ProjectInterface[]> = this.store.select(selectProjectList);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);

  @ViewChild(EmployeeInfoFormComponent, { static: true })
  employeeInfoForm: EmployeeInfoFormComponent;

  public formInvalid: boolean = false;
  public cvFormValid: boolean = false;

  public ngOnInit(): void {
    this.store.dispatch(fetchProjects());
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());

    this.store.dispatch(
      setPageTitles({ pageTitle: "TITLES.EMPLOYEE_TITLE", pageSubtitle: "TITLES.CREATE_EMPLOYEE" }),
    );
    this.store.dispatch(
      addToBreadcrumbs({
        breadcrumb: { label: "TITLES.CREATE_EMPLOYEE", link: { path: Paths.CreateEmployee } },
      }),
    );
  }

  public cvAdded(cvFormData: CvFormInterface) {
    this.store.dispatch(addNewCv({ newCv: cvFormData }));
    console.log("create page cv added: ", this.employeeInfoForm.baseForm.getRawValue());
  }

  public onSubmit() {
    if (this.employeeInfoForm.baseForm.invalid) {
      this.formInvalid = true;
      console.log("formInvalid: ", this.formInvalid);
      console.log("empl info form not sent");
      return;
    } else {
      this.formInvalid = false;
      console.log("empl info form sent");
      const newEmployee = this.employeeInfoForm.baseForm.getRawValue();
      this.store.dispatch(addEmployee({ newEmployee }));
      console.log("adding employee: ", newEmployee);
      this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
    }
  }

  public onCancel() {
    this.store.dispatch(resetNewCvs());
    this.store.dispatch(popFromBreadcrumbs());
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
