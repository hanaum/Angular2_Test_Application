import {Component} from '@angular/core';
import {TaskList} from '../../services/taskList';
import {NavbarComponent} from '../navbar/navbar.component';

const TASK_LIST: TaskList[] = [
  new TaskList('hanalist', 'hana'),
  new TaskList('hhlist', 'hana'),
  new TaskList('hoongtailist', 'hoongtai'),
  new TaskList('puddinglist', 'hana')
];

@Component({
  selector: 'user-lists',
  template: require('./userListView.component.html'),
  styles: [require('./userListView.component.css')],
  directives: [NavbarComponent as any]
})

export class UserListViewComponent {
  private taskLists: TaskList[] = TASK_LIST;  // tslint:disable-line
}