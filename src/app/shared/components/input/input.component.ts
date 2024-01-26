import { ChangeDetectionStrategy, Component, Input, Self } from "@angular/core";
import { FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { VALIDATION_ERR } from "../../constants/errors.const";
import { CommonModule } from "@angular/common";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { ValidationErrorPipe } from "../../pipes/validation-error.pipe";
import { TranslateModule } from "@ngx-translate/core";

@UntilDestroy()
@Component({
  selector: "cvgen-input",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ValidationErrorPipe,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() public label: string;
  @Input() public inputType: string = "text";

  public value: string = "";
  public textControl = new FormControl();
  public validationErr = VALIDATION_ERR;

  public changed: (value: string) => void;
  public touched: () => void;

  //@Self() makes sure that if you wrap the formControl with another formControl it works fine
  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.textControl.valueChanges.pipe(untilDestroyed(this)).subscribe(val => {
      if (this.changed) {
        this.changed(val);
      }
    });
  }

  public onInputBlur() {
    if (this.touched) {
      this.touched();
    }
  }

  //takes a value from the form control value and updates the corresponding view.
  public writeValue(value: string): void {
    this.textControl.setValue(value);
  }

  //notifies angular about the change
  // is used to register a callback function that should be called whenever the control's value changes in the view
  public registerOnChange(fn: (value: string) => void): void {
    this.changed = fn;
  }
  //is used to register a callback function that should be called
  //when the control is touched (e.g., clicked or focused)
  //e.g. validation
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
