import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService, AuthenticationState} from '../../services/authentication.service';
import {RoutingService} from '../../services/routing.service';
import {UrlModalComponent} from '../urlModal/urlModal.component';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.css')],
  directives: [ROUTER_DIRECTIVES, UrlModalComponent as any]
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

  constructor(
      private authenticationService: AuthenticationService,
      private routingService: RoutingService) {}

  ngOnInit() {
    this.loginSubscription = this.authenticationService.observableAuthenticationState.subscribe(
        (state) => { this.loggedIn = state; });
    this.urlPathSubscription = this.routingService.observableRouteState.subscribe(

        (urlPath) => {
          this.urlPath = urlPath;
          console.log(this.urlPath);
        });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.urlPathSubscription.unsubscribe();
  }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
