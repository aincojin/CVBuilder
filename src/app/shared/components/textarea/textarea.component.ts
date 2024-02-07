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
  selector: "cvgen-textarea",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ValidationErrorPipe,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./textarea.component.html",
  styleUrl: "./textarea.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() public label: string;

  public value: string = "";
  public validationErr = VALIDATION_ERR;
  public textControl = new FormControl();

  public changed: (value: string) => void;
  public touched: () => void;

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

  public writeValue(value: string): void {
    this.textControl.setValue(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
