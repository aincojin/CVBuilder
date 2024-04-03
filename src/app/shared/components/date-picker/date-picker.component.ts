import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Self } from "@angular/core";
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
import { DatePickerInterface } from "../../interfaces/date-picker";

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

  public value: DatePickerInterface;
  public validationErr = VALIDATION_ERR;
  public dateRangeControl = new FormControl();

  public changed: (value: DatePickerInterface) => void;
  public touched: () => void;

  constructor(
    @Self() public ngControl: NgControl,
    private cdRef: ChangeDetectorRef,
  ) {
    ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.dateRangeControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((dates: [Date, Date]) => {
        console.log("Datepicker value: ", dates);
        const dateObj = {
          startDate: dates[0],
          endDate: dates[1],
        };
        console.log("Datepicker object: ", dateObj);
        const value: DatePickerInterface =
          dateObj && dateObj.startDate && dateObj.endDate
            ? { startDate: dateObj.startDate.toISOString(), endDate: dateObj.endDate.toISOString() }
            : null;
        if (this.changed) {
          this.changed(value);
        }
      });
  }

  public onInputBlur() {
    if (this.touched) {
      this.touched();
    }
    console.log(this.ngControl.errors);
  }
  public ngDoCheck(): void {
    if (this.ngControl.control.touched) {
      this.dateRangeControl.markAsTouched();
    } else {
      this.dateRangeControl.markAsPristine();
    }
    this.cdRef.markForCheck();
  }

  //sets the value to the native(html) form control
  public writeValue(value: DatePickerInterface): void {
    if (value && value.startDate && value.endDate) {
      // console.log("st date: ", value.startDate);
      // console.log("end date: ", value.endDate);

      this.dateRangeControl.setValue([value.startDate, value.endDate]);
    }
    // setTimeout(() => console.log("datepicker timeout:", this.dateRangeControl.value), 1000);
    // console.log(this.dateRangeControl.value);
  }

  //to register a callback that is expected to execute evry time
  //the native form is updated
  public registerOnChange(fn: (value: DatePickerInterface) => void): void {
    this.changed = fn;
  }
  //indicates that a user interacted with a control
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
