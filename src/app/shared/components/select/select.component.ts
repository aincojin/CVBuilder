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
  ],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() public label: string;
  @Input() public listOfOptions: BaseEntityInterface[];

  public changed: (value: string) => void;
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
    this.selectControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((selectedOptions: string) => {
        console.log("Selected options: ", selectedOptions);
        if (this.changed) {
          this.changed(selectedOptions);
        }
      });
  }
  public ngDoCheck(): void {
    if (this.ngControl.control.touched) {
      // console.log("select touched", this.selectControl.touched);
      this.selectControl.markAsTouched();
      // console.log(this.selectControl);
    } else {
      this.selectControl.markAsPristine();
    }
    this.cdRef.markForCheck();
  }
  public onSelectBlur() {
    if (this.touched) {
      this.touched();
    }
  }

  public writeValue(value: string | BaseEntityInterface): void {
    setTimeout(() => console.log(this.selectControl.value), 1000);
    // console.log(value);
    if (typeof value === "string") {
      // If value is already a string, directly set it as the value
      this.selectControl.setValue(value);
    } else if (value && typeof value === "object" && value.hasOwnProperty("name")) {
      // If value is an object with 'name' property, extract 'name' and set it as the value
      this.selectControl.setValue(value.name);
    }
  }
  // public writeValue(value: string): void {
  //   this.selectControl.setValue(value);
  //   setTimeout(() => console.log(this.selectControl.value), 1000);
  //   console.log(value);
  // }

  public registerOnChange(fn: (value: string) => void): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
