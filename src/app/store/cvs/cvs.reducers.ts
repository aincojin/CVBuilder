import { createFeature, createReducer, on } from "@ngrx/store";
import { CvStateInterface } from "../state/cvState";
import {
  addCv,
  addCvError,
  addCvSuccess,
  addNewCv,
  fetchCv,
  fetchCvError,
  fetchCvSuccess,
  fetchCvs,
  fetchCvsError,
  fetchCvsSuccess,
  fetchNewCv,
  updateNewCv,
} from "./cvs.actions";

const initialState: CvStateInterface = {
  newCvList: [],
  newCv: null,

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

    on(addNewCv, (state, { newCv }) => ({
      ...state,
      newCvList: [...state.newCvList, newCv],
    })),
    on(updateNewCv, (state, { updatedNewCv }) => {
      const updatedNewCvList = state.newCvList.map(newCv =>
        newCv.cvName === updatedNewCv.cvName ? { ...updatedNewCv } : newCv,
      );
      return {
        ...state,
        newCvList: updatedNewCvList,
        newCv: updatedNewCv,
        error: null,
      };
    }),
  ),
});

export const {
  name: cvFeatureKey,
  reducer: cvReducer,
  selectNewCvList,
  selectNewCv,
  selectCv,
  selectCvList,
  selectIsLoading,
} = cvFeature;
