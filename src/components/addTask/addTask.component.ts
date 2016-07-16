import {Component, EventEmitter, Output, OnInit} from '@angular/core';

import {TaskItem} from '../../services/taskItem';

declare const google: any;

@Component({
  selector: 'add-task',
  template: require('./addTask.component.html'),
  styles: [require('./addTask.component.css')],
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class AddTaskComponent implements OnInit {
  @Output() taskEmitter = new EventEmitter<TaskItem>();

  private model = new TaskItem('', 3);
  private hidden = false;

  ngOnInit() {
    // TODO investigate using @viewChild.
    let taskNameInputBox = document.getElementById('add-task-name');
    let autoComplete = new google.maps.places.Autocomplete(taskNameInputBox);
  }

  onSubmit() {
    this.taskEmitter.emit(this.model);
    this.newTask();
  }

  newTask() {
    this.hidden = true;
    this.model = new TaskItem('', 3);
    setTimeout(() => this.hidden = false, 0);
  }
}
