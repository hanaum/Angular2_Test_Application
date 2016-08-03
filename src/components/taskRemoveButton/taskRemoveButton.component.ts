import {Component, Input} from '@angular/core';

import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'task-remove-button',
  template: require('./taskRemoveButton.component.html'),
  styles: [require('./taskRemoveButton.component.css')]
})

export class TaskRemoveButtonComponent {
  @Input() private id: string;

  constructor(
      private taskListService: TaskListService) {}

  removeList() {
    this.taskListService.removeTaskList(this.id);
  }
}