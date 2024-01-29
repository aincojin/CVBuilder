import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { EmployeeCvFormComponent } from "../../components/employee-cv-form/employee-cv-form.component";
import { EmployeeInfoFormComponent } from "../../components/employee-info-form/employee-info-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";

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
  public employeeId: string = "";

  constructor(private route: ActivatedRoute) {
    console.log("parent route", this.route.parent);
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params["id"];
      console.log(this.employeeId);
    });
  }
}
