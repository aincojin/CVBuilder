import { CvDtoInterface, CvFormInterface } from "../../interfaces/cv";
import { EmployeeInterface } from "../../interfaces/employee";

export function modifyCvsForAddition(
  responseData: EmployeeInterface,
  cvData: CvFormInterface[],
): CvDtoInterface[] {
  console.log("before modif:", cvData);
  return cvData.map(cv => ({
    ...cv,
    employeeId: responseData.id,
    language: cv.language.map(language => ({
      name: { name: language.name },
      level: { name: language.level },
    })),
  }));
}
