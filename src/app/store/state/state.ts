import { AuthStateInterface } from "./authState";
import { SharedStateInterface } from "./sharedState";
import { EmployeeStateInterface } from "./employeeState";
import { ProjectStateInterface } from "./projectState";
import { CvStateInterface } from "./cvState";

export interface AppState {
  employees: EmployeeStateInterface;
  projects: ProjectStateInterface;
  shared: SharedStateInterface;
  cvs: CvStateInterface;
}
