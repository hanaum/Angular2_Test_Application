import {Component, OnInit} from '@angular/core';
import {NavigationEnd, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService, AuthenticationState} from '../../services/authentication.service';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.css')],
  directives: [ROUTER_DIRECTIVES],
})

/**
 * NavbarComponent renders the navbar.
 */
export class NavbarComponent implements OnInit {
  // Private reference of AuthenticationState enum for use in html.
  private authenticationState = AuthenticationState;  // tslint:disable-line
  private loggedIn: AuthenticationState = AuthenticationState.UNKNOWN;
  private loginSubscription: Subscription;

  private urlPath: string;
  private urlPathSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginSubscription = this.authenticationService.observableAuthenticationState.subscribe(
        (state) => { this.loggedIn = state; });
    this.urlPathSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlPath = event.url;
      }
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.urlPathSubscription.unsubscribe();
  }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
