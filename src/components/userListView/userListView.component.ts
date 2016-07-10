import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {FirebaseObjectObservable} from 'angularfire2/angularfire2';
import {Subscription} from 'rxjs/Rx';

import {AuthenticationService} from '../../services/authentication.service';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'user-lists',
  template: require('./userListView.component.html'),
  styles: [require('./userListView.component.css')],
  directives: [ROUTER_DIRECTIVES],
  providers: [TaskListService as any]
})

export class UserListViewComponent implements OnInit {
  private taskLists: FirebaseObjectObservable<any>[];
  private taskListsSubscription: Subscription;
  private taskListsSubscriptionSubscription: Subscription;

  constructor(
      private authenticationService: AuthenticationService,
      private taskListService: TaskListService) {}

  ngOnInit() {
    this.taskListsSubscriptionSubscription =
        this.taskListService.getUserLists(this.authenticationService.observableUserId)
            .subscribe((taskListsObservable) => {
              if (this.taskListsSubscription != null) {
                this.taskListsSubscription.unsubscribe();
              }
              this.taskListsSubscription =
                  taskListsObservable.subscribe((taskLists) => { this.taskLists = taskLists; });
            });
  }

  ngOnDestroy() {
    this.taskListsSubscriptionSubscription.unsubscribe();
    if (this.taskListsSubscription != null) {
      this.taskListsSubscription.unsubscribe();
    }
  }
}