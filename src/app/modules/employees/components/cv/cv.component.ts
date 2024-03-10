import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/state/state";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { MultiselectComponent } from "../../../../shared/components/multiselect/multiselect.component";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { CvFormInterface } from "../../../../shared/interfaces/cv";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { ProjectDtoInterface, ProjectInterface } from "../../../../shared/interfaces/project";
import { LANGUAGES_DATA, LEVELS_DATA } from "../../../../shared/constants/languages";
import { ProjectsService } from "../../../../shared/services/projects.service";

@Component({
  selector: "cvgen-cv",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InputComponent,
    SelectComponent,
    MultiselectComponent,
    ProjectFormComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzMenuModule,
    NzDividerModule,
    NzIconModule,
    NzTabsModule,
    NzCollapseModule,
    NzDropDownModule,
  ],
  templateUrl: "./cv.component.html",
  styleUrl: "./cv.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
  private readonly fb = inject(FormBuilder);
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  @Input() public selectedCv: CvFormInterface;
  @Input() public selectedProject: ProjectInterface;
  @Input() public departmentData: BaseEntityInterface[];
  @Input() public specializationData: BaseEntityInterface[];
  @Input() public skillData: BaseEntityInterface[];
  @Input() public responsibilityList: BaseEntityInterface[];
  @Input() public teamRolesList: BaseEntityInterface[];
  @Input() public projectData: ProjectInterface[];

  public baseForm: FormGroup;
  public cvName: string;
  public languagesData = LANGUAGES_DATA;
  public levelData = LEVELS_DATA;
  public modifiedProject: ProjectDtoInterface;

  @Output() cvSavedEmitter: EventEmitter<CvFormInterface> = new EventEmitter<CvFormInterface>();
  @Output() projectSelectedEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.baseForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      specialization: [null, Validators.required],
      department: [null, Validators.required],
      skills: [null, Validators.required],
      language: this.fb.array([], Validators.required),
      projects: this.fb.array([]),
    });
    console.log("cv init: ", this.baseForm.getRawValue());

    if (this.selectedCv) {
      this.updateForm();
    }
  }

  public get languages() {
    return this.baseForm.get("language") as FormArray;
  }

  public get projects() {
    return this.baseForm.get("projects") as FormArray;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedCv"] && changes["selectedCv"].currentValue) {
      if (this.baseForm) {
        this.updateForm();
      }
    }
    if (changes["selectedProject"] && changes["selectedProject"].currentValue) {
      this.modifiedProject = this.projectsService.fromProjectToDto(this.selectedProject);
    }
  }

  private updateForm(): void {
    this.languages.clear();
    this.selectedCv.language.forEach(language => {
      this.languages.push(
        this.fb.group({
          name: [language.name],
          level: [language.level],
        }),
      );
    });
    this.baseForm.patchValue({
      firstName: this.selectedCv.firstName,
      lastName: this.selectedCv.lastName,
      email: this.selectedCv.email,
      specialization: this.selectedCv.specialization,
      department: this.selectedCv.department,
      skills: this.selectedCv.skills,
      language: this.selectedCv.language,
    });
    console.log("BaseForm value: ", this.baseForm.getRawValue());
  }

  public addNewProject(project: ProjectInterface) {
    console.log("PROJECT IS BEING CREATED");
    this.modifiedProject = this.projectsService.fromProjectToDto(project);
    console.log(this.modifiedProject);
    this.projects.push(
      this.fb.group({
        id: project.id,
        projectName: project.projectName,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        teamSize: project.teamSize,
        techStack: [project.techStack.map(skill => skill.name)],
        responsibilities: [project.responsibilities.map(resp => resp.name)],
        teamRoles: [project.teamRoles.map(role => role.name)],
      }),
    );
    console.log("project created:", this.baseForm.getRawValue());
  }

  public addLanguage() {
    const languageToAdd = this.fb.group({
      name: ["", Validators.required],
      level: ["", Validators.required],
    });
    this.languages.push(languageToAdd);
  }

  public deleteLanguage(index: number) {
    this.languages.removeAt(index);
  }

  public selectProject(projectId: number) {
    this.projectSelectedEmitter.emit(projectId);
  }

  public onSave() {
    console.log("saving cv: ", this.baseForm.getRawValue());
    console.log(this.baseForm.controls["projects"]);

    if (this.baseForm.invalid) {
      console.log("cv form not saved");
      this.baseForm.markAllAsTouched();
      return;
    } else {
      const savedCv: CvFormInterface = {
        ...this.baseForm.getRawValue(),
        cvName: this.selectedCv.cvName,
      };
      console.log("savedcv: ", savedCv);
      this.cvSavedEmitter.emit(savedCv);
    }
  }
}
