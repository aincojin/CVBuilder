import { createAction, props } from "@ngrx/store";
import { BaseEntityInterface } from "../../shared/interfaces/base-entity";
import { ErrorInterface } from "../../shared/interfaces/error";
import { BreadcrumbsInterface } from "../../shared/interfaces/breadcrumbs";

export enum CoreActions {
  SET_PAGE_TITLES = "[Core] Set Page Title",

  //TODO breadcrumbs
  SET_BREADCRUMBS = "[Core] Set Breadcrumbs",
  ADD_TO_BREADCRUMBS = "[Core] Add To Breadcrumbs",
  DELETE_FROM_BREADCRUMBS = "[Core] Delete From Breadcrumbs",
  POP_FROM_BREADCRUMBS = "[Core] Pop From Breadcrumbs",

  GET_SPECIALIZATIONS = "[Core] Get Specializations",
  GET_SPECIALIZATIONS_SUCCESS = "[Core] Get Specializations Success",
  GET_SPECIALIZATIONS_ERROR = "[Core] Get Specializations Error",

  GET_DEPARTMENTS = "[Core] Get Departments",
  GET_DEPARTMENTS_SUCCESS = "[Core] Get Departments Success",
  GET_DEPARTMENTS_ERROR = "[Core] Get Departments Errors",

  GET_SKILLS = "[Core] Get Skills",
  GET_SKILLS_SUCCESS = "[Core] Get Skills Success",
  GET_SKILLS_ERROR = "[Core] Get Skills Error",

  GET_TEAM_ROLES = "[Core] Get Team Roles",
  GET_TEAM_ROLES_SUCCESS = "[Core] Get Team Roles Success",
  GET_TEAM_ROLES_ERROR = "[Core] Get Team Roles Error",

  GET_RESPONSIBILITIES = "[Core] Get Responsibilities",
  GET_RESPONSIBILITIES_SUCCESS = "[Core] Get Responsibilities Success",
  GET_RESPONSIBILITIES_ERROR = "[Core] Get Responsibilities Error",
}

export const setPageTitles = createAction(
  CoreActions.SET_PAGE_TITLES,
  props<{ pageTitle: string; pageSubtitle: string }>(),
);

export const setBreadcrumbs = createAction(
  CoreActions.SET_BREADCRUMBS,
  props<{ breadcrumbs: BreadcrumbsInterface[] }>(),
);
export const addToBreadcrumbs = createAction(
  CoreActions.ADD_TO_BREADCRUMBS,
  props<{ breadcrumb: BreadcrumbsInterface }>(),
);
export const deleteFromBreadcrumbs = createAction(
  CoreActions.DELETE_FROM_BREADCRUMBS,
  props<{ index: number }>(),
);
export const popFromBreadcrumbs = createAction(CoreActions.DELETE_FROM_BREADCRUMBS);

export const fetchSpecializations = createAction(CoreActions.GET_SPECIALIZATIONS);
export const fetchSpecializationsSuccess = createAction(
  CoreActions.GET_SPECIALIZATIONS_SUCCESS,
  props<{ specializations: BaseEntityInterface[] }>(),
);
export const fetchSpecializationsError = createAction(
  CoreActions.GET_SPECIALIZATIONS,
  props<{ error: ErrorInterface }>(),
);

export const fetchDepartments = createAction(CoreActions.GET_DEPARTMENTS);
export const fetchDepartmentsSuccess = createAction(
  CoreActions.GET_DEPARTMENTS_SUCCESS,
  props<{ departments: BaseEntityInterface[] }>(),
);
export const fetchDepartmentsError = createAction(
  CoreActions.GET_DEPARTMENTS_ERROR,
  props<{ error: ErrorInterface }>(),
);

export const fetchSkills = createAction(CoreActions.GET_SKILLS);
export const fetchSkillsSuccess = createAction(
  CoreActions.GET_SKILLS_SUCCESS,
  props<{ skills: BaseEntityInterface[] }>(),
);
export const fetchSkillsError = createAction(
  CoreActions.GET_SKILLS_ERROR,
  props<{ error: ErrorInterface }>(),
);

export const fetchTeamRoles = createAction(CoreActions.GET_TEAM_ROLES);
export const fetchTeamRolesSuccess = createAction(
  CoreActions.GET_TEAM_ROLES_SUCCESS,
  props<{ teamRoles: BaseEntityInterface[] }>(),
);
export const fetchTeamRolesError = createAction(
  CoreActions.GET_TEAM_ROLES_ERROR,
  props<{ error: ErrorInterface }>(),
);

export const fetchResponsibilities = createAction(CoreActions.GET_RESPONSIBILITIES);
export const fetchResponsibilitiesSuccess = createAction(
  CoreActions.GET_RESPONSIBILITIES_SUCCESS,
  props<{ responsibilities: BaseEntityInterface[] }>(),
);
export const fetchResponsibilitiesError = createAction(
  CoreActions.GET_RESPONSIBILITIES_ERROR,
  props<{ error: ErrorInterface }>(),
);
