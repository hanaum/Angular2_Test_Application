import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService, AuthenticationState} from '../../services/authentication.service';
import {RoutingService} from '../../services/routing.service';
import {TaskListService} from '../../services/taskList.service';
import {UrlModalComponent} from '../urlModal/urlModal.component';

@Component({
  selector: 'nav-bar',
  template: require('./navbar.component.html'),
  styles: [require('./navbar.component.css'), require('./navbar-responsive.component.css')],
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
      private taskListService: TaskListService,
      private authenticationService: AuthenticationService,
      private routingService: RoutingService) {}

  ngOnInit() {
    this.loginSubscription = this.authenticationService.observableAuthenticationState.subscribe(
        (state) => { this.loggedIn = state; });
    this.urlPathSubscription = this.routingService.observableRouteState.subscribe(
        (urlPath) => { this.urlPath = urlPath; });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.urlPathSubscription.unsubscribe();
  }

  private navigateAndCreateList() {  // tslint:disable-line
    let listId: string = this.taskListService.createNewTaskList();
    this.routingService.navigateToList(listId);
  }

  login() { this.authenticationService.login(); }

  logout() {
    this.authenticationService.logout();
    this.routingService.navigateToHomepage();
  }
}
