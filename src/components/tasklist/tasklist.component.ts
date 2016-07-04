import '../../../public/css/styles.css';
import {Component} from '@angular/core';

@Component({
  selector: 'task-list',
  template: require('./tasklist.component.html'),
  styles: [require('./tasklist.component.css')]
})

export class TasklistComponent {
}