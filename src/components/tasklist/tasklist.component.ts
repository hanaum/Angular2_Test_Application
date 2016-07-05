import {Component, OnInit} from '@angular/core';

import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class TaskListComponent implements OnInit {
  tasks: TaskItem[];

  constructor(private taskListService: TaskListService) {}

  ngOnInit() { this.getTaskList(); }

  /**
   * GetTaskList calls taskListService to grab tasks and store them in an array.
   */
  getTaskList() {
    this.taskListService.getTaskList().then(tasks => this.tasks = tasks);
  }
}