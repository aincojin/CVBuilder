import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { CoreApiService } from "../../shared/services/api/core.api.service";
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
} from "./core.actions";
import { BaseEntityInterface } from "../../shared/interfaces/base-entity";

@Injectable()
export class CoreEffects {
  private readonly actions$ = inject(Actions);
  private readonly coreApiService = inject(CoreApiService);

  getSpecializations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSpecializations),
      switchMap(() =>
        this.coreApiService
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
        this.coreApiService
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
        this.coreApiService
          .fetchSkills()
          .pipe(map((skills: BaseEntityInterface[]) => fetchSkillsSuccess({ skills }))),
      ),
    ),
  );

  getTeamRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTeamRoles),
      switchMap(() =>
        this.coreApiService
          .fetchTeamRoles()
          .pipe(map((teamRoles: BaseEntityInterface[]) => fetchTeamRolesSuccess({ teamRoles }))),
      ),
    ),
  );

  getResponsibilities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchResponsibilities),
      switchMap(() =>
        this.coreApiService
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
