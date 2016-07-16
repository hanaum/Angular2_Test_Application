import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig} from 'angularfire2';

import {AppComponent} from './components/app/app.component';
import {APP_ROUTER_PROVIDERS} from './components/app/app.routes';
import {FIREBASE_AUTH_CONFIG, FIREBASE_CONFIG} from './configs/firebase.config';
import {AuthenticationService} from './services/authentication.service';
import {RoutingService} from './services/routing.service';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent as any, [
  MODAL_BROWSER_PROVIDERS,
  FIREBASE_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  defaultFirebase(FIREBASE_CONFIG),
  firebaseAuthConfig(FIREBASE_AUTH_CONFIG),
  disableDeprecatedForms(),
  provideForms(),
  AuthenticationService,
  RoutingService
]);
