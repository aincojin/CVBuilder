import { createAction, props } from "@ngrx/store";
import { EmployeeDtoInterface, EmployeeInterface } from "../../shared/interfaces/employee";

export enum EmployeeActions {
  GET_EMPLOYEES = "[Employees] Get Employees",
  GET_EMPLOYEES_SUCCESS = "[Employees] Get Employees Success",
  GET_EMPLOYEES_ERROR = "[Employees] Get Employees Error",

  GET_EMPLOYEE = "[Employee] Get Employee",
  GET_EMPLOYEE_SUCCESS = "[Employee] Get Employee Success",
  GET_EMPLOYEE_ERROR = "[Employee] Get Employee Error",

  ADD_EMPLOYEE = "[Employees] Add Employee",
  ADD_EMPLOYEE_SUCCESS = "[Employees] Add Employee Success",
  ADD_EMPLOYEE_ERROR = "[Employees] Add Employee Error",

  UPDATE_EMPLOYEE = "[Employees] Upadate Employee",
  UPDATE_EMPLOYEE_SUCCESS = "[Employees] Upadate Employee Success",
  UPDATE_EMPLOYEE_ERROR = "[Employees] Upadate Employee Error",
}

export const fetchEmployees = createAction(EmployeeActions.GET_EMPLOYEES);
export const fetchEmployeesSuccess = createAction(
  EmployeeActions.GET_EMPLOYEES_SUCCESS,
  props<{ employeeList: EmployeeInterface[] }>(),
);
export const fetchEmployeesError = createAction(EmployeeActions.GET_EMPLOYEES_ERROR);

export const fetchEmployee = createAction(
  EmployeeActions.GET_EMPLOYEE,
  props<{ employeeId: number }>(),
);
export const fetchEmployeeSuccess = createAction(
  EmployeeActions.GET_EMPLOYEE_SUCCESS,
  props<{ employee: EmployeeInterface }>(),
);
export const fetchEmployeeError = createAction(EmployeeActions.GET_EMPLOYEE_ERROR);

export const addEmployee = createAction(
  EmployeeActions.ADD_EMPLOYEE,
  props<{ newEmployee: EmployeeDtoInterface }>(),
);
export const addEmployeeSuccess = createAction(
  EmployeeActions.ADD_EMPLOYEE_SUCCESS,
  props<{ addedEmployee: EmployeeInterface }>(),
);
export const addEmployeeError = createAction(EmployeeActions.ADD_EMPLOYEE_ERROR);
