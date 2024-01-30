import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Self } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, NgControl } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { InputComponent } from "../input/input.component";
import { TextareaComponent } from "../textarea/textarea.component";
import { TranslateModule } from "@ngx-translate/core";

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
  ],
  templateUrl: "./project-form.component.html",
  styleUrl: "./project-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent {
  public projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ["", Validators.required],
      // datePicker: this.fb.group({
      //   startDate: [null, Validators.required],
      //   endDate: [null, Validators.required],
      // }),
      datePicker: [null, Validators.required],
      info1: this.createFormGroup(),
      info2: this.createFormGroup(),
      description: ["", Validators.required],
      responsibilities: ["", Validators.required],
    });
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      teamSize: ["", Validators.required],
      techStack: ["", Validators.required],
      roles: ["", Validators.required],
    });
  }

  public onSubmit() {
    console.log(this.projectForm.value);
  }
}
