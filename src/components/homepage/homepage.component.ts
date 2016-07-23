import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService, AuthenticationState} from '../../services/authentication.service';
import {RoutingService} from '../../services/routing.service';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'homepage',
  template: require('./homepage.component.html'),
  styles: [require('./homepage.component.css'), require('./homepage-responsive.component.css')],
  providers: [TaskListService]
})

/**
 * AppComponent serves as main component that holds base components.
 */
export class HomepageComponent implements OnInit {
  // Private reference of AuthenticationState enum for use in html.
  private authenticationState = AuthenticationState;  // tslint:disable-line
  private loggedIn: AuthenticationState = AuthenticationState.UNKNOWN;
  private loginSubscription: Subscription;

  constructor(
      private taskListService: TaskListService,
      private authenticationService: AuthenticationService,
      private routingService: RoutingService) {}

  ngOnInit() {
    this.loginSubscription = this.authenticationService.observableAuthenticationState.subscribe(
        (state) => { this.loggedIn = state; });
  }

  ngOnDestroy() { this.loginSubscription.unsubscribe(); }

  private navigateToList() {  // tslint:disable-line
    let uuid: string = this.authenticationService.getUserId();
    let listId: string = this.taskListService.createNewTaskList(uuid);
    this.routingService.navigateToList(listId);
  }

  login() {
    this.authenticationService.login();
    this.routingService.navigateToUserlist();
  }

  logout() { this.authenticationService.logout(); }
}
