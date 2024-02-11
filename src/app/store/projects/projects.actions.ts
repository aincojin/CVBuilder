import { createAction, props } from "@ngrx/store";
import { ProjectDtoInterface, ProjectInterface } from "../../shared/interfaces/project";

export enum ProjectsActions {
  GET_PROJECTS = "[Projects] Get Projects",
  GET_PROJECTS_SUCCESS = "[Projects] Get Projects Success",
  GET_PROJECTS_ERROR = "[Projects] Get Projects Error",

  GET_PROJECT = "[Projects] Get Project",
  GET_PROJECT_SUCCESS = "[Projects] Get Project Success",
  GET_PROJECT_ERROR = "[Projects] Get Project Error",

  ADD_PROJECT = "[Projects] Add New Project",
  ADD_PROJECT_SUCCESS = "[Projects] Add New Project Success",
  ADD_PROJECT_ERROR = "[Projects] Add New Project Error",

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

export const fetchProject = createAction(
  ProjectsActions.GET_PROJECT,
  props<{ projectId: number }>(),
);
export const fetchProjectSuccess = createAction(
  ProjectsActions.GET_PROJECT_SUCCESS,
  props<{ project: ProjectInterface }>(),
);
export const fetchProjectError = createAction(ProjectsActions.GET_PROJECT_ERROR);

export const addProject = createAction(
  ProjectsActions.ADD_PROJECT,
  props<{ newProject: ProjectDtoInterface }>(),
);
export const addProjectSuccess = createAction(
  ProjectsActions.ADD_PROJECT_SUCCESS,
  props<{ addedProject: ProjectInterface }>(),
);
export const addProjectError = createAction(ProjectsActions.ADD_PROJECT_ERROR);

export const updateProject = createAction(
  ProjectsActions.UPDATE_PROJECT,
  props<{ projectId: number; project: ProjectDtoInterface }>(),
);
export const updateProjectSuccess = createAction(
  ProjectsActions.UPDATE_PROJECT_SUCCESS,
  props<{ updatedProject: ProjectInterface }>(),
);
export const updateProjectError = createAction(ProjectsActions.UPDATE_PROJECT_ERROR);
