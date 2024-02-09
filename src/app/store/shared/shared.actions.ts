import { createAction, props } from "@ngrx/store";
import { BaseEntityInterface } from "../../shared/interfaces/base-entity";

export enum SharedActions {
  GET_SPECIALIZATIONS = "[Shared] Get Specializations",
  GET_SPECIALIZATIONS_SUCCESS = "[Shared] Get Specializations Success",
  GET_SPECIALIZATIONS_ERROR = "[Shared] Get Specializations Error",

  GET_DEPARTMENTS = "[Shared] Get Departments",
  GET_DEPARTMENTS_SUCCESS = "[Shared] Get Departments Success",
  GET_DEPARTMENTS_ERROR = "[Shared] Get Departments Errors",

  GET_SKILLS = "[Shared] Get Skills",
  GET_SKILLS_SUCCESS = "[Shared] Get Skills Success",
  GET_SKILLS_ERROR = "[Shared] Get Skills Error",

  GET_TEAM_ROLES = "[Shared] Get Team Roles",
  GET_TEAM_ROLES_SUCCESS = "[Shared] Get Team Roles Success",
  GET_TEAM_ROLES_ERROR = "[Shared] Get Team Roles Error",

  GET_RESPONSIBILITIES = "[Shared] Get Responsibilities",
  GET_RESPONSIBILITIES_SUCCESS = "[Shared] Get Responsibilities Success",
  GET_RESPONSIBILITIES_ERROR = "[Shared] Get Responsibilities Error",
}

export const fetchSpecializations = createAction(SharedActions.GET_SPECIALIZATIONS);
export const fetchSpecializationsSuccess = createAction(
  SharedActions.GET_SPECIALIZATIONS_SUCCESS,
  props<{ specializations: BaseEntityInterface[] }>(),
);
export const fetchSpecializationsError = createAction(SharedActions.GET_SPECIALIZATIONS);

export const fetchDepartments = createAction(SharedActions.GET_DEPARTMENTS);
export const fetchDepartmentsSuccess = createAction(
  SharedActions.GET_DEPARTMENTS_SUCCESS,
  props<{ departments: BaseEntityInterface[] }>(),
);
export const fetchDepartmentsError = createAction(SharedActions.GET_DEPARTMENTS_ERROR);

export const fetchSkills = createAction(SharedActions.GET_SKILLS);
export const fetchSkillsSuccess = createAction(
  SharedActions.GET_SKILLS_SUCCESS,
  props<{ skills: BaseEntityInterface[] }>(),
);
export const fetchSkillsError = createAction(SharedActions.GET_SKILLS_ERROR);

export const fetchTeamRoles = createAction(SharedActions.GET_TEAM_ROLES);
export const fetchTeamRolesSuccess = createAction(
  SharedActions.GET_TEAM_ROLES_SUCCESS,
  props<{ teamRoles: BaseEntityInterface[] }>(),
);
export const fetchTeamRolesError = createAction(SharedActions.GET_TEAM_ROLES_ERROR);

export const fetchResponsibilities = createAction(SharedActions.GET_RESPONSIBILITIES);
export const fetchResponsibilitiesSuccess = createAction(
  SharedActions.GET_RESPONSIBILITIES_SUCCESS,
  props<{ responsibilities: BaseEntityInterface[] }>(),
);
export const fetchResponsibilitiesError = createAction(SharedActions.GET_RESPONSIBILITIES_ERROR);
