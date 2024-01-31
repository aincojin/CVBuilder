import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectInterface } from "../../interfaces/project";
import { API_URL } from "../../constants/api";

@Injectable({
  providedIn: "root",
})
export class ProjectsApiService {
  constructor(private http: HttpClient) {}

  public fetchProjects(): Observable<ProjectInterface[]> {
    const endpoint = `${API_URL}/projects`;
    return this.http.get<ProjectInterface[]>(endpoint);
  }
}
