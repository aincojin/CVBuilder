import { AuthStateInterface } from "./authState";
import { CoreStateInterface } from "./coreState";
import { EmployeeStateInterface } from "./employeeState";
import { ProjectStateInterface } from "./projectState";

export interface AppState {
  employees: EmployeeStateInterface;
  projects: ProjectStateInterface;
  core: CoreStateInterface;
}
