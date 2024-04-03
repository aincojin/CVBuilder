import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private readonly notification = inject(NzNotificationService);

  public errorMessage(error: string) {
    this.notification.create("error", "Error", error);
  }

  public successMessage(message: string) {
    this.notification.create("success", "Success", message);
  }
}
