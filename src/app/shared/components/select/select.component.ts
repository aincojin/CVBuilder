import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Self,
} from "@angular/core";
import { FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { CommonModule } from "@angular/common";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NzFormModule } from "ng-zorro-antd/form";
import { TranslateModule } from "@ngx-translate/core";
import { BaseEntityInterface } from "../../interfaces/base-entity";
import { VALIDATION_ERR } from "../../constants/errors.const";
import { ValidationErrorPipe } from "../../pipes/validation-error.pipe";
import { SelectItemsDisplayPipe } from "../../pipes/select-items-display.pipe";

@UntilDestroy()
@Component({
  selector: "cvgen-select",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    TranslateModule,
    NzSelectModule,
    ValidationErrorPipe,
    SelectItemsDisplayPipe,
  ],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> implements OnInit {
  @Input() public label: string;
  @Input() public listOfOptions: readonly T[] = [];

  public changed: (value: T) => void;
  public touched: () => void;
  public selectControl = new FormControl();
  public validationErr = VALIDATION_ERR;

  constructor(
    @Self() public ngControl: NgControl,
    private cdRef: ChangeDetectorRef,
  ) {
    ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
    this.selectControl.valueChanges.pipe(untilDestroyed(this)).subscribe((selectedOptions: T) => {
      console.log("Selected options: ", selectedOptions);
      if (this.changed) {
        this.changed(selectedOptions);
      }
    });
  }
  public ngDoCheck(): void {
    if (this.ngControl.control.touched) {
      this.selectControl.markAsTouched();
    }
    this.cdRef.markForCheck();
  }
  public onSelectBlur() {
    if (this.touched) {
      this.touched();
    }
  }
  public writeValue(value: T): void {
    if (value && value.hasOwnProperty("name")) {
      const nameValue = (value as BaseEntityInterface).name;
      this.selectControl.setValue(nameValue);
    } else {
      this.selectControl.setValue(value);
    }
  }

  public registerOnChange(fn: (value: T) => void): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
