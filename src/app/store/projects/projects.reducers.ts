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
  projectList: [],
  project: null,
};

const projectFeature = createFeature({
  name: "projects",
  reducer: createReducer(
    initialState,
    on(fetchProjects, state => ({ ...state })),
    on(fetchProjectsSuccess, (state, { projectList }) => ({
      ...state,
      projectList,
    })),
    on(fetchProjectsError, state => ({
      ...state,
      projectList: null,
    })),

    on(fetchProject, state => ({ ...state })),
    on(fetchProjectSuccess, (state, { project }) => ({
      ...state,
      project,
    })),
    on(fetchProjectError, state => ({
      ...state,
      project: null,
    })),

    on(addProject, state => ({ ...state })),
    on(addProjectSuccess, (state, { addedProject }) => ({
      ...state,
      projectList: [...state.projectList, addedProject],
    })),
    on(addProjectError, state => ({
      ...state,
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
        error: null,
      };
    }),
    on(updateProjectError, state => ({
      ...state,
      project: null,
    })),
  ),
});

export const {
  name: projectFeatureKey,
  reducer: projectReducer,
  selectProjectList,
  selectProject,
} = projectFeature;
