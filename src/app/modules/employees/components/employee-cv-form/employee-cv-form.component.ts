import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PROJECT_DATA } from "../../../../shared/constants/projects.const";
import { CV_DATA } from "../../../../shared/constants/cvs.const";
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
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../../../shared/enums/routes";
import { BaseEntityInterface } from "../../../../shared/interfaces/base-entity";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { EmployeeDtoInterface, EmployeeInterface } from "../../../../shared/interfaces/employee";
import { MultiselectComponent } from "../../../../shared/components/multiselect/multiselect.component";
import { CvDtoInterface, CvFormInterface } from "../../../../shared/interfaces/cv";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/state/state";
import { CvComponent } from "../cv/cv.component";
import { selectNewCv } from "../../../../store/cvs/cvs.reducers";

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
  @Input() public selectedEmployeeData: EmployeeInterface;
  @Input() public departmentData: BaseEntityInterface[];
  @Input() public specializationData: BaseEntityInterface[];
  @Input() public skillData: BaseEntityInterface[];
  @Input() public cvData: CvFormInterface[];

  public baseForm: FormGroup;
  public cvName: string;
  public selectedCv: CvFormInterface;

  //TODO move it up the hierachy, @Input()
  // public cvData = CV_DATA;
  public projectsData = PROJECT_DATA;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  @Output() cvAddedEmitter: EventEmitter<CvFormInterface> = new EventEmitter<CvFormInterface>();
  @Output() cvListEmitter: EventEmitter<CvFormInterface> = new EventEmitter<CvFormInterface>();

  ngOnInit() {
    this.baseForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      specialization: [null, Validators.required],
      department: [null, Validators.required],
      skills: [null, Validators.required],
      language: [null, Validators.required],
      projects: [null, Validators.required],
    });
  }

  public onSubmit() {
    console.log("hey");
    console.log(this.baseForm.getRawValue());
  }
  public addCv() {
    // console.log("add cv");
    const uniqueCvName = this.generateUniqueCvName();
    const newCv: CvFormInterface = {
      cvName: uniqueCvName,
      projects: [],
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      specialization: "",
      skills: [],
      language: [],
    };
    // console.log(newCv);
    //TODO
    this.cvAddedEmitter.emit(newCv);
  }
  private generateUniqueCvName(): string {
    const uniqueId = Date.now();
    const uniqueName = `CV_${uniqueId}`;
    return uniqueName;
  }

  public selectCv(cv: CvFormInterface) {
    this.selectedCv = cv;
    console.log("selected cv: ", this.selectedCv.cvName);
  }
  public onCancel() {
    this.router.navigate([Paths.EmployeeList], { relativeTo: this.activatedRoute });
  }
}
