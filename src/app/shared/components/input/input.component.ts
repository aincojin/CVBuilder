import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Self } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
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
export class InputComponent implements ControlValueAccessor {
  @Input() public label: string;
  @Input() public inputType: string = "text";

  public textControl = new FormControl();
  public validationErr = VALIDATION_ERR;

  public changed: (value: string) => void;
  public touched: () => void;

  //@Self() makes sure that if you wrap the formControl with another formControl it works fine
  constructor(
    @Self() public ngControl: NgControl,
    private cdRef: ChangeDetectorRef,
  ) {
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
  //TODO read more
  public ngDoCheck(): void {
    if (this.ngControl.control.touched) {
      this.textControl.markAsTouched();
    }
    this.cdRef.markForCheck();
  }

  public writeValue(value: string): void {
    this.textControl.setValue(value);
    this.cdRef.detectChanges();
    setTimeout(() => console.log(this.textControl.value), 1000);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
