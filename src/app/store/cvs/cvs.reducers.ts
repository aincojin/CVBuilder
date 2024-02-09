import { createFeature, createReducer, on } from "@ngrx/store";
import { CvStateInterface } from "../state/cvState";
import {
  addCv,
  addCvError,
  addCvSuccess,
  fetchCvs,
  fetchCvsError,
  fetchCvsSuccess,
} from "./cvs.actions";

const initialState: CvStateInterface = {
  cvList: [],
  cv: null,
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

export const { name: cvFeatureKey, reducer: cvReducer, selectCv, selectCvList } = cvFeature;
