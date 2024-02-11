import { Routes } from "@angular/router";
import { Paths } from "../../shared/enums/routes";

export const PROJECTS_ROUTES: Routes = [
  {
    path: Paths.Base,
    loadComponent: () =>
      import("./pages/projects-page/projects-page.component").then(m => m.ProjectsPageComponent),
    children: [
      {
        path: Paths.CreateProject,
        title: "Create Project",
        loadComponent: () =>
          import("./pages/create-project-page/create-project-page.component").then(
            r => r.CreateProjectPageComponent,
          ),
      },
      {
        path: Paths.EditProjectId,
        title: "Edit Project",
        loadComponent: () =>
          import("./pages/edit-project-page/edit-project-page.component").then(
            m => m.EditProjectPageComponent,
          ),
      },
      {
        path: Paths.Base,
        title: "Employee List",
        loadComponent: () =>
          import("./pages/project-list-page/project-list-page.component").then(
            m => m.ProjectListPageComponent,
          ),
      },
      {
        path: "**",
        redirectTo: Paths.Base,
        pathMatch: "full",
      },
    ],
  },
];
