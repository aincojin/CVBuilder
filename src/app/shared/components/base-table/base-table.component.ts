import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { TableColumns } from "../../interfaces/table-columns";
import { CommonModule } from "@angular/common";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { TranslateModule } from "@ngx-translate/core";
import { BaseEntityInterface } from "../../interfaces/base-entity";

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

  public isArray(value: string[]): boolean {
    return Array.isArray(value);
  }
  public isBaseEntity(value: BaseEntityInterface): boolean {
    return typeof value === "object" && "id" in value && "name" in value;
  }
}
