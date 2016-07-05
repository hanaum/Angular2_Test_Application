import {Component, OnInit} from '@angular/core';

import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
})

/**
 * TaskListComponent updates the list table with TaskItem(s).
 */
export class TaskListComponent implements OnInit {
  tasks: TaskItem[];

  constructor(private taskListService: TaskListService) {}

  ngOnInit() { this.getTaskList(); }

  /**
   * GetTaskList calls taskListService to grab tasks and store them in an array
   * @returns {Promise<TResult>|Promise<U>} array of TaskItems.
   */
  getTaskList(): Promise<any> {
    return this.taskListService.getTaskList().then(tasks => this.tasks = tasks);
  }
}