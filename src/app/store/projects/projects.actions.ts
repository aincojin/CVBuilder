//TODO after employees
import { Action } from "@ngrx/store";
import { ProjectInterface } from "../../shared/interfaces/project";

export enum EProjectsActions {
  FETCH_PROJECTS = "[Projects] Fetch Projects",
  FETCH_PROJECTS_SUCCESS = "[Projects] Fetch Projects Success",
  FETCH_PROJECTS_ERROR = "[Projects] Fetch Projects Error",
  ADD_NEW_PROJECT = "[Projects] Add New Project",
  ADD_NEW_PROJECT_SUCCESS = "[Projects] Add New Project Success",
  ADD_NEW_PROJECT_ERROR = "[Projects] Add New Project Error",
  UPDATE_PROJECT = "[Projects] Update Existing Project",
  UPDATE_PROJECT_SUCCESS = "[Projects] Update Existing Project Success",
  UPDATE_PROJECT_ERROR = "[Projects] Update Existing Project Error",
}

export class getProjects implements Action {
  public readonly type: EProjectsActions.FETCH_PROJECTS;
}

export class getProjectsSuccess implements Action {
  public readonly type: EProjectsActions.FETCH_PROJECTS_SUCCESS;
  constructor(public payload: ProjectInterface[]) {}
}

export class getProjectsError implements Action {
  public readonly type: EProjectsActions.FETCH_PROJECTS_ERROR;
  constructor(public payload: string) {}
}
