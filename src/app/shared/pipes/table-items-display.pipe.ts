import { Pipe, PipeTransform } from "@angular/core";
import { TableColumns } from "../interfaces/table-columns";
import { BaseEntityInterface } from "../interfaces/base-entity";
import { isoDatePattern } from "../constants/date-iso.const";

@Pipe({
  name: "tableItemsDisplay",
  standalone: true,
})
export class TableItemsDisplayPipe<T> implements PipeTransform {
  transform(item: T, column: TableColumns): string {
    if (isArray(item[column.valueField])) {
      return item[column.valueField].map((obj: any) => obj.name).join(", ");
    } else if (isBaseEntity(item[column.valueField])) {
      return item[column.valueField].name;
    } else if (isISODate(item[column.valueField])) {
      const modifiedDate = new Date(item[column.valueField]).toISOString().split("T")[0];
      return modifiedDate.toString();
    } else {
      return item[column.valueField];
    }
  }
}

function isArray(value: string[]): boolean {
  return Array.isArray(value);
}

function isBaseEntity(value: BaseEntityInterface): boolean {
  return typeof value === "object" && "id" in value && "name" in value;
}

function isISODate(value: string): boolean {
  return isoDatePattern.test(value);
}
