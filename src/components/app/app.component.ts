import '../../../public/css/styles.css';

import {Component} from '@angular/core';
import {TasklistComponent} from '../tasklist/tasklist.component';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [[TasklistComponent]]
})

export class AppComponent {
}
