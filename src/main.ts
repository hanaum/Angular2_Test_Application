import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';
import {AuthMethods, AuthProviders, FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig} from 'angularfire2';  // tslint:disable-line

import {AppComponent} from './components/app/app.component';
import {APP_ROUTER_PROVIDERS} from './components/app/app.routes';
import {AuthenticationService} from "./services/authentication.service";

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent as any, [
  MODAL_BROWSER_PROVIDERS,
  FIREBASE_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  // Initialize Firebase app.
  defaultFirebase({
    apiKey: 'AIzaSyCkIwlM9xp_nI93k8XmEAjXoCy5dLQAwOY',
    authDomain: 'choosetogo-61e03.firebaseapp.com',
    databaseURL: 'https://choosetogo-61e03.firebaseio.com',
    storageBucket: 'choosetogo-61e03.appspot.com',
  }),
  firebaseAuthConfig({provider: AuthProviders.Google, method: AuthMethods.Redirect}),
  disableDeprecatedForms(),
  provideForms(),
  AuthenticationService
]);
