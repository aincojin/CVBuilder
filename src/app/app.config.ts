import { ApplicationConfig, importProvidersFrom, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from "@ngrx/effects";
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { tokenInterceptor } from "./shared/interceptors/token.interceptor";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { employeeFeatureKey, employeeReducer } from "./store/employees/employees.reducers";
import { EmployeesEffects } from "./store/employees/employees.effects";
import { provideAnimations } from "@angular/platform-browser/animations";
import { en_US, provideNzI18n } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";

registerLocaleData(en);
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideStore(),
    provideState(employeeFeatureKey, employeeReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      // autoPause: true,
      // trace: false,
      // traceLimit: 75,
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: "en",
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
    provideEffects(EmployeesEffects),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideHttpClient(withFetch()),
    provideNzI18n(en_US),
  ],
};
