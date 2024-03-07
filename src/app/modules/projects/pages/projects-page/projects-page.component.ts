import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectBreadcrumbs, selectPageTitles } from "../../../../store/core/core.reducers";
import { AppState } from "../../../../store/state/state";
import { PageTitleInterface } from "../../../../shared/interfaces/page-title";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Paths } from "../../../../shared/enums/routes";
import {
  addToBreadcrumbs,
  deleteFromBreadcrumbs,
  setBreadcrumbs,
} from "../../../../store/core/core.actions";
import { BreadcrumbsInterface } from "../../../../shared/interfaces/breadcrumbs";

@UntilDestroy()
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
  private readonly store = inject(Store<AppState>);

  pageTitles$: Observable<PageTitleInterface> = this.store.select(selectPageTitles);
  breadcrumbs$: Observable<BreadcrumbsInterface[]> = this.store.select(selectBreadcrumbs);

  public ngOnInit() {
    this.store.dispatch(
      setBreadcrumbs({
        breadcrumbs: [{ label: "TITLES.PROJECT_TITLE", link: { path: Paths.Projects } }],
      }),
    );
  }

  public onBreadcrumbClick(index: number) {
    this.store.dispatch(deleteFromBreadcrumbs({ index: index }));
  }
}
