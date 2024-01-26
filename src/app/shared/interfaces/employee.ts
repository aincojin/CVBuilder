import { BaseEntityInterface } from "./base-entity";
import { CvDtoInterface, CvInterface } from "./cv";

export interface EmployeeInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: BaseEntityInterface;
  specialization: BaseEntityInterface;
  departmentId: number;
  specializationId: number;
  cvs: CvInterface[];
}
export interface EmployeeDtoInterface {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string;
}
