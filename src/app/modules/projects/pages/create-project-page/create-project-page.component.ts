import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { Store } from "@ngrx/store";
import {
  fetchResponsibilities,
  fetchSkills,
  fetchTeamRoles,
  setPageTitles,
} from "../../../../store/core/core.actions";
import { AppState } from "../../../../store/state/state";
import { Observable } from "rxjs";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectSkills,
  selectTeamRoles,
  selectResponsibilities,
} from "../../../../store/core/core.reducers";
import { ProjectDtoInterface } from "../../../../shared/interfaces/project";
import { addProject } from "../../../../store/projects/projects.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../../../shared/enums/routes";

@Component({
  selector: "cvgen-create-project-page",
  standalone: true,
  imports: [CommonModule, ProjectFormComponent],
  templateUrl: "./create-project-page.component.html",
  styleUrl: "./create-project-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);

  public ngOnInit(): void {
    this.store.dispatch(
      setPageTitles({ pageTitle: "TITLES.PROJECT_TITLE", pageSubtitle: "TITLES.CREATE_PROJECT" }),
    );
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());
  }

  public projectAdded(newProject: ProjectDtoInterface) {
    this.store.dispatch(addProject({ newProject }));
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }
}
