import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { LanguageService } from "../../../../shared/services/language.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "cvgen-auth-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NzDropDownModule,
    AuthFormComponent,
    NzIconModule,
    NzLayoutModule,
  ],
  templateUrl: "./auth-page.component.html",
  styleUrl: "./auth-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  private readonly langService = inject(LanguageService);

  public changeLanguage(lang: string) {
    this.langService.switchLang(lang);
  }
}
