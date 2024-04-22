import { Pipe, PipeTransform } from "@angular/core";
import { ProjectInterface } from "../interfaces/project";
import { BaseEntityInterface } from "../interfaces/base-entity";

@Pipe({
  name: "selectItemsDisplay",
  standalone: true,
})
export class SelectItemsDisplayPipe<T> implements PipeTransform {
  transform<T extends object>(item: T): string {
    if ("name" in item) {
      return item["name"].toString();
    } else if ("projectName" in item) {
      return item["projectName"].toString();
    }
    return "";
  }
}
