import { createFeature, createReducer, on } from "@ngrx/store";
import { ProjectStateInterface } from "../state/projectState";
import {
  addProject,
  addProjectError,
  addProjectSuccess,
  fetchProject,
  fetchProjectError,
  fetchProjectSuccess,
  fetchProjects,
  fetchProjectsError,
  fetchProjectsSuccess,
  updateProject,
  updateProjectError,
  updateProjectSuccess,
} from "./projects.actions";

const initialState: ProjectStateInterface = {
  newProject: null,
  newProjectList: [],

  projectList: [],
  project: null,
  error: null,
  isLoading: false,
};

const projectFeature = createFeature({
  name: "projects",
  reducer: createReducer(
    initialState,
    on(fetchProjects, state => ({ ...state, isLoading: true })),
    on(fetchProjectsSuccess, (state, { projectList }) => ({
      ...state,
      projectList,
      error: null,
      isLoading: false,
    })),
    on(fetchProjectsError, (state, { error }) => ({
      ...state,
      projectList: null,
      error,
      isLoading: false,
    })),

    on(fetchProject, state => ({ ...state })),
    on(fetchProjectSuccess, (state, { project }) => ({
      ...state,
      project,
      error: null,
    })),
    on(fetchProjectError, (state, { error }) => ({
      ...state,
      project: null,
      error,
    })),

    on(addProject, state => ({ ...state })),
    on(addProjectSuccess, (state, { addedProject }) => ({
      ...state,
      projectList: [...state.projectList, addedProject],
      error: null,
    })),
    on(addProjectError, (state, { error }) => ({
      ...state,
      error,
    })),

    on(updateProject, state => ({ ...state })),
    on(updateProjectSuccess, (state, { updatedProject }) => {
      const updatedProjectList = state.projectList.map(project =>
        project.id === updatedProject.id ? { ...updatedProject } : project,
      );
      return {
        ...state,
        projectList: updatedProjectList,
        project: updatedProject,
      };
    }),
    on(updateProjectError, (state, { error }) => ({
      ...state,
      project: null,
      error,
    })),
  ),
});

export const {
  name: projectFeatureKey,
  reducer: projectReducer,
  selectProjectList,
  selectProject,
  selectIsLoading,
} = projectFeature;
