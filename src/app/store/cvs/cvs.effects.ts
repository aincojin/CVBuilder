import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, switchMap, tap } from "rxjs";
import { CvInterface } from "../../shared/interfaces/cv";
import { ErrorInterface } from "../../shared/interfaces/error";
import { CvsApiService } from "../../shared/services/api/cvs.api.service";
import { NotificationsService } from "../../shared/services/notifications.service";
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
      concatMap(action =>
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
