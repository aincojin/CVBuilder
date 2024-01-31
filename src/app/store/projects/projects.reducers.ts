import { createFeature, createReducer, on } from "@ngrx/store";
import { ProjectStateInterface } from "../state/projectState";
import { fetchProjects, fetchProjectsError, fetchProjectsSuccess } from "./projects.actions";

const initialState: ProjectStateInterface = {
  projectList: null,
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
  ),
});

export const {
  name: projectFeatureKey,
  reducer: projectReducer,
  selectProjectList,
} = projectFeature;
