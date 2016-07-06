import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {TaskItem} from '../../services/taskItem';
import {AddTaskComponent} from '../addTask/addTask.component';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
  directives: [AddTaskComponent as any]
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class TaskListComponent implements OnInit {
  private tasks: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {}

  ngOnInit() { this.getTaskList(); }

  /**
   * Calls taskListService to grab tasks and store them in an array.
   */
  getTaskList() { this.tasks = this.af.database.list('task_list'); }

  /**
   * @param task
   */
  addTask(task: TaskItem) { this.tasks.push(task); }

  /**
   *
   * @param taskId
   */
  removeTask(taskId: string) { this.tasks.remove(taskId); }
}