import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  private isInputFocused: boolean;
  private id: string;
  private tasks: FirebaseListObservable<any[]>;
  private listName: string;

  constructor(private route: ActivatedRoute, private af: AngularFire) {}

  ngOnInit() {
    this.isInputFocused = false;
    this.id = this.route.snapshot.params['id'];
    this.getTaskList();
  }

  /**
   * Calls taskListService to grab tasks and store them in an array.
   */
  getTaskList() { this.tasks = this.af.database.list('task_list/' + this.id); }

  /**
   * @param task
   */
  addTask(task: TaskItem) { this.tasks.push(task); }

  /**
   *
   * @param taskId
   */
  removeTask(taskId: string) { this.tasks.remove(taskId); }

  editListName() {
    this.isInputFocused = !this.isInputFocused;
  }
}