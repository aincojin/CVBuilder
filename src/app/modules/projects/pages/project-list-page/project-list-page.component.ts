import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { Observable } from "rxjs";
import { AppState } from "../../../../store/state/state";
import { ActivatedRoute, Router } from "@angular/router";
import { PROJECTS_TABLE_COLUMNS } from "../../../../shared/constants/table-projects-columns.const";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectInterface } from "../../../../shared/interfaces/project";
import { Paths } from "../../../../shared/enums/routes";
import { selectIsLoading, selectProjectList } from "../../../../store/projects/projects.reducers";
import { fetchProjects } from "../../../../store/projects/projects.actions";
import { setPageTitle } from "../../../../store/core/core.actions";

@Component({
  selector: "cvgen-project-list-page",
  standalone: true,
  imports: [CommonModule, BaseTableComponent, NzButtonModule, NzSpinModule, TranslateModule],
  templateUrl: "./project-list-page.component.html",
  styleUrl: "./project-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  public projectList$: Observable<ProjectInterface[]> = this.store.select(selectProjectList);
  public isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  public columns = PROJECTS_TABLE_COLUMNS;

  public ngOnInit(): void {
    //TODO translations
    this.store.dispatch(setPageTitle({ pageTitle: "Project List" }));
    this.store.dispatch(fetchProjects());
  }

  public addProject() {
    this.router.navigate([Paths.CreateProject], { relativeTo: this.activatedRoute });
  }
  public selectProject(project: ProjectInterface) {
    this.router.navigate([Paths.EditProject, project.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
