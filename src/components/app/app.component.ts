import '../../../public/css/styles.css';

import {Component} from '@angular/core';

import {NavbarComponent} from '../navbar/navbar.component';
import {TaskListComponent} from '../taskList/taskList.component';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [TaskListComponent as any, NavbarComponent as any]
})

/**
 * AppComponent serves as main component that holds base directives.
 */
export class AppComponent {
}
