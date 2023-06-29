import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoadingService {
  loading$: Subject<boolean> = new Subject<boolean>();
  currentMessage = this.loading$.asObservable();

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}
