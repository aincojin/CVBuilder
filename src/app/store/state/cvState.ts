import { CvFormInterface, CvInterface } from "../../shared/interfaces/cv";
import { ErrorInterface } from "../../shared/interfaces/error";

export interface CvStateInterface {
  newCvList: CvFormInterface[];
  newCv: CvFormInterface;

  cvList: CvInterface[];
  cv: CvInterface;
  error: ErrorInterface;
  isLoading: boolean;
}
