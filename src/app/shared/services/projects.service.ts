import { Injectable } from "@angular/core";
import { ProjectInterface, ProjectDtoInterface } from "../interfaces/project";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  public fromProjectToDto(project: ProjectInterface): ProjectDtoInterface {
    const projectDto: ProjectDtoInterface = {
      id: project.id,
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      teamSize: project.teamSize,
      techStack: project.techStack.map(skill => skill.name),
      responsibilities: project.responsibilities.map(resp => resp.name),
      teamRoles: project.teamRoles.map(role => role.name),
    };
    console.log(projectDto);

    return projectDto;
  }
}
