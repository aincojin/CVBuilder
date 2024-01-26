import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";

@Component({
  selector: "cvgen-edit-project-page",
  standalone: true,
  imports: [CommonModule, ProjectFormComponent],
  templateUrl: "./edit-project-page.component.html",
  styleUrl: "./edit-project-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectPageComponent {}
