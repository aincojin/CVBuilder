import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
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
export class BaseTableComponent<T> implements OnChanges {
  @Input() public columns: TableColumns[];
  @Input() public data: readonly T[] = [];

  @Output() clickedRowEmitter: EventEmitter<T> = new EventEmitter<T>();

  public pageSize = 4;
  public currentPageIndex = 1;
  public currentData: readonly T[] = [];
  public totalItems: number = this.data.length;
  public totalPages: number = this.totalItems / this.pageSize;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      this.updateCurrentPageData();
    }
  }

  public onPageIndexChange(pageIndex: number): void {
    this.currentPageIndex = pageIndex;
    this.updateCurrentPageData();
  }

  public updateCurrentPageData(): void {
    const startIndex = (this.currentPageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentData = this.data ? this.data.slice(startIndex, endIndex) : [];
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
