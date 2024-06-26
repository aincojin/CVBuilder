import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { Observable, skip } from "rxjs";
import { Paths } from "../../../../shared/enums/routes";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { CvFormInterface, CvInterface } from "../../../../shared/interfaces/cv";
import { EmployeeInterface } from "../../../../shared/interfaces/employee";
import { ProjectInterface } from "../../../../shared/interfaces/project";
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
import {
  selectDepartments,
  selectResponsibilities,
  selectSkills,
  selectSpecializations,
  selectTeamRoles,
} from "../../../../store/core/core.reducers";
import { addNewCv, fetchCvs, resetNewCvs } from "../../../../store/cvs/cvs.actions";
import { selectCvList, selectNewCvList } from "../../../../store/cvs/cvs.reducers";
import { fetchEmployee, updateEmployee } from "../../../../store/employees/employees.actions";
import { selectEmployee } from "../../../../store/employees/employees.reducers";
import { fetchProjects } from "../../../../store/projects/projects.actions";
import { selectProjectList } from "../../../../store/projects/projects.reducers";
import { AppState } from "../../../../store/state/state";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { EmployeesService } from "../../services/employees.service";
import { NotificationsService } from "../../../../shared/services/notifications.service";
import { EMPLOYEE_FORM_NOTIFICATIONS } from "../../../../shared/constants/successMessages";

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
  private readonly notificationService = inject(NotificationsService);

  public employeeId: number;
  public infoFormInvalid: boolean = false;
  public messageList = EMPLOYEE_FORM_NOTIFICATIONS;
  // public cvData: CvFormInterface[] = [];

  public cvData$: Observable<CvFormInterface[]> = this.store.select(selectNewCvList);
  public selectedEmployee$: Observable<EmployeeInterface> = this.store.select(selectEmployee);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);
  public projectData$: Observable<ProjectInterface[]> = this.store.select(selectProjectList);
  public allCvs$: Observable<CvInterface[]> = this.store.select(selectCvList);

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
      this.getCvsById();
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
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());
    this.store.dispatch(fetchProjects());
  }

  private getCvsById(): void {
    console.log("outside");
    this.store.dispatch(resetNewCvs());
    this.allCvs$.pipe(untilDestroyed(this), skip(1)).subscribe((cvList: CvInterface[]) => {
      this.employeesService.getCvsByEmployeeId(cvList, this.employeeId);
    });
  }

  // public updateExisting(updatedEmployee: EmployeeDtoInterface) {
  //   this.store.dispatch(updateEmployee({ employeeId: this.employeeId, employee: updatedEmployee }));
  //   this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  // }

  public cvAdded(cvFormData: CvFormInterface) {
    this.store.dispatch(addNewCv({ newCv: cvFormData }));
    console.log("edit page cv added: ", this.employeeInfoForm.baseForm.getRawValue());
  }

  public onSubmit() {
    if (this.employeeInfoForm.baseForm.invalid) {
      this.infoFormInvalid = true;
      this.notificationService.errorMessage(this.messageList.invalid);
      return;
    } else {
      this.infoFormInvalid = false;
      console.log("empl info form sent");
      const updatedEmployee = this.employeeInfoForm.baseForm.getRawValue();
      this.store.dispatch(
        updateEmployee({ employee: updatedEmployee, employeeId: this.employeeId }),
      );
      console.log("updated employee: ", updatedEmployee);
      this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
    }
  }
  public onCancel() {
    this.store.dispatch(resetNewCvs());
    this.store.dispatch(popFromBreadcrumbs());
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
