import { BaseEntityInterface } from "../../shared/interfaces/base-entity";

export interface CoreStateInterface {
  specializations: BaseEntityInterface[];
  departments: BaseEntityInterface[];
  skills: BaseEntityInterface[];
  teamRoles: BaseEntityInterface[];
  responsibilities: BaseEntityInterface[];
}
