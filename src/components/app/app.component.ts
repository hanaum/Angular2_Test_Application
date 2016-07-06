import '../../../public/css/styles.css';

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [ROUTER_DIRECTIVES]
})

/**
 * AppComponent serves as main component that holds base components.
 */
export class AppComponent {
}
