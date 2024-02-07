import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";

@Component({
  selector: "cvgen-projects-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
  ],
  templateUrl: "./projects-page.component.html",
  styleUrl: "./projects-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  constructor(private router: Router) {}
}
