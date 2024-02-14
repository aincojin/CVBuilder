import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchProject } from "../../../../store/projects/projects.actions";
import { setPageTitle } from "../../../../store/core/core.actions";
import { AppState } from "../../../../store/state/state";

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

  public projectId: number;

  public ngOnInit(): void {
    this.store.dispatch(setPageTitle({ pageTitle: "Edit a Project" }));
    this.activatedRoute.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.projectId = params["id"];
      this.store.dispatch(fetchProject({ projectId: this.projectId }));
    });
  }
}
