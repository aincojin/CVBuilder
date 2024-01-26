import { Routes } from "@angular/router";
import { AuthPageComponent } from "./modules/auth/pages/auth-page/auth-page.component";
import { Paths } from "./shared/enums/routes";
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  { path: Paths.Auth, title: "Authorization", component: AuthPageComponent },
  {
    path: Paths.Main,
    loadComponent: () =>
      import("./modules/core/pages/main-page/main-page.component").then(m => m.MainPageComponent),
    canMatch: [authGuard],

    children: [
      { path: Paths.Base, redirectTo: Paths.Employees, pathMatch: "full" },
      {
        path: Paths.Employees,
        loadChildren: () =>
          import("./modules/employees/employees.routes").then(r => r.EMPLOYEES_ROUTES),
      },
      {
        path: Paths.Projects,
        loadChildren: () =>
          import("./modules/projects/projects.routes").then(r => r.PROJECTS_ROUTES),
      },
      {
        path: "**",
        redirectTo: Paths.Employees,
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "auth",
    pathMatch: "full",
  },
];
