import {enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

import {AppComponent} from './components/app/app.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent as any, [
  MODAL_BROWSER_PROVIDERS,
  FIREBASE_PROVIDERS,
  // Initialize Firebase app.
  defaultFirebase({
    apiKey: 'AIzaSyCkIwlM9xp_nI93k8XmEAjXoCy5dLQAwOY',
    authDomain: 'choosetogo-61e03.firebaseapp.com',
    databaseURL: 'https://choosetogo-61e03.firebaseio.com',
    storageBucket: 'choosetogo-61e03.appspot.com',
  }),
  disableDeprecatedForms(),
  provideForms()
]);
