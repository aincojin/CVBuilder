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
  updateEmployee,
  updateEmployeeError,
  updateEmployeeSuccess,
} from "./employees.actions";

const initialState: EmployeeStateInterface = {
  employeeList: [],
  employee: null,
  error: null,
  responseData: null,
  isLoading: false,
};

const employeeFeature = createFeature({
  name: "employees",
  reducer: createReducer(
    initialState,
    on(fetchEmployees, state => ({ ...state, isLoading: true })),
    on(fetchEmployeesSuccess, (state, { employeeList }) => ({
      ...state,
      employeeList,
      employee: null,
      error: null,
      isLoading: false,
    })),
    on(fetchEmployeesError, (state, { error }) => ({
      ...state,
      employeeList: null,
      employee: null,
      error,
      isLoading: false,
    })),

    on(fetchEmployee, state => ({ ...state })),
    on(fetchEmployeeSuccess, (state, { employee }) => ({
      ...state,
      employee,
      error: null,
    })),
    on(fetchEmployeeError, (state, { error }) => ({
      ...state,
      employee: null,
      error,
    })),

    on(addEmployee, state => ({ ...state })),
    on(addEmployeeSuccess, (state, { addedEmployee }) => ({
      ...state,
      employeeList: [...state.employeeList, addedEmployee],
      error: null,
      responseData: addedEmployee,
    })),
    on(addEmployeeError, (state, { error }) => ({
      ...state,
      error,
    })),

    on(updateEmployee, state => ({ ...state })),
    on(updateEmployeeSuccess, (state, { updatedEmployee }) => {
      const updatedEmployeeList = state.employeeList.map(employee =>
        employee.id === updatedEmployee.id ? { ...updatedEmployee } : employee,
      );
      return {
        ...state,
        employeeList: updatedEmployeeList,
        employee: updatedEmployee,
        responseData: updatedEmployee,
        error: null,
      };
    }),
    on(updateEmployeeError, (state, { error }) => ({
      ...state,
      employee: null,
      error,
    })),
  ),
});

export const {
  name: employeeFeatureKey,
  reducer: employeeReducer,
  selectEmployeeList,
  selectEmployee,
  selectIsLoading,
  selectResponseData,
} = employeeFeature;
