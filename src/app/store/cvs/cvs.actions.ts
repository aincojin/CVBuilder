import { createAction, props } from "@ngrx/store";
import { CvDtoInterface, CvFormInterface, CvInterface } from "../../shared/interfaces/cv";

export enum CvsActions {
  ADD_NEW_CV = "[Cvs] Add New Cv",
  UPDATE_NEW_CV = "[Cvs] Update New Cv",
  GET_NEW_CV = "[Cv] Get New Cv",
  DELETE_NEW_CV = "[Cvs] Delete New Cv",
  RESET_NEW_CVS = "[Cvs] Reset New Cvs",

  GET_CVS = "[Cvs] Get Cvs",
  GET_CVS_SUCCESS = "[Cvs] Get Cvs Success",
  GET_CVS_ERROR = "[Cvs] Get Cvs Error",

  GET_CV = "[Cvs] Get Cv",
  GET_CV_SUCCESS = "[Cvs] Get Cv Success",
  GET_CV_ERROR = "[Cvs] Get Cv Error",

  ADD_CV = "[Cvs] Add Cv",
  ADD_CV_SUCCESS = "[Cvs] Add Cv Success",
  ADD_CV_ERROR = "[Cvs] Add Cv Error",

  UPDATE_CV = "[Cvs] Update Cv",
  UPDATE_CV_SUCCESS = "[CVS] Update Cv Success",
  UPDATE_CV_ERROR = "[CVS] Update Cv Error",
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

export const updateCv = createAction(
  CvsActions.UPDATE_CV,
  props<{ cvId: number; cv: CvDtoInterface }>(),
);
export const updateCvSuccess = createAction(
  CvsActions.UPDATE_CV_SUCCESS,
  props<{ updatedCv: CvInterface }>(),
);
export const updateCvError = createAction(CvsActions.UPDATE_CV_ERROR);

export const addNewCv = createAction(CvsActions.ADD_NEW_CV, props<{ newCv: CvFormInterface }>());
export const resetNewCvs = createAction(CvsActions.RESET_NEW_CVS);
export const fetchNewCv = createAction(CvsActions.GET_NEW_CV, props<{ newCvName: string }>());
export const updateNewCv = createAction(
  CvsActions.UPDATE_NEW_CV,
  props<{ updatedNewCv: CvFormInterface }>(),
);
export const deleteNewCv = createAction(
  CvsActions.DELETE_NEW_CV,
  props<{ deletedCvName: string }>(),
);
