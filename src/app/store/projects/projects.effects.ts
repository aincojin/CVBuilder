import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of, switchMap } from "rxjs";
import { PROJECT_SUCCESS_MESSAGES } from "../../shared/constants/successMessages";
import { ErrorInterface } from "../../shared/interfaces/error";
import { ProjectsApiService } from "../../shared/services/api/projects.api.service";
import { NotificationsService } from "../../shared/services/notifications.service";
import {
  addProject,
  addProjectError,
  addProjectSuccess,
  fetchProject,
  fetchProjectSuccess,
  fetchProjects,
  fetchProjectsSuccess,
  updateProject,
  updateProjectError,
  updateProjectSuccess,
} from "./projects.actions";

@Injectable()
export class ProjectsEffects {
  private readonly actions$ = inject(Actions);
  private readonly projectsApiService = inject(ProjectsApiService);
  private readonly notificationService = inject(NotificationsService);

  private messageList = PROJECT_SUCCESS_MESSAGES;

  getProjectList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjects),
      switchMap(() =>
        this.projectsApiService
          .fetchProjects()
          .pipe(map(projectList => fetchProjectsSuccess({ projectList: projectList }))),
      ),
    ),
  );

  getProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProject),
      switchMap(action =>
        this.projectsApiService
          .fetchProject(action.projectId)
          .pipe(map(project => fetchProjectSuccess({ project }))),
      ),
    ),
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      concatMap(action =>
        this.projectsApiService.addProject(action.newProject).pipe(
          map(addedProject => {
            this.notificationService.successMessage(this.messageList.added);
            return addProjectSuccess({ addedProject });
          }),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(addProjectError({ error: error }));
      }),
    ),
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      mergeMap(action =>
        this.projectsApiService.updateProject(action.project, action.projectId).pipe(
          map(updatedProject => {
            this.notificationService.successMessage(this.messageList.updated);
            return updateProjectSuccess({ updatedProject });
          }),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(updateProjectError({ error: error }));
      }),
    ),
  );
}
