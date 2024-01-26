import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { PROJECT_DATA } from "../../../../shared/constants/projects.const";
import { BaseFormCvaComponent } from "../base-form-cva/base-form-cva.component";
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

@Component({
  selector: "cvgen-employee-cv-form",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InputComponent,
    ProjectFormComponent,
    ReactiveFormsModule,
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
export class EmployeeCvFormComponent extends BaseFormCvaComponent {
  //TODO move it up the hierachy, implement @Input()
  public cvData = CV_DATA;
  public projectsData = PROJECT_DATA;

  constructor(fb: FormBuilder) {
    super(fb);
    this.baseForm.addControl("skills", fb.control("", Validators.required));
  }

  public override onSubmit(): void {
    super.onSubmit();
  }
}
