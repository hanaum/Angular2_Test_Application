import {Component} from '@angular/core';
import {TaskItem} from '../../services/TaskItem';

const TASKS: TaskItem[] = [
  new TaskItem(11, 'Mr.Hana', 5),
  new TaskItem(12, 'Mr.Pudding', 5),
  new TaskItem(13, 'Mr.Hyungtae', 5),
  new TaskItem(14, 'Mr.Erywa', 5)
];

@Component({
  selector: 'task-list',
  template: require('./taskList.component.html'),
  styles: [require('./taskList.component.css')],
})

export class TaskListComponent {
  tasks = TASKS;
}