import { AuthStateInterface } from "./authState";
import { CoreStateInterface } from "./coreState";
import { EmployeeStateInterface } from "./employeeState";
import { ProjectStateInterface } from "./projectState";
import { CvStateInterface } from "./cvState";

export interface AppState {
  employees: EmployeeStateInterface;
  projects: ProjectStateInterface;
  core: CoreStateInterface;
  cvs: CvStateInterface;
}
