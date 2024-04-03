import { FormMessageInterface, SuccessMessageInterface } from "../interfaces/notifications";

export const CV_FORM_NOTIFICATIONS: FormMessageInterface = {
  valid: "Cv was saved!",
  invalid: "Cv wasn`t saved. Seems, some fields are invalid",
};
export const EMPLOYEE_FORM_NOTIFICATIONS: FormMessageInterface = {
  valid: "Employee info is valid",
  invalid: "Employee info is invalid",
};
export const PROJECT_FORM_NOTIFICATIONS: FormMessageInterface = {
  valid: "Project form is valid",
  invalid: "Project form is invalid. Changes won't be saved",
};
export const EMPLOYEE_SUCCESS_MESSAGES: SuccessMessageInterface = {
  updated: "Employee successfully updated!",
  added: "Employee successfully added!",
};

export const PROJECT_SUCCESS_MESSAGES: SuccessMessageInterface = {
  updated: "Project successfully updated!",
  added: "Project successfully added!",
};

export const AUTH_MESSAGES = {
  401: "Error 401: Invalid Token",
  403: "Error 403",
};
