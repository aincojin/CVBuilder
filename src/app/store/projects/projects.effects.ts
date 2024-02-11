import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsApiService } from "../../shared/services/api/projects.api.service";
import { Injectable } from "@angular/core";
import {
  addProject,
  addProjectSuccess,
  fetchProject,
  fetchProjectSuccess,
  fetchProjects,
  fetchProjectsSuccess,
  updateProject,
  updateProjectSuccess,
} from "./projects.actions";
import { ProjectInterface } from "../../shared/interfaces/project";
import { switchMap, map, concatMap } from "rxjs";

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
        this.projectsApiService.fetchProjects().pipe(
          // map((projectList: ProjectInterface[]) => fetchProjectsSuccess({ projectList }))),
          map(projectList => {
            const modifiedProjectList: ProjectInterface[] = projectList.map(project => ({
              ...project,
              startDate: this.formatDate(project.startDate),
              endDate: this.formatDate(project.endDate),
            })) as ProjectInterface[];
            return fetchProjectsSuccess({ projectList: modifiedProjectList });
          }),
        ),
      ),
    ),
  );

  getProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProject),
      switchMap(action =>
        this.projectsApiService.fetchProject(action.projectId).pipe(
          map(project => {
            return fetchProjectSuccess({ project });
          }),
        ),
      ),
    ),
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      concatMap(action =>
        this.projectsApiService.addProject(action.newProject).pipe(
          map(addedProject => {
            return addProjectSuccess({ addedProject });
          }),
        ),
      ),
    ),
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      concatMap(action =>
        this.projectsApiService.updateProject(action.project, action.projectId).pipe(
          map(updatedProject => {
            return updateProjectSuccess({ updatedProject });
          }),
        ),
      ),
    ),
  );

  private formatDate(date: string): string {
    const modifiedDate = new Date(date).toISOString().split("T")[0];
    return modifiedDate.toString();
  }
}
