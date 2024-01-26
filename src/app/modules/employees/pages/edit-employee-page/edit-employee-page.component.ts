import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";

@Component({
  selector: "cvgen-edit-employee-page",
  standalone: true,
  imports: [CommonModule, EmployeeInfoFormComponent, EmployeeCvFormComponent, NzTabsModule],
  templateUrl: "./edit-employee-page.component.html",
  styleUrl: "./edit-employee-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeePageComponent {}
