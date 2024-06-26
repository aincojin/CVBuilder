import { BaseEntityInterface } from "./base-entity";

export interface ProjectInterface {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  techStack: BaseEntityInterface[];
  responsibilities: BaseEntityInterface[];
  teamRoles: BaseEntityInterface[];
}

export interface ProjectDtoInterface {
  id?: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  teamSize: number;
  techStack: string[];
  responsibilities: string[];
  teamRoles: string[];
}
