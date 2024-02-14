import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectPageTitle } from "../../../../store/core/core.reducers";
import { AppState } from "../../../../store/state/state";

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

  pageTitle$: Observable<string> = this.store.select(selectPageTitle);
}
