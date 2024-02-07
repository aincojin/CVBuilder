import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectDtoInterface, ProjectInterface } from "../../interfaces/project";
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
  public addProject(newProjectData: ProjectDtoInterface): Observable<ProjectInterface> {
    const endpoint = `${API_URL}/projects`;
    return this.http.post<ProjectInterface>(endpoint, newProjectData);
  }
}
