import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {TaskItem} from '../../services/taskItem';
import {TaskListService} from '../../services/taskList.service';
import {AddTaskComponent} from '../addTask/addTask.component';

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
  directives: [AddTaskComponent as any],
  providers: [TaskListService]
})

/**
 * TaskListComponent renders the table containing a list of TaskItems.
 */
export class TaskListComponent implements OnInit {
  private isInputFocused: boolean;
  private id: string;
  private tasks: FirebaseListObservable<any[]>;
  private listName: FirebaseObjectObservable<any[]>;

  constructor(private route: ActivatedRoute, private taskListService: TaskListService) {}

  ngOnInit() {
    this.isInputFocused = false;
    this.id = this.route.snapshot.params['id'];
    this.tasks = this.getTaskList();
    this.listName = this.getListName();
  }

  /**
   * Calls taskListService to grab tasks and store them in an array.
   */
  private getTaskList(): FirebaseListObservable<any[]> {
    return this.taskListService.getTaskList(this.id);
  }

  /**
   * Calls taskListService to grab tasks and store them in an array.
   */
  private getListName(): FirebaseObjectObservable<any[]> {
    return this.taskListService.getListName(this.id);
  }

  /**
   * @param task
   */
  addTask(task: TaskItem) { this.tasks.push(task); }

  /**
   *
   * @param taskId
   */
  removeTask(taskId: string) { this.tasks.remove(taskId); }

  editListName(newName: string) {
    this.listName.set(newName);
    this.isInputFocused = !this.isInputFocused;
  }
}