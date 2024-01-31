import { createAction, props } from "@ngrx/store";
import { ProjectInterface } from "../../shared/interfaces/project";

export enum ProjectsActions {
  GET_PROJECTS = "[Projects] Get Projects",
  GET_PROJECTS_SUCCESS = "[Projects] Get Projects Success",
  GET_PROJECTS_ERROR = "[Projects] Get Projects Error",
  ADD_NEW_PROJECT = "[Projects] Add New Project",
  ADD_NEW_PROJECT_SUCCESS = "[Projects] Add New Project Success",
  ADD_NEW_PROJECT_ERROR = "[Projects] Add New Project Error",
  UPDATE_PROJECT = "[Projects] Update Existing Project",
  UPDATE_PROJECT_SUCCESS = "[Projects] Update Existing Project Success",
  UPDATE_PROJECT_ERROR = "[Projects] Update Existing Project Error",
}

export const fetchProjects = createAction(ProjectsActions.GET_PROJECTS);
export const fetchProjectsSuccess = createAction(
  ProjectsActions.GET_PROJECTS_SUCCESS,
  props<{ projectList: ProjectInterface[] }>(),
);
export const fetchProjectsError = createAction(ProjectsActions.GET_PROJECTS_ERROR);
