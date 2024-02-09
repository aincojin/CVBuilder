import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CvDtoInterface, CvInterface } from "../../interfaces/cv";
import { Observable } from "rxjs";
import { API_URL } from "../../constants/api";

@Injectable({
  providedIn: "root",
})
export class CvsApiService {
  constructor(private http: HttpClient) {}

  public fetchCvs(): Observable<CvInterface[]> {
    const endpoint = `${API_URL}/cvs`;
    return this.http.get<CvInterface[]>(endpoint);
  }

  public addCv(newCvData: CvDtoInterface): Observable<CvInterface> {
    const endpoint = `${API_URL}/cvs`;
    return this.http.post<CvInterface>(endpoint, newCvData);
  }
}
