import { ProjectDtoInterface, ProjectInterface } from "./project";
import { BaseEntityInterface } from "./base-entity";
import { LanguageDtoInterface, LanguageFormInterface, LanguageInterface } from "./language";

export interface CvInterface {
  id: number;
  cvName: string;
  language: LanguageInterface[];
  skills: BaseEntityInterface[];
  firstName: string;
  lastName: string;
  email: string;
  department: BaseEntityInterface;
  specialization: BaseEntityInterface;
  departmentId: number;
  specializationId: number;
  employeeId: number;
  cvsProjects: ProjectInterface[];
}

export interface CvDtoInterface {
  id?: number;
  employeeId: number;
  cvName: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  department: string;
  specialization: string;
  language: LanguageDtoInterface[];
  projects: ProjectDtoInterface[];
}

export interface CvFormInterface {
  cvName: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  department: string;
  specialization: string;
  language: LanguageFormInterface[];
  projects: ProjectDtoInterface[];
}
