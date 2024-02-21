import { ChangeDetectionStrategy, Component, Input, SimpleChanges, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/state/state";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzDividerModule } from "ng-zorro-antd/divider";
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
  ],
  templateUrl: "./cv.component.html",
  styleUrl: "./cv.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store<AppState>);

  @Input() public selectedCv: CvFormInterface;

  public baseForm: FormGroup;
  public cvName: string;

  ngOnInit() {
    this.baseForm = this.fb.group({
      firstName: [this.selectedCv.cvName, Validators.required],
      lastName: [this.selectedCv.lastName, Validators.required],
      email: ["", [Validators.required, Validators.email]],
      specialization: [null, Validators.required],
      department: [null, Validators.required],
      skills: [null, Validators.required],
      language: [null, Validators.required],
      projects: [null, Validators.required],
    });
  }
  public ngOnChanges(changes: SimpleChanges) {
    if (changes["selectedCv"] && changes["selectedCv"].currentValue) {
      this.updateForm();
    }
  }

  public updateForm() {
    if (this.baseForm) {
      console.log(this.selectedCv.cvName);
      this.baseForm.patchValue({
        firstName: this.selectedCv.cvName,
      });
    }
  }

  public onSubmit() {
    console.log("hey");
    console.log("selected cv in cv comp: ", this.selectedCv.cvName);

    console.log(this.baseForm.getRawValue());
  }
}
