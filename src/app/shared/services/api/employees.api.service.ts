import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../constants/api";
import { EmployeeInterface, EmployeeDtoInterface } from "../../interfaces/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeesApiService {
  private readonly http = inject(HttpClient);

  public fetchEmployees(): Observable<EmployeeInterface[]> {
    const endpoint = `${API_URL}/employees`;
    return this.http.get<EmployeeInterface[]>(endpoint);
  }
  public fetchEmployee(employeeId: number): Observable<EmployeeInterface> {
    const endpoint = `${API_URL}/employees/${employeeId}`;
    return this.http.get<EmployeeInterface>(endpoint);
  }

  public addEmployee(newEmployeeData: EmployeeDtoInterface): Observable<EmployeeInterface> {
    const endpoint = `${API_URL}/employees`;
    return this.http.post<EmployeeInterface>(endpoint, newEmployeeData);
  }

  public updateEmployee(
    updatedEmployeeData: EmployeeDtoInterface,
    employeeId: number,
  ): Observable<EmployeeInterface> {
    const endpoint = `${API_URL}/employees/${employeeId}`;
    return this.http.put<EmployeeInterface>(endpoint, updatedEmployeeData);
  }
}
