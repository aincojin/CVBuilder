import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchEmployee } from "../../../../store/employees/employees.actions";
import { EmployeeInterface } from "../../../../shared/interfaces/employee";
import { Observable } from "rxjs";
import { selectEmployee } from "../../../../store/employees/employees.reducers";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { selectSpecializations, selectDepartments } from "../../../../store/shared/shared.reducers";
import { fetchDepartments, fetchSpecializations } from "../../../../store/shared/shared.actions";

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
  ],
  templateUrl: "./edit-employee-page.component.html",
  styleUrl: "./edit-employee-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeePageComponent implements OnInit {
  public employeeId: number;
  public selectedEmployee$: Observable<EmployeeInterface> = this.store.select(selectEmployee);

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.employeeId = params["id"];
      this.store.dispatch(fetchEmployee({ employeeId: this.employeeId }));
    });
  }
}
