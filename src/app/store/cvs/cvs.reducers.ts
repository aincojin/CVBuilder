import { createFeature, createReducer, on } from "@ngrx/store";
import { CvStateInterface } from "../state/cvState";
import {
  addCv,
  addCvError,
  addCvSuccess,
  fetchCv,
  fetchCvError,
  fetchCvSuccess,
  fetchCvs,
  fetchCvsError,
  fetchCvsSuccess,
} from "./cvs.actions";

const initialState: CvStateInterface = {
  cvList: [],
  cv: null,
  error: null,
  isLoading: false,
};

const cvFeature = createFeature({
  name: "cvs",
  reducer: createReducer(
    initialState,
    on(fetchCvs, state => ({ ...state })),
    on(fetchCvsSuccess, (state, { cvList }) => ({
      ...state,
      cvList,
    })),
    on(fetchCvsError, state => ({
      ...state,
      cvList: null,
    })),

    on(fetchCv, state => ({ ...state })),
    on(fetchCvSuccess, (state, { cv }) => ({
      ...state,
      cv,
    })),
    on(fetchCvError, state => ({
      ...state,
      cv: null,
    })),

    on(addCv, state => ({
      ...state,
    })),
    on(addCvSuccess, (state, { addedCv }) => ({
      ...state,
      cvList: [...state.cvList, addedCv],
    })),
    on(addCvError, state => ({
      ...state,
    })),
  ),
});

export const {
  name: cvFeatureKey,
  reducer: cvReducer,
  selectCv,
  selectCvList,
  selectIsLoading,
} = cvFeature;
