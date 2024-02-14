import { BaseEntityInterface } from "../../shared/interfaces/base-entity";
import { ErrorInterface } from "../../shared/interfaces/error";

export interface CoreStateInterface {
  pageTitle: string;
  specializations: BaseEntityInterface[];
  departments: BaseEntityInterface[];
  skills: BaseEntityInterface[];
  teamRoles: BaseEntityInterface[];
  responsibilities: BaseEntityInterface[];
  error: ErrorInterface;
}
