import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { catchError, throwError, switchMap } from "rxjs";
import { AuthApiService } from "../services/api/auth.api.service";
import { NotificationsService } from "../services/notifications.service";
import { AUTH_MESSAGES } from "../constants/successMessages";

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const cookieService = inject(CookieService);
  const authApiService = inject(AuthApiService);
  const notificationService = inject(NotificationsService);

  const errorList = AUTH_MESSAGES;

  const token = cookieService.get("access_token");
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError(error => {
      notificationService.errorMessage(errorList[error.status]);
      if (error.status === 401) {
        return handleUnauthorizedError(req, next, authApiService, cookieService);
      } else if (error.status === 403) {
        return handleForbiddenError(error);
      }
      return throwError(() => error);
    }),
  );
};

const handleUnauthorizedError = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authApiService: AuthApiService,
  cookieService: CookieService,
) => {
  return authApiService.refreshToken().pipe(
    switchMap(newToken => {
      cookieService.delete("access_token");
      cookieService.set("access_token", newToken.access_token);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${newToken.access_token}`,
        },
      });
      return next(req);
    }),
    catchError(refreshError => {
      authApiService.logout();
      return throwError(() => refreshError);
    }),
  );
};

const handleForbiddenError = error => {
  console.log("403:(");
  return throwError(() => error);
};
