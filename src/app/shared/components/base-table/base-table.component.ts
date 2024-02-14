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
import { TableItemsDisplayPipe } from "../../pipes/table-items-display.pipe";

@Component({
  selector: "cvgen-base-table",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TableItemsDisplayPipe,
    NzTableModule,
    NzDividerModule,
    NzPaginationModule,
  ],
  templateUrl: "./base-table.component.html",
  styleUrl: "./base-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableComponent<T> implements OnChanges {
  @Input() public columns: TableColumns[];
  @Input() public data: readonly T[] = [];

  @Output() clickedRowEmitter: EventEmitter<T> = new EventEmitter<T>();

  public pageSize = 5;
  public currentPageIndex = 1;
  public currentData: readonly T[] = [];
  public totalItems: number = this.data.length;
  public totalPages: number = this.totalItems / this.pageSize;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"].currentValue) {
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
}
