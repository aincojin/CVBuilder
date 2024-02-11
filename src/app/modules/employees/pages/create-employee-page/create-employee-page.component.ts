import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
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
} from "../../../../store/core/core.actions";

@Component({
  selector: "cvgen-create-employee-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EmployeeInfoFormComponent,
    EmployeeCvFormComponent,
    NzTabsModule,
  ],
  templateUrl: "./create-employee-page.component.html",
  styleUrl: "./create-employee-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeePageComponent {
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
  }
}
