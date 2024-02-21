import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchProject, updateProject } from "../../../../store/projects/projects.actions";
import {
  fetchResponsibilities,
  fetchSkills,
  fetchTeamRoles,
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

  public selectedProjectData$: Observable<ProjectInterface> = this.store.select(selectProject);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);

  public projectId: number;

  public ngOnInit(): void {
    this.store.dispatch(
      setPageTitles({ pageTitle: "TITLES.PROJECT_TITLE", pageSubtitle: "TITLES.EDIT_PROJECT" }),
    );
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.projectId = params["id"];
      this.store.dispatch(fetchProject({ projectId: this.projectId }));
    });
  }

  public projectUpdated(updatedProject: ProjectDtoInterface) {
    this.store.dispatch(updateProject({ project: updatedProject, projectId: this.projectId }));
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }
}
