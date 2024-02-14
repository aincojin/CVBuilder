import { createAction, props } from "@ngrx/store";
import { CvDtoInterface, CvInterface } from "../../shared/interfaces/cv";

export enum CvsActions {
  GET_CVS = "[Cvs] Get Cvs",
  GET_CVS_SUCCESS = "[Cvs] Get Cvs Success",
  GET_CVS_ERROR = "[Cvs] Get Cvs Error",

  GET_CV = "[Cvs] Get Cv",
  GET_CV_SUCCESS = "[Cvs] Get Cv Success",
  GET_CV_ERROR = "[Cvs] Get Cv Error",

  ADD_CV = "[Cvs] Add Cv",
  // ADD_EMPTY_CV="[Cv] Add Empty Cv",
  ADD_CV_SUCCESS = "[Cvs] Add Cv Success",
  ADD_CV_ERROR = "[Cvs] Add Cv Error",

  UPDATE_CV = "[Cvs] Upadate Cv",
  UPDATE_CV_SUCCESS = "[CVS] Upadate Cv Success",
  UPDATE_CV_ERROR = "[CVS] Upadate Cv Error",
}

export const fetchCvs = createAction(CvsActions.GET_CVS);
export const fetchCvsSuccess = createAction(
  CvsActions.GET_CVS_SUCCESS,
  props<{ cvList: CvInterface[] }>(),
);
export const fetchCvsError = createAction(CvsActions.GET_CVS_ERROR);

export const fetchCv = createAction(CvsActions.GET_CV, props<{ cvId: number }>());
export const fetchCvSuccess = createAction(CvsActions.GET_CV_SUCCESS, props<{ cv: CvInterface }>());
export const fetchCvError = createAction(CvsActions.GET_CV_ERROR);

export const addCv = createAction(CvsActions.ADD_CV, props<{ cv: CvDtoInterface }>());
export const addCvSuccess = createAction(
  CvsActions.ADD_CV_SUCCESS,
  props<{ addedCv: CvInterface }>(),
);
export const addCvError = createAction(CvsActions.ADD_CV_ERROR);

export const updateCv = createAction(CvsActions.UPDATE_CV, props<{ cv: CvDtoInterface }>());
export const updateCvSuccess = createAction(
  CvsActions.UPDATE_CV_SUCCESS,
  props<{ updatedCv: CvInterface }>(),
);
export const updateCvError = createAction(CvsActions.UPDATE_CV_ERROR);
