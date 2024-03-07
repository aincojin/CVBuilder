import { ChangeDetectionStrategy, Component, Input, Self } from "@angular/core";
import { BaseEntityInterface } from "../../interfaces/base-entity";
import { CommonModule } from "@angular/common";
import { FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { ValidationErrorPipe } from "../../pipes/validation-error.pipe";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "cvgen-double-select",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    TranslateModule,
    NzSelectModule,
    ValidationErrorPipe,
  ],
  templateUrl: "./double-select.component.html",
  styleUrl: "./double-select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoubleSelectComponent {
  @Input() public label1: string;
  @Input() public label2: string;

  @Input() public listOfOptions1: BaseEntityInterface[];
  @Input() public listOfOptions2: BaseEntityInterface[];

  public doubleMultiselect = new FormControl();
  public changed: (value: string[]) => void;
  public touched: () => void;

  constructor(
    @Self() public ngControl: NgControl,
    // private cdRef: ChangeDetectorRef,
  ) {
    ngControl.valueAccessor = this;
  }

  public writeValue(value: string[]): void {
    this.doubleMultiselect.setValue(value);
  }

  public registerOnChange(fn: (value: string[]) => void): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
