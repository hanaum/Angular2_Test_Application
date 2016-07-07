import {Component, EventEmitter, Output} from '@angular/core';

import {TaskItem} from '../../services/taskItem';

const DEFAULT_PRIORITY: number = 3;

@Component({
  selector: 'add-task',
  template: require('./addTask.component.html'),
  styles: [require('./addTask.component.css')],
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class AddTaskComponent {
  @Output() taskEmitter = new EventEmitter<TaskItem>();

  private model = new TaskItem('', DEFAULT_PRIORITY, false, '');
  private hidden = false;

  onSubmit() {
    this.taskEmitter.emit(this.model);
    this.newTask();
  }

  newTask() {
    this.hidden = true;
    this.model = new TaskItem('', DEFAULT_PRIORITY, false, '');
    setTimeout(() => this.hidden = false, 0);
  }
}
