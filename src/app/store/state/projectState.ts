import { ErrorInterface } from "../../shared/interfaces/error";
import { ProjectDtoInterface, ProjectInterface } from "../../shared/interfaces/project";

export interface ProjectStateInterface {
  projectList: ProjectInterface[];
  project: ProjectInterface;
  error: ErrorInterface;
  isLoading: boolean;
}
