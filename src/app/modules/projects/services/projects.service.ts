import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ProjectInterface, ProjectDtoInterface } from "../../../shared/interfaces/project";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  public fromProjectToDto(project$: Observable<ProjectInterface>): Observable<ProjectDtoInterface> {
    return project$.pipe(
      map(project => {
        const projectDto: ProjectDtoInterface = {
          projectName: project.projectName,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          teamSize: project.teamSize,
          techStack: project.techStack.map(skill => skill.name),
          responsibilities: project.responsibilities.map(resp => resp.name),
          teamRoles: project.teamRoles.map(role => role.name),
        };
        console.log("Converted Project to ProjectDto:", projectDto);
        return projectDto;
      }),
    );
  }
}
