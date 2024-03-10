import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { Observable } from "rxjs";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { EMPLOYEE_TABLE_COLUMNS } from "../../../../shared/constants/table-employees-columns.const";
import { EmployeeInterface } from "../../../../shared/interfaces/employee";
import { fetchEmployees } from "../../../../store/employees/employees.actions";
import {
  selectEmployeeList,
  selectIsLoading,
} from "../../../../store/employees/employees.reducers";
import { AppState } from "../../../../store/state/state";
import { TranslateModule } from "@ngx-translate/core";
import { Paths } from "../../../../shared/enums/routes";
import { setBreadcrumbs, setPageTitles } from "../../../../store/core/core.actions";

@Component({
  selector: "cvgen-employee-list-page",
  standalone: true,
  imports: [CommonModule, TranslateModule, BaseTableComponent, NzButtonModule, NzSpinModule],
  templateUrl: "./employee-list-page.component.html",
  styleUrl: "./employee-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  public employeeList$: Observable<EmployeeInterface[]> = this.store.select(selectEmployeeList);
  public isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  public columns = EMPLOYEE_TABLE_COLUMNS;

  ngOnInit(): void {
    this.store.dispatch(
      setPageTitles({ pageTitle: "TITLES.EMPLOYEE_TITLE", pageSubtitle: "TITLES.EMPLOYEE_LIST" }),
    );
    this.store.dispatch(
      setBreadcrumbs({
        breadcrumbs: [{ label: "TITLES.EMPLOYEE_TITLE", link: { path: Paths.Employees } }],
      }),
    );
    this.store.dispatch(fetchEmployees());
  }

  public addEmployee() {
    this.router.navigate([Paths.CreateEmployee], { relativeTo: this.activatedRoute });
  }

  public selectEmployee(employee: EmployeeInterface) {
    this.router.navigate([Paths.EditEmployee, employee.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
