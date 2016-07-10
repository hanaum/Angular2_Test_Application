import '../../../public/css/styles.css';

import {Component} from '@angular/core';

import {TaskListComponent} from '../taskList/taskList.component';

@Component({
  selector: 'task-list-view',
  template: require('./taskListView.component.html'),
  styles: [require('./taskListView.component.css')],
  directives: [TaskListComponent as any]
})

/**
 * TaskListViewComponent serves as main component that holds base components.
 */
export class TaskListViewComponent {
}
