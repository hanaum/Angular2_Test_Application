import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginSubscription =
        this.authenticationService.loginState$.subscribe((state) => { this.loggedIn = state; });
  }

  ngOnDestroy() { this.loginSubscription.unsubscribe(); }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
