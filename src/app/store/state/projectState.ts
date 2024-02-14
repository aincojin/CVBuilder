import { ErrorInterface } from "../../shared/interfaces/error";
import { ProjectInterface } from "../../shared/interfaces/project";

export interface ProjectStateInterface {
  projectList: ProjectInterface[];
  project: ProjectInterface;
  error: ErrorInterface;
  isLoading: boolean;
}
