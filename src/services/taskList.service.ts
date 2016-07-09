import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2/angularfire2';

import {AuthenticationService} from './authentication.service';
import {TaskList} from './taskList';

const DEFAULT_TASK_LIST_NAME: string = 'New List';

@Injectable()
export class TaskListService {
  private taskLists: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, private authenticationService: AuthenticationService) {
    this.taskLists = this.af.database.list('task_list_metadata');
  }

  getNewTaskListId(): string {
    let userId: string = this.authenticationService.getUserId();
    let key: string = this.taskLists.push(null).key;
    let newTaskList: TaskList = new TaskList(DEFAULT_TASK_LIST_NAME, userId);

    let update = new Map();
    update['task_list_metadata/' + key] = newTaskList;
    if (userId != null) {
      update['users/' + userId + '/task_lists/' + key] = true;
    }
    this.af.database.object('').update(update);
    return key;
  }
}
