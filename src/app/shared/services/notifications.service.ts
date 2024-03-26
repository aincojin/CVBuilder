import { Injectable } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(private notification: NzNotificationService) {}

  public errorMessage(error: string) {
    this.notification.create("error", "Error", error);
  }

  public successMessage(message: string) {
    this.notification.create("success", "Success", message);
  }
}
