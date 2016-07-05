import {enableProdMode} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

import {AppComponent} from './components/app/app.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent as any, [MODAL_BROWSER_PROVIDERS, disableDeprecatedForms(), provideForms()]);
