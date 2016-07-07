import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/angularfire2';  // tslint:disable-line

const TASKLIST_PATH: string = 'task_list';
const DEFAULT_TASKLIST_NAME: string = 'New List';

@Injectable()
export class TaskListService {
  constructor(private af: AngularFire) {}

  getNewTaskListId(uid: string): string {
    return this.af.database.list(TASKLIST_PATH)
        .push({name: DEFAULT_TASKLIST_NAME, owner: uid, tasks: []})
        .key;
  }

  getTaskListName(id: string): FirebaseObjectObservable<any> {
    const nameSuffix: string = '/name';
    return this.af.database.object(TASKLIST_PATH + '/' + id + nameSuffix);
  }

  getTasks(id: string): FirebaseListObservable<any[]> {
    const taskSuffix: string = '/tasks';
    return this.af.database.list(TASKLIST_PATH + '/' + id + taskSuffix);
  }

  getOwner(id: string): FirebaseObjectObservable<any> {
    const ownerSuffix: string = '/owner';
    return this.af.database.object(TASKLIST_PATH + '/' + id + ownerSuffix);
  }
}
