import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CvsApiService } from "../../shared/services/api/cvs.api.service";
import { addCv, addCvSuccess, fetchCvs, fetchCvsSuccess } from "./cvs.actions";
import { CvInterface } from "../../shared/interfaces/cv";
import { Injectable } from "@angular/core";
import { switchMap, map, concatMap } from "rxjs";

@Injectable()
export class CvsEffects {
  constructor(
    private actions$: Actions,
    private cvsApiService: CvsApiService,
  ) {}

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
