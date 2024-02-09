import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectDepartments,
  selectSkills,
  selectSpecializations,
} from "../../../../store/shared/shared.reducers";
import {
  fetchDepartments,
  fetchSkills,
  fetchSpecializations,
} from "../../../../store/shared/shared.actions";

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
export class CreateEmployeePageComponent {}
