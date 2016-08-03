import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {FirebaseObjectObservable} from 'angularfire2/angularfire2';
import {Subscription} from 'rxjs/Rx';

import {TaskListService} from '../../services/taskList.service';
import {TaskRemoveButtonComponent} from '../taskRemoveButton/taskRemoveButton.component';

@Component({
  selector: 'user-lists',
  template: require('./userListView.component.html'),
  styles: [require('./userListView.component.css')],
  directives: [ROUTER_DIRECTIVES, TaskRemoveButtonComponent]
})

export class UserListViewComponent implements OnInit {
  private taskLists: FirebaseObjectObservable<any>[];
  private taskListsSubscription: Subscription;
  private taskListsSubscriptionSubscription: Subscription;

  constructor(private taskListService: TaskListService) {}

  ngOnInit() {
    this.taskListsSubscriptionSubscription =
        this.taskListService.getUserLists().subscribe((taskListsObservable) => {
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