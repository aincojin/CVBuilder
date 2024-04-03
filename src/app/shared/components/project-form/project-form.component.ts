import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { InputComponent } from "../input/input.component";
import { TextareaComponent } from "../textarea/textarea.component";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectDtoInterface, ProjectInterface } from "../../interfaces/project";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../enums/routes";
import { BaseEntityInterface } from "../../interfaces/base-entity";
import { MultiselectComponent } from "../multiselect/multiselect.component";
import { IsNumericValidator } from "../../validators/is-numeric";
import { NotificationsService } from "../../services/notifications.service";
import { FormMessageInterface } from "../../interfaces/notifications";
import { PROJECT_FORM_NOTIFICATIONS } from "../../constants/successMessages";

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
    MultiselectComponent,
  ],
  templateUrl: "./project-form.component.html",
  styleUrl: "./project-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationsService);

  @Input() public selectedProjectData: ProjectDtoInterface;
  @Input() public skillList: BaseEntityInterface[];
  @Input() public responsibilityList: BaseEntityInterface[];
  @Input() public teamRolesList: BaseEntityInterface[];
  @Input() public projectIndex: number;

  public projectForm: FormGroup;
  public notificationList: FormMessageInterface = PROJECT_FORM_NOTIFICATIONS;

  @Output() projectEmitter: EventEmitter<ProjectDtoInterface> =
    new EventEmitter<ProjectDtoInterface>();

  // @Output() projectUpdatedEmitter: EventEmitter<ProjectDtoInterface> =
  //   new EventEmitter<ProjectDtoInterface>();

  @Output() projectCanceled: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ["", Validators.required],
      datePicker: [null, Validators.required],
      teamSize: [null, [Validators.required, IsNumericValidator.isnumeric]],
      techStack: [null, Validators.required],
      teamRoles: [null, Validators.required],
      description: ["", Validators.required],
      responsibilities: [null, Validators.required],
    });
    console.log(this.selectedProjectData);

    if (this.selectedProjectData) {
      this.updateForm();
    }
  }
  public ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedProjectData"] && changes["selectedProjectData"].currentValue) {
      if (this.projectForm) {
        this.updateForm();
      }
    }
  }
  private updateForm(): void {
    this.projectForm.patchValue({
      projectName: this.selectedProjectData.projectName,
      datePicker: {
        startDate: new Date(this.selectedProjectData.startDate),
        endDate: new Date(this.selectedProjectData.endDate),
      },
      teamSize: this.selectedProjectData.teamSize,
      techStack: this.selectedProjectData.techStack,
      teamRoles: this.selectedProjectData.teamRoles,
      description: this.selectedProjectData.description,
      responsibilities: this.selectedProjectData.responsibilities,
    });
    console.log(this.projectForm.getRawValue());
  }
  public onSubmit() {
    const { datePicker, ...projectformModified } = this.projectForm.getRawValue();
    const newProject: ProjectDtoInterface = {
      ...projectformModified,
      startDate: datePicker ? datePicker.startDate : null,
      endDate: datePicker ? datePicker.endDate : null,
      teamSize: +this.projectForm.get("teamSize").value,
    };

    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      this.notificationService.errorMessage(this.notificationList.invalid);
      return;
    } else {
      console.log("proj form sent");
      this.projectEmitter.emit(newProject);
      // this.projectForm.reset();
    }
  }

  public onCancel() {
    this.updateForm();
    this.projectCanceled.emit();
  }
}
