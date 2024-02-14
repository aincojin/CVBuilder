import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from "@angular/core";
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
  selectSkills,
  selectSpecializations,
} from "../../../../store/core/core.reducers";
import {
  fetchDepartments,
  fetchSkills,
  fetchSpecializations,
  setPageTitle,
} from "../../../../store/core/core.actions";
import { EmployeeDtoInterface } from "../../../../shared/interfaces/employee";
import { addEmployee } from "../../../../store/employees/employees.actions";
import { Paths } from "../../../../shared/enums/routes";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "../../../../store/state/state";

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

  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);

  public ngOnInit(): void {
    this.store.dispatch(setPageTitle({ pageTitle: "Create an Employee" }));
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
  }

  public addNewEmployee(newEmployee: EmployeeDtoInterface) {
    console.log("create");
    console.log(newEmployee);
    this.store.dispatch(addEmployee({ newEmployee }));
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
