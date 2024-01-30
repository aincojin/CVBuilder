import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { TableColumns } from "../../interfaces/table-columns";
import { EmployeeDtoInterface, EmployeeInterface } from "../../interfaces/employee";
import { CommonModule } from "@angular/common";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { TranslateModule } from "@ngx-translate/core";
import { ProjectInterface } from "../../interfaces/project";

@Component({
  selector: "cvgen-base-table",
  standalone: true,
  imports: [CommonModule, TranslateModule, NzTableModule, NzDividerModule],
  templateUrl: "./base-table.component.html",
  styleUrl: "./base-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableComponent<T> {
  @Input() public columns: TableColumns[];
  @Input() public data: T[];

  @Output() clickedRowEmitter: EventEmitter<T> = new EventEmitter<T>();

  public rowClicked(item: T) {
    this.clickedRowEmitter.emit(item);
  }
}
