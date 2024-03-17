import { Injectable, inject } from "@angular/core";
import { EmployeeInterface } from "../../../shared/interfaces/employee";
import { CvDtoInterface, CvFormInterface, CvInterface } from "../../../shared/interfaces/cv";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, filter, switchMap, map, tap, take } from "rxjs";
import { addCv, addNewCv, resetNewCvs } from "../../../store/cvs/cvs.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/state/state";
import { selectCvList } from "../../../store/cvs/cvs.reducers";
import { CvsService } from "../../../shared/services/cvs.service";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private readonly store = inject(Store<AppState>);
  private readonly cvsSharedService = inject(CvsService);

  public getCvsByEmployeeId(employeeId: number): Observable<CvFormInterface[]> {
    return this.store.select(selectCvList).pipe(
      map(cvList => {
        const filteredCvs = cvList.filter(cv => cv.employeeId === +employeeId);
        console.log("service filtered cvlist: ", filteredCvs);
        const transformedCvs = filteredCvs.map(cv => this.cvsSharedService.cvToCvForm(cv));
        console.log("service transformed cvlist: ", transformedCvs);
        return transformedCvs;
      }),
    );
  }
}
