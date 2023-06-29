import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from "src/single-spa/single-spa-props";
import { Subscription } from "rxjs";
@Component({
  selector: "shared-app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  msgFromMicro = "";
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;
  constructor(private ChangeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.subscribe((props) => {
      this.singleSpaProps = props;
      this.lookForEvents();
    });
  }
  lookForEvents() {
    this.singleSpaProps["EventBus"].on("msgFrmMicros", (data) => {
      this.msgFromMicro = data;
      this.ChangeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
