import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { Store } from "@ngrx/store";
import {
  fetchResponsibilities,
  fetchSkills,
  fetchTeamRoles,
  setPageTitle,
} from "../../../../store/core/core.actions";
import { AppState } from "../../../../store/state/state";
import { Observable } from "rxjs";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import {
  selectSkills,
  selectTeamRoles,
  selectResponsibilities,
} from "../../../../store/core/core.reducers";

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

  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);

  public ngOnInit(): void {
    this.store.dispatch(setPageTitle({ pageTitle: "Create a Project" }));
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());
  }
}
