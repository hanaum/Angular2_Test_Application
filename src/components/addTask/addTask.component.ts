import {Component, EventEmitter, Output} from '@angular/core';

import {TaskItem} from '../../services/taskItem';

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

  private model = new TaskItem(0, '', 3);
  private hidden = false;

  onSubmit() {
    this.taskEmitter.emit(this.model);
    this.newTask();
  }

  newTask() {
    this.hidden = true;
    this.model = new TaskItem(0, '', 3);
    setTimeout(() => this.hidden = false, 0);
  }
}
