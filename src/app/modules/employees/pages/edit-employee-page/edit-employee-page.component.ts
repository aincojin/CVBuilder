import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzButtonModule } from "ng-zorro-antd/button";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchEmployee, updateEmployee } from "../../../../store/employees/employees.actions";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { Observable } from "rxjs";
import { selectEmployee } from "../../../../store/employees/employees.reducers";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectSpecializations,
  selectDepartments,
  selectSkills,
} from "../../../../store/core/core.reducers";
import {
  addToBreadcrumbs,
  deleteFromBreadcrumbs,
  fetchDepartments,
  fetchSkills,
  fetchSpecializations,
  setPageTitles,
} from "../../../../store/core/core.actions";
import { Paths } from "../../../../shared/enums/routes";
import { AppState } from "../../../../store/state/state";
import { EmployeesService } from "../../services/employees.service";
import { CvFormInterface } from "../../../../shared/interfaces/cv";
import { addNewCv, fetchCvs, resetNewCvs } from "../../../../store/cvs/cvs.actions";
import { selectNewCvList } from "../../../../store/cvs/cvs.reducers";
import { ProjectInterface } from "../../../../shared/interfaces/project";
import { selectProjectList } from "../../../../store/projects/projects.reducers";
import { fetchProjects } from "../../../../store/projects/projects.actions";

@UntilDestroy()
@Component({
  selector: "cvgen-edit-employee-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EmployeeInfoFormComponent,
    EmployeeCvFormComponent,
    NzTabsModule,
    NzButtonModule,
  ],
  templateUrl: "./edit-employee-page.component.html",
  styleUrl: "./edit-employee-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeePageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);
  private readonly employeesService = inject(EmployeesService);

  public employeeId: number;
  public infoFormInvalid: boolean = false;
  // public cvData: CvFormInterface[] = [];

  public cvData$: Observable<CvFormInterface[]> = this.store.select(selectNewCvList);
  public selectedEmployee$: Observable<EmployeeInterface> = this.store.select(selectEmployee);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);
  public projectData$: Observable<ProjectInterface[]> = this.store.select(selectProjectList);

  @ViewChild(EmployeeInfoFormComponent, { static: true })
  employeeInfoForm: EmployeeInfoFormComponent;

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.employeeId = params["id"];
      this.store.dispatch(fetchEmployee({ employeeId: this.employeeId }));
      this.store.dispatch(
        addToBreadcrumbs({
          breadcrumb: {
            label: "TITLES.EDIT_EMPLOYEE",
            link: { path: `${Paths.EditEmployee}/${this.employeeId}`, id: this.employeeId },
          },
        }),
      );
    });
    this.store.dispatch(
      setPageTitles({
        pageTitle: "TITLES.EMPLOYEE_TITLE",
        pageSubtitle: "TITLES.EDIT_EMPLOYEE",
      }),
    ),
      this.store.dispatch(fetchCvs());
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
    this.store.dispatch(fetchProjects());
    this.getCvsById();
  }

  private getCvsById() {
    //TODO is called twice for some reason
    this.employeesService
      .getCvsByEmployeeId(this.employeeId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public updateExisting(updatedEmployee: EmployeeDtoInterface) {
    this.store.dispatch(updateEmployee({ employeeId: this.employeeId, employee: updatedEmployee }));
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }

  public cvAdded(cvFormData: CvFormInterface) {
    this.store.dispatch(addNewCv({ newCv: cvFormData }));
    console.log("edit page cv added: ", this.employeeInfoForm.baseForm.getRawValue());
  }

  public onSubmit() {
    if (this.employeeInfoForm.baseForm.invalid) {
      this.infoFormInvalid = true;
      console.log("empl info form not sent");
      return;
    } else {
      this.infoFormInvalid = false;
      console.log("empl info form sent");
      const updatedEmployee = this.employeeInfoForm.baseForm.getRawValue();
      this.store.dispatch(
        updateEmployee({ employee: updatedEmployee, employeeId: this.employeeId }),
      );
      console.log("updated employee: ", updatedEmployee);
    }
  }
  public onCancel() {
    this.store.dispatch(resetNewCvs());
    this.store.dispatch(deleteFromBreadcrumbs({ index: -2 }));
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
