import {addProviders, expect, inject} from '@angular/core/testing';

import {AppComponent} from './app.component';

describe('App', () => {
  beforeEach(() => { addProviders([AppComponent]); });

  it('can instantiate',
     inject([AppComponent], (app: AppComponent) => { expect(app).toBeDefined(); }));
});
