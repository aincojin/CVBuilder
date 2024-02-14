import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CvsApiService } from "../../shared/services/api/cvs.api.service";
import {
  addCv,
  addCvSuccess,
  fetchCv,
  fetchCvSuccess,
  fetchCvs,
  fetchCvsSuccess,
} from "./cvs.actions";
import { CvInterface } from "../../shared/interfaces/cv";
import { Injectable, inject } from "@angular/core";
import { switchMap, map, concatMap } from "rxjs";

@Injectable()
export class CvsEffects {
  private readonly actions$ = inject(Actions);
  private readonly cvsApiService = inject(CvsApiService);

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
          map(addedCv => {
            return addCvSuccess({ addedCv });
          }),
        ),
      ),
    ),
  );
}
