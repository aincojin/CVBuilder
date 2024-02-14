import { createFeature, createReducer, on } from "@ngrx/store";
import { CoreStateInterface } from "../state/coreState";
import {
  fetchDepartments,
  fetchDepartmentsError,
  fetchDepartmentsSuccess,
  fetchResponsibilities,
  fetchResponsibilitiesError,
  fetchResponsibilitiesSuccess,
  fetchSkills,
  fetchSkillsError,
  fetchSkillsSuccess,
  fetchSpecializations,
  fetchSpecializationsError,
  fetchSpecializationsSuccess,
  fetchTeamRoles,
  fetchTeamRolesError,
  fetchTeamRolesSuccess,
  setPageTitle,
} from "./core.actions";
import { state } from "@angular/animations";

const initialState: CoreStateInterface = {
  pageTitle: "",
  specializations: null,
  departments: [],
  skills: [],
  teamRoles: [],
  responsibilities: [],
  error: null,
};

const coreFeature = createFeature({
  name: "core",
  reducer: createReducer(
    initialState,
    on(setPageTitle, (state, { pageTitle }) => ({
      ...state,
      pageTitle,
    })),
    on(fetchSpecializations, state => ({ ...state })),
    on(fetchSpecializationsSuccess, (state, { specializations }) => ({
      ...state,
      specializations,
      error: null,
    })),
    on(fetchSpecializationsError, (state, { error }) => ({
      ...state,
      specializations: null,
      error,
    })),

    on(fetchDepartments, state => ({ ...state })),
    on(fetchDepartmentsSuccess, (state, { departments }) => ({
      ...state,
      departments,
      error: null,
    })),
    on(fetchDepartmentsError, (state, { error }) => ({
      ...state,
      departments: null,
      error,
    })),

    on(fetchSkills, state => ({ ...state })),
    on(fetchSkillsSuccess, (state, { skills }) => ({
      ...state,
      skills,
      error: null,
    })),
    on(fetchSkillsError, (state, { error }) => ({
      ...state,
      skills: null,
      error,
    })),

    on(fetchTeamRoles, state => ({ ...state })),
    on(fetchTeamRolesSuccess, (state, { teamRoles }) => ({
      ...state,
      teamRoles,
      error: null,
    })),
    on(fetchTeamRolesError, (state, { error }) => ({
      ...state,
      teamRoles: null,
      error,
    })),

    on(fetchResponsibilities, state => ({ ...state })),
    on(fetchResponsibilitiesSuccess, (state, { responsibilities }) => ({
      ...state,
      responsibilities,
      error: null,
    })),
    on(fetchResponsibilitiesError, (state, { error }) => ({
      ...state,
      responsibilities: null,
      error,
    })),
  ),
});
export const {
  name: coreFeatureKey,
  reducer: coreReducer,
  selectPageTitle,
  selectDepartments,
  selectResponsibilities,
  selectSkills,
  selectSpecializations,
  selectTeamRoles,
} = coreFeature;
