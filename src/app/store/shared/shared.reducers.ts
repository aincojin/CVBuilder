import { createFeature, createReducer, on } from "@ngrx/store";
import { SharedStateInterface } from "../state/sharedState";
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
} from "./shared.actions";
import { state } from "@angular/animations";

const initialState: SharedStateInterface = {
  specializations: null,
  departments: [],
  skills: [],
  teamRoles: [],
  responsibilities: [],
};

const sharedFeature = createFeature({
  name: "shared",
  reducer: createReducer(
    initialState,
    on(fetchSpecializations, state => ({ ...state })),
    on(fetchSpecializationsSuccess, (state, { specializations }) => ({
      ...state,
      specializations,
    })),
    on(fetchSpecializationsError, state => ({
      ...state,
      specializations: null,
    })),

    on(fetchDepartments, state => ({ ...state })),
    on(fetchDepartmentsSuccess, (state, { departments }) => ({
      ...state,
      departments,
    })),
    on(fetchDepartmentsError, state => ({
      ...state,
      departments: null,
    })),

    on(fetchSkills, state => ({ ...state })),
    on(fetchSkillsSuccess, (state, { skills }) => ({
      ...state,
      skills,
    })),
    on(fetchSkillsError, state => ({
      ...state,
      skills: null,
    })),

    on(fetchTeamRoles, state => ({ ...state })),
    on(fetchTeamRolesSuccess, (state, { teamRoles }) => ({
      ...state,
      teamRoles,
    })),
    on(fetchTeamRolesError, state => ({
      ...state,
      teamRoles: null,
    })),

    on(fetchResponsibilities, state => ({ ...state })),
    on(fetchResponsibilitiesSuccess, (state, { responsibilities }) => ({
      ...state,
      responsibilities,
    })),
    on(fetchResponsibilitiesError, state => ({
      ...state,
      responsibilities: null,
    })),
  ),
});
export const {
  name: sharedFeatureKey,
  reducer: sharedReducer,
  selectDepartments,
  selectResponsibilities,
  selectSkills,
  selectSpecializations,
  selectTeamRoles,
} = sharedFeature;
