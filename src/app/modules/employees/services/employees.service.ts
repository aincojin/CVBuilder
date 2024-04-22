import { Injectable, inject } from "@angular/core";
import { addCv, addNewCv, resetNewCvs } from "../../../store/cvs/cvs.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/state/state";
import { CvsService } from "../../../shared/services/cvs.service";
import { CvInterface } from "../../../shared/interfaces/cv";
import { EmployeeInterface, EmployeeDtoInterface } from "../../../shared/interfaces/employee";
import { ProjectSelectFormInterface } from "../../../shared/interfaces/project-select";
import { FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private readonly store = inject(Store<AppState>);
  private readonly cvsSharedService = inject(CvsService);

  public getCvsByEmployeeId(cvList: CvInterface[], employeeId: number): void {
    const filteredCvs = cvList.filter(cv => cv.employeeId === +employeeId);
    console.log("service filtered cvlist: ", filteredCvs);
    const transformedCvs = filteredCvs.map(cv => this.cvsSharedService.cvToCvForm(cv));
    console.log("service transformed cvlist: ", transformedCvs);
    transformedCvs.forEach(cv => this.store.dispatch(addNewCv({ newCv: cv })));
  }

  public transformToDto(employee: EmployeeInterface): EmployeeDtoInterface {
    const employeeDto: EmployeeDtoInterface = {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department.name,
      specialization: employee.specialization.name,
    };

    return employeeDto;
  }

  public clearProjectSelectForm(projectForm: FormGroup): void {
    let newNameControl = projectForm.get("newName");
    let originalProjectControl = projectForm.get("originalProject");

    projectForm.reset();
    newNameControl.markAsUntouched();
    originalProjectControl.markAsUntouched();
    newNameControl.setErrors({});
    originalProjectControl.setErrors({});
  }
}
