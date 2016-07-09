import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {AuthenticationService, AuthenticationState} from '../../services/authentication.service';

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
  // Copy of AuthenticationState to use in HTML.
  private authenticationStateReference = AuthenticationState;  // tslint:disable-line
  private loggedIn: AuthenticationState = AuthenticationState.Unknown;
  private loginSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginSubscription =
        this.authenticationService.loginState$.subscribe((state) => { this.loggedIn = state; });
  }

  ngOnDestroy() { this.loginSubscription.unsubscribe(); }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
