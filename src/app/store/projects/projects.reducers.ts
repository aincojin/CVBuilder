import { createFeature, createReducer, on } from "@ngrx/store";
import { ProjectStateInterface } from "../state/projectState";
import {
  addProject,
  addProjectError,
  addProjectSuccess,
  fetchProjects,
  fetchProjectsError,
  fetchProjectsSuccess,
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
    on(addProject, state => ({ ...state })),
    on(addProjectSuccess, (state, { addedProject }) => ({
      ...state,
      projectList: [...state.projectList, addedProject],
    })),
    on(addProjectError, state => ({
      ...state,
    })),
  ),
});

export const {
  name: projectFeatureKey,
  reducer: projectReducer,
  selectProjectList,
} = projectFeature;
