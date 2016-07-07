import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2/angularfire2';

const TASKLIST_PATH: string = 'task_list';
const DEFAULT_TASKLIST_NAME: string = 'New List';

@Injectable()
export class TaskListService {
  private taskLists: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { this.taskLists = this.af.database.list(TASKLIST_PATH); }

  getNewTaskListId(uid: string): string {
    return this.taskLists.push({name: DEFAULT_TASKLIST_NAME, owner: uid, tasks: []}).key;
  }
}
