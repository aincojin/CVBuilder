import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeesApiService } from "../../shared/services/api/employees.api.service";
import {
  addEmployee,
  addEmployeeSuccess,
  fetchEmployee,
  fetchEmployeeSuccess,
  fetchEmployees,
  fetchEmployeesSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from "./employees.actions";
import { concatMap, map, mergeMap, switchMap } from "rxjs";
import { EmployeeInterface } from "../../shared/interfaces/employee";

@Injectable()
export class EmployeesEffects {
  private readonly actions$ = inject(Actions);
  private readonly employeesApiService = inject(EmployeesApiService);

  getEmployeeList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEmployees),
      switchMap(() =>
        this.employeesApiService
          .fetchEmployees()
          .pipe(
            map((employeeList: EmployeeInterface[]) => fetchEmployeesSuccess({ employeeList })),
          ),
      ),
    ),
  );

  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEmployee),
      switchMap(action =>
        this.employeesApiService.fetchEmployee(action.employeeId).pipe(
          map(employee => {
            return fetchEmployeeSuccess({ employee });
          }),
        ),
      ),
    ),
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      concatMap(action =>
        this.employeesApiService.addEmployee(action.newEmployee).pipe(
          map(addedEmployee => {
            return addEmployeeSuccess({ addedEmployee });
          }),
        ),
      ),
    ),
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployee),
      mergeMap(action =>
        this.employeesApiService.updateEmployee(action.employee, action.employeeId).pipe(
          map(updatedEmployee => {
            return updateEmployeeSuccess({ updatedEmployee });
          }),
        ),
      ),
    ),
  );
}
