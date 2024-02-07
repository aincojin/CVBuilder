import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { TableColumns } from "../../interfaces/table-columns";
import { CommonModule } from "@angular/common";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { TranslateModule } from "@ngx-translate/core";
import { BaseEntityInterface } from "../../interfaces/base-entity";
import { NzPaginationModule } from "ng-zorro-antd/pagination";

@Component({
  selector: "cvgen-base-table",
  standalone: true,
  imports: [CommonModule, TranslateModule, NzTableModule, NzDividerModule, NzPaginationModule],
  templateUrl: "./base-table.component.html",
  styleUrl: "./base-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableComponent<T> {
  @Input() public columns: TableColumns[];
  @Input() public data: T[];

  @Output() clickedRowEmitter: EventEmitter<T> = new EventEmitter<T>();

  ngOnInit() {
    const pagination = {
      pageIndex: 1,
      pageSize: 5,
      total: this.data.length,
    };
  }
  public rowClicked(item: T) {
    this.clickedRowEmitter.emit(item);
  }

  public isArray(value: string[]): boolean {
    return Array.isArray(value);
  }
  public isBaseEntity(value: BaseEntityInterface): boolean {
    return typeof value === "object" && "id" in value && "name" in value;
  }
  // public onPageIndexChange($event){}
}
