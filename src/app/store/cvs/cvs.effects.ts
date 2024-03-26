import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { CvsApiService } from "../../shared/services/api/cvs.api.service";
import {
  addCv,
  addCvError,
  addCvSuccess,
  deleteCv,
  deleteCvError,
  deleteCvSuccess,
  fetchCv,
  fetchCvSuccess,
  fetchCvs,
  fetchCvsSuccess,
  updateCv,
  updateCvError,
  updateCvSuccess,
} from "./cvs.actions";
import { CvInterface } from "../../shared/interfaces/cv";
import { Injectable, inject } from "@angular/core";
import { switchMap, map, concatMap, mergeMap, tap, catchError, of } from "rxjs";
import { ErrorInterface } from "../../shared/interfaces/error";
import { updateEmployeeError } from "../employees/employees.actions";
import { NotificationsService } from "../../shared/services/notifications.service";

@Injectable()
export class CvsEffects {
  private readonly actions$ = inject(Actions);
  private readonly cvsApiService = inject(CvsApiService);
  private readonly notificationService = inject(NotificationsService);

  getCvs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCvs),
      switchMap(() =>
        this.cvsApiService
          .fetchCvs()
          .pipe(map((cvList: CvInterface[]) => fetchCvsSuccess({ cvList }))),
      ),
    ),
  );

  getCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCv),
      switchMap(action =>
        this.cvsApiService
          .fetchCv(action.cvId)
          .pipe(map((cv: CvInterface) => fetchCvSuccess({ cv }))),
      ),
    ),
  );

  addCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCv),
      concatMap(action =>
        this.cvsApiService.addCv(action.cv).pipe(
          tap(addedCv => {
            console.log("Added CV:", addedCv);
          }),
          map(addedCv => addCvSuccess({ addedCv })),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(addCvError({ error: error }));
      }),
    ),
  );

  updateCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCv),
      mergeMap(action =>
        this.cvsApiService.updateCv(action.cv, action.cvId).pipe(
          map(updatedCv => {
            return updateCvSuccess({ updatedCv });
          }),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(updateCvError({ error: error }));
      }),
    ),
  );

  deleteCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCv),
      switchMap(action =>
        this.cvsApiService.deleteCv(action.cvId).pipe(
          map(deletedCv => {
            return deleteCvSuccess({ deletedCv });
          }),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(deleteCvError({ error: error }));
      }),
    ),
  );
}
