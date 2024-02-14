import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Paths } from "../enums/routes";
import { AuthInterface } from "../interfaces/auth";
import { AuthApiService } from "./api/auth.api.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  private readonly authApiService = inject(AuthApiService);

  public login(credentials: AuthInterface) {
    this.authApiService
      .login(credentials)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: token => {
          this.cookieService.set("access_token", token.access_token);
          console.log("Login successful.");
          this.router.navigate([Paths.Main]);
        },
        error: error => {
          console.error("Login failed. Error:", error);
        },
      });
  }

  public logout(): void {
    this.authApiService
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (this.cookieService.check("access_token")) {
          this.cookieService.delete("access_token");
          this.isAuth();
          this.router.navigate([Paths.Auth]);
        }
      });
  }

  public isAuth() {
    const isAuth = !!this.cookieService.get("access_token");
    return isAuth;
  }
}
