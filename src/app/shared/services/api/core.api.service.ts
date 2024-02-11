import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../constants/api";
import { BaseEntityInterface } from "../../interfaces/base-entity";

@Injectable({
  providedIn: "root",
})
export class CoreApiService {
  constructor(private http: HttpClient) {}

  public fetchSpecializations(): Observable<BaseEntityInterface[]> {
    const endpoint = `${API_URL}/specializations`;
    return this.http.get<BaseEntityInterface[]>(endpoint);
  }
  public fetchDepartments(): Observable<BaseEntityInterface[]> {
    const endpoint = `${API_URL}/departments`;
    return this.http.get<BaseEntityInterface[]>(endpoint);
  }

  public fetchSkills(): Observable<BaseEntityInterface[]> {
    const endpoint = `${API_URL}/skills`;
    return this.http.get<BaseEntityInterface[]>(endpoint);
  }

  public fetchTeamRoles(): Observable<BaseEntityInterface[]> {
    const endpoint = `${API_URL}/team-roles`;
    return this.http.get<BaseEntityInterface[]>(endpoint);
  }

  public fetchResponsibilities(): Observable<BaseEntityInterface[]> {
    const endpoint = `${API_URL}/responsibilities`;
    return this.http.get<BaseEntityInterface[]>(endpoint);
  }
}
