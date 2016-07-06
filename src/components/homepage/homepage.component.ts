import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {TaskListService} from '../../services/taskList.service';

@Component({
  selector: 'homepage',
  template: require('./homepage.component.html'),
  styles: [require('./homepage.component.css')],
  providers: [TaskListService]
})

/**
 * AppComponent serves as main component that holds base components.
 */
export class HomepageComponent {
  constructor(private router: Router, private taskListService: TaskListService) {}

  getListId() {
    let id = this.taskListService.getNewTaskListId();
    let link = ['/list', id];
    this.router.navigate(link);
  }
}
