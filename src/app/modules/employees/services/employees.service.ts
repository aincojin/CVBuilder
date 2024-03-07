import { Injectable, inject } from "@angular/core";
import { EmployeeInterface } from "../../../shared/interfaces/employee";
import { CvDtoInterface, CvFormInterface, CvInterface } from "../../../shared/interfaces/cv";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable, filter, switchMap, map, tap } from "rxjs";
import { addCv, addNewCv, resetNewCvs } from "../../../store/cvs/cvs.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/state/state";
import { selectCvList } from "../../../store/cvs/cvs.reducers";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private readonly store = inject(Store<AppState>);

  public processResponseData(
    responseData$: Observable<EmployeeInterface>,
    cvData$: Observable<CvFormInterface[]>,
  ): Observable<CvDtoInterface[]> {
    return responseData$.pipe(
      untilDestroyed(this),
      filter(responseData => responseData !== null),
      switchMap(responseData =>
        cvData$.pipe(
          filter(cvList => cvList !== null),
          map(cvList => {
            console.log("response data: ", responseData);
            console.log("before modif: ", cvList);
            return cvList.map(cv => ({
              ...cv,
              employeeId: responseData.id,
              language: cv.language.map(language => ({
                name: { name: language.name },
                level: { name: language.level },
              })),
            }));
          }),
          tap(modifiedCvList => {
            console.log("modif:", modifiedCvList);
            modifiedCvList.forEach(modifiedCv => {
              this.store.dispatch(addCv({ cv: modifiedCv }));
            });
          }),
        ),
      ),
    );
  }

  public getCvsByEmployeeId(employeeId: number): Observable<CvFormInterface[]> {
    return this.store.select(selectCvList).pipe(
      map(cvList => {
        // return cvList.filter(cv => cv.employeeId === +employeeId).map(cv => this.fromCvToForm(cv));
        console.log("service cvlist: ", cvList);
        const filteredCvs = cvList.filter(cv => cv.employeeId === +employeeId);
        console.log("service filtered cvlist: ", filteredCvs);
        const transformedCvs = filteredCvs.map(cv => this.fromCvToForm(cv));
        console.log("service transformed cvlist: ", transformedCvs);
        return transformedCvs;
      }),
      tap(transformed => {
        console.log("Component transformed cvlist: ", transformed);
        this.store.dispatch(resetNewCvs());
        transformed.map(cv => this.store.dispatch(addNewCv({ newCv: cv })));
      }),
    );
  }

  public fromCvToForm(cv: CvInterface): CvFormInterface {
    return {
      cvName: cv.cvName,
      language: cv.language.map(language => ({
        level: language.level.name,
        name: language.name.name,
      })),
      skills: cv.skills.map(skill => skill.name),
      firstName: cv.firstName,
      lastName: cv.lastName,
      email: cv.email,
      department: cv.department.name,
      specialization: cv.specialization.name,
      cvsProjects: cv.cvsProjects.map(project => ({
        ...project,
        techStack: project.techStack.map(skill => skill.name),
        responsibilities: project.responsibilities.map(resp => resp.name),
        teamRoles: project.teamRoles.map(role => role.name),
      })),
    };
  }
}
