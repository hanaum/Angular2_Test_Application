import {Component, Input} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'task-remove-button',
  template: require('./taskRemoveButton.component.html'),
  providers: [TaskListService as any],
})

export class TaskRemoveButtonComponent {
  @Input() private id: string;

  constructor(
      private authenticationService: AuthenticationService,
      private taskListService: TaskListService) {}

  removeList() {
    this.taskListService.removeTaskList(this.id, this.authenticationService.getUserId());
  }
}