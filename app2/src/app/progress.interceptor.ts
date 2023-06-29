import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "./services/loading.service";

@Injectable({ providedIn: "root" })
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  intercept(
    request: HttpRequest<XMLHttpRequest>,
    next: HttpHandler
  ): Observable<HttpEvent<XMLHttpRequest>> {
    this.loadingService.show();
    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loadingService.hide();
        }, 5000);
      })
    );
  }
}
