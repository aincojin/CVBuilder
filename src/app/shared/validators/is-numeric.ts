import { AbstractControl, ValidationErrors } from "@angular/forms";
import { numericPattern } from "../constants/is-numeric.conat";

export class IsNumericValidator {
  static isnumeric(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !numericPattern.test(value)) {
      return { numericValue: true };
    }
    return null;
  }
}
