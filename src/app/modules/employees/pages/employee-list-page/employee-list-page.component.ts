import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { Observable } from "rxjs";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { EMPLOYEE_TABLE_COLUMNS } from "../../../../shared/constants/table-employees-columns.const";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { fetchEmployees } from "../../../../store/employees/employees.actions";
import { selectEmployeeList } from "../../../../store/employees/employees.reducers";
import { AppState } from "../../../../store/state/state";
import { TranslateModule } from "@ngx-translate/core";
import { Paths } from "../../../../shared/enums/routes";

@Component({
  selector: "cvgen-employee-list-page",
  standalone: true,
  imports: [CommonModule, TranslateModule, BaseTableComponent, NzButtonModule],
  templateUrl: "./employee-list-page.component.html",
  styleUrl: "./employee-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListPageComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  public employeeList$: Observable<EmployeeInterface[]> = this.store.select(selectEmployeeList);
  public columns = EMPLOYEE_TABLE_COLUMNS;

  ngOnInit(): void {
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
