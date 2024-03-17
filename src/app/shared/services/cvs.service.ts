import { Injectable } from "@angular/core";
import { CvInterface, CvFormInterface } from "../interfaces/cv";

@Injectable({
  providedIn: "root",
})
export class CvsService {
  public cvToCvForm(cvData: CvInterface): CvFormInterface {
    return {
      cvName: cvData.cvName,
      firstName: cvData.firstName,
      lastName: cvData.lastName,
      email: cvData.email,
      skills: cvData.skills.map(skill => skill.name),
      department: cvData.department.name,
      specialization: cvData.specialization.name,
      language: cvData.language.map(language => ({
        name: language.name.name,
        level: language.level.name,
      })),
      projects: cvData.cvsProjects.map(project => ({
        ...project,
        techStack: project.techStack.map(skill => skill.name),
        responsibilities: project.responsibilities.map(resp => resp.name),
        teamRoles: project.teamRoles.map(role => role.name),
      })),
    };
  }
  public cvFormToCvDto(cvData: CvFormInterface, employeeId: number) {
    return {
      ...cvData,
      employeeId,
      language: cvData.language.map(language => ({
        level: { name: language.level },
        name: { name: language.name },
      })),
    };
  }
}
