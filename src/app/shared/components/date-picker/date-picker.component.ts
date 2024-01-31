import { ChangeDetectionStrategy, Component, Input, Self } from "@angular/core";
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { VALIDATION_ERR } from "../../constants/errors.const";
import { CommonModule } from "@angular/common";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { ValidationErrorPipe } from "../../pipes/validation-error.pipe";
import { InputComponent } from "../input/input.component";
import { TranslateModule } from "@ngx-translate/core";

@UntilDestroy()
@Component({
  selector: "cvgen-date-picker",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzDatePickerModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    ValidationErrorPipe,
  ],
  templateUrl: "./date-picker.component.html",
  styleUrl: "./date-picker.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  @Input() public label: string;

  public value: null;
  public validationErr = VALIDATION_ERR;
  public dateRangeControl = new FormControl();

  public changed: (value: [string, string]) => void;
  public touched: () => void;

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.dateRangeControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((dates: [Date, Date]) => {
        const value: [string, string] =
          dates && dates[0] && dates[1] ? [dates[0].toISOString(), dates[1].toISOString()] : null;
        // console.log("date value: ", value);

        if (this.changed) {
          this.changed(value);
        }
      });
  }

  // TODO onInputBlur is afk
  public onInputBlur() {
    if (this.touched) {
      this.touched();
    }
    console.log(this.ngControl.errors);
  }

  //sets the value to the native(html) form control
  public writeValue(value: [string, string] | null): void {
    if (value === null) {
      this.dateRangeControl.setValue(null);
    } else {
      this.dateRangeControl.setValue([new Date(value[0]), new Date(value[1])]);
    }
  }

  //to register a callback that is expected to execute evry time
  //the native form is updated
  public registerOnChange(fn: (value: [string, string]) => void): void {
    this.changed = fn;
  }
  //indicates that a user interacted with a control
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
