import { enableProdMode, NgZone } from "@angular/core";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router } from "@angular/router";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from "single-spa-angular";
import { singleSpaPropsSubject } from "./single-spa/single-spa-props";

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: "<app2-root />",
  Router,
  NgZone: NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;

/* export function mount(props: any) {
  //bus.globalEventDistributor = props.globalEventDistributor;
  console.log(props)
  if (typeof lifecycles.mount === 'function') {
    return lifecycles.mount(props);
  } else {
    return Promise.all(lifecycles.mount.map(mount => mount(props)));
  }
} */

export const unmount = lifecycles.unmount;
