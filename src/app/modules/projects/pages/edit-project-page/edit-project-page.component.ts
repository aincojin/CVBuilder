import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { fetchProject } from "../../../../store/projects/projects.actions";

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
  public projectId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.projectId = params["id"];
      this.store.dispatch(fetchProject({ projectId: this.projectId }));
    });
  }
}
