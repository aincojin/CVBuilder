import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { SharedApiService } from "../../shared/services/api/shared.api.service";
import {
  fetchDepartments,
  fetchDepartmentsSuccess,
  fetchResponsibilities,
  fetchResponsibilitiesSuccess,
  fetchSkills,
  fetchSkillsSuccess,
  fetchSpecializations,
  fetchSpecializationsSuccess,
  fetchTeamRoles,
  fetchTeamRolesSuccess,
} from "./shared.actions";
import { BaseEntityInterface } from "../../shared/interfaces/base-entity";

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private sharedApiService: SharedApiService,
  ) {}

  getSpecializations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSpecializations),
      switchMap(() =>
        this.sharedApiService
          .fetchSpecializations()
          .pipe(
            map((specializations: BaseEntityInterface[]) =>
              fetchSpecializationsSuccess({ specializations }),
            ),
          ),
      ),
    ),
  );

  getDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDepartments),
      switchMap(() =>
        this.sharedApiService
          .fetchDepartments()
          .pipe(
            map((departments: BaseEntityInterface[]) => fetchDepartmentsSuccess({ departments })),
          ),
      ),
    ),
  );

  getSkills$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSkills),
      switchMap(() =>
        this.sharedApiService
          .fetchSkills()
          .pipe(map((skills: BaseEntityInterface[]) => fetchSkillsSuccess({ skills }))),
      ),
    ),
  );

  getTeamRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTeamRoles),
      switchMap(() =>
        this.sharedApiService
          .fetchTeamRoles()
          .pipe(map((teamRoles: BaseEntityInterface[]) => fetchTeamRolesSuccess({ teamRoles }))),
      ),
    ),
  );

  getResponsibilities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchResponsibilities),
      switchMap(() =>
        this.sharedApiService
          .fetchResponsibilities()
          .pipe(
            map((responsibilities: BaseEntityInterface[]) =>
              fetchResponsibilitiesSuccess({ responsibilities }),
            ),
          ),
      ),
    ),
  );
}
