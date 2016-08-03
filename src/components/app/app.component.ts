import '../../../public/css/styles.css';

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [ROUTER_DIRECTIVES, NavbarComponent as any]
})

/**
 * AppComponent serves as main component that holds base components.
 */
export class AppComponent {
}