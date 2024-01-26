import { Routes } from "@angular/router";
import { Paths } from "../../shared/enums/routes";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: Paths.Base,
    loadComponent: () =>
      import("./pages/employees-page/employees-page.component").then(r => r.EmployeesPageComponent),

    children: [
      {
        path: Paths.CreateEmployee,
        title: "Create Employee",
        loadComponent: () =>
          import("./pages/create-employee-page/create-employee-page.component").then(
            r => r.CreateEmployeePageComponent,
          ),
      },
      {
        path: Paths.EditEmployee,
        title: "Edit Employee",
        loadComponent: () =>
          import("./pages/edit-employee-page/edit-employee-page.component").then(
            r => r.EditEmployeePageComponent,
          ),
      },
      {
        path: Paths.Base,
        title: "Employee List",
        loadComponent: () =>
          import("./pages/employee-list-page/employee-list-page.component").then(
            r => r.EmployeeListPageComponent,
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
