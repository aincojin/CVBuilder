import { BaseEntityInterface } from "../../shared/interfaces/base-entity";
import { BreadcrumbsInterface } from "../../shared/interfaces/breadcrumbs";
import { ErrorInterface } from "../../shared/interfaces/error";
import { PageTitleInterface } from "../../shared/interfaces/page-title";

export interface CoreStateInterface {
  pageTitles: PageTitleInterface;
  breadcrumbs: BreadcrumbsInterface[];
  specializations: BaseEntityInterface[];
  departments: BaseEntityInterface[];
  skills: BaseEntityInterface[];
  teamRoles: BaseEntityInterface[];
  responsibilities: BaseEntityInterface[];
  error: ErrorInterface;
}
