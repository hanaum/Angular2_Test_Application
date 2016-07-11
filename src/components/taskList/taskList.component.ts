import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Observable, Subscription} from 'rxjs/Rx';

import {AuthenticationService} from '../../services/authentication.service';
import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';
import {AddTaskComponent} from '../addTask/addTask.component';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
  directives: [AddTaskComponent as any],
  providers: [TaskListService]
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class TaskListComponent implements OnInit {
  private isInputFocused: boolean;
  private id: string;
  private isEditable: boolean;
  private editableSubscription: Subscription;
  private tasks: FirebaseListObservable<any[]>;
  private listName: FirebaseObjectObservable<any[]>;

  constructor(
      private route: ActivatedRoute,
      private taskListService: TaskListService,
      private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isInputFocused = false;
    this.id = this.route.snapshot.params['id'];
    this.tasks = this.taskListService.getTaskList(this.id);
    this.listName = this.taskListService.getListName(this.id);
    this.editableSubscription =
        Observable
            .combineLatest(
                this.authenticationService.observableUserId,
                this.taskListService.getListOwner(this.id))
            .subscribe((ids) => { this.isEditable = ids[0] === ids[1]['$value']; });
  }

  ngOnDestroy() { this.editableSubscription.unsubscribe(); }

  /**
   * @param task
   */
  addTask(task: TaskItem) { this.tasks.push(task); }

  /**
   *
   * @param taskId
   */
  removeTask(taskId: string) { this.tasks.remove(taskId); }

  editListName(newName: string) {
    this.listName.set(newName);
    this.isInputFocused = !this.isInputFocused;
  }
}