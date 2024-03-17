import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CvDtoInterface, CvInterface } from "../../interfaces/cv";
import { Observable } from "rxjs";
import { API_URL } from "../../constants/api";

@Injectable({
  providedIn: "root",
})
export class CvsApiService {
  private readonly http = inject(HttpClient);

  public fetchCvs(): Observable<CvInterface[]> {
    const endpoint = `${API_URL}/cvs`;
    return this.http.get<CvInterface[]>(endpoint);
  }

  public fetchCv(cvId: number): Observable<CvInterface> {
    const endpoint = `${API_URL}/cvs/${cvId}`;
    return this.http.get<CvInterface>(endpoint);
  }

  public addCv(newCvData: CvDtoInterface): Observable<CvInterface> {
    const endpoint = `${API_URL}/cvs`;
    return this.http.post<CvInterface>(endpoint, newCvData);
  }

  public updateCv(updatedCvData: CvDtoInterface, cvId: number): Observable<CvInterface> {
    const endpoint = `${API_URL}/cvs/${cvId}`;
    return this.http.put<CvInterface>(endpoint, updatedCvData);
  }

  public deleteCv(cvId: number): Observable<CvInterface> {
    const endpoint = `${API_URL}/cvs/${cvId}`;
    return this.http.delete<CvInterface>(endpoint);
  }
}
