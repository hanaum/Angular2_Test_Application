import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.css')],
  directives: [ROUTER_DIRECTIVES]
})

/**
 * NavbarComponent renders the navbar.
 */
export class NavbarComponent {
}
