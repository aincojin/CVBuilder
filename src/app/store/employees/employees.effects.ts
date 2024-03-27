import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, map, of, switchMap, withLatestFrom } from "rxjs";
import { EMPLOYEE_SUCCESS_MESSAGES } from "../../shared/constants/successMessages";
import { CvDtoInterface, CvFormInterface } from "../../shared/interfaces/cv";
import { ErrorInterface } from "../../shared/interfaces/error";
import { EmployeesApiService } from "../../shared/services/api/employees.api.service";
import { CvsService } from "../../shared/services/cvs.service";
import { NotificationsService } from "../../shared/services/notifications.service";
import { addCv, deleteCv, updateCv } from "../cvs/cvs.actions";
import { selectNewCvList } from "../cvs/cvs.reducers";
import { AppState } from "../state/state";
import {
  addEmployee,
  addEmployeeError,
  addEmployeeSuccess,
  fetchEmployee,
  fetchEmployeeSuccess,
  fetchEmployees,
  fetchEmployeesSuccess,
  updateEmployee,
  updateEmployeeError,
  updateEmployeeSuccess,
} from "./employees.actions";

@Injectable()
export class EmployeesEffects {
  private readonly actions$ = inject(Actions);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly cvsSharedService = inject(CvsService);
  private readonly notificationService = inject(NotificationsService);
  private readonly store = inject(Store<AppState>);

  public messageList = EMPLOYEE_SUCCESS_MESSAGES;

  getEmployeeList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEmployees),
      concatMap(() =>
        this.employeesApiService
          .fetchEmployees()
          .pipe(map(employeeList => fetchEmployeesSuccess({ employeeList }))),
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
          withLatestFrom(this.store.select(selectNewCvList)),
          switchMap(([responseData, cvData]) => {
            const employeeId = responseData.id;
            cvData.forEach(cv => {
              const modifiedCv = this.cvsSharedService.cvFormToCvDto(cv, employeeId);
              console.log("Modified CV projects:", modifiedCv.projects);
              this.store.dispatch(addCv({ cv: modifiedCv }));
            });
            this.notificationService.successMessage(this.messageList.added);
            return of(addEmployeeSuccess({ addedEmployee: responseData }));
          }),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(addEmployeeError({ error: error }));
      }),
    ),
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployee),
      concatMap(action =>
        this.employeesApiService.updateEmployee(action.employee, action.employeeId).pipe(
          withLatestFrom(this.store.select(selectNewCvList)),
          switchMap(([responseData, cvData]) => {
            console.log("responseData:", responseData);
            console.log("cvData:", cvData);
            if (responseData.cvs.length === 0) {
              console.log("no cvs in response");
              cvData.forEach(cv => this.addCvToStore(cv, responseData.id));
            } else {
              console.log("are cvs in response", cvData);
              const cvToDelete = responseData.cvs.filter(
                responseCv => !cvData.some(cv => cv.cvName === responseCv.cvName),
              );
              cvToDelete.forEach(cv => {
                console.log("Deleting CV:", cv);
                this.deleteCvFromStore(cv.id);
              });

              cvData.forEach(cv => {
                let formCvId: number = null;
                const foundCv = responseData.cvs.find(responseCv => {
                  if (cv.cvName === responseCv.cvName) {
                    formCvId = responseCv.id;
                    return true;
                  } else {
                    return false;
                  }
                });
                if (foundCv) {
                  this.updateCvInStore(cv, responseData.id, formCvId);
                } else {
                  console.log("not found(adding to the store)");
                  this.addCvToStore(cv, responseData.id);
                }
              });
            }
            this.notificationService.successMessage(this.messageList.updated);
            return of(updateEmployeeSuccess({ updatedEmployee: responseData }));
          }),
        ),
      ),
      catchError((error: ErrorInterface) => {
        this.notificationService.errorMessage(error.message);
        return of(updateEmployeeError({ error: error }));
      }),
    ),
  );

  public addCvToStore(cv: CvFormInterface, employeeId: number) {
    console.log("addCvsToStore: ", cv, employeeId);
    const addedCv: CvDtoInterface = this.cvsSharedService.cvFormToCvDto(cv, employeeId);
    console.log(addedCv.cvName);
    this.store.dispatch(addCv({ cv: addedCv }));
  }

  public updateCvInStore(cv: CvFormInterface, employeeId: number, cvId: number) {
    console.log("updateCvsToStore: ", cv, employeeId);
    const updatedCv: CvDtoInterface = this.cvsSharedService.cvFormToCvDto(cv, employeeId);
    console.log(updatedCv.cvName);
    this.store.dispatch(updateCv({ cv: updatedCv, cvId: cvId }));
  }

  public deleteCvFromStore(cvId: number) {
    console.log("deleteCvFromStore: ", cvId);
    this.store.dispatch(deleteCv({ cvId: cvId }));
  }
}
