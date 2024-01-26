import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";

@Component({
  selector: "cvgen-employees-page",
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule, NzPageHeaderModule, TranslateModule],
  templateUrl: "./employees-page.component.html",
  styleUrl: "./employees-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  constructor(private router: Router) {}

  public toCreate() {
    this.router.navigate(["/main/employees/create-employee"]);
  }

  public toEdit() {
    this.router.navigate(["/main/employees/edit-employee"]);
  }
  public toList() {
    this.router.navigate(["/main/employees/employee-list"]);
  }
}
