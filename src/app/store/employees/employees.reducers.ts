import { createFeature, createReducer, on } from "@ngrx/store";
import { EmployeeStateInterface } from "../state/employeeState";
import {
  addEmployee,
  addEmployeeError,
  addEmployeeSuccess,
  fetchEmployee,
  fetchEmployeeError,
  fetchEmployeeSuccess,
  fetchEmployees,
  fetchEmployeesError,
  fetchEmployeesSuccess,
} from "./employees.actions";
import { EmployeeDtoInterface } from "../../shared/interfaces/employee";

const initialState: EmployeeStateInterface = {
  employeeList: null,
  employee: null,
};

const employeeFeature = createFeature({
  name: "employees",
  reducer: createReducer(
    initialState,
    on(fetchEmployees, state => ({ ...state })),
    on(fetchEmployeesSuccess, (state, { employeeList }) => ({
      ...state,
      employeeList,
    })),
    on(fetchEmployeesError, state => ({
      ...state,
      employeeList: null,
    })),

    on(fetchEmployee, state => ({ ...state })),
    on(fetchEmployeeSuccess, (state, { employee }) => ({
      ...state,
      employee,
    })),
    on(fetchEmployeeError, state => ({
      ...state,
      employee: null,
    })),

    on(addEmployee, state => ({ ...state })),
    on(addEmployeeSuccess, (state, { addedEmployee }) => ({
      ...state,
      employeeList: [...state.employeeList, addedEmployee],
    })),
    on(addEmployeeError, state => ({
      ...state,
      employee: null,
    })),
  ),
});

export const {
  name: employeeFeatureKey,
  reducer: employeeReducer,
  selectEmployeeList,
  selectEmployee,
} = employeeFeature;
