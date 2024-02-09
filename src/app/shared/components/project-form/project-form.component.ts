import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, Self } from "@angular/core";
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
import {
  fetchDepartments,
  fetchResponsibilities,
  fetchSkills,
  fetchSpecializations,
  fetchTeamRoles,
} from "../../../store/shared/shared.actions";
import { Observable } from "rxjs";
import { BaseEntityInterface } from "../../interfaces/base-entity";
import {
  selectDepartments,
  selectResponsibilities,
  selectSkills,
  selectSpecializations,
  selectTeamRoles,
} from "../../../store/shared/shared.reducers";

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
export class ProjectFormComponent implements OnInit {
  public projectForm: FormGroup;
  public techStackOptions = TECH_STACK_OPTIONS;
  public rolesOptions = ROLES_OPTIONS;
  public responsibilityOptions = RESPONSIBILITY_OPTIONS;

  public specializationList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectSpecializations);
  public departmentList$: Observable<BaseEntityInterface[]> = this.store.select(selectDepartments);
  public skillList$: Observable<BaseEntityInterface[]> = this.store.select(selectSkills);
  public teamRolesList$: Observable<BaseEntityInterface[]> = this.store.select(selectTeamRoles);
  public responsibilityList$: Observable<BaseEntityInterface[]> =
    this.store.select(selectResponsibilities);

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.projectForm = this.fb.group({
      projectName: ["test", Validators.required],
      datePicker: [null, Validators.required],
      //TODO change to formArray maybe?...
      teamSize: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      techStack: [null, Validators.required],
      teamRoles: [null, Validators.required],
      description: ["qwer", Validators.required],
      responsibilities: [null, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(fetchSpecializations());
    this.store.dispatch(fetchDepartments());
    this.store.dispatch(fetchSkills());
    this.store.dispatch(fetchTeamRoles());
    this.store.dispatch(fetchResponsibilities());
  }

  public onSubmit() {
    const { datePicker, ...projectformModified } = this.projectForm.getRawValue();
    const newProject: ProjectDtoInterface = {
      ...projectformModified,
      startDate: datePicker[0],
      endDate: datePicker[1],
      teamSize: +this.projectForm.get("teamSize").value,
    };
    this.store.dispatch(addProject({ newProject }));
    this.projectForm.reset();
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }

  public onCancel() {
    this.router.navigate([Paths.ProjectList], { relativeTo: this.activatedRoute });
  }
}
