import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ControlValueAccessor, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../input/input.component";
import { CommonModule } from "@angular/common";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { ValidationErrorPipe } from "../../pipes/validation-error.pipe";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "cvgen-password",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InputComponent,
    ReactiveFormsModule,
    ValidationErrorPipe,
    NzFormModule,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: "./password.component.html",
  styleUrl: "./password.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent extends InputComponent implements ControlValueAccessor {
  public passwordVisible = false;
  public password?: string;

  public togglePasswordVisibility() {
    this.inputType = this.inputType === "password" ? "text" : "password";
    this.passwordVisible = !this.passwordVisible;
  }
}
