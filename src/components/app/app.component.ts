import '../../../public/css/styles.css';

import {Component} from '@angular/core';
import {NGB_DIRECTIVES, NGB_PRECOMPILE} from '@ng-bootstrap/ng-bootstrap';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [ROUTER_DIRECTIVES, NGB_DIRECTIVES, NavbarComponent as any],
  precompile: [ NGB_PRECOMPILE ]
})

/**
 * AppComponent serves as main component that holds base components.
 */
export class AppComponent {
}