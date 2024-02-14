import { HttpClient } from "@angular/common/http";
import { Token } from "../../interfaces/token";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../constants/api";
import { AuthInterface } from "../../interfaces/auth";

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private readonly http = inject(HttpClient);

  public login(credentials: AuthInterface): Observable<Token> {
    const endpoint = `${API_URL}/auth/login`;
    return this.http.post<Token>(endpoint, credentials, { withCredentials: true });
  }

  public logout(): Observable<unknown> {
    const endpoint = `${API_URL}/auth/logout`;
    return this.http.get(endpoint, { withCredentials: true });
  }

  public refreshToken(): Observable<Token> {
    const endpoint = `${API_URL}/auth/refresh`;
    return this.http.get<Token>(endpoint, { withCredentials: true });
  }
}
