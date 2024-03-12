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
import { concatMap, filter, map, mergeMap, switchMap, take, tap } from "rxjs";
import { EmployeeInterface } from "../../shared/interfaces/employee";
import { Store } from "@ngrx/store";
import { addCv } from "../cvs/cvs.actions";
import { AppState } from "../state/state";
import { selectResponseData } from "./employees.reducers";
import { selectNewCvList } from "../cvs/cvs.reducers";

@Injectable()
export class EmployeesEffects {
  private readonly actions$ = inject(Actions);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly store = inject(Store<AppState>);

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
          tap(() => {
            const responseData$ = this.store.select(selectResponseData);
            const cvData$ = this.store.select(selectNewCvList);
            responseData$
              .pipe(
                filter(responseData => responseData !== null),
                switchMap(responseData =>
                  cvData$.pipe(
                    filter(cvList => cvList !== null),
                    map(cvList => {
                      console.log("before modif:", cvList);
                      return cvList.map(cv => ({
                        ...cv,
                        employeeId: responseData.id,
                        language: cv.language.map(language => ({
                          name: { name: language.name },
                          level: { name: language.level },
                        })),
                      }));
                    }),
                    tap(modifiedCvList => {
                      console.log("modif:", modifiedCvList);
                      modifiedCvList.forEach(modifiedCv => {
                        console.log("modif cvsProjects", modifiedCv.cvsProjects);

                        this.store.dispatch(addCv({ cv: modifiedCv }));
                      });
                    }),
                  ),
                ),
                take(1),
              )
              .subscribe();
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
