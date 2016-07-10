import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService, AuthenticationState} from '../../services/authentication.service';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'homepage',
  template: require('./homepage.component.html'),
  styles: [require('./homepage.component.css')],
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
      private router: Router,
      private taskListService: TaskListService,
      private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginSubscription = this.authenticationService.observableAuthenticationState.subscribe(
        (state) => { this.loggedIn = state; });
  }

  ngOnDestroy() { this.loginSubscription.unsubscribe(); }

  getListId() {
    let uuid: string = this.authenticationService.getUserId();
    let id: string = this.taskListService.createNewTaskList(uuid);
    let link: string[] = ['/list', id];
    this.router.navigate(link);
  }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
