import {Component, OnInit} from '@angular/core';

import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';
import {AddTaskComponent} from '../addTask/addTask.component';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
  providers: [TaskListService],
  directives: [AddTaskComponent as any]
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class TaskListComponent implements OnInit {
  private tasks: TaskItem[];

  constructor(private taskListService: TaskListService) {}

  ngOnInit() { this.getTaskList(); }

  /**
   * Calls taskListService to grab tasks and store them in an array.
   */
  getTaskList() { this.taskListService.getTaskList().then(tasks => this.tasks = tasks); }

  /**
   * @param task
   */
  addTask(task: TaskItem) { this.tasks.push(task); }
}