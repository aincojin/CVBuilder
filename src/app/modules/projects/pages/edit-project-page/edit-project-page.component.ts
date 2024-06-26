import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchProject, updateProject } from "../../../../store/projects/projects.actions";
import {
  addToBreadcrumbs,
  deleteFromBreadcrumbs,
  fetchResponsibilities,
  fetchSkills,
  fetchTeamRoles,
  popFromBreadcrumbs,
  setPageTitles,
} from "../../../../store/core/core.actions";
import { AppState } from "../../../../store/state/state";
import { ProjectDtoInterface, ProjectInterface } from "../../../../shared/interfaces/project";
import { Paths } from "../../../../shared/enums/routes";
import { Observable } from "rxjs";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectSkills,
  selectTeamRoles,
  selectResponsibilities,
} from "../../../../store/core/core.reducers";
import { selectProject } from "../../../../store/projects/projects.reducers";
import { ProjectsService } from "../../services/projects.service";

@UntilDestroy()
@Component({
  selector: "cvgen-edit-project-page",
  standalone: true,
  imports: [CommonModule, ProjectFormComponent],
  templateUrl: "./edit-project-page.component.html",
  styleUrl: "./edit-project-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectsService);

  public selectedProjectData$: Observable<ProjectInterface> = this.store.select(selectProject);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);

  public projectId: number;
  public projectDataTransformed$: Observable<ProjectDtoInterface>;

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.projectId = params["id"];
      this.store.dispatch(fetchProject({ projectId: this.projectId }));
      this.store.dispatch(
        addToBreadcrumbs({
          breadcrumb: {
            label: "TITLES.EDIT_PROJECT",
            link: { path: `${Paths.EditProject}/${this.projectId}`, id: this.projectId },
          },
        }),
      );
    });
    this.store.dispatch(
      setPageTitles({ pageTitle: "TITLES.PROJECT_TITLE", pageSubtitle: "TITLES.EDIT_PROJECT" }),
    );
    this.projectDataTransformed$ = this.projectService.fromProjectToDto(this.selectedProjectData$);
  }

  public projectUpdated(updatedProject: ProjectDtoInterface) {
    this.store.dispatch(updateProject({ project: updatedProject, projectId: this.projectId }));
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }

  public onCancel() {
    this.store.dispatch(popFromBreadcrumbs());
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }
}
