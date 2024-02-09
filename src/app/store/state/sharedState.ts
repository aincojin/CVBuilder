import { BaseEntityInterface } from "../../shared/interfaces/base-entity";

export interface SharedStateInterface {
  specializations: BaseEntityInterface[];
  departments: BaseEntityInterface[];
  skills: BaseEntityInterface[];
  teamRoles: BaseEntityInterface[];
  responsibilities: BaseEntityInterface[];
}
