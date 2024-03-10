import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectBreadcrumbs, selectPageTitles } from "../../../../store/core/core.reducers";
import { AppState } from "../../../../store/state/state";
import { PageTitleInterface } from "../../../../shared/interfaces/page-title";
import {
  addToBreadcrumbs,
  deleteFromBreadcrumbs,
  fetchDepartments,
  fetchResponsibilities,
  fetchSkills,
  fetchSpecializations,
  fetchTeamRoles,
  setBreadcrumbs,
} from "../../../../store/core/core.actions";
import { BreadcrumbsInterface } from "../../../../shared/interfaces/breadcrumbs";
import { Paths } from "../../../../shared/enums/routes";
import { resetNewCvs } from "../../../../store/cvs/cvs.actions";
import { fetchProjects } from "../../../../store/projects/projects.actions";

@Component({
  selector: "cvgen-employees-page",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    TranslateModule,
  ],
  templateUrl: "./employees-page.component.html",
  styleUrl: "./employees-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  private readonly store = inject(Store<AppState>);

  pageTitleS$: Observable<PageTitleInterface> = this.store.select(selectPageTitles);
  breadcrumbs$: Observable<BreadcrumbsInterface[]> = this.store.select(selectBreadcrumbs);

  public ngOnInit() {
    this.store.dispatch(fetchProjects());
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchSpecializations());
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());
  }
  public onBreadcrumbClick(index: number) {
    this.store.dispatch(resetNewCvs());
    this.store.dispatch(deleteFromBreadcrumbs({ index: index }));
  }
}
