import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
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
  fetchDepartments,
  fetchSkills,
  fetchSpecializations,
  setPageTitle,
} from "../../../../store/core/core.actions";
import { Paths } from "../../../../shared/enums/routes";
import { AppState } from "../../../../store/state/state";

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

  public employeeId: number;

  public selectedEmployee$: Observable<EmployeeInterface> = this.store.select(selectEmployee);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.employeeId = params["id"];
      this.store.dispatch(fetchEmployee({ employeeId: this.employeeId }));
    });
    this.store.dispatch(setPageTitle({ pageTitle: `Edit Employees Profile` }));
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
  }

  public updateExisting(updatedEmployee: EmployeeDtoInterface) {
    console.log("update dispatch");
    console.log(updatedEmployee);
    this.store.dispatch(updateEmployee({ employeeId: this.employeeId, employee: updatedEmployee }));
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
