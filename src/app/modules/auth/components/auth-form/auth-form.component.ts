import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthInterface } from "../../../../shared/interfaces/auth";
import { AuthService } from "../../../../shared/services/auth.service";
import { CommonModule } from "@angular/common";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { PasswordComponent } from "../../../../shared/components/password/password.component";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzAnchorModule } from "ng-zorro-antd/anchor";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "cvgen-auth-form",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzAnchorModule,
    InputComponent,
    PasswordComponent,
  ],
  templateUrl: "./auth-form.component.html",
  styleUrl: "./auth-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  public authForm: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  constructor() {
    this.authForm = this.fb.group({
      email: ["e1@gmail.com", [Validators.required, Validators.email]],
      password: ["p1", Validators.required],
    });
  }

  public onSubmit() {
    const userCredentials: AuthInterface = this.authForm.getRawValue();
    this.authService.login(userCredentials);
  }
}
