import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { NzButtonModule } from "ng-zorro-antd/button";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { TABLE_COLUMNS } from "../../../../shared/constants/table-columns.const";
import { selectEmployeeList } from "../../../../store/employees/employees.reducers";
import { fetchEmployees } from "../../../../store/employees/employees.actions";
import { Observable } from "rxjs";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";

@Component({
  selector: "cvgen-project-list-page",
  standalone: true,
  imports: [CommonModule, BaseTableComponent, NzButtonModule],
  templateUrl: "./project-list-page.component.html",
  styleUrl: "./project-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent implements OnInit {
  constructor(private store: Store) {}

  public employeeList$: Observable<EmployeeInterface[]> = this.store.select(selectEmployeeList);

  public columns = TABLE_COLUMNS;
  public data = null;

  ngOnInit(): void {
    this.store.dispatch(fetchEmployees());
  }
}
