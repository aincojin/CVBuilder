import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "validationError",
  standalone: true,
})
export class ValidationErrorPipe implements PipeTransform {
  transform(value: object): string | null {
    return value ? Object.keys(value)[0] : null;
  }
}
