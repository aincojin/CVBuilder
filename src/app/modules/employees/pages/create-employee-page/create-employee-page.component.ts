import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzButtonModule } from "ng-zorro-antd/button";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription, filter, map, switchMap, tap } from "rxjs";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectDepartments,
  selectSkills,
  selectSpecializations,
} from "../../../../store/core/core.reducers";
import {
  addToBreadcrumbs,
  fetchDepartments,
  fetchSkills,
  fetchSpecializations,
  setPageTitles,
} from "../../../../store/core/core.actions";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { addEmployee } from "../../../../store/employees/employees.actions";
import { Paths } from "../../../../shared/enums/routes";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../store/state/state";
import { CvDtoInterface, CvFormInterface } from "../../../../shared/interfaces/cv";
import { addCv, addNewCv } from "../../../../store/cvs/cvs.actions";
import { selectNewCvList } from "../../../../store/cvs/cvs.reducers";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { selectResponseData } from "../../../../store/employees/employees.reducers";

@UntilDestroy()
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
  private responseDataSubscription: Subscription;

  //TODO
  public cvData$: Observable<CvFormInterface[]> = this.store.select(selectNewCvList);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);
  public responseData$: Observable<EmployeeInterface> = this.store.select(selectResponseData);

  @ViewChild(EmployeeInfoFormComponent, { static: true })
  employeeInfoForm: EmployeeInfoFormComponent;

  public ngOnInit(): void {
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
    this.store.dispatch(
      setPageTitles({ pageTitle: "TITLES.EMPLOYEE_TITLE", pageSubtitle: "TITLES.CREATE_EMPLOYEE" }),
    );
  }

  public addNewEmployee(newEmployee: EmployeeDtoInterface) {
    // console.log("create");
    // console.log(newEmployee);
    // this.store.dispatch(addEmployee({ newEmployee }));
    // this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }

  public cvAdded(cvFormData: CvFormInterface) {
    // console.log(cvFormData);
    this.store.dispatch(addNewCv({ newCv: cvFormData }));
  }

  public onSubmit() {
    const newEmployee = this.employeeInfoForm.baseForm.getRawValue();
    console.log("adding employee: ", newEmployee);
    this.store.dispatch(addEmployee({ newEmployee }));
    this.responseData$
      .pipe(
        untilDestroyed(this),
        filter(responseData => responseData !== null),
        switchMap(responseData =>
          this.cvData$.pipe(
            map(cvList => {
              console.log("response data: ", responseData);
              filter(cvList => cvList !== null), console.log("before modif: ", cvList);
              // Modify each CV by creating a new object with employeeId from responseData
              return cvList.map(cv => ({
                ...cv,
                employeeId: responseData.id,
              }));
            }),
            // Dispatch each modified CV
            tap(modifiedCvList => {
              console.log("Modified CVs:", modifiedCvList);
              modifiedCvList.forEach(modifiedCv => {
                console.log("Dispatching modified CV:", modifiedCv);
                this.store.dispatch(addCv({ cv: modifiedCv }));
              });
            }),
          ),
        ),
      )
      .subscribe();
    // this.cvData$.pipe(untilDestroyed(this)).subscribe(cvList => {
    //   return cvList.map(cv => ({
    //     ...cv,
    //     id: "id",
    //   }));
    // });
  }
}
