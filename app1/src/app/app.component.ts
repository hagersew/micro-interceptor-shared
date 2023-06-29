import { Component, OnInit } from "@angular/core";
import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from "src/single-spa/single-spa-props";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "./services/loading.service";
@Component({
  selector: "app1-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;
  constructor(private http: HttpClient, public status: LoadingService) {
    this.status.currentMessage.subscribe((message) => {
      if (message) {
        this.sendMsg(message);
      } else {
        this.sendMsg(message);
      }
    });
  }
  ngOnInit(): void {
    singleSpaPropsSubject.subscribe((props) => {
      this.singleSpaProps = props;
    });
  }

  sendRequest = () => {
    this.http
      .post<any>("https://reqres.in/api/posts", {
        title: "Angular POST Request Example",
      })
      .subscribe((data) => {
        console.log(data, "data");
      });
  };
  sendMsg(status) {
    this.singleSpaProps["EventBus"].emit({
      name: "msgFrmMicros",
      data: status,
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
