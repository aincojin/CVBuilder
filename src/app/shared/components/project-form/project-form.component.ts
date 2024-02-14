import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { InputComponent } from "../input/input.component";
import { TextareaComponent } from "../textarea/textarea.component";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectDtoInterface } from "../../interfaces/project";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../enums/routes";
import { SelectComponent } from "../select/select.component";
import { BaseEntityInterface } from "../../interfaces/base-entity";

@Component({
  selector: "cvgen-project-form",
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    DatePickerComponent,
    TextareaComponent,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    TranslateModule,
    SelectComponent,
  ],
  templateUrl: "./project-form.component.html",
  styleUrl: "./project-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  @Input() public skillList: BaseEntityInterface[];
  @Input() public responsibilityList: BaseEntityInterface[];
  @Input() public teamRolesList: BaseEntityInterface[];

  public projectForm: FormGroup;

  @Output() projectAddedEmitter: EventEmitter<ProjectDtoInterface> =
    new EventEmitter<ProjectDtoInterface>();

  @Output() projectUpdatedEmitter: EventEmitter<ProjectDtoInterface> =
    new EventEmitter<ProjectDtoInterface>();

  constructor() {
    this.projectForm = this.fb.group({
      projectName: ["", Validators.required],
      datePicker: [null, Validators.required],
      teamSize: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      techStack: [null, Validators.required],
      teamRoles: [null, Validators.required],
      description: ["", Validators.required],
      responsibilities: [null, Validators.required],
    });
  }

  public onSubmit() {
    const { datePicker, ...projectformModified } = this.projectForm.getRawValue();
    const newProject: ProjectDtoInterface = {
      ...projectformModified,
      startDate: datePicker[0],
      endDate: datePicker[1],
      teamSize: +this.projectForm.get("teamSize").value,
    };

    this.projectAddedEmitter.emit(newProject);
    this.projectUpdatedEmitter.emit(newProject);
    this.projectForm.reset();

    if (this.projectForm.touched && this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
  }

  public onCancel() {
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }
}
