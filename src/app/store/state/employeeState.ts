import { EmployeeDtoInterface, EmployeeInterface } from "../../shared/interfaces/employee";
import { ErrorInterface } from "../../shared/interfaces/error";

export interface EmployeeStateInterface {
  employeeList: EmployeeInterface[];
  employee: EmployeeInterface;
  error: ErrorInterface;
  isLoading: boolean;
}
