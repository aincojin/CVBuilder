import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { NzButtonModule } from "ng-zorro-antd/button";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { Observable } from "rxjs";
import { AppState } from "../../../../store/state/state";
import { ActivatedRoute, Router } from "@angular/router";
import { PROJECTS_TABLE_COLUMNS } from "../../../../shared/constants/table-projects-columns.const";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectInterface } from "../../../../shared/interfaces/project";
import { Paths } from "../../../../shared/enums/routes";
import { selectProjectList } from "../../../../store/projects/projects.reducers";
import { fetchProjects } from "../../../../store/projects/projects.actions";

@Component({
  selector: "cvgen-project-list-page",
  standalone: true,
  imports: [CommonModule, BaseTableComponent, NzButtonModule, TranslateModule],
  templateUrl: "./project-list-page.component.html",
  styleUrl: "./project-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListPageComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  public projectList$: Observable<ProjectInterface[]> = this.store.select(selectProjectList);
  public columns = PROJECTS_TABLE_COLUMNS;

  public ngOnInit(): void {
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
