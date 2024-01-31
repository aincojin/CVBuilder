import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsApiService } from "../../shared/services/api/projects.api.service";
import { Injectable } from "@angular/core";
import { fetchProjects, fetchProjectsSuccess } from "./projects.actions";
import { ProjectInterface } from "../../shared/interfaces/project";
import { switchMap, map } from "rxjs";

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsApiService: ProjectsApiService,
  ) {}

  getProjectList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjects),
      switchMap(() =>
        this.projectsApiService
          .fetchProjects()
          .pipe(map((projectList: ProjectInterface[]) => fetchProjectsSuccess({ projectList }))),
      ),
    ),
  );
}
