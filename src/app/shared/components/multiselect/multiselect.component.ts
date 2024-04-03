import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Self,
} from "@angular/core";
import { ReactiveFormsModule, FormControl, NgControl } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { TranslateModule } from "@ngx-translate/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { VALIDATION_ERR } from "../../constants/errors.const";
import { BaseEntityInterface } from "../../interfaces/base-entity";
import { ValidationErrorPipe } from "../../pipes/validation-error.pipe";

@UntilDestroy()
@Component({
  selector: "cvgen-multiselect",
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    TranslateModule,
    NzSelectModule,
    ValidationErrorPipe,
  ],
  templateUrl: "./multiselect.component.html",
  styleUrl: "./multiselect.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectComponent implements OnInit {
  @Input() public label: string;
  @Input() public listOfOptions: BaseEntityInterface[];

  public changed: (value: string[]) => void;
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
      .subscribe((selectedOptions: string[]) => {
        console.log("Selected options: ", selectedOptions);
        if (this.changed) {
          this.changed(selectedOptions);
        }
      });
  }
  public ngDoCheck(): void {
    if (this.ngControl.control.touched) {
      this.selectControl.markAsTouched();
    } else {
      this.selectControl.markAsPristine();
    }
    this.cdRef.markForCheck();
  }

  public writeValue(value: string[]): void {
    this.selectControl.setValue(value);
  }

  public registerOnChange(fn: (value: string[]) => void): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
