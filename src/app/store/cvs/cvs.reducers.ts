import { createFeature, createReducer, on } from "@ngrx/store";
import { CvStateInterface } from "../state/cvState";
import {
  addCv,
  addCvError,
  addCvSuccess,
  addNewCv,
  deleteCv,
  deleteCvError,
  deleteCvSuccess,
  deleteNewCv,
  fetchCv,
  fetchCvError,
  fetchCvSuccess,
  fetchCvs,
  fetchCvsError,
  fetchCvsSuccess,
  fetchNewCv,
  resetNewCvs,
  updateCv,
  updateCvError,
  updateCvSuccess,
  updateNewCv,
} from "./cvs.actions";
import { CvInterface } from "../../shared/interfaces/cv";

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

    on(updateCv, state => ({ ...state })),
    on(updateCvSuccess, (state, { updatedCv }) => {
      let updatedCvList: CvInterface[];
      const existingCvIndex = state.cvList.findIndex(cv => cv.id === updatedCv.id);
      if (existingCvIndex !== -1) {
        updatedCvList = state.cvList.map(cv => (cv.id === updatedCv.id ? { ...updatedCv } : cv));
      } else {
        updatedCvList = [...state.cvList, updatedCv];
      }
      return {
        ...state,
        cvList: updatedCvList,
        cv: updatedCv,
        error: null,
      };
    }),
    on(updateCvError, state => ({
      ...state,
      cv: null,
    })),

    on(deleteCv, state => ({ ...state })),
    on(deleteCvSuccess, (state, { deletedCv }) => {
      const updatedCvList: CvInterface[] = state.cvList.filter(cv => cv.id !== deletedCv.id);
      return {
        ...state,
        cvList: updatedCvList,
        cv: deletedCv,
        error: null,
      };
    }),
    on(deleteCvError, state => ({
      ...state,
      cv: null,
    })),

    on(addNewCv, (state, { newCv }) => ({
      ...state,
      newCvList: [...state.newCvList, newCv],
      newCv: null,
    })),
    on(resetNewCvs, state => ({
      ...state,
      newCvList: [],
      newCv: null,
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
    on(fetchNewCv, (state, { newCvName }) => {
      const selectedNewCv = state.newCvList.find(selectedCv => selectedCv.cvName === newCvName);
      return {
        ...state,
        newCv: selectedNewCv,
      };
    }),
    on(deleteNewCv, (state, { deletedCvName }) => {
      const updatedNewCvList = state.newCvList.filter(cv => cv.cvName !== deletedCvName);
      return {
        ...state,
        newCvList: updatedNewCvList,
        newCv: null,
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
