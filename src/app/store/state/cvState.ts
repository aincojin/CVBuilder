import { CvInterface } from "../../shared/interfaces/cv";
import { ErrorInterface } from "../../shared/interfaces/error";

export interface CvStateInterface {
  cvList: CvInterface[];
  cv: CvInterface;
  error: ErrorInterface;
  isLoading: boolean;
}
