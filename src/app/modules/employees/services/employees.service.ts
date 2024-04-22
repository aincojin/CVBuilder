import { Injectable, inject } from "@angular/core";
import { addCv, addNewCv, resetNewCvs } from "../../../store/cvs/cvs.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/state/state";
import { CvsService } from "../../../shared/services/cvs.service";
import { CvInterface } from "../../../shared/interfaces/cv";

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
}
