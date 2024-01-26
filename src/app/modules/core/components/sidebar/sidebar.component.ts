import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

@Component({
  selector: "cvgen-sidebar",
  standalone: true,
  imports: [TranslateModule, NzLayoutModule, NzIconModule, NzMenuModule, NzDividerModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  constructor(private router: Router) {}

  @Input() public isCollapsed: boolean;
  @Input() iconType: string = "menu-fold";
  @Output() isCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  public toEmployees() {
    this.router.navigate(["/main/employees"]);
  }

  public toProjects() {
    this.router.navigate(["/main/projects"]);
  }
}
