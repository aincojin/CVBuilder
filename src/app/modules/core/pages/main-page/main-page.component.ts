import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "cvgen-main-page",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, NzLayoutModule],
  templateUrl: "./main-page.component.html",
  styleUrl: "./main-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  public isCollapsed = false;
  public iconType: string = "menu-fold";

  public onSidebarToggle(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
}
