import { ProjectDtoInterface, ProjectInterface } from "./project";
import { BaseEntityInterface } from "./base-entity";
import { LanguageDtoInterface, LanguageInterface } from "./language";

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
  projects: ProjectInterface[];
}

export interface CvDtoInterface {
  id?: number;
  cvName: string;
  language: LanguageDtoInterface[];
  skills: string[];
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  specialization: string;
  employeeId: number;
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
  language: LanguageDtoInterface[];
  projects: ProjectDtoInterface[];
}
