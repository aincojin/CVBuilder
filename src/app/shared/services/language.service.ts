import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private readonly translate = inject(TranslateService);
  constructor() {
    this.translate.setDefaultLang("en");
  }
  public switchLang(lang: string) {
    this.translate.use(lang);
  }
}
