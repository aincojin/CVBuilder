import { ErrorInterface } from "../../shared/interfaces/error";
import { ProjectDtoInterface, ProjectInterface } from "../../shared/interfaces/project";

export interface ProjectStateInterface {
  newProject: ProjectDtoInterface;
  newProjectList: ProjectDtoInterface[];

  projectList: ProjectInterface[];
  project: ProjectInterface;
  error: ErrorInterface;
  isLoading: boolean;
}
