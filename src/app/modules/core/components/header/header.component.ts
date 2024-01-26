import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "../../../../shared/services/auth.service";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../../../shared/services/language.service";

@Component({
  selector: "cvgen-header",
  standalone: true,
  imports: [NzIconModule, NzDropDownModule, TranslateModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private langService: LanguageService,
  ) {}

  public onLogout() {
    this.authService.logout();
  }

  public changeLanguage(lang: string) {
    this.langService.switchLang(lang);
  }
}
