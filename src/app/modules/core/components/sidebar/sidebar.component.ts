import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { Observable } from "rxjs";
import { Paths } from "../../../../shared/enums/routes";
import { BreadcrumbsInterface } from "../../../../shared/interfaces/breadcrumbs";
import { setBreadcrumbs } from "../../../../store/core/core.actions";
import { selectBreadcrumbs } from "../../../../store/core/core.reducers";

@Component({
  selector: "cvgen-sidebar",
  standalone: true,
  imports: [TranslateModule, NzLayoutModule, NzIconModule, NzMenuModule, NzDividerModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  @Input() public isCollapsed: boolean;
  @Input() iconType: string = "menu-fold";
  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  breadcrumbs$: Observable<BreadcrumbsInterface[]> = this.store.select(selectBreadcrumbs);

  public ngOnInit() {}

  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  public toEmployees() {
    this.store.dispatch(
      setBreadcrumbs({
        breadcrumbs: [{ label: "TITLES.EMPLOYEE_TITLE", link: { path: Paths.Employees } }],
      }),
    );
    this.router.navigate(["/main/employees"]);
  }

  public toProjects() {
    this.store.dispatch(
      setBreadcrumbs({
        breadcrumbs: [{ label: "TITLES.PROJECTS_TITLE", link: { path: Paths.Projects } }],
      }),
    );
    this.router.navigate(["/main/projects"]);
  }
}
