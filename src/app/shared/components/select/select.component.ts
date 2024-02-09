import { ChangeDetectionStrategy, Component, Input, OnInit, Self } from "@angular/core";
import { FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { CommonModule } from "@angular/common";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NzFormModule } from "ng-zorro-antd/form";
import { TranslateModule } from "@ngx-translate/core";
import { BaseEntityInterface } from "../../interfaces/base-entity";

@UntilDestroy()
@Component({
  selector: "cvgen-select",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, TranslateModule, NzSelectModule],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Input() public label: string;
  @Input() public listOfOptions: BaseEntityInterface[];

  public changed: (value: string[]) => void;
  public touched: () => void;
  public selectControl = new FormControl();

  constructor(@Self() public ngControl: NgControl) {
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

  public writeValue(value: string[] | null): void {
    this.selectControl.setValue(value || []);
  }

  public registerOnChange(fn: (value: string[]) => void): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
}
