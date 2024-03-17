import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { PROJECT_DATA } from "../../../../shared/constants/projects.const";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { ProjectFormComponent } from "../../../../shared/components/project-form/project-form.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { TranslateModule } from "@ngx-translate/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { EmployeeInterface } from "../../../../shared/interfaces/employee";
import { MultiselectComponent } from "../../../../shared/components/multiselect/multiselect.component";
import { CvFormInterface, CvInterface } from "../../../../shared/interfaces/cv";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/state/state";
import { CvComponent } from "../cv/cv.component";
import { selectNewCv, selectNewCvList } from "../../../../store/cvs/cvs.reducers";
import { addNewCv, deleteNewCv, fetchNewCv, updateNewCv } from "../../../../store/cvs/cvs.actions";
import { Observable } from "rxjs";
import { ProjectInterface } from "../../../../shared/interfaces/project";
import { selectProject } from "../../../../store/projects/projects.reducers";
import { fetchProject } from "../../../../store/projects/projects.actions";

@Component({
  selector: "cvgen-employee-cv-form",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InputComponent,
    SelectComponent,
    MultiselectComponent,
    ProjectFormComponent,
    CvComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzMenuModule,
    NzDividerModule,
    NzIconModule,
    NzTabsModule,
    NzCollapseModule,
  ],
  templateUrl: "./employee-cv-form.component.html",
  styleUrl: "./employee-cv-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCvFormComponent {
  private readonly store = inject(Store<AppState>);

  @Input() public selectedEmployeeData: EmployeeInterface;
  @Input() public departmentData: BaseEntityInterface[];
  @Input() public specializationData: BaseEntityInterface[];
  @Input() public skillData: BaseEntityInterface[];
  @Input() public responsibilityList: BaseEntityInterface[];
  @Input() public teamRolesList: BaseEntityInterface[];
  @Input() public cvData: CvFormInterface[];
  @Input() public projectData: ProjectInterface[];

  public baseForm: FormGroup;
  public cvName: string;

  @Output() cvAddedEmitter: EventEmitter<CvFormInterface> = new EventEmitter<CvFormInterface>();
  @Output() cvListEmitter: EventEmitter<CvFormInterface> = new EventEmitter<CvFormInterface>();

  public selectedCv$: Observable<CvFormInterface> = this.store.select(selectNewCv);
  public newCvList$: Observable<CvFormInterface[]> = this.store.select(selectNewCvList);
  public selectedProject$: Observable<ProjectInterface> = this.store.select(selectProject);

  public addCv() {
    const uniqueCvName = this.generateUniqueCvName();
    const newCv: CvFormInterface = {
      // cvName: uniqueCvName,
      // cvsProjects: [],
      // firstName: "",
      // lastName: "",
      // email: "",
      // department: "",
      // specialization: "",
      // skills: [],
      // language: [],
      cvName: uniqueCvName,
      projects: [],
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      department: "dept1",
      specialization: "spec1",
      skills: ["tech1", "tech2"],
      language: [],
    };
    this.store.dispatch(addNewCv({ newCv }));
    //TODO OR move it to the create page
    // this.cvAddedEmitter.emit(newCv);
  }
  private generateUniqueCvName(): string {
    const uniqueId = Date.now();
    const uniqueName = `CV_${uniqueId}`;
    return uniqueName;
  }

  public selectCv(cv: CvFormInterface) {
    this.store.dispatch(fetchNewCv({ newCvName: cv.cvName }));
  }

  public projectIdSelected(projectId: number) {
    this.store.dispatch(fetchProject({ projectId: projectId }));
  }

  public saveNewCv(savedCv: CvFormInterface) {
    this.store.dispatch(updateNewCv({ updatedNewCv: savedCv }));
  }
  public onDeleteCv(deletedName: string) {
    this.store.dispatch(deleteNewCv({ deletedCvName: deletedName }));
  }
}
