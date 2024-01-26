import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";

@Component({
  selector: "cvgen-create-project-page",
  standalone: true,
  imports: [CommonModule, ProjectFormComponent],
  templateUrl: "./create-project-page.component.html",
  styleUrl: "./create-project-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectPageComponent {}
