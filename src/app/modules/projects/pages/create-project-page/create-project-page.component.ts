import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { Store } from "@ngrx/store";
import { setPageTitle } from "../../../../store/core/core.actions";
import { AppState } from "../../../../store/state/state";

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

  public ngOnInit(): void {
    this.store.dispatch(setPageTitle({ pageTitle: "Create a Project" }));
  }
}
