import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { Store } from "@ngrx/store";
import { setPageTitle } from "../../../../store/core/core.actions";
import { Observable } from "rxjs";
import { selectPageTitle } from "../../../../store/core/core.reducers";
import { AppState } from "../../../../store/state/state";

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

  pageTitle$: Observable<string> = this.store.select(selectPageTitle);
  public ngOnInit() {}
}
