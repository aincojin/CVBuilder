import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Self } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { InputComponent } from "../input/input.component";
import { TextareaComponent } from "../textarea/textarea.component";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectDtoInterface } from "../../interfaces/project";
import { Store } from "@ngrx/store";
import { addProject } from "../../../store/projects/projects.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../enums/routes";
import { AppState } from "../../../store/state/state";
import { TECH_STACK_OPTIONS } from "../../constants/techStack.const";
import { ROLES_OPTIONS } from "../../constants/roles.const";
import { SelectComponent } from "../select/select.component";
import { RESPONSIBILITY_OPTIONS } from "../../constants/responsibilities.const";
import { isNumber } from "util";

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
  public projectForm: FormGroup;
  public techStackOptions = TECH_STACK_OPTIONS;
  public rolesOptions = ROLES_OPTIONS;
  public responsibilityOptions = RESPONSIBILITY_OPTIONS;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.projectForm = this.fb.group({
      projectName: ["test", Validators.required],
      // datePicker: this.fb.group({
      //   startDate: [null, Validators.required],
      //   endDate: [null, Validators.required],
      // }),
      datePicker: [null, Validators.required],
      teamSize: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      techStack: [null, Validators.required],
      teamRoles: [null, Validators.required],
      description: ["qwer", Validators.required],
      responsibilities: [null, Validators.required],
    });
  }

  //TODO change to formArray maybe?...
  // private createFormGroup(): FormGroup {
  //   return this.fb.group({
  //     teamSize: [null, Validators.required],
  //     techStack: [null, Validators.required],
  //     teamRoles: [null, Validators.required],
  //   });
  // }

  public onSubmit() {
    const { datePicker, ...projectformModified } = this.projectForm.getRawValue();
    const newProject: ProjectDtoInterface = {
      ...projectformModified,
      startDate: datePicker[0],
      endDate: datePicker[1],
      teamSize: +this.projectForm.get("teamSize").value,
    };
    console.log(newProject);
    console.log(typeof newProject.teamSize);

    this.store.dispatch(addProject({ newProject }));
    // this.projectForm.reset();
    // this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }
}
