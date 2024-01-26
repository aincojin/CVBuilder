import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { API_URL } from "../../constants/api";
import { EmployeeInterface, EmployeeDtoInterface } from "../../interfaces/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeesApiService {
  constructor(private http: HttpClient) {}

  public fetchEmployees(): Observable<EmployeeInterface[]> {
    const endpoint = `${API_URL}/employees`;
    return this.http.get<EmployeeInterface[]>(endpoint).pipe(
      map((employeeList: EmployeeInterface[]) => {
        return employeeList.map((employee: EmployeeInterface) => ({
          ...employee,
          // department: employee.department.name,
          // specialization: employee.specialization.name,
        }));
      }),
    );
  }
  public addEmployee(newEmployeeData: EmployeeDtoInterface): Observable<EmployeeInterface> {
    const endpoint = `${API_URL}/employees`;
    return this.http.post<EmployeeInterface>(endpoint, newEmployeeData);
  }
}
