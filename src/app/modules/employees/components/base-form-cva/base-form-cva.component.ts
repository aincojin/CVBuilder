import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { InputComponent } from "../../../../shared/components/input/input.component";

@Component({
  selector: "cvgen-base-form-cva",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    FormsModule,
    InputComponent,
  ],
  templateUrl: "./base-form-cva.component.html",
  styleUrl: "./base-form-cva.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseFormCvaComponent {
  public baseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      lastName: ["", Validators.required],
      // TODO expand email validation
      email: ["", [Validators.required, Validators.email]],
      specialization: ["", Validators.required],
      department: ["", Validators.required],
    });
  }

  public onSubmit() {
    console.log(this.baseForm.value);
  }
}
