import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService} from '../../services/authentication.service';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'homepage',
  template: require('./homepage.component.html'),
  styles: [require('./homepage.component.css')],
  providers: [AuthenticationService, TaskListService]
})

/**
 * AppComponent serves as main component that holds base components.
 */
export class HomepageComponent implements OnInit {
  // 0 is unknown. 1 is logged in. -1 is not logged in.
  private loggedIn: number = 0;
  private loginSubscription: Subscription;

  constructor(
      private router: Router,
      private taskListService: TaskListService,
      private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginSubscription =
        this.authenticationService.loginState$.subscribe((state) => { this.loggedIn = state; })
  }

  ngOnDestroy() { this.loginSubscription.unsubscribe(); }

  getListId() {
    let id = this.taskListService.getNewTaskListId();
    let link = ['/list', id];
    this.router.navigate(link);
  }

  login() { this.authenticationService.login(); }

  logout() { this.authenticationService.logout(); }
}
