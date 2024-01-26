import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeesApiService } from "../../shared/services/api/employees.api.service";
import {
  addEmployee,
  addEmployeeSuccess,
  fetchEmployees,
  fetchEmployeesSuccess,
} from "./employees.actions";
import { concatMap, map, mergeMap, switchMap } from "rxjs";
import { EmployeeDtoInterface, EmployeeInterface } from "../../shared/interfaces/employee";

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesApiService: EmployeesApiService,
  ) {}

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

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      mergeMap(action =>
        this.employeesApiService.addEmployee(action.newEmployee).pipe(
          map(addedEmployee => {
            return addEmployeeSuccess({ addedEmployee });
          }),
        ),
      ),
    ),
  );
}
