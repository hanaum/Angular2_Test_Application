import {Component, OnInit} from '@angular/core';

import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
})

export class TaskListComponent implements OnInit {
  tasks: TaskItem[];

  constructor(private taskListService: TaskListService) {}

  ngOnInit() { this.getTaskList(); }

  getTaskList(): Promise<any> {
    return this.taskListService.getTaskList().then(tasks => this.tasks = tasks);
  }
}